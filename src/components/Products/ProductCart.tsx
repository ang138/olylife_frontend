import Sidebar from "@/components/admin/Sidebar";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

import { MdDeleteForever } from "react-icons/md";
import { checkUserLoggedIn } from "../auth/check_user";

const ProductCart = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<any[]>([]);
  const [addressData, setAddressData] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [isOpenOrder, setIsOpenOrder] = useState(false);
  const [isOrder, setIsOrder] = useState<any>(null);
  const [userId, setUserId] = useState<any>();
  const [cartId, setCartId] = useState<any>();
  const [showAllAddresses, setShowAllAddresses] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(
    null
  );

  const shippingPrice = 50;

  const [selectedCartIds, setSelectedCartIds] = useState<any[]>([]);
  // const [selectedCartIds, setSelectedCartIds] = useState<string[]>([]);

  useEffect(() => {
    const { loggedIn, userId, token } = checkUserLoggedIn();
    if (!loggedIn) {
      router.push("/login");
    } else if (userId !== null) {
      console.log("User is logged in with ID:", userId);
      fetchAddressData(userId, token);
      fetchCart(userId, token);
      setUserId(userId);
    }
  }, []);

  const handlePaymentMethodChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPaymentMethod(event.target.value);
    console.log("ชำระ", paymentMethod);
  };

  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedAddressId(parseInt(event.target.value));
    // console.log("ที่อยู่",selectedAddressId);
  };

  const fetchCart = async (userId: number, token: string) => {
    try {
      const response = await fetch(
        `http://localhost:8000/cart/showcart/${userId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
        // setCartId(data[0].carts[0].id);
        console.log("Fetched Carts:", data);
        // console.log("Fetched Cart:", data[0].carts[0].id);
        // console.log("สั่งสินค้าไอดีที่:",cartId);
        // console.log("ที่อยู่:",paymentMethod);
      } else {
        console.error("Failed to fetch cart data:", response.status);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAddressData = async (userId: number, token: string) => {
    try {
      const response = await fetch(
        `http://localhost:8000/address/get/${userId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const addressdata = await response.json();
        setAddressData(addressdata);
        console.log("Fetched Address:", addressdata);
      } else {
        console.error("Failed to fetch user data:", response.status);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    product: any
  ) => {
    const cartId = product.carts[0].id;
    const isChecked = e.target.checked;

    if (isChecked) {
      setSelectedCartIds([...selectedCartIds, cartId]); // เพิ่ม cartId เข้าไปใน selectedCartIds
    } else {
      setSelectedCartIds(selectedCartIds.filter((id) => id !== cartId)); // ลบ cartId ออกจาก selectedCartIds
    }

    // const selectedProducts = products.filter(product => selectedCartIds.includes(product.carts[0].id)); // กรองสินค้าที่เป็นของ cartId ที่ถูกเลือก

    console.log("Selected products:", selectedCartIds); // แสดงรายการสินค้าของ cartId ที่ถูกเลือก
  };

  const selectedProducts = products.filter((product) =>
    selectedCartIds.includes(product.carts[0].id)
  );
  console.log("Selected CartIds:", selectedCartIds);

  const calculateTotalPrice = (selectedProducts: any[]) => {
    let totalPrice = 0;
    for (const product of selectedProducts) {
      totalPrice += product.carts[0].price;
    }
    return totalPrice;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // ป้องกันการรีเฟรชหน้าเว็บเมื่อกด submit

    if (!selectedAddressId) {
      Swal.fire({
        icon: "warning",
        title: "โปรดเลือกที่อยู่ที่จัดส่งสินค้า",
        confirmButtonText: "ตกลง",
      });
      return;
    }
    if (!paymentMethod) {
      Swal.fire({
        icon: "warning",
        title: "โปรดเลือกวิธีการชำระเงิน",
        confirmButtonText: "ตกลง",
      });
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:8000/cart/order-product/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cartId: selectedCartIds,
            addressId: selectedAddressId,
            buyType: paymentMethod,
          }),
        }
      );

      if (response.ok) {
        console.log("Product edited successfully");

        Swal.fire({
          title: "สั่งสินค้าสำเร็จ",
          text: `สั่งสินค้าเรียบร้อยแล้ว`,
          icon: "success",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            router.push("orders"); // รีเฟรชหน้าเว็บหลังจากปิดป็อปอัพ
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

  // ลบรูปภาพผ่าน api
  const handleDeleteProduct = async (product: any) => {
    try {
      // setLoading(true);
      console.log(`ไอดีสินค้า ${product.id}`);
      console.log(`ไอดีตะกร้าสินค้า ${product.carts[0].id}`);
      console.log(`ไอดีผู้ใช้ ${userId}`);

      const confirmed = await Swal.fire({
        title: "คุณแน่ใจหรือไม่?",
        text: "คุณต้องการลบตะกร้าสินค้านี้หรือไม่?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "ใช่!",
        cancelButtonText: "ยกเลิก",
      });

      if (confirmed.isConfirmed) {
        const response = await fetch(
          `http://localhost:8000/cart/removecart/${product.carts[0].id}/${product.id}/${userId}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          Swal.fire({
            title: "ลบตะกร้าสินค้าเรียบร้อยแล้ว",
            icon: "success",
            confirmButtonText: "ตกลง",
          }).then(() => {
            router.reload();
          });
        } else {
          Swal.fire({
            title: "เกิดข้อผิดพลาด",
            text: "ไม่สามารถลบตะกร้าสินค้าได้",
            icon: "error",
            confirmButtonText: "ตกลง",
          });
        }
      }
    } catch (error) {
      setError("เกิดข้อผิดพลาดในระหว่างการลบตะกร้าสินค้า");
      console.error("เกิดข้อผิดพลาดในระหว่างการลบตะกร้าสินค้า:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAddOrder = async (product: any) => {
    if (selectedCartIds.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "โปรดเลือกสินค้าที่ต้องการสั่งซื้อ",
        showConfirmButton: true,
      });
      return;
    }
    setIsOpenOrder(true);
    setIsOrder(product);
    // console.log(`ตะกร้าไอดี ${product.carts[0].id}`);
    // console.log("ตะกร้าไอดี", cartId);
    console.log("ผู้ใช้ไอดี", userId);
    // console.log(selectedAddressId);
  };

  // ปิดป็อปอัพแก้ไข
  const handleCloseAddOrder = () => {
    setIsOpenOrder(false);
  };

  const handleAddAmount = async (product: any) => {
    try {
      // setLoading(true);
      console.log(`ไอดีสินค้า ${product.id}`);
      console.log(`ไอดีตะกร้าสินค้า ${product.carts[0].id}`);
      console.log(`ไอดีผู้ใช้ ${userId}`);

      const response = await fetch(
        `http://localhost:8000/cart/addamount/${product.carts[0].id}/${product.id}/${userId}`,
        {
          method: "POST",
        }
      );

      if (response.ok) {
        router.reload();
      }
    } catch (error) {
      setError("เกิดข้อผิดพลาดในระหว่างการเพิ่มจำนวนสินค้า");
      console.error("เกิดข้อผิดพลาดในระหว่างการเพิ่มจำนวนสินค้า:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleReduceAmount = async (product: any) => {
    try {
      // setLoading(true);
      console.log(`ไอดีสินค้า ${product.id}`);
      console.log(`ไอดีตะกร้าสินค้า ${product.carts[0].id}`);
      console.log(`ไอดีผู้ใช้ ${userId}`);

      const response = await fetch(
        `http://localhost:8000/cart/reduceamount/${product.carts[0].id}/${product.id}/${userId}`,
        {
          method: "POST",
        }
      );

      if (response.ok) {
        router.reload();
      }
    } catch (error) {
      setError("เกิดข้อผิดพลาดในระหว่างการลดจำนวนสินค้า");
      console.error("เกิดข้อผิดพลาดในระหว่างการลดจำนวนสินค้า:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-16 py-6">
      <div className="flex justify-between items-center mb-4 mt-4">
        <h2 className="text-2xl font-semibold">ตะกร้าสินค้า</h2>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-sm">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 w-40"></th>
              <th scope="col" className="px-6 py-3 w-40"></th>

              <th scope="col" className="px-6 py-3">
                ชื่อสินค้า
              </th>
              <th scope="col" className="px-6 py-3">
                ราคา
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                จำนวน
              </th>
              <th scope="col" className="px-6 py-3 w-64">
                ราคารวม
              </th>
              {/* <th scope="cols-2" className="px-6 py-3 w-40">
                สั่งซื้อ
              </th> */}
              <th scope="cols-2" className="px-6 py-3 w-20 text-left">
                ลบ
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
                {products.length > 0 ? (
                  products.map((product) => (
                    <tr
                      key={product.id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
                    >
                      <td className="text-center">
                        <input
                          type="checkbox"
                          onChange={(e) => handleCheckboxChange(e, product)}
                          className="w-4 h-4"
                        />
                      </td>
                      <td className="px-6 py-4 w-40 xl:w-44 flex justify-center items-center">
                        <Link href={`/product/${product.id}`}>
                          <Image
                            className="w-36 h-32 rounded-sm"
                            src={product.product_images[0].path}
                            alt={product.name}
                            width={100}
                            height={100}
                          />
                        </Link>
                      </td>
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        <Link href={`/product/${product.id}`}>
                          {product.name}
                        </Link>
                      </th>
                      <td className="px-6 py-4">{product.price} บาท</td>
                      <td className="px-6 py-4">
                        <div className="flex flex-row items-center justify-center">
                          <button
                            type="button"
                            className="py-2 px-5 bg-gray-200 mr-4 hover:bg-gray-300 rounded-lg"
                            onClick={() => handleReduceAmount(product)}
                          >
                            -
                          </button>
                          <h1>{product.carts[0].quantity}</h1>
                          <button
                            type="button"
                            className="py-2 px-5 bg-gray-200 ml-4 hover:bg-gray-300 rounded-lg"
                            onClick={() => handleAddAmount(product)}
                          >
                            +
                          </button>
                          <h1 className="pl-2 text-gray-500"></h1>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {product.carts[0].price} บาท
                      </td>
                      {/* <td className="px-3 py-1">
                        <button
                          type="button"
                          onClick={() => handleOpenAddOrder(product)}
                          className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                        >
                          สั่งซื้อ
                        </button>
                      </td> */}
                      <td className="px-3 py-1">
                        <Link href="">
                          <button
                            type="button"
                            onClick={() => handleDeleteProduct(product)}
                            className="flex items-center bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-blue-300"
                          >
                            <MdDeleteForever size={18} />
                          </button>
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="text-center text-base p-4">
                      ไม่มีข้อมูลสินค้า{" "}
                      <a href="/" className="underline text-blue-500">
                        เลือกซื้อสินค้า
                      </a>
                    </td>
                  </tr>
                )}
              </>
            )}
          </tbody>
        </table>
      </div>
      <div className="pt-5">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3"></th>

              <th scope="col" className="px-6 py-3 text-base">
                รวมสินค้า : {selectedCartIds.length} รายการ
              </th>
              <th scope="col" className="px-6 py-3 text-base">
                ราคารวม : {calculateTotalPrice(selectedProducts)} บาท
              </th>
              <th scope="cols-2" className="px-6 py-3 text-center text-base">
                <button
                  type="button"
                  onClick={() => handleOpenAddOrder(selectedProducts)}
                  className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-sm hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                >
                  {/* <MdEditDocument size={18} /> */}
                  สั่งซื้อสินค้า
                </button>
              </th>
            </tr>
          </thead>
        </table>
      </div>

      {/* <h2>Selected Products:</h2>
      <ul>
        {selectedProducts.map(product => (
          <li key={product.id}>
            {product.name} - {product.carts[0].price}
          </li>
        ))}
      </ul> */}

      {/* แสดงป็อปอัพสำหรับแก้ไขข้อมูล */}
      {isOpenOrder && (
        <div className="fixed top-0 left-0 w-full h-dvh py-8 bg-gray-500 bg-opacity-50 flex items-center justify-center overflow-y-auto">
          <div className="bg-white rounded-md p-4 w-4/6 max-h-full overflow-y-auto">
            <h2 className="text-lg font-semibold mb-4">สั่งสินค้า</h2>
            <form onSubmit={handleSubmit}>
              {loading ? (
                <p className="text-lg font-semibold text-center"></p>
              ) : (
                <div className="w-full">
                  <div className="mb-4">
                    <label
                      htmlFor="amount"
                      className="block font-semibold mr-2"
                    >
                      เลือกที่อยู่จัดส่ง
                    </label>
                    <hr />
                  </div>
                  {addressData.length > 0 ? (
                    addressData
                      .slice(0, showAllAddresses ? addressData.length : 2)
                      .map((addressdata) => (
                        <div
                          key={addressdata.id}
                          className="flex-row items-center"
                        >
                          <div className="flex items-center justify-between w-full">
                            <div>
                              <label>
                                <input
                                  type="radio"
                                  name="address"
                                  value={addressdata.id}
                                  checked={selectedAddressId === addressdata.id}
                                  onChange={handleAddressChange}
                                />{" "}
                                {addressdata.firstname} {addressdata.lastname}{" "}
                                <span className="text-gray-500">|</span>{" "}
                                <span className="text-gray-500">
                                  {addressdata.tel}
                                </span>
                                <h1 className="pl-4 text-gray-500 w-2/3">
                                  {addressdata.address}
                                </h1>
                              </label>
                            </div>
                            <div className="-mt-9">
                              <button className="ml-2">แก้ไข</button>
                            </div>
                          </div>
                          <hr className="my-4 border-t border-gray-300" />
                        </div>
                      ))
                  ) : (
                    <p className="text-lg font-semibold text-center">
                      ยังไม่มีการรีวิวจากผู้ใช้งาน
                    </p>
                  )}
                  {/* ปุ่ม "ดูเพิ่มเติม" */}
                  {addressData.length > 2 && (
                    <div className="flex justify-center">
                      <button
                        className="bg-gray-300 mb-6 px-4 py-2 rounded-md hover:bg-gray-400"
                        onClick={() => setShowAllAddresses(!showAllAddresses)}
                        type="button" //เพื่อป้องกันการ submit ฟอร์ม
                      >
                        {showAllAddresses
                          ? "ซ่อนที่อยู่เพิ่มเติม"
                          : "ดูที่อยู่เพิ่มเติม"}
                      </button>
                    </div>
                  )}
                </div>
              )}
              <div className="mb-4">
                <label htmlFor="amount" className="block font-semibold">
                  รายการสินค้าสั่งซื้อ
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
                      {selectedProducts.map((product, index) => (
                        <tr key={index}>
                          {/* <td className="px-6 py-3">{index + 1}</td> */}
                          <td className="px-6 py-3 flex justify-center items-center">
                            <Image
                              className="w-16 h-16 rounded-sm"
                              src={product.product_images[0].path}
                              alt={product.name}
                              width={50}
                              height={50}
                            />
                          </td>
                          <td className="px-6 py-3">{product.name}</td>
                          <td className="px-6 py-3">{product.price} บาท</td>
                          <td className="px-6 py-3">
                            {product.carts[0].quantity}
                          </td>
                          <td className="px-6 py-3">
                            {product.carts[0].price} บาท
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="pt-6 mb-4">
                <label htmlFor="amount" className="block font-semibold">
                  การจัดส่ง
                </label>
                <hr />
                <div className="flex ml-4 mt-4 mb-4 items-center">
                  <label className="block font-medium mr-2">
                    Standard Delivery - ส่งธรรมดาในประเทศ : {shippingPrice} บาท
                  </label>
                </div>
              </div>
              <div className="pt-6 mb-4">
                <label htmlFor="amount" className="block font-semibold">
                  เลือกวิธีการชำระเงิน
                </label>
                <hr />
                <div className="flex ml-4 mt-4 mb-4 items-center">
                  <label
                    htmlFor="paymentMethodCash"
                    className="block font-medium mr-2"
                  >
                    ชำระเงินปลายทาง :
                  </label>
                  <input
                    id="paymentMethodCash"
                    type="radio"
                    name="paymentMethod" // ให้กำหนดชื่อ name เพื่อให้ radio input รู้จักกันว่าเป็นกลุ่มเดียวกัน
                    value="ชำระเงินปลายทาง"
                    onChange={handlePaymentMethodChange}
                  />
                </div>
                {/* <div className="flex ml-4 mb-4 items-center">
                  <label htmlFor="amount" className="block font-medium mr-2">
                    QR พร้อมเพย์ :
                  </label>
                  <input
                    type="radio"
                    name="paymentMethod" // ให้กำหนดชื่อ name เพื่อให้ radio input รู้จักกันว่าเป็นกลุ่มเดียวกัน
                    value="QR พร้อมเพย์"
                    onChange={handlePaymentMethodChange}
                  />
                </div> */}
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
                        {calculateTotalPrice(selectedProducts)} บาท
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
                        {calculateTotalPrice(selectedProducts) + shippingPrice}{" "}
                        บาท
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <hr />

              <div className="flex justify-center pt-4">
                <button
                  type="button"
                  onClick={handleCloseAddOrder}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 ml-2"
                >
                  สั่งสินค้า
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCart;
