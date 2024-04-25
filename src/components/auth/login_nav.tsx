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

export default function LoginNavbar() {
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
        </div>
      </div>
    </nav>
  );
}
