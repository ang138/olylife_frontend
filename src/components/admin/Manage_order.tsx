import Sidebar from "@/components/admin/Sidebar";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import { Tab } from "@headlessui/react";
import { checkAdminLoggedIn } from "@/components/auth/check_admin";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const ManageOrder = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<any[]>([]);
  const [isOrder, setIsOrder] = useState<any[]>([]);
  const [pageNum, setPageNum] = useState(1);
  const [totalPages, setTotalPages] = useState();

  const [isOpenAddress, setIsOpenAddress] = useState(false);
  const [isAddress, setIsAddress] = useState<any>(null);
  const [buyType, setBuyType] = useState<any>(null);
  const [isTotalPrice, setIsTotalPrice] = useState<any>(null);
  const [isPrice, setIsPrice] = useState<any>(null);

  const [isOpenReview, setIsOpenReview] = useState(false);
  // const [review, setReview] = useState<any[]>([]);
  const [review, setReview] = useState<any>();
  const [orderId, setOrderId] = useState<any>();

  const [error, setError] = useState("");

  const [isOpenOrder, setIsOpenOrder] = useState(false);

  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const shippingPrice = 50;

  useEffect(() => {
    const { loggedIn } = checkAdminLoggedIn();
    if (!loggedIn) {
      router.push("/login");
    }
  }, []);

  const handleOpenAddress = async (order: any) => {
    setIsOpenAddress(true);
    setIsAddress(order);
    console.log(order.address[0].id);
  };

  // ปิดป็อปอัพแก้ไข
  const handleCloseAddress = () => {
    setIsOpenAddress(false);
  };

  // const handleOpenReview = async (order: any) => {
  //   setIsOpenReview(true);
  //   setOrderId(order.id);
  //   console.log(order.id);
  // };

  const handleOpenReview = async (order: any) => {
    try {
      setIsOpenReview(true);
      console.log("เปิดรีวิวสำหรับ order.id:", order.id);

      const response = await fetch(
        `http://localhost:8000/cart/reviewOrder/${order.id}`
      );
      if (response.ok) {
        const data = await response.json();
        setReview(data);
        console.log("รีวิวสินค้า:", data);
        // ทำสิ่งที่คุณต้องการกับข้อมูลรีวิวที่ได้จาก API ตามที่คุณต้องการ
      } else {
        console.error("Error fetching data from API");
      }
    } catch (error) {
      console.error("Error fetching data from API", error);
    }
  };

  // ปิดป็อปอัพแก้ไข
  const handleCloseReview = () => {
    setIsOpenReview(false);
  };

  // useEffect(() => {
  //   if (isOpenReview) {
  //     const fetchData = async () => {
  //       try {
  //         const response = await fetch(
  //           `http://localhost:8000/cart/reviewOrder/${orderId}`
  //         );
  //         if (response.ok) {
  //           const data = await response.json();
  //           setReview(data);
  //           console.log("รีวิว", data);
  //         } else {
  //           console.error("Error fetching data from API");
  //         }
  //       } catch (error) {
  //         console.error("Error fetching data from API", error);
  //       }
  //     };

  //     fetchData();
  //   }
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/cart/orderall");
        if (response.ok) {
          const productsData = await response.json();
          setOrders(productsData);
          console.log(productsData);

          setTotalPages(productsData.totalPages);
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
  }, [pageNum]);

  const handleOpenOrder = async (order: any) => {
    setIsOpenOrder(true);
    setIsAddress(order);
    setBuyType(order);
    setIsPrice(order);
    setIsTotalPrice(order);
    setSelectedOrderId(order.id);
  };

  // ปิดป็อปอัพแก้ไข
  const handleCloseOrder = () => {
    setIsOpenOrder(false);
  };

  const handleTakingOrders = async (order: any) => {
    try {
      // setLoading(true);
      console.log(`ไอดีสินค้า ${order.id}`);

      const response = await fetch(
        `http://localhost:8000/cart/takingOrder/${order.id}`,
        {
          method: "PATCH",
        }
      );

      if (response.ok) {
        Swal.fire({
          title: "แจ้งจัดส่งสินค้าเรียบร้อยแล้ว",
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
    } catch (error) {
      setError("เกิดข้อผิดพลาดในระหว่างการลบรูปภาพ");
      console.error("เกิดข้อผิดพลาดในระหว่างการลบรูปภาพ:", error);
    } finally {
      setLoading(false);
    }
  };
  // const handleTakingOrders = async (order: any) => {
  //   try {
  //     // setLoading(true);
  //     console.log(`ไอดีสินค้า ${order.id}`);

  //     const confirmed = await Swal.fire({
  //       title: "คุณแน่ใจหรือไม่?",
  //       text: "คุณต้องการรับออเดอร์นี้หรือไม่?",
  //       icon: "warning",
  //       showCancelButton: true,
  //       confirmButtonColor: "#3085d6",
  //       cancelButtonColor: "#d33",
  //       confirmButtonText: "ใช่",
  //       cancelButtonText: "ยกเลิก",
  //     });

  //     if (confirmed.isConfirmed) {
  //       const response = await fetch(
  //         `http://localhost:8000/cart/takingOrder/${order.id}`,
  //         {
  //           method: "PATCH",
  //         }
  //       );

  //       if (response.ok) {
  //         Swal.fire({
  //           title: "แจ้งจัดส่งสินค้าเรียบร้อยแล้ว",
  //           icon: "success",
  //           confirmButtonText: "ตกลง",
  //         }).then(() => {
  //           router.reload();
  //         });
  //       } else {
  //         Swal.fire({
  //           title: "เกิดข้อผิดพลาด",
  //           text: "ไม่สามารถลบรูปภาพได้",
  //           icon: "error",
  //           confirmButtonText: "ตกลง",
  //         });
  //       }
  //     }
  //   } catch (error) {
  //     setError("เกิดข้อผิดพลาดในระหว่างการลบรูปภาพ");
  //     console.error("เกิดข้อผิดพลาดในระหว่างการลบรูปภาพ:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleOrdersSuccess = async (order: any) => {
    try {
      // setLoading(true);
      console.log(`ไอดีสินค้า ${order.id}`);

      const confirmed = await Swal.fire({
        title: "แจ้งจัดส่งสำเร็จ",
        text: "คุณต้องการแจ้งจัดส่งสำเร็จออเดอร์นี้หรือไม่?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "ใช่",
        cancelButtonText: "ยกเลิก",
      });

      if (confirmed.isConfirmed) {
        const response = await fetch(
          `http://localhost:8000/cart/ordersSuccess/${order.id}`,
          {
            method: "PATCH",
          }
        );

        if (response.ok) {
          Swal.fire({
            title: "แจ้งจัดส่งสำเร็จเรียบร้อยแล้ว",
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

  return (
    <Sidebar>
      <div className="w-3/4 mx-auto">
        <Tab.Group>
          <Tab.List className="grid grid-cols-2 md:grid-cols-4 gap-2 bg-white p-1 ">
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
              จัดส่งสินค้า
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
              จัดส่งสำเร็จ
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
              ประวัติการสั่งซื้อ
            </Tab>
            {/* <Tab
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
            ดูรีวิวสินค้า
          </Tab> */}
          </Tab.List>
          <Tab.Panels className=" ">
            <Tab.Panel className="my-4 ">
              <div className="relative overflow-x-auto shadow-md sm:rounded-sm">
                <table className="w-full mx-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-center">
                        รหัสสั่งซื้อ
                      </th>
                      <th scope="col" className="px-6 py-3 text-center">
                        รายละเอียดคำสั่งซื้อ
                      </th>
                      {/* <th scope="col" className="px-6 py-3 text-center">
                      ที่อยู่
                    </th> */}
                      <th scope="col" className="px-6 py-3 text-center">
                        แจ้งจัดส่งสินค้า
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan={7} className="text-center">
                          Loading...
                        </td>
                      </tr>
                    ) : (
                      <>
                        {orders.length > 0 ? (
                          orders.map(
                            (order) =>
                              order.status === 1 && (
                                <tr
                                  key={order.id}
                                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
                                >
                                  <td className="px-6 py-4 text-center">
                                    คำสั่งซื้อ OL
                                    {("00000000" + order.id).slice(-8)}
                                  </td>
                                  <td className="px-6 py-4 text-center">
                                    <button
                                      className="underline"
                                      onClick={() => handleOpenOrder(order)}
                                    >
                                      รายละเอียดคำสั่งซื้อ
                                    </button>
                                  </td>
                                  {/* <td className="px-6 py-4">
                                  <button
                                    className="underline"
                                    onClick={() => handleOpenAddress(order)}
                                  >
                                    ตรวจสอบที่อยู่
                                  </button>
                                </td> */}
                                  <td className="px-6 py-4 text-center">
                                    <div className="flex justify-center">
                                      <button
                                        type="button"
                                        onClick={() =>
                                          handleTakingOrders(order)
                                        }
                                        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:border-blue-300"
                                      >
                                        จัดส่งสินค้า
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              )
                          )
                        ) : (
                          <tr>
                            <td colSpan={7} className="text-center">
                              ไม่มีข้อมูลสินค้า
                            </td>
                          </tr>
                        )}
                      </>
                    )}
                  </tbody>
                </table>
              </div>

              {isOpenOrder && (
                <div className="fixed top-0 left-0 w-full h-dvh py-8 bg-gray-500 bg-opacity-50 flex items-center justify-center overflow-y-auto">
                  <div className="bg-white rounded-md p-4 w-4/6 max-h-full overflow-y-auto">
                    {/* รายละเอียดคำสั่งซื้อ */}
                    <h2 className="text-lg font-semibold mb-4 text-center">
                      รายละเอียดคำสั่งซื้อ
                    </h2>
                    <div className="w-full">
                      <div className="mb-4">
                        <label
                          htmlFor="amount"
                          className="block font-semibold mr-2 pt-3 pl-2"
                        >
                          ที่อยู่จัดส่ง
                        </label>
                        <hr />

                        <div className="mb-4">
                          <label
                            htmlFor="amount"
                            className="block font-medium pt-2 pl-6"
                          >
                            ชื่อ-สกุล ผู้รับ :
                            <h1 className="mt-1 inline-block pl-2">
                              {isAddress.address[0].firstname}{" "}
                              {isAddress.address[0].lastname}
                            </h1>
                          </label>

                          <label
                            htmlFor="amount"
                            className="block font-medium mt-4 pl-6"
                          >
                            เบอร์โทรศัพท์ : {isAddress.address[0].tel}
                          </label>
                          <label
                            htmlFor="amount"
                            className="block font-medium mt-4 pl-6"
                          >
                            ที่อยู่จัดส่ง : {isAddress.address[0].address}
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="amount"
                        className="block font-semibold pl-2 pt-2"
                      >
                        รายการสินค้า
                      </label>
                      <hr />
                      <div className="pt-5">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                          <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                              <th scope="col" className="px-6 py-3"></th>
                              <th scope="col" className="px-6 py-3 text-sm">
                                ชื่อสินค้า
                              </th>
                              <th scope="col" className="px-6 py-3 text-sm">
                                ราคา
                              </th>
                              <th scope="col" className="px-6 py-3 text-sm">
                                จำนวน
                              </th>
                              <th scope="col" className="px-6 py-3 text-sm">
                                ราคารวม
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {/* แสดงรายการสินค้าที่เกี่ยวข้องกับ order.id ที่คลิกเลือก */}
                            {orders.length > 0 &&
                              orders.map(
                                (order) =>
                                  order.id === selectedOrderId &&
                                  order.order_products.map(
                                    (orderProduct: any, index: number) => (
                                      <tr
                                        key={index}
                                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                      >
                                        <td className="px-6 py-4 pl-20 w-60">
                                          <div className="flex justify-center items-center">
                                            {orderProduct.product[0].product_images.map(
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
                                        <td className="px-6 py-4 text-base text-black">
                                          {orderProduct.product[0].name}
                                        </td>
                                        <td className="px-6 py-4 text-sm">
                                          {orderProduct.product[0].price} บาท
                                        </td>
                                        <td className="px-6 py-4 text-sm">
                                          {orderProduct.totalAmount}
                                        </td>
                                        <td className="px-6 py-4 text-sm">
                                          {orderProduct.totalPrice} บาท
                                        </td>
                                      </tr>
                                    )
                                  )
                              )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="pt-6 mb-4">
                      <label
                        htmlFor="amount"
                        className="block font-semibold pl-2 pt-2"
                      >
                        การจัดส่ง
                      </label>
                      <hr />
                      <div className="flex ml-4 mt-4 mb-2 items-center">
                        <label className="block font-medium mr-2">
                          Standard Delivery - ส่งธรรมดาในประเทศ :{" "}
                          {shippingPrice} บาท
                        </label>
                      </div>
                    </div>
                    <div className="pt-4 mb-4">
                      <label
                        htmlFor="amount"
                        className="block font-semibold pl-2"
                      >
                        การชำระเงิน
                      </label>
                      <hr />
                      <div className="flex ml-4 mt-4 mb-4 items-center">
                        <label
                          htmlFor="paymentMethodCash"
                          className="block font-medium mr-2"
                        >
                          {buyType.buyType}
                        </label>
                      </div>
                    </div>
                    <hr />
                    <div className="pt-4 mb-4">
                      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <tbody>
                          <tr>
                            <td className="px-6 py-3 text-right text-base">
                              ราคารวมการสั่งซื้อ :
                            </td>
                            <td className="px-6 py-3 w-40 text-left text-black text-base">
                              {isTotalPrice.totalPrice - shippingPrice} บาท
                            </td>
                          </tr>
                          <tr>
                            <td className="px-6 py-3 text-right text-base">
                              ราคาการจัดส่ง :
                            </td>
                            <td className="px-6 py-3 w-40 text-left text-black text-base">
                              {shippingPrice} บาท
                            </td>
                          </tr>
                          <tr>
                            <td className="px-6 py-3 text-right text-base">
                              ยอดชำระเงินทั้งหมด :
                            </td>
                            <td className="px-6 py-3 w-40 text-left text-black text-base">
                              {isTotalPrice.totalPrice} บาท
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <hr />

                    <div className="flex justify-center pt-4">
                      <button
                        type="button"
                        onClick={handleCloseOrder}
                        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 ml-2"
                      >
                        โอเค
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </Tab.Panel>
            <Tab.Panel className="my-4 ">
              <div className="relative overflow-x-auto shadow-md sm:rounded-sm">
                <table className="w-full mx-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-center">
                        รหัสสั่งซื้อ
                      </th>
                      <th scope="col" className="px-6 py-3 text-center">
                        รายละเอียดคำสั่งซื้อ
                      </th>
                      {/* <th scope="col" className="px-6 py-3 text-center">
                      ที่อยู่
                    </th> */}
                      <th scope="col" className="px-6 py-3 text-center">
                        แจ้งจัดส่งสินค้า
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan={7} className="text-center">
                          Loading...
                        </td>
                      </tr>
                    ) : (
                      <>
                        {orders.length > 0 ? (
                          orders.map(
                            (order) =>
                              order.status === 2 && (
                                <tr
                                  key={order.id}
                                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
                                >
                                  <td className="px-6 py-4 text-center">
                                    คำสั่งซื้อ OL
                                    {("00000000" + order.id).slice(-8)}
                                  </td>
                                  <td className="px-6 py-4 text-center">
                                    <button
                                      className="underline"
                                      onClick={() => handleOpenOrder(order)}
                                    >
                                      รายละเอียดคำสั่งซื้อ
                                    </button>
                                  </td>
                                  {/* <td className="px-6 py-4">
                                  <button
                                    className="underline"
                                    onClick={() => handleOpenAddress(order)}
                                  >
                                    ตรวจสอบที่อยู่
                                  </button>
                                </td> */}
                                  <td className="px-6 py-4 text-center">
                                    <div className="flex justify-center">
                                      <button
                                        type="button"
                                        onClick={() =>
                                          handleOrdersSuccess(order)
                                        }
                                        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:border-blue-300"
                                      >
                                        แจ้งจัดส่งสำเร็จ
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              )
                          )
                        ) : (
                          <tr>
                            <td colSpan={7} className="text-center text-black">
                              ไม่มีข้อมูลสินค้า
                            </td>
                          </tr>
                        )}
                      </>
                    )}
                  </tbody>
                </table>
              </div>

              {isOpenOrder && (
                <div className="fixed top-0 left-0 w-full h-dvh py-8 bg-gray-500 bg-opacity-50 flex items-center justify-center overflow-y-auto">
                  <div className="bg-white rounded-md p-4 w-4/6 max-h-full overflow-y-auto">
                    {/* รายละเอียดคำสั่งซื้อ */}
                    <h2 className="text-lg font-semibold mb-4 text-center">
                      รายละเอียดคำสั่งซื้อ
                    </h2>
                    <div className="w-full">
                      <div className="mb-4">
                        <label
                          htmlFor="amount"
                          className="block font-semibold mr-2 pt-3 pl-2"
                        >
                          ที่อยู่จัดส่ง
                        </label>
                        <hr />

                        <div className="mb-4">
                          <label
                            htmlFor="amount"
                            className="block font-medium pt-2 pl-6"
                          >
                            ชื่อ-สกุล ผู้รับ :
                            <h1 className="mt-1 inline-block pl-2">
                              {isAddress.address[0].firstname}{" "}
                              {isAddress.address[0].lastname}
                            </h1>
                          </label>

                          <label
                            htmlFor="amount"
                            className="block font-medium mt-4 pl-6"
                          >
                            เบอร์โทรศัพท์ : {isAddress.address[0].tel}
                          </label>
                          <label
                            htmlFor="amount"
                            className="block font-medium mt-4 pl-6"
                          >
                            ที่อยู่จัดส่ง : {isAddress.address[0].address}
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="amount"
                        className="block font-semibold pl-2 pt-2"
                      >
                        รายการสินค้า
                      </label>
                      <hr />
                      <div className="pt-5">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                          <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                              <th scope="col" className="px-6 py-3"></th>
                              <th scope="col" className="px-6 py-3 text-sm">
                                ชื่อสินค้า
                              </th>
                              <th scope="col" className="px-6 py-3 text-sm">
                                ราคา
                              </th>
                              <th scope="col" className="px-6 py-3 text-sm">
                                จำนวน
                              </th>
                              <th scope="col" className="px-6 py-3 text-sm">
                                ราคารวม
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {/* แสดงรายการสินค้าที่เกี่ยวข้องกับ order.id ที่คลิกเลือก */}
                            {orders.length > 0 &&
                              orders.map(
                                (order) =>
                                  order.id === selectedOrderId &&
                                  order.order_products.map(
                                    (orderProduct: any, index: number) => (
                                      <tr
                                        key={index}
                                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                      >
                                        <td className="px-6 py-4 pl-20 w-60">
                                          <div className="flex justify-center items-center">
                                            {orderProduct.product[0].product_images.map(
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
                                        <td className="px-6 py-4 text-base text-black">
                                          {orderProduct.product[0].name}
                                        </td>
                                        <td className="px-6 py-4 text-sm">
                                          {orderProduct.product[0].price} บาท
                                        </td>
                                        <td className="px-6 py-4 text-sm">
                                          {orderProduct.totalAmount}
                                        </td>
                                        <td className="px-6 py-4 text-sm">
                                          {orderProduct.totalPrice} บาท
                                        </td>
                                      </tr>
                                    )
                                  )
                              )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="pt-6 mb-4">
                      <label
                        htmlFor="amount"
                        className="block font-semibold pl-2 pt-2"
                      >
                        การจัดส่ง
                      </label>
                      <hr />
                      <div className="flex ml-4 mt-4 mb-2 items-center">
                        <label className="block font-medium mr-2">
                          Standard Delivery - ส่งธรรมดาในประเทศ :{" "}
                          {shippingPrice} บาท
                        </label>
                      </div>
                    </div>
                    <div className="pt-4 mb-4">
                      <label
                        htmlFor="amount"
                        className="block font-semibold pl-2"
                      >
                        การชำระเงิน
                      </label>
                      <hr />
                      <div className="flex ml-4 mt-4 mb-4 items-center">
                        <label
                          htmlFor="paymentMethodCash"
                          className="block font-medium mr-2"
                        >
                          {buyType.buyType}
                        </label>
                      </div>
                    </div>
                    <hr />
                    <div className="pt-4 mb-4">
                      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <tbody>
                          <tr>
                            <td className="px-6 py-3 text-right text-base">
                              ราคารวมการสั่งซื้อ :
                            </td>
                            <td className="px-6 py-3 w-40 text-left text-black text-base">
                              {isTotalPrice.totalPrice - shippingPrice} บาท
                            </td>
                          </tr>
                          <tr>
                            <td className="px-6 py-3 text-right text-base">
                              ราคาการจัดส่ง :
                            </td>
                            <td className="px-6 py-3 w-40 text-left text-black text-base">
                              {shippingPrice} บาท
                            </td>
                          </tr>
                          <tr>
                            <td className="px-6 py-3 text-right text-base">
                              ยอดชำระเงินทั้งหมด :
                            </td>
                            <td className="px-6 py-3 w-40 text-left text-black text-base">
                              {isTotalPrice.totalPrice} บาท
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <hr />

                    <div className="flex justify-center pt-4">
                      <button
                        type="button"
                        onClick={handleCloseOrder}
                        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 ml-2"
                      >
                        โอเค
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </Tab.Panel>
            <Tab.Panel className="my-4 ">
              <div className="relative overflow-x-auto shadow-md sm:rounded-sm">
                <table className="w-full mx-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-center">
                        รหัสสั่งซื้อ
                      </th>
                      <th scope="col" className="px-6 py-3 text-center">
                        รายละเอียดคำสั่งซื้อ
                      </th>
                      {/* <th scope="col" className="px-6 py-3 text-center">
                      ที่อยู่
                    </th> */}
                      <th scope="col" className="px-6 py-3 text-center">
                        แจ้งจัดส่งสินค้า
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan={7} className="text-center">
                          Loading...
                        </td>
                      </tr>
                    ) : (
                      <>
                        {orders.length > 0 ? (
                          orders.map(
                            (order) =>
                              order.status === 4 && (
                                <tr
                                  key={order.id}
                                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
                                >
                                  <td className="px-6 py-4 text-center">
                                    คำสั่งซื้อ OL
                                    {("00000000" + order.id).slice(-8)}
                                  </td>
                                  <td className="px-6 py-4 text-center">
                                    <button
                                      className="underline"
                                      onClick={() => handleOpenOrder(order)}
                                    >
                                      รายละเอียดคำสั่งซื้อ
                                    </button>
                                  </td>
                                  {/* <td className="px-6 py-4">
                                  <button
                                    className="underline"
                                    onClick={() => handleOpenAddress(order)}
                                  >
                                    ตรวจสอบที่อยู่
                                  </button>
                                </td> */}
                                  <td className="px-6 py-4 text-center">
                                    <div className="flex justify-center text-green-500">
                                      จัดส่งสำเร็จ
                                      
                                    </div>
                                  </td>
                                </tr>
                              )
                          )
                        ) : (
                          <tr>
                            <td colSpan={7} className="text-center text-black">
                              ไม่มีข้อมูลสินค้า
                            </td>
                          </tr>
                        )}
                      </>
                    )}
                  </tbody>
                </table>
              </div>

              {isOpenOrder && (
                <div className="fixed top-0 left-0 w-full h-dvh py-8 bg-gray-500 bg-opacity-50 flex items-center justify-center overflow-y-auto">
                  <div className="bg-white rounded-md p-4 w-4/6 max-h-full overflow-y-auto">
                    {/* รายละเอียดคำสั่งซื้อ */}
                    <h2 className="text-lg font-semibold mb-4 text-center">
                      รายละเอียดคำสั่งซื้อ
                    </h2>
                    <div className="w-full">
                      <div className="mb-4">
                        <label
                          htmlFor="amount"
                          className="block font-semibold mr-2 pt-3 pl-2"
                        >
                          ที่อยู่จัดส่ง
                        </label>
                        <hr />

                        <div className="mb-4">
                          <label
                            htmlFor="amount"
                            className="block font-medium pt-2 pl-6"
                          >
                            ชื่อ-สกุล ผู้รับ :
                            <h1 className="mt-1 inline-block pl-2">
                              {isAddress.address[0].firstname}{" "}
                              {isAddress.address[0].lastname}
                            </h1>
                          </label>

                          <label
                            htmlFor="amount"
                            className="block font-medium mt-4 pl-6"
                          >
                            เบอร์โทรศัพท์ : {isAddress.address[0].tel}
                          </label>
                          <label
                            htmlFor="amount"
                            className="block font-medium mt-4 pl-6"
                          >
                            ที่อยู่จัดส่ง : {isAddress.address[0].address}
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="amount"
                        className="block font-semibold pl-2 pt-2"
                      >
                        รายการสินค้า
                      </label>
                      <hr />
                      <div className="pt-5">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                          <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                              <th scope="col" className="px-6 py-3"></th>
                              <th scope="col" className="px-6 py-3 text-sm">
                                ชื่อสินค้า
                              </th>
                              <th scope="col" className="px-6 py-3 text-sm">
                                ราคา
                              </th>
                              <th scope="col" className="px-6 py-3 text-sm">
                                จำนวน
                              </th>
                              <th scope="col" className="px-6 py-3 text-sm">
                                ราคารวม
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {/* แสดงรายการสินค้าที่เกี่ยวข้องกับ order.id ที่คลิกเลือก */}
                            {orders.length > 0 &&
                              orders.map(
                                (order) =>
                                  order.id === selectedOrderId &&
                                  order.order_products.map(
                                    (orderProduct: any, index: number) => (
                                      <tr
                                        key={index}
                                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                      >
                                        <td className="px-6 py-4 pl-20 w-60">
                                          <div className="flex justify-center items-center">
                                            {orderProduct.product[0].product_images.map(
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
                                        <td className="px-6 py-4 text-base text-black">
                                          {orderProduct.product[0].name}
                                        </td>
                                        <td className="px-6 py-4 text-sm">
                                          {orderProduct.product[0].price} บาท
                                        </td>
                                        <td className="px-6 py-4 text-sm">
                                          {orderProduct.totalAmount}
                                        </td>
                                        <td className="px-6 py-4 text-sm">
                                          {orderProduct.totalPrice} บาท
                                        </td>
                                      </tr>
                                    )
                                  )
                              )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="pt-6 mb-4">
                      <label
                        htmlFor="amount"
                        className="block font-semibold pl-2 pt-2"
                      >
                        การจัดส่ง
                      </label>
                      <hr />
                      <div className="flex ml-4 mt-4 mb-2 items-center">
                        <label className="block font-medium mr-2">
                          Standard Delivery - ส่งธรรมดาในประเทศ :{" "}
                          {shippingPrice} บาท
                        </label>
                      </div>
                    </div>
                    <div className="pt-4 mb-4">
                      <label
                        htmlFor="amount"
                        className="block font-semibold pl-2"
                      >
                        การชำระเงิน
                      </label>
                      <hr />
                      <div className="flex ml-4 mt-4 mb-4 items-center">
                        <label
                          htmlFor="paymentMethodCash"
                          className="block font-medium mr-2"
                        >
                          {buyType.buyType}
                        </label>
                      </div>
                    </div>
                    <hr />
                    <div className="pt-4 mb-4">
                      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <tbody>
                          <tr>
                            <td className="px-6 py-3 text-right text-base">
                              ราคารวมการสั่งซื้อ :
                            </td>
                            <td className="px-6 py-3 w-40 text-left text-black text-base">
                              {isTotalPrice.totalPrice - shippingPrice} บาท
                            </td>
                          </tr>
                          <tr>
                            <td className="px-6 py-3 text-right text-base">
                              ราคาการจัดส่ง :
                            </td>
                            <td className="px-6 py-3 w-40 text-left text-black text-base">
                              {shippingPrice} บาท
                            </td>
                          </tr>
                          <tr>
                            <td className="px-6 py-3 text-right text-base">
                              ยอดชำระเงินทั้งหมด :
                            </td>
                            <td className="px-6 py-3 w-40 text-left text-black text-base">
                              {isTotalPrice.totalPrice} บาท
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <hr />

                    <div className="flex justify-center pt-4">
                      <button
                        type="button"
                        onClick={handleCloseOrder}
                        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 ml-2"
                      >
                        ตกลง
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </Tab.Panel>
            {/* <Tab.Panel className="my-4 ">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3 w-40"></th>

                    <th scope="col" className="px-6 py-3">
                      ชื่อ
                    </th>
                    <th scope="col" className="px-6 py-3">
                      ประเภท
                    </th>
                    <th scope="col" className="px-6 py-3">
                      จำนวน
                    </th>
                    <th scope="col" className="px-6 py-3">
                      ราคา
                    </th>
                    <th scope="col" className="px-6 py-3">
                      สถานะ
                    </th>
                    <th scope="col" className="px-6 py-3 w-36 text-center">
                      ดูรีวิวสินค้า
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={7} className="text-center">
                        Loading...
                      </td>
                    </tr>
                  ) : (
                    <>
                      {orders.length > 0 ? (
                        orders.map(
                          (order) =>
                            order.status === 4 && (
                              <tr
                                key={order.id}
                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
                              >
                                <td className="px-6 py-4 w-40 xl:w-44 flex justify-center items-center">
                                  <Image
                                    className="w-36 h-32 rounded-sm"
                                    src={`data:image/jpeg;base64,${order.products[0].product_images[0].path}`}
                                    alt={
                                      order.products[0].product_images[0]
                                        .filename
                                    }
                                    width={100}
                                    height={100}
                                  />
                                </td>

                                <th
                                  scope="row"
                                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                  {order.products[0].name}
                                </th>
                                <td className="px-6 py-4">
                                  {order.products[0].product_types[0].name}
                                </td>
                                <td className="px-6 py-4">
                                  {order.totalAmount}
                                </td>
                                <td className="px-6 py-4">
                                  {order.totalPrice} บาท
                                </td>
                                <td className="px-6 py-4">จัดส่งสำเร็จ</td>
                                <td className="px-6 py-4">
                                  <button
                                    type="button"
                                    onClick={() => handleOpenReview(order)}
                                    className="flex items-center bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:border-blue-300"
                                  >
                                    ดูรีวิวสินค้า
                                  </button>
                                </td>
                              </tr>
                            )
                        )
                      ) : (
                        <tr>
                          <td colSpan={7} className="text-center">
                            ไม่มีข้อมูลสินค้า
                          </td>
                        </tr>
                      )}
                    </>
                  )}
                </tbody>
              </table>
            </div>

            {isOpenReview &&
              review &&
              review.products &&
              review.products.length > 0 && (
                <div className="fixed bottom-0 left-0 right-0 top-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
                  <div className="bg-white rounded-md p-4 w-1/2 h-60">
                    <h2 className="text-lg font-semibold mb-4">
                      รีวิวจากผู้ใช้
                    </h2>
                    <hr />
                    <div className="mt-6 mb-4 px-10">
                      <label htmlFor="amount" className="block font-medium">
                        รีวิว :
                        <h1 className="mt-1 p-2 w-full border rounded-md inline-block resize-vertical">
                          {review.products[0].reviews[0].comment}
                        </h1>
                      </label>
                    </div>

                    <div className="flex justify-center">
                      <button
                        type="button"
                        onClick={handleCloseReview}
                        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 mt-4"
                      >
                        โอเค
                      </button>
                    </div>
                  </div>
                </div>
              )}
          </Tab.Panel> */}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </Sidebar>
  );
};

export default ManageOrder;
