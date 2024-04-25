"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { TfiMenu } from "react-icons/tfi";
import { IoClose } from "react-icons/io5";
import { BiSearchAlt } from "react-icons/bi";
import { MdOutlineShoppingCart, MdKeyboardArrowDown } from "react-icons/md";
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Olylife from "@/Images/Oly.webp"

export default function Navbar() {
  //responesive Navbar
  const [Click, setClick] = useState(false);
  const toggleNavbar = (): void => {
    setClick(!Click);
  };
  //Dropdown
  const [isOpenProduct, setIsOpenProduct] = useState(false);//ผลิตภัณฑ์ Olylife
  const [isOpenUnity, setIsOpenUnity] = useState(false);//โอกาศทางธุรกิจ Olylife
  const [isOpenAbout, setIsOpenAbout] = useState(false);//เกี่ยวกับเรา

  const handleToggle = () => {
    setIsOpenProduct(!isOpenProduct);
    setIsOpenUnity(false);
    setIsOpenAbout(false);
  };
  const handleToggle1 = () => {
    setIsOpenProduct(false);
    setIsOpenUnity(!isOpenUnity);
    setIsOpenAbout(false);
  };
  const handleToggle2 = () => {
    setIsOpenProduct(false);
    setIsOpenUnity(false);
    setIsOpenAbout(!isOpenAbout);
  };
  
  return (
    <nav className="bg-green-500  ">
      <div className="max-w-7xl mx-auto px-4 sm:px6 lg:px-8 ">
        <div className="flex items-center justify-between h-28">
          <div className="flex items-center">
            <div className="flex-shrink-1">
              <Link href="/">
                <Image
                  src={Olylife}
                  alt={"error"}
                  width={200}
                  height={90}
                  layout="responesive"
                  loading="eager"
                />
              </Link>
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="ml-4 flex items-center space-x-3 xl:space-x-8 -mb-14 ">
              <ul className="flex space-x-4 xl:space-x-8 ">
                <li>
                  <Link href={"/"} className="text-white hover:text-gray-100">
                    หน้าแรก
                  </Link>
                </li>
                <li className="relative">
                  <span
                    className="text-white hover:text-gray-100 flex cursor-pointer"
                    onClick={handleToggle}
                  >
                    ผลิตภัณฑ์ Olylife{" "}
                    <MdKeyboardArrowDown className="mt-1 text-xl" />
                  </span>
                  {isOpenProduct && (
                    <ul className="absolute top-8 left-0 bg-white text-green-500 p-2 rounded-md w-[150px] cursor-pointer z-50">
                      <li className="hover:text-white p-2 hover:bg-green-500 rounded-md">content01</li>
                      <li className="hover:text-white p-2 hover:bg-green-500 rounded-md">content02</li>
                      <li className="hover:text-white p-2 hover:bg-green-500 rounded-md">content03</li>
                      <li className="hover:text-white p-2 hover:bg-green-500 rounded-md">content04</li>
                      <li className="hover:text-white p-2 hover:bg-green-500 rounded-md">content05</li>
                    </ul>
                  )}
                </li>
                <li>
                  <Link href={"/"} className="text-white hover:text-gray-100">
                    สาระน่ารู้
                  </Link>
                </li>
                <li className="relative">
                  <span
                    className="text-white hover:text-gray-100 flex cursor-pointer"
                    onClick={handleToggle1}
                  >
                    โอกาศธุรกิจ Olylife{" "}
                    <MdKeyboardArrowDown className="mt-1 text-xl" />
                  </span>
                  {isOpenUnity && (
                    <ul className="absolute top-8 left-0 bg-white text-green-500 p-2 rounded-md w-[150px] cursor-pointer z-50">
                      <li className="hover:text-white p-2 hover:bg-green-500 rounded-md">content01</li>
                      <li className="hover:text-white p-2 hover:bg-green-500 rounded-md">content02</li>
                      <li className="hover:text-white p-2 hover:bg-green-500 rounded-md">content03</li>
                      <li className="hover:text-white p-2 hover:bg-green-500 rounded-md">content04</li>
                      <li className="hover:text-white p-2 hover:bg-green-500 rounded-md">content05</li>
                    </ul>
                  )}
                </li>

                <li className="relative">
                  <span
                    
                    className="text-white hover:text-gray-100 flex cursor-pointer"
                    onClick={handleToggle2}
                  >
                    เกี่ยวกับเรา{" "}
                    <MdKeyboardArrowDown className="mt-1 text-xl" />
                  </span>
                  {isOpenAbout && (
                    <ul className="absolute top-8 left-0 bg-white text-green-500 p-2 rounded-md w-[150px] cursor-pointer z-50">
                      <li className="hover:text-white p-2 hover:bg-green-500 rounded-md">content01</li>
                      <li className="hover:text-white p-2 hover:bg-green-500 rounded-md">content02</li>
                      <li className="hover:text-white p-2 hover:bg-green-500 rounded-md">content03</li>
                      <li className="hover:text-white p-2 hover:bg-green-500 rounded-md">content04</li>
                      <li className="hover:text-white p-2 hover:bg-green-500 rounded-md">content05</li>
                    </ul>
                  )}
                </li>
              </ul>
              <div className="flex space-x-4 items-center">
                <input
                  type="text"
                  className="px-2 py-2 bg-inherit border-b  border-white text-white focus:outline-none md:w-24 xl:w-full"
                />
                <BiSearchAlt className="text-2xl text-white absolute right-20" />
                <div className="relative">
                  <MdOutlineShoppingCart className="text-2xl text-white" />
                  <span className="w-4 h-4 bg-red-600 text-white rounded-full absolute -right-1 -top-1.5 text-xs flex items-center justify-center">
                    0
                  </span>
                </div>
              </div>
              <div className="flex space-x-4 items-center absolute top-2 text-sm right-8">
                <Link href={"/login"}>
                  <button className="text-white ">เข้าสู่ระบบ</button>
                </Link>
                <Link href={"/register"}>
                  <button className="bg-white rounded-sm text-green-500 p-2">
                    สมัครสมาชิก
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="lg:hidden flex items-center">
            <div className="flex space-x-4 items-center">
              {/* <BiSearchAlt className="text-2xl text-white absolute right-28 " /> */}
              <div className="relative">
                <MdOutlineShoppingCart className="text-2xl text-white absolute right-2 -top-2" />
                <span className="w-4 h-4 bg-red-600 text-white rounded-full absolute right-1 -top-3.5 text-xs flex items-center justify-center">
                  0
                </span>
              </div>
            </div>
            <button
            id="Menu"
            aria-label="Menu"
              className="inline-flex items-center justify-center p-2 rounded-md text-white md:text-white  focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={toggleNavbar}
            >
              {Click ? (
                <IoClose className="text-4xl" />
              ) : (
                <TfiMenu className="text-4xl" />
              )}
            </button>
          </div>
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
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex w-full justify-between px-4 py-2 text-left text-md text-green-500">
                    <span>ผลิตภัณฑ์ Olylife</span>
                    <ChevronDownIcon
                      className={`${
                        open ? "rotate-180 transform" : ""
                      } h-7 w-7  text-green-500`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-4 text-sm text-green-500 text-wrap">
                    content01
                  </Disclosure.Panel>
                  <Disclosure.Panel className="px-4 text-sm text-green-500 text-wrap">
                    content01
                  </Disclosure.Panel>
                  <Disclosure.Panel className="px-4 text-sm text-green-500 text-wrap">
                    content01
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
            <Link
              href={"/"}
              className="block text-green-500  rounded-md py-1.5 px-4"
            >
              สาระน่ารู้
            </Link>
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex w-full justify-between px-4 py-2 text-left text-md text-green-500">
                    <span>โอกาศธุรกิจ Olylife</span>
                    <ChevronDownIcon
                      className={`${
                        open ? "rotate-180 transform" : ""
                      } h-7 w-7  text-green-500`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-4   text-sm text-green-500 text-wrap">
                    content01
                  </Disclosure.Panel>
                  <Disclosure.Panel className="px-4  text-sm text-green-500 text-wrap ">
                    content01
                  </Disclosure.Panel>
                  <Disclosure.Panel className="px-4  text-sm text-green-500 text-wrap">
                    content01
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex w-full justify-between px-4 py-2 text-left text-md text-green-500">
                    <span>เกี่ยวกับเรา</span>
                    <ChevronDownIcon
                      className={`${
                        open ? "rotate-180 transform" : ""
                      } h-7 w-7  text-green-500 `}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-4   text-sm text-green-500 text-wrap">
                    content01
                  </Disclosure.Panel>
                  <Disclosure.Panel className="px-4  text-sm text-green-500 text-wrap">
                    content01
                  </Disclosure.Panel>
                  <Disclosure.Panel className="px-4  text-sm text-green-500 text-wrap">
                    content01
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          </div>
          <div className="px-4 pt-4 pb-3 space-y-4 sm:px-6 ">
            <Link href={"/login"}>
              <button className="bg-emerald-700 rounded-sm text-white p-2 w-full">
                เข้าสู่ระบบ
              </button>
            </Link>
            <Link href={"/register"}>
              <button className="bg-green-500 rounded-sm text-white p-2 w-full mt-4">
                สมัครสมาชิก
              </button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
