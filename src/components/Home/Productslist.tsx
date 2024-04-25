"use client";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { PiCaretRightLight, PiCaretLeftLight } from "react-icons/pi";
import Active from "@/Images/AActive.svg";
import { FiChevronRight } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";

const Productslist = () => {
  const [loading, setLoading] = useState(true);
  const [healthCares, setHealthCare] = useState<any[]>([]);
  const [supplements, setSupplement] = useState<any[]>([]);
  const [isClient, setIsClient] = useState(false)
 
  useEffect(() => {
    setIsClient(true)
  }, [])
  // return <h1>{isClient ? 'This is never prerendered' : 'Prerendered'}</h1>

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/product/health-care"
        );
        if (response.ok) {
          const healthcare = await response.json();
          setHealthCare(healthcare);
          // console.log(healthCare);
        } else {
          console.error(
            "Error fetching data from API. Status:",
            response.status
          );
        }
      } catch (error) {
        console.error("Error fetching data from API", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/product/dietary-supplement"
        );
        if (response.ok) {
          const supplement = await response.json();
          setSupplement(supplement);
          // console.log(healthCare);
        } else {
          console.error(
            "Error fetching data from API. Status:",
            response.status
          );
        }
      } catch (error) {
        console.error("Error fetching data from API", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const displayedProductOne = healthCares.slice(0, 4);
  const displayedProductTwo = supplements.slice(0, 4);

  return (
    <>
      <div className="p-2 lg:p-4 h-auto">
        <span className="font-bold text-md lg:text-2xl m-2 p-2 ">
          ผลิตภัณฑ์ดูแลสุขภาพ
        </span>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="flex px-4 lg:px-8">
            {displayedProductOne.map((product) => (
              <div key={product.id} className="w-1/4 p-4 lg:p-8">
                <Link href={`/product/${product.id}`}>
                  <Image
                    className="w-14 h-12 sm:w-40 sm:h-28 md:w-52 md:h-52 xl:w-72  xl:h-72 rounded-md"
                    src={product.product_images[0].path}
                    alt={product.name}
                    width={100}
                    height={100}
                  />
                  <p className="mt-4 text-xs md:text-sm lg:text-xl ml-1 md:ml-6 lg:ml-10 font-semibold">
                    {product.name}
                  </p>
                  <p className="text-xs md:text-sm lg:text-xl ml-1 md:ml-6 lg:ml-10">
                    {product.price} &#xE3F;
                  </p>
                </Link>
              </div>
            ))}
          </div>
        )}
        {displayedProductOne.length > 0 && (
        <div>
          <Link href={`/product/all/type/${displayedProductOne[0].typeId}`}>
            <span className="flex justify-end p-1 text-xxs lg:text-xs text-slate-500">
              ดูทั้งหมด <FiChevronRight className="mt-0.5 text-sm" />
            </span>
          </Link>
        </div>
      )}
      </div>
      <div className="p-2 lg:p-4 h-auto">
        <span className="font-bold text-md lg:text-2xl m-2 p-2 ">
          ผลิตภัณฑ์เสริมอาหาร
        </span>
        <div className="flex px-4 lg:px-8">
          {displayedProductTwo.map((product) => (
            <div key={product.id} className="w-1/4 p-4 lg:p-8">
              <Link href={`/product/${product.id}`}>
                <Image
                  className="w-14 h-12 sm:w-40 sm:h-28 md:w-52 md:h-52 xl:w-72  xl:h-72 rounded-md"
                  src={product.product_images[0].path}
                  alt={product.name}
                  width={60}
                  height={60}
                />
                <p className="mt-4 text-xs md:text-sm lg:text-xl ml-1 md:ml-6 lg:ml-10 font-semibold">
                  {product.name}
                </p>
                <p className="text-xs md:text-sm lg:text-xl ml-1 md:ml-6 lg:ml-10">
                  {product.price} &#xE3F;
                </p>
              </Link>
            </div>
          ))}
        </div>
        {displayedProductTwo.length > 0 && (
        <div>
          <Link href={`/product/all/type/${displayedProductTwo[0].typeId}`}>
            <span className="flex justify-end p-1 text-xxs lg:text-xs text-slate-500">
              ดูทั้งหมด <FiChevronRight className="mt-0.5 text-sm" />
            </span>
          </Link>
        </div>
      )}
      </div>
    </>
  );
};
export default Productslist;
