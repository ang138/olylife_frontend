import Sidebar from "@/components/admin/Sidebar";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

import { IoIosAddCircle } from "react-icons/io";
import { MdEditDocument } from "react-icons/md";
import { IoBagAdd } from "react-icons/io5";
import { MdDeleteForever } from "react-icons/md";
import { checkAdminLoggedIn } from "@/components/auth/check_admin";

const Productslist = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<any[]>([]);
  const [pageNum, setPageNum] = useState(1);
  const [totalPages, setTotalPages] = useState();

  const [isAddAmount, setIsAddAmount] = useState(false);
  const [isAmount, setIsAmount] = useState<any>(null);

  const [amount, setAmount] = useState(0);

  const [error, setError] = useState("");

  useEffect(() => {
    const { loggedIn } = checkAdminLoggedIn();
    if (!loggedIn) {
      router.push("/login");
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/product/all/${pageNum}`
        );
        if (response.ok) {
          const productsData = await response.json();
          setProducts(productsData.products);
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

  useEffect(() => {
    const { pageNum } = router.query;
    if (pageNum && !Array.isArray(pageNum) && !isNaN(Number(pageNum))) {
      setPageNum(Number(pageNum));
    }
  }, [router.query]);

  const handlePageChange = (newPageNum: any) => {
    setPageNum(Number(newPageNum));
    router.push(`/admin/product/manage?pageNum=${newPageNum}`);
  };

  // เซ็ตข้อมูลสินค้าที่จะแก้ไขและเปิดป็อปอัพ
  const handleAddAmountProduct = async (product: any) => {
    setIsAddAmount(true);
    setIsAmount(product);
    console.log(`สินค้าไอดี ${product.id}`);
  };

  // ปิดป็อปอัพแก้ไข
  const handleCloseAddAmount = () => {
    setIsAddAmount(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // ป้องกันการรีเฟรชหน้าเว็บเมื่อกด submit

    try {
      setLoading(true);
      const newAmount = amount + isAmount.amount;
      const response = await fetch(
        `http://localhost:8000/product/update-data/${isAmount.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount: newAmount }),
        }
      );

      if (response.ok) {
        console.log("Product edited successfully");

        Swal.fire({
          title: "เพิ่มจำนวนสำเร็จ",
          text: `เพิ่มจำนวนสินค้า ${isAmount.name} เรียบร้อยแล้ว`,
          icon: "success",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            handleCloseAddAmount(); // ปิดป็อปอัพเมื่อแก้ไขเสร็จสมบูรณ์
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

  // ลบรูปภาพผ่าน api
  const handleDeleteProduct = async (product: any) => {
    try {
      // setLoading(true);
      console.log(`ไอดีสินค้า ${product.id}`);
      console.log(product.id);

      const confirmed = await Swal.fire({
        title: "คุณแน่ใจหรือไม่?",
        text: "คุณต้องการลบรูปภาพนี้หรือไม่?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "ใช่, ลบรูปภาพ!",
        cancelButtonText: "ยกเลิก",
      });

      if (confirmed.isConfirmed) {
        const response = await fetch(
          `http://localhost:8000/product/delete-products/${product.id}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          Swal.fire({
            title: "ลบรูปภาพเรียบร้อยแล้ว",
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
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">จัดการสินค้า</h2>
        <Link href="/admin/product/add">
          <button
            type="button"
            className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            <IoIosAddCircle size={20} className="mr-2" />
            เพิ่มสินค้า
          </button>
        </Link>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 w-40">
                แก้ไขรูปภาพสินค้า
              </th>

              <th scope="col" className="px-6 py-3">
                ชื่อ
              </th>
              <th scope="col" className="px-6 py-3">
                ประเภท
              </th>
              {/* <th scope="col" className="px-6 py-3">
                ราคา
              </th> */}
              <th scope="col" className="px-6 py-3">
                สถานะ
              </th>
              <th scope="col" className="px-6 py-3 w-36">
                เติมสินค้า
              </th>
              <th scope="cols-2" className="px-6 py-3 w-20 text-right">
                แก้ไข
              </th>
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
                      <td className="px-6 py-4 w-40 xl:w-44 flex justify-center items-center">
                        <Link
                          href={`/admin/product/edit/product_image/${product.id}`}
                        >
                          <Image
                            className="w-36 h-32 rounded-sm"
                            src={product.product_images[0].path}
                            alt={product.name}
                            width={100}
                            height={100}
                          />
                          <button
                            type="button"
                            className="w-36 items-center bg-blue-500 text-white px-4 py-1 hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                          >
                            {/* <MdEditDocument size={18} /> */}
                            แก้ไขรูปภาพ
                          </button>
                        </Link>
                      </td>

                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {product.name}
                      </th>
                      <td className="px-6 py-4">
                        {product.product_types[0].name}
                      </td>
                      {/* <td className="px-6 py-4">
                        {product.price} บาท
                      </td> */}
                      <td
                        className={`px-6 py-4 ${
                          product.amount === 0
                            ? "text-red-500"
                            : "text-green-500"
                        }`}
                      >
                        {product.amount === 0
                          ? "สินค้าหมด!"
                          : `สินค้าเหลือ ${product.amount} ชิ้น`}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          type="button"
                          onClick={() => handleAddAmountProduct(product)}
                          className="flex items-center bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:border-blue-300"
                        >
                          <IoBagAdd size={18} />
                        </button>
                      </td>
                      <td className="px-3 py-1">
                        <Link
                          href={`/admin/product/edit/product_data/${product.id}`}
                        >
                          <button
                            type="button"
                            className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                          >
                            <MdEditDocument size={18} />
                          </button>
                        </Link>
                      </td>
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
                    <td colSpan={7} className="text-center">
                      ไม่มีข้อมูลสินค้า
                    </td>
                  </tr>
                )}
              </>
            )}
          </tbody>
        </table>
        <div className="text-right m-2">
          <span className="mr-1">หน้าที่</span>
          <button
            onClick={() => handlePageChange(pageNum - 1)}
            disabled={pageNum === 1}
            className="px-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-600 hover:text-gray-800 dark:hover:text-gray-200 mx-2"
          >
            {"<"}
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-2 rounded-md ${
                pageNum === index + 1
                  ? "bg-gray-400"
                  : "bg-gray-200 dark:bg-gray-700"
              } text-gray-700 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-600 hover:text-gray-800 dark:hover:text-gray-200 mx-1`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(pageNum + 1)}
            disabled={pageNum === totalPages}
            className="px-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-600 hover:text-gray-800 dark:hover:text-gray-200 mx-1"
          >
            {">"}
          </button>
        </div>
      </div>

      {/* แสดงป็อปอัพสำหรับแก้ไขข้อมูล */}
      {isAddAmount && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-md p-4 w-3/2">
            <h2 className="text-lg font-semibold mb-4">เติมจำนวนสินค้า</h2>
            {/* ฟอร์มสำหรับแก้ไขข้อมูล */}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="amount" className="block font-medium">
                  จำนวนปัจจุบัน : {isAmount.amount}
                </label>
                <div className="flex mb-4 items-center">
                  <label htmlFor="amount" className="block font-medium mr-2">
                    ป้อนจำนวนที่ต้องเพิ่ม :
                  </label>
                  <input
                    type="number"
                    id="amount"
                    name="amount"
                    className="mt-1 p-2 border rounded-md w-96"
                    value={amount} // เซ็ตค่าให้กับ input จาก state
                    onChange={(e) => setAmount(parseInt(e.target.value))}
                  />
                </div>
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  บันทึก
                </button>
                <button
                  type="button"
                  onClick={handleCloseAddAmount}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 ml-2"
                >
                  ยกเลิก
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Sidebar>
  );
};

export default Productslist;
