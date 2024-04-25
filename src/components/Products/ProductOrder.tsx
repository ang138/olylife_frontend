import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { Tab } from "@headlessui/react";
import Active from "@/Images/Active.png";
import { checkUserLoggedIn } from "../auth/check_user";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import { IoIosCheckmark } from "react-icons/io";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const ProductOrder = () => {
  const router = useRouter();
  const [products, setProducts] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [orderDate, setOrderDate] = useState(new Date());
  const dateOptions = {
    day: "2-digit" as const,
    month: "2-digit" as const,
    year: "numeric" as const,
    hour: "numeric" as const,
    minute: "numeric" as const,
    second: "numeric" as const,
  };

  const [isOpenReviewForm, setIsOpenReviewForm] = useState(false);
  const [isOrder, setIsOrder] = useState<any>();
  const [userId, setUserId] = useState<any>();
  const [token, setToken] = useState<any>();
  const [productId, setProductId] = useState<any>();
  const [comment, setComment] = useState<any>();

  // const formatedDate = orderDate.toLocaleString("en-US", dateOptions);

  useEffect(() => {
    const { loggedIn, userId, token } = checkUserLoggedIn();
    if (!loggedIn) {
      router.push("/login");
    } else if (userId !== null) {
      // console.log("User is logged in with ID:", userId);
      fetchCart(userId, token);
      setUserId(userId);
      setToken(token);
      // handleSubmit(userId, token);
    }
  }, []);

  const fetchCart = async (userId: number, token: string) => {
    try {
      const response = await fetch(
        `http://localhost:8000/cart/my-order/${userId}`,
        {
          method: "GET",
          headers: {
            // Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
        console.log("Fetched Orders:", data);
      } else {
        console.error("Failed to fetch cart data:", response.status);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenReviewForm = async (order: any, orderProduct: any) => {
    setIsOpenReviewForm(true);
    setIsOrder(order.id);
    setProductId(orderProduct.products[0].id);
    console.log(orderProduct.products[0].id);
    console.log(order.id);
  };

  const handleCloseReviewForm = async () => {
    setIsOpenReviewForm(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // ป้องกันการรีเฟรชหน้าเว็บเมื่อกด submit

    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:8000/reviews/comment/${userId}/${productId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ orderId: isOrder, comment }),
        }
      );

      if (response.ok) {
        console.log(isOrder.id);

        console.log("Product edited successfully");

        Swal.fire({
          title: "รีวิวสำเร็จ",
          text: `รีวิวสินค้าเรียบร้อยแล้ว`,
          icon: "success",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            handleCloseReviewForm(); // ปิดป็อปอัพเมื่อแก้ไขเสร็จสมบูรณ์
            router.reload(); // รีเฟรชหน้าเว็บหลังจากปิดป็อปอัพ
          }
        });
      } else {
        console.error("Error editing product:", response.status);
        alert("Failed to edit product");
      }
    } catch (error) {
      setError("An error occurred during product editing.");
      console.error("Error during product editing:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlConfirmOrder = async (order: any) => {
    try {
      // setLoading(true);
      console.log(`ไอดีสินค้า ${order.id}`);

      const confirmed = await Swal.fire({
        title: "ยืนยันรับสินค้า",
        text: "ยืนยันรับสินค้านี้หรือไม่?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "ใช่",
        cancelButtonText: "ยกเลิก",
      });

      if (confirmed.isConfirmed) {
        const response = await fetch(
          `http://localhost:8000/cart/confirmOrders/${order.id}`,
          {
            method: "PATCH",
          }
        );

        if (response.ok) {
          Swal.fire({
            title: "รับสินค้าเรียบร้อยแล้ว",
            icon: "success",
            confirmButtonText: "ตกลง",
          }).then(() => {
            router.reload();
          });
        } else {
          Swal.fire({
            title: "เกิดข้อผิดพลาด",
            text: "ไม่สามารถลบรูปภาพได้",
            icon: "error",
            confirmButtonText: "ตกลง",
          });
        }
      }
    } catch (error) {
      setError("เกิดข้อผิดพลาดในระหว่างการลบรูปภาพ");
      console.error("เกิดข้อผิดพลาดในระหว่างการลบรูปภาพ:", error);
    } finally {
      setLoading(false);
    }
  };

  const data = products[0];

  return (
    <div>
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
                  "w-full py-2.5 text-sm md:text-lg font-medium leading-5  col-span-2 sm:col-span-1 ",
                  "ring-white ring-offset-2 ring-offset-green-500 focus:outline-none focus:ring-2",
                  selected
                    ? "bg-green-500 text-white shadow"
                    : "text-green-500 hover:bg-green-500 hover:text-white text-nowrap"
                )
              }
            >
              ทั้งหมด
            </Tab>
            <Tab
              className={({ selected }) =>
                classNames(
                  "w-full py-2.5 text-sm md:text-lg font-medium leading-5  col-span-2 sm:col-span-1",
                  "ring-white ring-offset-2 ring-offset-green-500 focus:outline-none focus:ring-2",
                  selected
                    ? "bg-green-500 text-white shadow"
                    : "text-green-500 hover:bg-green-500 hover:text-white text-nowrap"
                )
              }
            >
              อยู่ระหว่างการจัดส่ง
            </Tab>
            <Tab
              className={({ selected }) =>
                classNames(
                  "w-full py-2.5 text-sm md:text-lg font-medium leading-5 col-span-2 sm:col-span-1",
                  "ring-white ring-offset-2 ring-offset-green-500 focus:outline-none focus:ring-2",
                  selected
                    ? "bg-green-500 text-white shadow"
                    : "text-green-500 hover:bg-green-500 hover:text-white text-nowrap"
                )
              }
            >
              จัดส่งสำเร็จ
            </Tab>
            <Tab
              className={({ selected }) =>
                classNames(
                  "w-full py-2.5 text-sm md:text-lg font-medium leading-5  col-span-2 sm:col-span-1",
                  "ring-white ring-offset-2 ring-offset-green-500 focus:outline-none focus:ring-2",
                  selected
                    ? "bg-green-500 text-white shadow"
                    : "text-green-500 hover:bg-green-500 hover:text-white"
                )
              }
            >
              รีวิวสินค้า
            </Tab>
          </Tab.List>
          <Tab.Panels className=" ">
            <Tab.Panel className="my-4 bg-gray-100">
              <div className="border-solid border my-4 lg:my-8">
                {loading ? (
                  <div>Loading...</div>
                ) : (
                  <>
                    {products.length > 0 ? (
                      products.map(
                        (order) =>
                          order.status === 1 && (
                            <div key={order.id}>
                              <div className="flex justify-between p-4 lg:p-8">
                                <span className="font-bold text-sm lg:text-2xl">
                                  คำสั่งซื้อ OL
                                  {("00000000" + order.id).slice(-8)}
                                  <p className="text-xs lg:text-lg text-slate-400"></p>
                                </span>
                                <div className="flex mb-2">
                                  <button className="text-xs lg:text-lg mx-3 bg-sky-200 p-1 lg:p-3 rounded-md">
                                    รอจัดส่ง
                                  </button>
                                </div>
                              </div>
                              <div className="flex px-28">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                  <tbody>
                                    {order.order_products.map(
                                      (orderProduct: any, index: number) => (
                                        <tr
                                          key={index}
                                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                        >
                                          <td className="px-6 py-4 pl-20 w-60">
                                            <div className="flex justify-center items-right-2">
                                              {orderProduct.products[0].product_images.map(
                                                (
                                                  image: any,
                                                  imageIndex: number
                                                ) => (
                                                  <img
                                                    key={imageIndex}
                                                    src={`data:image/jpeg;base64,${image.path}`}
                                                    alt={`Product Image ${imageIndex}`}
                                                    className="w-24 h-24 rounded-sm"
                                                  />
                                                )
                                              )}
                                            </div>
                                          </td>
                                          <td className="px-6 py-4 text-base text-black pb-16">
                                            {orderProduct.products[0].name}{" "}
                                            <br />
                                            <span className="text-sm text-gray-500">
                                              X {orderProduct.totalAmount}
                                            </span>
                                          </td>
                                          <td className="px-6 py-4 text-sm text-right pr-16">
                                            {orderProduct.totalPrice} บาท
                                          </td>
                                        </tr>
                                      )
                                    )}
                                  </tbody>
                                </table>
                              </div>
                              <div className="flex justify-between p-4 lg:p-4">
                                <span className="font-bold text-sm lg:text-2xl"></span>
                                <div className="flex mb-2 pr-10 pt-4 text-base font-medium">
                                  ราคารวม :&nbsp;
                                  <h1 className="text-xl">
                                    {order.totalPrice} บาท
                                  </h1>
                                </div>
                              </div>
                              <hr className="w-full h-4 mx-auto my-8 bg-white border-0 md:my-4 dark:bg-gray-700" />
                            </div>
                          )
                      )
                    ) : (
                      <div>ไม่มีข้อมูลสินค้า</div>
                    )}
                  </>
                )}
              </div>
              <div className="border-solid border">
                {loading ? (
                  <div>Loading...</div>
                ) : (
                  <>
                    {products.length > 0 ? (
                      products.map(
                        (order) =>
                          order.status === 5 && (
                            <div key={order.id}>
                              <div className="flex justify-between p-4 lg:p-8">
                                <span className="font-bold text-sm lg:text-2xl">
                                  คำสั่งซื้อ OL
                                  {("00000000" + order.id).slice(-8)}
                                  <p className="text-xs lg:text-lg text-slate-400">
                                    {/* วันที่สั่งซื้อ {formatedDate} */}
                                  </p>
                                </span>
                                <div className="flex mb-2">
                                  {/* <Link href="/productStar/1"> */}
                                  <button className="text-xs lg:text-lg mx-3 bg-green-300 p-1 lg:p-3 rounded-md">
                                    สำเร็จแล้ว
                                  </button>
                                </div>
                              </div>
                              <div className="flex px-28">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                  <tbody>
                                    {order.order_products.map(
                                      (orderProduct: any, index: number) => (
                                        <tr
                                          key={index}
                                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                        >
                                          <td className="px-6 py-4 pl-20 w-60">
                                            <div className="flex justify-center items-right-2">
                                              {orderProduct.products[0].product_images.map(
                                                (
                                                  image: any,
                                                  imageIndex: number
                                                ) => (
                                                  <img
                                                    key={imageIndex}
                                                    src={`data:image/jpeg;base64,${image.path}`}
                                                    alt={`Product Image ${imageIndex}`}
                                                    className="w-24 h-24 rounded-sm"
                                                  />
                                                )
                                              )}
                                            </div>
                                          </td>
                                          <td className="px-6 py-4 text-base text-black pb-16">
                                            {orderProduct.products[0].name}{" "}
                                            <br />
                                            <span className="text-sm text-gray-500">
                                              X {orderProduct.totalAmount}
                                            </span>
                                          </td>
                                          <td className="px-6 py-4 text-sm text-right pr-16">
                                            {orderProduct.totalPrice} บาท
                                          </td>
                                        </tr>
                                      )
                                    )}
                                  </tbody>
                                </table>
                              </div>
                              <div className="flex justify-between p-4 lg:p-4">
                                <span className="font-bold text-sm lg:text-2xl"></span>
                                <div className="flex mb-2 pr-10 text-base font-medium">
                                  ราคารวม :&nbsp;
                                  <h1 className="text-xl">
                                    {order.totalPrice} บาท
                                  </h1>
                                </div>
                              </div>
                              <hr className="w-full h-4 mx-auto my-8 bg-white border-0 md:my-4 dark:bg-gray-700" />
                            </div>
                          )
                      )
                    ) : (
                      <div>ไม่มีข้อมูลสินค้า</div>
                    )}
                  </>
                )}
              </div>
            </Tab.Panel>
            <Tab.Panel className="my-4 bg-gray-100">
              <div className="border-solid border my-4 lg:my-8">
                {loading ? (
                  <div>Loading...</div>
                ) : (
                  <>
                    {products.length > 0 ? (
                      products.map(
                        (order) =>
                          order.status === 2 && (
                            <div key={order.id}>
                              <div className="flex justify-between p-4 lg:p-8">
                                <span className="font-bold text-sm lg:text-2xl">
                                  คำสั่งซื้อ OL
                                  {("00000000" + order.id).slice(-8)}
                                  <p className="text-xs lg:text-lg text-slate-400"></p>
                                </span>
                              </div>
                              <div className="flex px-28">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                  <tbody>
                                    {order.order_products.map(
                                      (orderProduct: any, index: number) => (
                                        <tr
                                          key={index}
                                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                        >
                                          <td className="px-6 py-4 pl-20 w-60">
                                            <div className="flex justify-center items-right-2">
                                              {orderProduct.products[0].product_images.map(
                                                (
                                                  image: any,
                                                  imageIndex: number
                                                ) => (
                                                  <img
                                                    key={imageIndex}
                                                    src={`data:image/jpeg;base64,${image.path}`}
                                                    alt={`Product Image ${imageIndex}`}
                                                    className="w-24 h-24 rounded-sm"
                                                  />
                                                )
                                              )}
                                            </div>
                                          </td>
                                          <td className="px-6 py-4 text-base text-black pb-16">
                                            {orderProduct.products[0].name}{" "}
                                            <br />
                                            <span className="text-sm text-gray-500">
                                              X {orderProduct.totalAmount}
                                            </span>
                                          </td>
                                          <td className="px-6 py-4 text-sm text-right pr-16">
                                            {orderProduct.totalPrice} บาท
                                          </td>
                                        </tr>
                                      )
                                    )}
                                  </tbody>
                                </table>
                              </div>
                              <div className="flex justify-between p-4 lg:p-4">
                                <span className="font-bold text-sm lg:text-2xl"></span>
                                <div className="flex mb-2 pr-10 pt-4 text-base font-medium">
                                  ราคารวม :&nbsp;
                                  <h1 className="text-xl">
                                    {order.totalPrice} บาท
                                  </h1>
                                </div>
                              </div>
                              <hr className="w-full h-4 mx-auto my-8 bg-white border-0 md:my-4 dark:bg-gray-700" />
                            </div>
                          )
                      )
                    ) : (
                      <div>ไม่มีข้อมูลสินค้า</div>
                    )}
                  </>
                )}
              </div>
            </Tab.Panel>
            <Tab.Panel className="my-4 bg-gray-100">
              <div className="border-solid border my-4 lg:my-8">
                {loading ? (
                  <div>Loading...</div>
                ) : (
                  <>
                    {products.length > 0 ? (
                      products.map(
                        (order) =>
                          order.status === 3 && (
                            <div key={order.id}>
                              <div className="flex justify-between p-4 lg:p-8">
                                <span className="font-bold text-sm lg:text-2xl">
                                  คำสั่งซื้อ OL
                                  {("00000000" + order.id).slice(-8)}
                                  <p className="text-xs lg:text-lg text-slate-400"></p>
                                </span>
                                <div className="flex mb-2">
                                  <button
                                    className="text-xs lg:text-lg mx-3 bg-green-400 p-1 lg:p-3 rounded-md"
                                    type="button"
                                    onClick={() => handlConfirmOrder(order)}
                                  >
                                    ยืนยันรับสินค้า
                                  </button>
                                </div>
                              </div>
                              <div className="flex px-28">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                  <tbody>
                                    {order.order_products.map(
                                      (orderProduct: any, index: number) => (
                                        <tr
                                          key={index}
                                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                        >
                                          <td className="px-6 py-4 pl-20 w-60">
                                            <div className="flex justify-center items-right-2">
                                              {orderProduct.products[0].product_images.map(
                                                (
                                                  image: any,
                                                  imageIndex: number
                                                ) => (
                                                  <img
                                                    key={imageIndex}
                                                    src={`data:image/jpeg;base64,${image.path}`}
                                                    alt={`Product Image ${imageIndex}`}
                                                    className="w-24 h-24 rounded-sm"
                                                  />
                                                )
                                              )}
                                            </div>
                                          </td>
                                          <td className="px-6 py-4 text-base text-black pb-16">
                                            {orderProduct.products[0].name}{" "}
                                            <br />
                                            <span className="text-sm text-gray-500">
                                              X {orderProduct.totalAmount}
                                            </span>
                                          </td>
                                          <td className="px-6 py-4 text-sm text-right pr-16">
                                            {orderProduct.totalPrice} บาท
                                          </td>
                                        </tr>
                                      )
                                    )}
                                  </tbody>
                                </table>
                              </div>
                              <div className="flex justify-between p-4 lg:p-4">
                                <span className="font-bold text-sm lg:text-2xl"></span>
                                <div className="flex mb-2 pr-10 pt-4 text-base font-medium">
                                  ราคารวม :&nbsp;
                                  <h1 className="text-xl">
                                    {order.totalPrice} บาท
                                  </h1>
                                </div>
                              </div>
                              <hr className="w-full h-4 mx-auto my-8 bg-white border-0 md:my-4 dark:bg-gray-700" />
                            </div>
                          )
                      )
                    ) : (
                      <div>ไม่มีข้อมูลสินค้า</div>
                    )}
                  </>
                )}
              </div>
            </Tab.Panel>
            <Tab.Panel className="my-4 border-solid border-2">
              <div className="border-solid border my-4 lg:my-8">
                {loading ? (
                  <div>Loading...</div>
                ) : (
                  <>
                    {products.length > 0 ? (
                      products.map(
                        (order) =>
                          order.status === 4 && (
                            <div key={order.id}>
                              <div className="flex justify-between p-4 lg:p-8">
                                <span className="font-bold text-sm lg:text-2xl">
                                  คำสั่งซื้อ OL
                                  {("00000000" + order.id).slice(-8)}
                                  <p className="text-xs lg:text-lg text-slate-400">
                                    {/* วันที่สั่งซื้อ {formatedDate} */}
                                  </p>
                                </span>
                              </div>
                              <div className="flex px-28">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                  <tbody>
                                    {order.order_products.map(
                                      (orderProduct: any, index: number) => (
                                        <tr
                                          key={index}
                                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                        >
                                          <td className="px-6 py-4 pl-20 w-60">
                                            <div className="flex justify-center items-right-2">
                                              {orderProduct.products[0].product_images.map(
                                                (
                                                  image: any,
                                                  imageIndex: number
                                                ) => (
                                                  <img
                                                    key={imageIndex}
                                                    src={`data:image/jpeg;base64,${image.path}`}
                                                    alt={`Product Image ${imageIndex}`}
                                                    className="w-24 h-24 rounded-sm"
                                                  />
                                                )
                                              )}
                                            </div>
                                          </td>
                                          <td className="px-6 py-4 text-base text-black pb-16">
                                            {orderProduct.products[0].name}{" "}
                                            <br />
                                            <span className="text-sm text-gray-500">
                                              X {orderProduct.totalAmount}
                                            </span>
                                          </td>
                                          <td className="px-6 py-4 text-sm text-right">
                                            {orderProduct.totalPrice} บาท
                                          </td>
                                          <td className="px-6 py-4 text-sm text-right pr-14">
                                            {orderProduct.reviewStatus === 2 ? (
                                              <span className="text-gray-500 text-base px-4">
                                                รีวิวแล้ว
                                              </span>
                                            ) : (
                                              <button
                                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                                onClick={() =>
                                                  handleOpenReviewForm(
                                                    order,
                                                    orderProduct
                                                  )
                                                }
                                              >
                                                รีวิวสินค้า
                                              </button>
                                            )}
                                          </td>
                                        </tr>
                                      )
                                    )}
                                  </tbody>
                                </table>
                              </div>
                              <div className="flex justify-between p-4 lg:p-4">
                                <span className="font-bold text-sm lg:text-2xl"></span>
                                <div className="flex mb-2 pr-10 pt-4 text-base font-medium">
                                  ราคารวม :&nbsp;
                                  <h1 className="text-xl">
                                    {order.totalPrice} บาท
                                  </h1>
                                </div>
                              </div>
                              <hr />
                            </div>
                          )
                      )
                    ) : (
                      <div>ไม่มีข้อมูลสินค้า</div>
                    )}
                  </>
                )}
              </div>
              {/* <div className="border-solid border">
                {loading ? (
                  <div>Loading...</div>
                ) : (
                  <>
                    {products.length > 0 ? (
                      products.map(
                        (order) =>
                          order.status === 4 && (
                            <div key={order.id}>
                              <div className="flex justify-between p-4 lg:p-8">
                                <span className="font-bold text-sm lg:text-2xl">
                                  คำสั่งซื้อ OL
                                  {("00000000" + order.id).slice(-8)}
                                  <p className="text-xs lg:text-lg text-slate-400">
                                  </p>
                                </span>
                                <div className="flex ">
                                  <button className="text-xs lg:text-lg mx-3 bg-green-300 p-1 lg:p-3 rounded-md">
                                    สำเร็จแล้ว
                                  </button>
                                </div>
                              </div>
                              <div className="flex pl-10">
                                <img
                                  src={`data:image/jpeg;base64,${order.products[0].product_images[0].path}`}
                                  alt="error"
                                  className="w-1/3 lg:w-1/4 p-2 my-2 lg:my-4"
                                  loading="lazy"
                                />
                                <span className="py-8 px-2 lg:px-16 text-sm lg:text-xl w-full">
                                  {order.products[0].name}
                                  <p className="text-sm lg:text-base">
                                    x {order.totalAmount}
                                  </p>
                                </span>
                                <p className="text-lg flex justify-end place-items-end w-full md:text-3xl px-2 lg:px-8 py-4 lg:py-8">
                                  {" "}
                                  {order.totalPrice} &#xE3F;
                                </p>
                              </div>
                            </div>
                          )
                      )
                    ) : (
                      <div>ไม่มีข้อมูลสินค้า</div>
                    )}
                  </>
                )}
              </div> */}

              {isOpenReviewForm && (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex items-center justify-center">
                  <div className="bg-white rounded-md p-4 w-3/2">
                    <h2 className="text-lg font-semibold mb-4">รีวิวสินค้า</h2>
                    <form onSubmit={handleSubmit}>
                      <div className="mb-4">
                        {/* <label htmlFor="amount" className="block font-medium">
                        เพิ่มรีวิว :
                      </label>
                      <input type="text" /> */}
                        <div className="flex mb-4 items-center">
                          <label
                            htmlFor="comment"
                            className="block font-medium mr-2"
                          >
                            รีวิว :
                          </label>
                          <input
                            type="text"
                            id="comment"
                            name="comment"
                            className="mt-1 p-2 border rounded-md w-96"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="flex justify-center">
                        <button
                          type="submit"
                          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                        >
                          ยืนยัน
                        </button>
                        <button
                          type="button"
                          onClick={handleCloseReviewForm}
                          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-green-600 ml-2"
                        >
                          ยกเลิก
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};

export default ProductOrder;
