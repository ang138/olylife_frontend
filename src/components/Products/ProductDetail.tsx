// components/Products/ProductDetail.tsx
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaCartPlus } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";
import { GrFormNext } from "react-icons/gr";
import { GrFormPrevious } from "react-icons/gr";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { checkUserLoggedIn } from "../auth/check_user";

interface ProductDetailProps {
  productId: number;
}

interface AddToCartButtonProps {
  userId: number; // Explicitly defining the type of userId
  productId: number;
  count: number;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ productId }) => {
  const router = useRouter();
  const [product, setProduct] = useState<any>();
  const [reviews, setReviews] = useState<any[]>([]);
  const [count, setCount] = useState<number>(1);
  const [openTab, setOpenTab] = React.useState(1);
  const [selectedImage, setSelectedImage] = useState(false);
  const [image, setImage] = useState<any>();
  const [loggedIn, setLoggedIn] = useState(false);
  const [userId, setUserId] = useState<any>();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [startIndex, setStartIndex] = useState(0);
  const maxVisibleImages = 4;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/product/product/${productId}`
        );
        const data = await response.json();
        setProduct(data);
        console.log("Fetched Product:", data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/reviews/${productId}`
        );
        const reviews = await response.json();
        setReviews(reviews);
        console.log("Fetched Reviews:", reviews);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  useEffect(() => {
    const { loggedIn: isLoggedIn, userId, token } = checkUserLoggedIn();
    setLoggedIn(isLoggedIn);
    if (!isLoggedIn) {
      router.push("/login");
    } else if (userId !== null) {
      console.log("User is logged in with ID:", userId);
      setUserId(userId);
    }
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center flex-col text-center p-4">
        <h2 className="text-3xl font-bold mb-4">Hello Next.js</h2>
        <p>Loading...</p>
      </div>
    );
  }

  if (!product || product.length === 0) {
    return <div>Product not found</div>;
  }

  const data = product[0];

  const handleButtonclick = (Num: number) => {
    setCount(count + Num);
  };
  const handleButtonclick1 = (Num1: number) => {
    if (count > 1) {
      setCount(count - Num1);
    }
  };

  const handleImageClick = async (image: any) => {
    setSelectedImage(true);
    setImage(image);
    // console.log(`สินค้าไอดี ${image.id}`);
  };

  const handleNext = () => {
    if (data.product_images.length > startIndex + maxVisibleImages) {
      setStartIndex(startIndex + maxVisibleImages);
    }
  };

  const handlePrevious = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - maxVisibleImages);
    }
  };

  const addToCart = async (
    userId: number,
    productId: number,
    quantity: number
  ) => {
    try {
      const response = await fetch(
        `http://localhost:8000/cart/add-to-cart/${userId}/${productId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ quantity: count }),
        }
      );

      if (response.ok) {
        return true; // สำเร็จ
      } else {
        throw new Error("Failed to add product to cart");
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
      throw error;
    }
  };
  const handleAddToCart = async () => {
    try {
      setLoading(true);
      await addToCart(userId, productId, count);
      Swal.fire({
        title: "เพิ่มสินค้าลงในตะกร้าเรียบร้อยแล้ว",
        icon: "success",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          // router.reload();
        }
      });
    } catch (error) {
      Swal.fire({
        title: "เกิดข้อผิดพลาด",
        text: "มีข้อผิดพลาดในการเพิ่มสินค้าลงในตะกร้า",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setLoading(false);
    }
  };

  function formatDate(dateTimeString: string) {
    const formattedDateTime = new Date(dateTimeString).toLocaleString("th-TH", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
    return formattedDateTime;
}

  const tabs = [
    { label: "รายละเอียดสินค้า" },
    { label: "ส่วนประกอบ" },
    { label: "วิธีการใช้งาน" },
    { label: "รีวิว" },
    { label: "FAQs" },
  ];

  return (
    <div className="max-w-7xl mx-auto p-8">
      <div className="text-sm lg:text-lg ">
        <ul className="flex flex-row gap-2 text-gray-500 pb-8 font-thinn ">
          <Link href={"/"}>หน้าแรก</Link>
          <IoIosArrowForward className="mt-1 lg:mt-1.5" />
          <Link href={`/product/all/type/${product[0].typeId}`}>
            {product[0].product_types[0].name}
          </Link>
          <IoIosArrowForward className="mt-1 lg:mt-1.5" />
          <span className="font-bold">{data.name}</span>
        </ul>
      </div>
      <div className="grid md:grid-cols-2 justify-between lg:flex-row gap-14">
        <div className="flex flex-col gap-8">
          {selectedImage ? (
            <div className="flex justify-center">
              <Image
                src={image.path}
                alt="error"
                width={400}
                height={400}
                className="aspect-square rounded-sm"
                loading="eager"
              />
            </div>
          ) : (
            <div className="flex justify-center">
              <Image
                src={data.product_images[0].path}
                alt="placeholder"
                width={400}
                height={400}
                className="aspect-square rounded-sm"
                loading="eager"
              />
            </div>
          )}

          <div className="flex flex-row justify-center h-24 xl:h-28">
            <div className="flex flex-row justify-center">
              <button className="border" onClick={handlePrevious}>
                <GrFormPrevious size={30} />
              </button>
            </div>
            <div className="flex flex-row justify-center w-full">
              {data.product_images
                .slice(startIndex, startIndex + maxVisibleImages)
                .map((image: any, index: number) => (
                  <div key={index} onClick={() => handleImageClick(image)}>
                    <Image
                      src={image.path}
                      alt={`Product Image ${index + 1}`}
                      width={200}
                      height={150}
                      className="w-24 h-24 xl:w-28 xl:h-28 mx-2 rounded-sm cursor-pointer hover:shadow-lg"
                      loading="lazy"
                    />
                  </div>
                ))}
            </div>
            <div className="flex flex-row justify-center">
              <button className="border" onClick={handleNext}>
                <GrFormNext size={30} />
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div>
            <h1 className="text-3xl font-bold">{data.name}</h1>
          </div>
          <h6 className="text-green-500 text-2xl font-semibold">
            {data.price} &#xE3F;{" "}
          </h6>
          <div className="flex flex-row items-center">
            <button
              className="py-2 px-5 bg-gray-200 mr-4 hover:bg-gray-100 rounded-lg"
              onClick={() => handleButtonclick1(1)}
              disabled={data.amount <= 0}
            >
              -
            </button>
            <h1>{count}</h1>
            <button
              className="py-2 px-5 bg-gray-200 ml-4 hover:bg-gray-100 rounded-lg"
              onClick={() => handleButtonclick(1)}
              disabled={data.amount <= 0}
            >
              +
            </button>
            <h1 className="pl-2 text-gray-500">
              มีสินค้าทั้งหมด {data.amount} ชิ้น
            </h1>
          </div>
          <div className="flex flex-row items-center">
            {/* <Link href={"/carts/1"}> */}
            <button
              className="flex justify-center text-green-500 border-2 border-green-500 hover:border-green-200 hover:bg-green-200 py-3 px-12 "
              onClick={handleAddToCart}
              disabled={data.amount <= 0 || loading}
            >
              <FaCartPlus className="mt-1.5 mr-0.5" />
              ใส่ตะกร้า
            </button>
            {/* </Link> */}
            <Link href={"/carts/1"}>
              <button 
              className="text-white rounded-sm bg-green-500 hover:bg-green-600 ml-4 py-3 px-14 border-2 border-green-500 hover:border-green-600"
              disabled={data.amount <= 0 || loading}
              >
                ซื้อสินค้า
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-8  h-full lg:mx-4 py-2">
        <ul
          className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
          role="tablist"
        >
          {tabs.map((tab, index) => (
            <li key={index} className="-mb-px last:mr-0 flex-auto text-center">
              <a
                className={
                  "text-xs font-bold uppercase px-5 py-3 shadow-lg block leading-normal " +
                  (openTab === index + 1
                    ? "bg-green-500 text-white shadow"
                    : "text-green-500 hover:bg-green-500 hover:text-white")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(index + 1);
                }}
                data-toggle="tab"
                href={`#link${index + 1}`}
                role="tablist"
              >
                <i className={" text-base mr-1"}></i> {tab.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
          <div className="px-4 py-5 flex-auto">
            <div className="tab-content tab-space">
              <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                <p>{data.detail}</p>
              </div>
              <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                <p>{data.ingredient}</p>
              </div>
              <div className={openTab === 3 ? "block" : "hidden"} id="link3">
                <p>{data.how_to_use}</p>
              </div>
              {/* รีวิว */}
              <div className={openTab === 4 ? "block" : "hidden"} id="link3">
                <h1 className="text-2xl font-bold px-4 py-2">
                  รีวิวจากผู้ใช้งาน{" "}
                </h1>
                <hr className="my-4 border-t border-gray-300" />
                {reviews.length > 0 ? (
                  reviews.map((review) => (
                    <div key={review.id} className="w-full p-4 lg:p-4">
                      <div className="flex flex-col items-start pl-10">
                        <div className="flex items-center">
                          <img
                            src="/images/profile.png"
                            className="w-12 h-12 bg-gray-300 rounded-full mb-2 shrink-0"
                            alt="Profile"
                          />
                          <div className="ml-4">
                            <p className="mt-0 text-xs md:text-sm lg:text-xl font-semibold">
                              {review.users[0].name}
                            </p>
                            <p className="text-xxs md:text-xxs lg:text-xxs mt-0">
                              {formatDate(review.review_at)}
                            </p>
                          </div>
                        </div>
                        <p className="text-xs md:text-sm lg:text-xl pl-16 mt-2">
                          {review.comment}
                        </p>
                      </div>
                      <hr className="my-4 border-t border-gray-300" />
                    </div>
                  ))
                ) : (
                  <p className="text-lg font-semibold text-center">
                    ยังไม่มีการรีวิวจากผู้ใช้งาน
                  </p>
                )}
              </div>
              <div className={openTab === 5 ? "block" : "hidden"} id="link3">
                {/* <p>{data.detail}</p> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
