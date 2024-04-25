"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaStepBackward } from "react-icons/fa";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignUp = async () => {
    try {
      setLoading(true);

      const response = await fetch("http://localhost:8000/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();
      console.log("Signup response:", data);
      alert("Signup successful!");
      router.push("/login");
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
        <h1 className="text-2xl font-semibold">สมัครสมาชิก</h1>
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
            htmlFor="name"
            className="block text-sm font-medium text-gray-600"
          >
            ชื่อ:
          </label>
          <input
            type="text"
            id="email"
            className="mt-1 p-2 w-full border rounded-md"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
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
            onClick={handleSignUp}
            disabled={loading}
          >
            {loading ? "สมัครสมาชิก..." : "สมัครสมาชิก"}
          </button>
        </div>
        <hr className="border-b-1 border-gray-300 my-3" />
        <div className="flex justify-center items-center space-x-4">
          <h1>หากมีบัญชีผู้ใช้แล้ว คุณสามารถ</h1>
          <a href="/login" className="underline">
            เข้าสู่ระบบ
          </a>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
