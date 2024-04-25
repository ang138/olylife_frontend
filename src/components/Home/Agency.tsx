import React from "react";
import hh1 from "@/Images/l5.png";
import iso from "@/Images/l4.png";
import fda from "@/Images/l2.png";
import m02 from "@/Images/l3.png";
import gmp from "@/Images/l1.png";
import Image from "next/image";

export default function Agency() {
  return (
    <div className=" bg-green-500 p-2">
      <span className="text-md md:text-lg lg:text-xl font-bold flex justify-center">
        ได้รับมาตรฐานจากหลายหน่วยงาน
      </span>
      <div className="flex justify-around relative pt-2 pb-1 items-center">
        <Image
          src={gmp}
          alt="Green"
          className="w-[70px] h-[35px] md:w-[140px] md:h-[70px] relative"
        />
        <Image
          src={hh1}
          alt="Green"
          className="w-[35px] h-[35px] md:w-[130px] md:h-[70px]  relative"
        />
        <Image
          src={iso}
          alt="Green"
          className="w-[40px] h-[40px] md:w-[110px] md:h-[60px]  relative"
        />
        <Image
          src={fda}
          alt="Green"
          className="w-[40px] h-[30px] md:w-[100px] md:h-[60px]  relative"
        />
        <Image
          src={m02}
          alt="Green"
          className="w-[40px] h-[20px] md:w-[120px] md:h-[60px] relative"
        />
      </div>
    </div>
  );
}
