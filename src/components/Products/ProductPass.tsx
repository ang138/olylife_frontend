import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { Tab } from "@headlessui/react";
import Active from "@/Images/Active.webp";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductCart() {
  const [orderDate, setOrderDate] = useState(new Date());
  const dateOptions = {
    day: "2-digit" as const,
    month: "2-digit" as const,
    year: "numeric" as const,
    hour: "numeric" as const,
    minute: "numeric" as const,
    second: "numeric" as const,
  };

  const formatedDate = orderDate.toLocaleString("en-US", dateOptions);
  return (
    <>
      <div className="text-sm lg:text-lg px-4 pt-4 pb-2 ">
        <ul className="flex flex-row gap-2 text-gray-500 pb-2 md:pb-4 font-thinn ">
          <Link href={"/"}>หน้าแรก</Link>
          <IoIosArrowForward className="mt-1 lg:mt-1.5" />
          <Link href={"/"}>ผู้ใช้งาน</Link>
          <IoIosArrowForward className="mt-1 lg:mt-1.5" />
          <span className="font-bold">สถานะคำสั่งซื้อ</span>
        </ul>
      </div>
      <div className="mx-4 h-full md:mx-8 xl:mx-16">
        <Tab.Group>
          <Tab.List className="grid grid-cols-4 md:grid-cols-5 gap-2 bg-white p-1 ">
            <Tab
              className={({ selected }) =>
                classNames(
                  "w-full py-2.5 text-sm md:text-lg font-medium leading-5 col-span-2 sm:col-span-1 ",
                  "ring-white ring-offset-2 ring-offset-green-500 focus:outline-none focus:ring-2",
                  selected
                    ? "bg-green-500 text-white shadow"
                    : "text-green-500 hover:bg-green-500 hover:text-white"
                )
              }
            >
              ทั้งหมด
            </Tab>
            <Tab
              className={({ selected }) =>
                classNames(
                  "w-full py-2.5 text-sm md:text-lg font-medium leading-5 col-span-2 sm:col-span-1 ",
                  "ring-white ring-offset-2 ring-offset-green-500 focus:outline-none focus:ring-2",
                  selected
                    ? "bg-green-500 text-white shadow"
                    : "text-green-500 hover:bg-green-500 hover:text-white "
                )
              }
            >
              รอการรีวิว
            </Tab>
            <Tab
              className={({ selected }) =>
                classNames(
                  "w-full py-2.5 text-sm md:text-lg font-medium leading-5 col-span-2 sm:col-span-1 ",
                  "ring-white ring-offset-2 ring-offset-green-500 focus:outline-none focus:ring-2",
                  selected
                    ? "bg-green-500 text-white shadow"
                    : "text-green-500 hover:bg-green-500 hover:text-white"
                )
              }
            >
              ให้คะแนนแล้ว
            </Tab>
          </Tab.List>
          <Tab.Panels className=" ">
            <Tab.Panel className="my-4 ">
              <div className="pb-4">
                <div className="border p-2 lg:p-4">
                  <p className="font-bold lg:text-3xl">คำสั่งซื้อ OL00000001</p>
                  <p className="text-xs lg:text-lg text-gray-400">
                    วันที่สั่งซื้อ {formatedDate}
                  </p>
                  <div className="grid grid-cols-3 justify-around">
                    <div className="my-4">
                      <Image
                        src={Active}
                        alt="Picerror"
                        className="w-3/4 md:w-4/6"
                        loading="lazy"
                      />
                    </div>
                    <div>
                      <p className="text-sm md:text-xl lg:text-2xl pt-5 lg:pt-8">
                        Olylife Active+
                      </p>
                      <p className="text-xs md:text-base">x1</p>
                      <p className="text-sm md:text-base mt-4 md:mt-14 xl:mt-20 text-wrap">
                        ให้คะแนนสินค้า
                        <Stack>
                          <Rating defaultValue={3} readOnly />
                        </Stack>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="border p-2 lg:p-4">
                <p className="font-bold lg:text-3xl">คำสั่งซื้อ OL00000002</p>
                <p className="text-xs lg:text-lg text-gray-400">
                  วันที่สั่งซื้อ {formatedDate}
                </p>
                <div className="grid grid-cols-3 justify-around ">
                  <div className="my-4">
                    <Image
                      src={Active}
                      alt="Picerror"
                      className="w-3/4 md:w-4/6"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <p className="text-sm md:text-xl lg:text-2xl pt-5 lg:pt-8">
                      Olylife Active+
                    </p>
                    <p className="text-xs md:text-base">x1</p>
                    <p className="text-sm md:text-base mt-4 md:mt-14 xl:mt-20 text-wrap">
                      ให้คะแนนสินค้า
                      <Stack>
                        <Rating />
                      </Stack>
                    </p>
                  </div>
                  <div className="grid place-content-end py-3 lg:p-12">
                    <button className="text-xs md:text-lg bg-green-300 px-2 py-1 md:px-4 md:py-3 place-content-end rounded-md ">
                      ยืนยัน
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-3 justify-around border-t mt-3">
                  <div className="my-4">
                    <Image
                      src={Active}
                      alt="Picerror"
                      className="w-3/4 md:w-4/6"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <p className="text-sm md:text-xl lg:text-2xl pt-5 lg:pt-8">
                      Olylife Active+
                    </p>
                    <p className="text-xs md:text-base">x1</p>
                    <p className="text-sm md:text-base mt-4 md:mt-14 xl:mt-20 text-wrap">
                      ให้คะแนนสินค้า
                      <Stack>
                        <Rating  />
                      </Stack>
                    </p>
                  </div>
                  <div className="grid place-content-end py-3 lg:p-12">
                    <button className="text-xs md:text-lg bg-green-300 px-2 py-1 md:px-4 md:py-3 place-content-end rounded-md ">
                      ยืนยัน
                    </button>
                  </div>
                </div>
              </div>
            </Tab.Panel>
            <Tab.Panel className="my-4 "></Tab.Panel>
            <Tab.Panel className="my-4 "></Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </>
  );
}
