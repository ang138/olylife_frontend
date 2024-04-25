import Sidebar from "@/components/admin/Sidebar";
import { useEffect, useState } from "react";
import { checkAdminLoggedIn } from "@/components/auth/check_admin";
import { useRouter } from "next/router";

const Admin = () => {
  const router = useRouter();
  const [user, setUser] = useState<any>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { loggedIn, userId, token } = checkAdminLoggedIn();
    if (!loggedIn) {
      router.push("/login");
    } else if (userId !== null) {
      console.log("User is logged in with ID:", userId);
      fetchUserData(userId, token);
    }
  }, []);

  const fetchUserData = async (userId: number, token: string) => {
    try {
      const response = await fetch(
        `http://localhost:8000/auth/user/${userId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setUser(data);
        console.log("Fetched User:", data);
      } else {
        console.error("Failed to fetch user data:", response.status);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center flex-col text-center p-4">
        <h2 className="text-3xl font-bold mb-4">Loading...</h2>
      </div>
    );
  }

  return (
    <Sidebar>
      <div className="flex justify-center">
        <div className="bg-white w-2/3 shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Admin Profile
            </h3>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 w-full px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">ชื่อ</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {user.name}
                </dd>
              </div>

              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">อีเมล</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {user.email}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </Sidebar>
  );
};

export default Admin;
