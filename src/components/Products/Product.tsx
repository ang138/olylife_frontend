import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FaCartPlus } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";
import { Tab } from "@headlessui/react";
import Active from "@/Images/Active1.webp"
import Ensure from "@/Images/Ensure.webp"

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Product() {

  const [ActiveImg, setActiveImg] = useState(Active);
  const [count, setCount] = useState<number>(1);
  const handleButtonclick = (Num: number) => {
    setCount(count + Num);
  };
  const handleButtonclick1 = (Num1: number) => {
    if (count > 1) {
      setCount(count - Num1);
    }
  };
  let [categories] = useState({
    รายละเอียดสินค้า: [
      {
        id: 1,
        title:
          " เปปไทด์เป็นสารประกอบของกรดอะมิโนตั้งแต่ 2 ตัวขึ้นไปที่เชื่อมโยงกันด้วยพันธะเปปไทด์ มันเป็นสารประกอบอินทรีย์และเป็นสารออกฤทธิ์ทางชีวภาพที่เกี่ยวข้องกับการทํางานของเซลล์ต่างๆพบเปปไทด์ที่ออกฤทธิ์ทางชีวภาพมากกว่า 100 ชนิดในร่างกายมนุษย์กิจกรรมทั้งหมดของร่างกายมนุษย์ เช่น การเจริญเติบโต เมแทบอลิซึมการไหลเวียน และการสืบพันธุ์ได้รับการถ่ายทอดและบํารุงรักษาโดยเปปไทด์ที่ออกฤทธิ์ทางชีวภาพการพัฒนาและการฟื้นตัวของโรคทั้งหมด เกี่ยวข้องกับ เปปไทด์ด้วย",
      },
    ],
    ส่วนประกอบ: [
      {
        id: 1,
        title:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. In veritatis aliquam, libero aspernatur quos obcaecati molestiae est reiciendis reprehenderit? Aut porro sint doloribus eaque ea accusantium placeat veniam, tempora totam.",
        
      },
      {
        id: 2,
        title:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. In veritatis aliquam, libero aspernatur quos obcaecati molestiae est reiciendis reprehenderit? Aut porro sint doloribus eaque ea accusantium placeat veniam, tempora totam.",
        
      },
    ],
    วิธีการใช้งาน: [
      {
        id: 1,
        title:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. In veritatis aliquam, libero aspernatur quos obcaecati molestiae est reiciendis reprehenderit? Aut porro sint doloribus eaque ea accusantium placeat veniam, tempora totam.",
        
      },
    ],
    รีวิว: [
      {
        id: 1,
        title:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. In veritatis aliquam, libero aspernatur quos obcaecati molestiae est reiciendis reprehenderit? Aut porro sint doloribus eaque ea accusantium placeat veniam, tempora totam.",
        
      },
      {
        id: 2,
        title:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. In veritatis aliquam, libero aspernatur quos obcaecati molestiae est reiciendis reprehenderit? Aut porro sint doloribus eaque ea accusantium placeat veniam, tempora totam.",
        
      },
    ],
    FAQs: [
      {
        id: 1,
        title:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. In veritatis aliquam, libero aspernatur quos obcaecati molestiae est reiciendis reprehenderit? Aut porro sint doloribus eaque ea accusantium placeat veniam, tempora totam.",
        
      },
    ],
  });

  return (
    <div className="max-w-7xl mx-auto p-8">
      <div className="text-sm lg:text-lg ">
        <ul className="flex flex-row gap-2 text-gray-500 pb-8 font-thinn ">
          <Link href={"/"}>หน้าแรก</Link>
          <IoIosArrowForward className="mt-1 lg:mt-1.5" />
          <Link href={"/"}>ผลิตภัณฑ์เสริมอาหาร</Link>
          <IoIosArrowForward className="mt-1 lg:mt-1.5" />
          <span className="font-bold">Olylife Active+</span>
        </ul>
      </div>
      <div className="grid md:grid-cols-2 justify-between lg:flex-row gap-14">
        <div className="flex flex-col gap-8">
          <Image
            src={ActiveImg}
            alt="error"
            width={400}
            height={400}
            className=" aspect-square object-cover rounded-xl"
            loading="eager"
          />
          <div className="flex flex-row justify-between h-24 ">
            <Image
              src={Ensure}
              alt=""
              width={100}
              height={200}
              className="rounded-md cursor-pointer"
              onClick={() => setActiveImg(Ensure)}
              loading="lazy"
            />
            <Image
              src={Active}
              alt=""
              width={100}
              height={200}
              className="rounded-md cursor-pointer"
              onClick={() => setActiveImg(Active)}
              loading="lazy"
            />
            <Image
              src={Ensure}
              alt=""
              width={100}
              height={200}
              className="rounded-md cursor-pointer"
              onClick={() => setActiveImg(Ensure)}
              loading="lazy"

            />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div>
            <h1 className="text-3xl font-bold">Olylife Active+</h1>
          </div>
          <p>
            ผลิตภัณฑ์เสริมอาหาร ซึ่งมีส่วนประกอบของสารสกัดจากโสม
            คอลลาเจนเปปไทด์จากปลาเง็กเต็กและพิวรีน เปปไทด์
          </p>
          <h6 className="text-green-500 text-2xl font-semibold">
            xx,xxx &#xE3F;{" "}
          </h6>
          <h6 className="text-md text-gray-600 -mt-4">
            xx,xxx &#xE3F; ราคาสมาชิก
          </h6>
          <div className="flex flex-row items-center">
            <button
              className="py-2 px-5 bg-gray-200 mr-4 hover:bg-gray-100 rounded-lg"
              onClick={() => handleButtonclick1(1)}
            >
              -
            </button>
            <h1>{count}</h1>
            <button
              className="py-2 px-5 bg-gray-200 ml-4 hover:bg-gray-100 rounded-lg"
              onClick={() => handleButtonclick(1)}
            >
              +
            </button>
          </div>
          <div className="flex flex-row items-center">
            <Link href={"products/carts/1"}>
              <button className="flex justify-center text-green-500 border-2 border-green-500 hover:border-green-200 hover:bg-green-200 py-3 px-12 ">
                <FaCartPlus className="mt-1.5 mr-0.5" />
                ใส่ตะกร้า
              </button>
            </Link>
            <Link href={"products/carts/1"}>
              <button className="text-white rounded-sm bg-green-500 hover:bg-green-600 ml-4 py-3 px-14 border-2 border-green-500 hover:border-green-600">
                ซื้อสินค้า
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-8  h-full lg:mx-4 py-2">
        <Tab.Group>
          <Tab.List className="grid grid-cols-4 md:grid-cols-5 gap-2 bg-white p-1">
            {Object.keys(categories).map((category) => (
              <Tab
                key={category}
                className={({ selected }) =>
                  classNames(
                    "w-full py-2.5 text-lg font-medium leading-5 col-span-2 sm:col-span-1",
                    "ring-white ring-offset-2 ring-offset-green-500 focus:outline-none focus:ring-2",
                    selected
                      ? "bg-green-500 text-white shadow"
                      : "text-green-500 hover:bg-green-500 hover:text-white"
                  )
                }
              >
                {category}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="mt-2 ">
            {Object.values(categories).map((posts, idx) => (
              <Tab.Panel
                key={idx}
                className={classNames(
                  " bg-white p-3 text-justify",
                  "ring-white/60 ring-offset-2 focus:outline-none focus:ring-2"
                )}
              >
                <ul>
                  {posts.map((post) => (
                    <li key={post.id} className="relative  p-3 hover:bg-white">
                      <h3 className="text-lg">{post.title}</h3>
                    </li>
                  ))}
                </ul>
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
}
