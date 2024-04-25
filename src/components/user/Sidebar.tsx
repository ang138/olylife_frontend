import Link from "next/link";
import React, { ReactNode, useState } from "react";
import { FaHome } from "react-icons/fa";
import { MdFormatListBulletedAdd } from "react-icons/md";
import { FaBagShopping } from "react-icons/fa6";
import router from "next/router";

interface LayoutProps {
  children: ReactNode;
}
const UserSidebar: React.FC<LayoutProps> = ({ children }) => {
  const [Click, setClick] = useState(false);

  const toggleNavbar = (): void => {
    setClick(!Click);
  };

  const logout = () => {
    // ลบ token ใน localStorage
    localStorage.removeItem("token");
    // เปลี่ยนเส้นทางไปยังหน้าเข้าสู่ระบบ
    router.push("/");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="hidden md:flex flex-col w-64 bg-gray-800">
        <div className="flex items-center justify-center h-16 bg-gray-900">
          <span className="text-white font-bold uppercase">Admin</span>
        </div>
        <div className="flex flex-col flex-1 overflow-y-auto">
          <nav className="flex-1 px-2 py-4 bg-gray-800">
            <a
              href="/admin"
              className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700"
            >
              <FaHome size={24} />
              <span className="flex-1 ms-2 whitespace-nowrap">หน้าหลัก</span>
            </a>
            <a
              href="/admin/product/add"
              className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700"
            >
              <MdFormatListBulletedAdd size={24} />
              <span className="flex-1 ms-2 whitespace-nowrap">เพิ่มสินค้า</span>
            </a>
            <a
              href="/admin/product/manage"
              className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700"
            >
              <svg
                className="flex-shrink-0 w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 20"
              >
                <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z" />
              </svg>
              <span className="flex-1 ms-3 whitespace-nowrap">
                จัดการสินค้า
              </span>
            </a>
            <a
              href="#"
              className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700"
              onClick={logout}
            >
              <svg
                className="flex-shrink-0 w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
                />
              </svg>
              <span className="flex-1 ms-3 whitespace-nowrap">ออกจากระบบ</span>
            </a>
          </nav>
        </div>
      </div>

      <div className="flex flex-col flex-1 overflow-y-auto">
        <div className="flex items-center justify-between h-16 bg-white border-b border-gray-200">
          <div className="flex items-center px-4">
            <button
              className="text-gray-500 focus:outline-none focus:text-gray-700 md:hidden"
              onClick={toggleNavbar}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            {/* <input className="mx-4 w-full border rounded-md px-4 py-2" type="text" placeholder="Search"> */}
          </div>
        </div>
        {Click && (
          <div className="lg:hidden bg-gray-200 divide-y divide-gray-400">
            <div className="px-4 pt-4 pb-3 space-y-4 sm:px-6 rounded-md">
              <Link
                href={"/"}
                className=" block text-green-500  rounded-md py-1.5 px-4"
              >
                หน้าแรก
              </Link>
              <Link
                href={"/"}
                className="block text-green-500  rounded-md py-1.5 px-4"
              >
                สาระน่ารู้
              </Link>
            </div>
          </div>
        )}
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export default UserSidebar;
