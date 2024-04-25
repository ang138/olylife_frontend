import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Swal from "sweetalert2";
import Image from "next/image";
import { useRouter } from "next/router";

import { IoIosAddCircle } from "react-icons/io";
import { MdEditDocument } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import { checkAdminLoggedIn } from "../auth/check_admin";

interface ProductDetailProps {
  productId: number;
}

const EditProductImageForm: React.FC<ProductDetailProps> = ({ productId }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [product, setProduct] = useState<any>();

  const [isFileChange, setIsFileChange] = useState(false);
  const [isFiles, setIsFiles] = useState<any>(null);
  const [files, setFiles] = useState<FileList | null>(null);

  const [isAddFile, setIsAddFile] = useState(false);

  // ตรวจสอบการเข้าสู่ระบบ
  useEffect(() => {
    const { loggedIn } = checkAdminLoggedIn();
    if (!loggedIn) {
      router.push("/login");
    }
  }, []);

  // ดึงรูปจาก api
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

  // เปิดป๊อปอัพสำหรับเปลี่ยนรูป
  const handleOpenFileChange = (image: any) => {
    setIsFileChange(true);
    setIsFiles(image);
    console.log(image.id);
  };

  // ปิดป๊อปอัพสำหรับเปลี่ยนรูป
  const handleCloseFileChange = () => {
    setIsFileChange(false);
  };

  // อัพเดตรูปลงฐานข้อมูลผ่าน api
  const handleFileChange = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (files === null || files.length === 0) {
        // Show Swal alert to prompt the user to select a file
        Swal.fire({
          title: "กรุณาเลือกไฟล์รูปภาพ",
          icon: "error",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            // Do nothing, let the user select a file
          }
        });
        return; // Exit the function to prevent further execution
      }

      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        const fileName = encodeURIComponent(files[i].name); // Encode the file name
        formData.append("file", files[i], fileName);
      }

      const response = await fetch(
        `http://localhost:8000/product-image/update-image/${isFiles.id}`,
        {
          method: "PATCH",
          body: formData, // Send FormData object instead of JSON string
        }
      );

      if (response.ok) {
        console.log("Product edited successfully");

        Swal.fire({
          title: "เปลี่ยนรูปภาพสำเร็จ",
          text: "เปลี่ยนรูปภาพสินค้าเรียบร้อยแล้ว",
          icon: "success",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            handleCloseFileChange(); // Close the popup after editing is complete
            router.reload(); // Refresh the page after closing the popup
          }
        });
      } else {
        console.error("Error editing product:", response.status);
        alert("Failed to edit product");
      }
    } catch (error) {
      setError("An error occurred during product editing: ");
      console.error("Error during product editing:", error);
    } finally {
      setLoading(false);
    }
  };

  // เปิดป๊อปอัพสำหรับเพิ่มรูปภาพ
  const handleOpenAddFile = () => {
    setIsAddFile(true);
  };

  // ปิดป๊อปอัพสำหรับเพิ่มรูปภาพ
  const handleCloseAddFile = () => {
    setIsAddFile(false);
  };

  // เพิ่มรูปภาพลงฐานข้อมูลผ่าน api
  const handleAddFile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (files === null || files.length === 0) {
        // Show Swal alert to prompt the user to select a file
        Swal.fire({
          title: "กรุณาเลือกไฟล์รูปภาพ",
          icon: "error",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            // Do nothing, let the user select a file
          }
        });
        return; // Exit the function to prevent further execution
      }

      const formData = new FormData();
      if (files !== null) {
        for (let i = 0; i < files.length; i++) {
          const fileName = encodeURIComponent(files[i].name); // เข้ารหัสชื่อไฟล์
          formData.append("files", files[i], fileName);
        }
      }

      const response = await fetch(
        `http://localhost:8000/product-image/add/${productId}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        console.log("Product edited successfully");

        Swal.fire({
          title: "เพิ่มรูปภาพสำเร็จ",
          text: "เพิ่มรูปภาพสินค้าเรียบร้อยแล้ว",
          icon: "success",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            handleCloseAddFile(); // Close the popup after editing is complete
            router.reload(); // Refresh the page after closing the popup
          }
        });
      } else {
        console.error("Error editing product:", response.status);
        alert("Failed to edit product");
      }
    } catch (error) {
      setError("An error occurred during product editing: ");
      console.error("Error during product editing:", error);
    } finally {
      setLoading(false);
    }
  };

  // ลบรูปภาพผ่าน api
  const handleDeleteFile = async (image: any) => {
    try {
      setLoading(true);
      console.log(`ไอดีสินค้า ${productId}`);
      console.log(image.id);

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
          `http://localhost:8000/product-image/delete-image/${image.id}`,
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

  if (!product || product.length === 0) {
    return <div>Product not found</div>;
  }

  const data = product[0];

  return (
    <Sidebar>
      <div className="max-w-5xl mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">จัดการรูปภาพสินค้า</h2>
          <button
            type="button"
            onClick={() => handleOpenAddFile()}
            className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            <IoIosAddCircle size={20} className="mr-2" />
            เพิ่มรูปภาพ
          </button>
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form>
          <div className="mb-4">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <tbody>
                {data.product_images &&
                  data.product_images.map((image: any, index: number) => (
                    <tr
                      key={index}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
                    >
                      {/* <td key={image.id} className="px-6 py-4 w-10 xl:w-10">
                        <div className="flex justify-center items-center">
                          <input type="checkbox" />
                        </div>
                      </td> */}
                      <td className="px-6 py-4 w-40 xl:w-40">
                        <div className="flex justify-center items-center">
                          <Image
                            className="w-24 h-24 xl:w-52 xl:h-52 rounded-sm"
                            src={image.path}
                            alt={`Product Image ${image.id + 1}`}
                            width={200}
                            height={150}
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4 w-60 xl:w-60">
                        <div className="flex justify-center items-center">
                          <button
                            type="button"
                            onClick={() => handleOpenFileChange(image)}
                            className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                          >
                            <MdDeleteForever size={20} className="" />
                            เปลี่ยนรูปภาพ
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 w-10 xl:w-10">
                        <div className="flex justify-center items-center">
                          <button
                            type="button"
                            onClick={() => handleDeleteFile(image)}
                            className="flex items-center bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-blue-300"
                          >
                            <MdDeleteForever size={20} className="" />
                            ลบรูป
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </form>
      </div>

      {/* แสดงป็อปอัพสำหรับแก้ไขข้อมูล */}
      {isFileChange && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-md p-4 w-3/2">
            <h2 className="text-lg font-semibold mb-4">เปลี่ยนรูปภาพ</h2>
            {/* ฟอร์มสำหรับแก้ไขข้อมูล */}
            <form onSubmit={handleFileChange}>
              <div className="mb-4">
                <div className="flex mb-4 items-center">
                  <label htmlFor="files" className="block font-medium mr-2">
                    เลือกรูปภาพ :
                  </label>
                  <input
                    type="file"
                    id="files"
                    name="files"
                    className="mt-1 p-2 border rounded-md w-96"
                    multiple
                    onChange={(e) => setFiles(e.target.files)} // Use optional chaining to handle possible null value
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
                  onClick={handleCloseFileChange}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 ml-2"
                >
                  ยกเลิก
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* แสดงป็อปอัพสำหรับเพิ่มรููปภาพ */}
      {isAddFile && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-md p-4 w-3/2">
            <h2 className="text-lg font-semibold mb-4">เพิ่มรูปภาพ</h2>
            {/* ฟอร์มสำหรับแก้ไขข้อมูล */}
            <form onSubmit={handleAddFile}>
              <div className="mb-4">
                <div className="flex mb-4 items-center">
                  <label htmlFor="files" className="block font-medium mr-2">
                    เลือกรูปภาพ :
                  </label>
                  <input
                    type="file"
                    id="files"
                    name="files"
                    className="mt-1 p-2 border rounded-md w-96"
                    onChange={(e) => setFiles(e.target.files)} // Use optional chaining to handle possible null value
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
                  onClick={handleCloseAddFile}
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

export default EditProductImageForm;
