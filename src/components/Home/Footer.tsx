import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaFacebook } from "react-icons/fa";
import { FaFacebookMessenger } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaLine } from "react-icons/fa";
import Olylife from "@/Images/OlyLife1.webp"


export default function Footer() {
  return (
    <div className="">
      <div className="bg-green-500 h-1/2 w-full flex sm:flex-row flex-col justify-around items-start p-4 ">
        <div className="p-5 flex-shrink-1 ">
          
            <Image
              src={Olylife}
              alt={"icons"}
              width={200}
              height={90}
            />
          
        </div>
        <div className="p-5 ">
          <ul>
            <p className="text-white font-bold text-lg lg:text-2xl pb-4">
              หน้าแรก
            </p>
            <li className="text-white text-sm lg:text-lg pb-2  hover:text-gray-100 cursor-pointer">
              ผลิตภัณฑ์ Olylife
            </li>
            <li className="text-white text-sm lg:text-lg pb-2  hover:text-gray-100 cursor-pointer">
              สาระน่ารู้
            </li>
            <li className="text-white text-sm lg:text-lg pb-2  hover:text-gray-100 cursor-pointer">
              โอกาศธุรกิจ Olylife
            </li>
            <li className="text-white text-sm lg:text-lg pb-2  hover:text-gray-100 cursor-pointer">
              เกี่ยวกับเรา
            </li>
          </ul>
        </div>
        <div className="p-5 ">
          <ul>
            <p className="text-white font-bold text-lg lg:text-2xl pb-4">
              เว็บไซต์พันธมิตร
            </p>
            <li className="text-white text-sm lg:text-lg pb-2  hover:text-gray-100 cursor-pointer">
              <Link href={"https://olylifethailand.com/"}>
                www.OlylifeThailand.com
              </Link>
            </li>
            <li className="text-white text-sm lg:text-lg pb-2  hover:text-gray-100 cursor-pointer">
              <Link href={"https://olylifethailand.net/"}>
                www.OlylifeThailand.net
              </Link>
            </li>
            <li className="text-white text-sm lg:text-lg pb-2  hover:text-gray-100 cursor-pointer">
              <Link href={"https://olylifethailand.in.th/"}>
                www.OlylifeThailand.in.th
              </Link>
            </li>
            <li className="text-white text-sm lg:text-lg pb-2  hover:text-gray-100 cursor-pointer">
              <Link href={"https://olylifeonline.com/"}>
                www.OlylifeOnline.com
              </Link>
            </li>
            <li className="text-white text-sm lg:text-lg pb-2  hover:text-gray-100 cursor-pointer">
              <Link href={"https://olylifeonline.net/"}>
                www.OlylifeOnline.net
              </Link>
            </li>
            <li className="text-white text-sm lg:text-lg pb-2  hover:text-gray-100 cursor-pointer">
              <Link href={"http://www.olylifephiliphines.com/"}>
                www.OlylifePhiliphines.com
              </Link>
            </li>
          </ul>
        </div>

        <div className="p-5 ">
          <ul>
            <p className="text-white font-bold text-lg lg:text-2xl pb-4">
              ช่องทางติดต่อ
            </p>
            <li className="text-white text-sm lg:text-lg pb-2  hover:text-gray-100 cursor-pointer">
              <p>เบอร์โทรศัพท์:064-996-9444</p>
              <p>เบอร์โทรศัพท์: 064-456-9541</p>
            </li>
            <li className="text-white text-sm lg:text-lg pb-2  hover:text-gray-100 cursor-pointer">
              Lineid: @OlylifeThailand
            </li>
            <li className=" cursor-pointer flex gap-6 pb-5 text-xl text-white">
              <FaFacebook />
              <FaFacebookMessenger />
              <FaTiktok />
              <FaYoutube />
              <FaLine />
            </li>
            <li className="text-white text-sm lg:text-lg pb-2 hover:text-gray-100 cursor-pointer flex gap-8">
              <Image
                src={"/icons/graph.png"}
                alt={"icons"}
                width={25}
                height={40}
              />
              <span>1,928</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex sm:flex-row flex-col items-center justify-between bg-emerald-700 p-5 text-white text-sm lg:text-lg">
        <div>
          <span>&copy; 2023 OlylifeThailand.com All Right Reserveed.</span>
        </div>
        <div className="flex sm:flex-row flex-col">
          <p className="space-x-8 mr-8">นโยบายความเป็นส่วนตัว</p>
          <p>นโยบายการคืนเงินและคืนสินค้า</p>
        </div>
      </div>
    </div>
  );
}
