import Image from "next/image";
import React, { useState } from "react";
import Photos from "@/Images/Active.png";
import Photos1 from "@/Images/Ensure.webp";

import {
  Avatar,
  Rating,
  Stack,
} from "@mui/material";
import { deepOrange, deepPurple } from "@mui/material/colors";

export default function Review() {
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
      <div className="p-2 lg:p-4 h-auto bg-slate-200">
        <span className="font-bold text-md lg:text-xl m-2 p-2 ">
          รีวิวสินค้าจากผู้ใช้งานจริง
        </span>
        <div className="grid grid-col gap-8 md:grid-cols-3 px-4 lg:px-8 py-4 lg:py-6 justify-center items-center">
          <div className="bg-white shadow-lg rounded-xl p-8 duration-300">
            <div className="grid grid-cols-2">
              <div>
                <Image
                  src={Photos}
                  alt="Olylife"
                  className="w-[200px] md:w-[150px] aspect-square p-4"
                />
              </div>
              <div>
                <Image
                  src={Photos1}
                  alt="Olylife"
                  className="w-[200px] md:w-[150px] aspect-square p-4"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <Avatar sx={{ bgcolor: deepPurple[500] }}>L</Avatar>
              <div>
                Lorenso vasilive
                <Stack>
                  <Rating defaultValue={4} size="small" />
                </Stack>
                <span className="text-xs">{formatedDate}</span>
              </div>
            </div>
            <div className="pt-4 text-sm">
              <p>ประเภท: ผลิตภัณฑ์เสริมอาหาร</p>
              <p>ชื่อสินค้า: Olylife Active+</p>
              <p>รีวิว: กินทั้งสองตัวแล้วดีมาก so good ดีไปหมด</p>
            </div>
          </div>
          <div className="bg-white shadow-lg rounded-xl p-8 duration-300">
              <Image
                src={Photos}
                alt="Olylife"
                className="w-[200px] md:w-[150px] aspect-square p-4"
              />
              <div className="flex gap-4">
                <Avatar sx={{ bgcolor: deepOrange[500] }}>N</Avatar>
                <div>
                  Nicolus Moloch
                  <Stack>
                    <Rating defaultValue={3} size="small" />
                  </Stack>
                  <span className="text-xs">{formatedDate}</span>
                </div>
              </div>
              <div className="pt-4 text-sm">
                <p>ประเภท: ผลิตภัณฑ์เสริมอาหาร</p>
                <p>ชื่อสินค้า: Olylife Active+</p>
                <p>รีวิว: ดีมาก so good ดีไปหมดไม่มีอะไรแย่เลย</p>
              </div>
          </div>
          <div className="bg-white shadow-lg rounded-xl p-8 duration-300">
              <Image
                src={Photos}
                alt="Olylife"
                className="w-[200px] md:w-[150px] aspect-square p-4"
              />
              <div className="flex gap-4">
                <Avatar>E</Avatar>
                <div>
                  Elwin Lorrias
                  <Stack>
                    <Rating defaultValue={5} size="small" />
                  </Stack>
                  <span className="text-xs">{formatedDate}</span>
                </div>
              </div>
              <div className="pt-4 text-sm">
                <p>ประเภท: ผลิตภัณฑ์เสริมอาหาร</p>
                <p>ชื่อสินค้า: Olylife Active+</p>
                <p>รีวิว: ดีมาก so good ดีไปหมดไม่มีอะไรแย่เลย</p>
              </div>
          </div>
        </div>
      </div>
    </>
  );
}
