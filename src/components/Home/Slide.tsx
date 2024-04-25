"use client";
import React from "react";
import Slider from "react-slick";
import { PiCaretRightLight, PiCaretLeftLight } from "react-icons/pi";
import Image from "next/image";
import slider_02 from "@/Images/slider_02.webp";

export default function ProductCart() {
  const NextArrow = (props: any) => {
    const { onClick } = props;
    return (
      <div
        className="p-2 md:p-3 bg-slate-100 hover:text-green-500 hover:bg-white cursor-pointer duration-200 rounded-full text-xs md:text-2xl flex items-center justify-center z-20 absolute left-2 top-1/2 opacity-50"
        onClick={onClick}
      >
        <PiCaretLeftLight />
      </div>
    );
  };
  const PrevArrow = (props: any) => {
    const { onClick } = props;
    return (
      <div
        className="p-2 md:p-3 bg-slate-100 hover:text-green-500 hover:bg-white cursor-pointer duration-200 rounded-full text-xs md:text-2xl flex items-center justify-center z-20 absolute right-2 top-1/2 opacity-50"
        onClick={onClick}
      >
        <PiCaretRightLight />
      </div>
    );
  };

  var settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <NextArrow />,
    nextArrow: <PrevArrow />,
    priority: true,
    placeholder: "empty",
  };

  return (
    <>
      <div className="relative z-0  ">
        <Slider {...settings}>
          <div>
            <Image src={slider_02} alt="Green" loading="eager"  layout=  "responsive"/>
          </div>
          <div>
            <Image src={slider_02} alt="Green" loading="eager"  layout= "responsive"/>
          </div>
          <div>
            <Image src={slider_02} alt="Green" loading="eager"  layout= "responsive"/>
          </div>
        </Slider>
      </div>
    </>
  );
}
