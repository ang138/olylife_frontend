"use client";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FaStepBackward } from "react-icons/fa";

interface JwtPayload {
  id: number;
  role: number;
}

function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<any[]>([]);
  const [userId, setUserId] = useState<number | null>(null);

  const handleLogin = async () => {
    try {
      setLoading(true);

      const response = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const { token } = await response.json();
        localStorage.setItem("token", token);
        const decodedToken: JwtPayload = jwtDecode(token) as JwtPayload;
        console.log("Decoded Token:", decodedToken);

        const userId = decodedToken?.id;
        setUserId(userId);
        console.log("Decoded Token:", userId);

        if (decodedToken.role === 2) {
          router.push("/");
          // router.push('/user');
        } else {
          router.push("/admin");
        }

        console.log("Login successful");
      } else {
        const data = await response.json();
        setError(data.message || "Login failed");
        console.error("Login failed:", data.message);
      }
    } catch (error) {
      setError("An error occurred during login.");
      console.error("Error during login:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBackToHome = () => {
    router.push("/");
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-green-100 rounded-md shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">เข้าสู่ระบบ</h1>
        <button
          type="button"
          className="text-black hover:underline focus:outline-none"
          onClick={handleBackToHome}
          disabled={loading}
        >
          <FaStepBackward className="inline-block mr-1" />
          หน้าหลัก
        </button>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-600"
          >
            อีเมล:
          </label>
          <input
            type="email"
            id="email"
            className="mt-1 p-2 w-full border rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-600"
          >
            รหัสผ่าน:
          </label>
          <input
            type="password"
            id="password"
            className="mt-1 p-2 w-full border rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex justify-center items-center space-x-4">
          <button
            type="button"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "เข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
          </button>
        </div>
        <hr className="border-b-1 border-gray-300 my-3" />
        <div className="flex justify-center items-center space-x-4">
          <h1>เพิ่งเคยเข้ามาใน olylife ใช่หรือไม่</h1>
          <a href="/register" className="underline">
            สมัครสมาชิก
          </a>
        </div>
        {users.length > 0 && (
          <div className="mt-4">
            <h3>User Information:</h3>
            {users.map((user) => (
              <div key={user.id} className="card">
                <p>ID: {user.id}</p>
                <p>Name: {user.name}</p>
                <p>Email: {user.email}</p>
                <p>Role: {user.role}</p>
                <hr />
              </div>
            ))}
          </div>
        )}
      </form>
    </div>
  );
}

export default LoginForm;
