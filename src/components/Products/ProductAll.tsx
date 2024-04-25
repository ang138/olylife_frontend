import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { MdOutlineShoppingCart, MdKeyboardArrowDown } from "react-icons/md";

interface ProductDetailProps {
  typeId: number;
}

const ProductAll: React.FC<ProductDetailProps> = ({ typeId }) => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [isOpenProductType, setIsOpenProductType] = useState(false); //ผลิตภัณฑ์ Olylife

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/product/producttype/${typeId}`
        );
        const data = await response.json();
        setProducts(data);
        console.log("Fetched Product:", data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [typeId]);

  const handleToggle = () => {
    setIsOpenProductType(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center flex-col text-center p-4">
        <h2 className="text-3xl font-bold mb-4">Hello Next.js</h2>
        <p>Loading...</p>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return <div>Product not found</div>;
  }

  return (
    <div className="p-2 lg:p-4 h-auto">
      <div className="text-sm lg:text-lg p-2 lg:p-4">
        <ul className="flex flex-row gap-2 text-gray-500 pb-8 font-thinn ">
          <Link href={"/"}>หน้าแรก</Link>
          <IoIosArrowForward className="mt-1 lg:mt-1.5" />
          <Link href={`/product/all/type/${products[0].typeId}`}>
            {products[0].product_types[0].name}
          </Link>
          <IoIosArrowForward className="mt-1 lg:mt-1.5" />
          <span>ทั้งหมด</span>
        </ul>
      </div>
      <div className="flex items-center justify-between">
        <span className="font-bold text-md lg:text-2xl m-2">
          {products[0].product_types[0].name}
        </span>
        <span
          className="text-white hover:text-gray-100 flex cursor-pointer"
          onClick={handleToggle}
        >
          ผลิตภัณฑ์ Olylife <MdKeyboardArrowDown className="mt-1 text-xl" />
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8 items-center justify-center mt-8">
        {products.map((product) => (
          <div key={product.id} className="bg-white shadow-lg rounded-xl p-4 duration-300">
            <Link href={`/product/${product.id}`}>
              <div className="flex flex-col items-center">
                <Image
                  className="w-[300px] md:w-full aspect-square"
                  src={product.product_images[0].path}
                  alt={product.name}
                  width={100}
                  height={100}
                />
                <p className="pt-2 text-lg font-semibold">
                  {product.name}
                </p>
                <p className="text-xs md:text-sm lg:text-xl">
                  {product.price} &#xE3F;
                </p>
              </div>
            </Link>
            <button className="text-white p-2 bg-green-500 rounded-md w-full">
                ซื้อสินค้า
              </button>

          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductAll;
