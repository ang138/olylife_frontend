// Import libraries and hooks
import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { checkAdminLoggedIn } from "../auth/check_admin";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

// AddProductForm Component
const AddProductForm = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [typeId, setTypeId] = useState(0);
  const [detail, setDetail] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [how_to_use, setHow_to_use] = useState("");
  const [price, setPrice] = useState(0);
  const [amount, setAmount] = useState(0);
  const [files, setFiles] = useState<FileList | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [types, setTypes] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    const { loggedIn } = checkAdminLoggedIn();
    if (!loggedIn) {
      router.push("/login");
    }
  }, []);

  // Fetch types data from API on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/product/type");
        if (response.ok) {
          const data = await response.json();
          setTypes(data);
        } else {
          console.error("Error fetching data from API");
        }
      } catch (error) {
        console.error("Error fetching data from API", error);
      }
    };

    fetchData();
  }, []);

  // Handle form submission
  const handleAddProduct = async () => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", name);
      formData.append("typeId", String(typeId));
      formData.append("detail", detail);
      formData.append("ingredient", ingredient);
      formData.append("how_to_use", how_to_use);
      formData.append("price", String(price));
      formData.append("amount", String(amount));

      if (files !== null) {
        for (let i = 0; i < files.length; i++) {
          const fileName = encodeURIComponent(files[i].name); // เข้ารหัสชื่อไฟล์
          formData.append("files", files[i], fileName);
        }
      }

      const response = await fetch("http://localhost:8000/product/add", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Product added successfully");
        Swal.fire({
          title: "Success!",
          text: "Product added successfully!",
          icon: "success",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            router.push("/admin/product/manage");
          }
        });
      } else {
        console.error("Error adding product:", response.status);
        alert("Failed to add product");
      }
    } catch (error) {
      setError("An error occurred during product addition.");
      console.error("Error during product addition:", error);
    } finally {
      setLoading(false);
    }
  };

  // JSX for UI rendering
  return (
    <Sidebar>
      <div className="max-w-5xl mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Add Product</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-600"
            >
              Product Name:
            </label>
            <input
              type="text"
              id="name"
              className="mt-1 p-2 w-full border rounded-md"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="dropdown"
              className="block text-sm font-medium text-gray-600"
            >
              Select Product Type:
            </label>
            <select
              id="dropdown"
              className="mt-1 p-2 w-full border rounded-md"
              value={typeId}
              onChange={(e) => setTypeId(parseInt(e.target.value))}
            >
              <option value="">--Select Type--</option>
              {types.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="detail"
              className="block text-sm font-medium text-gray-600"
            >
              รายละเอียดสินค้า:
            </label>
            <textarea
              id="detail"
              className="mt-1 p-2 w-full border rounded-md"
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
            ></textarea>
          </div>
          <div className="mb-4">
            <label
              htmlFor="detail"
              className="block text-sm font-medium text-gray-600"
            >
              ส่วนประกอบ:
            </label>
            <textarea
              id="ingredient"
              className="mt-1 p-2 w-full border rounded-md"
              value={ingredient}
              onChange={(e) => setIngredient(e.target.value)}
            ></textarea>
          </div>
          <div className="mb-4">
            <label
              htmlFor="detail"
              className="block text-sm font-medium text-gray-600"
            >
              วิธีการใช้งาน:
            </label>
            <textarea
              id="how_to_use"
              className="mt-1 p-2 w-full border rounded-md"
              value={how_to_use}
              onChange={(e) => setHow_to_use(e.target.value)}
            ></textarea>
          </div>

          <div className="mb-4">
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-600"
            >
              Price:
            </label>
            <input
              type="number"
              id="price"
              className="mt-1 p-2 w-full border rounded-md"
              value={price}
              onChange={(e) => setPrice(parseInt(e.target.value))}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-gray-600"
            >
              Amount to be Sold:
            </label>
            <input
              type="number"
              id="amount"
              className="mt-1 p-2 w-full border rounded-md"
              value={amount}
              onChange={(e) => setAmount(parseInt(e.target.value))}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="files"
              className="block text-sm font-medium text-gray-600"
            >
              Product Images:
            </label>
            <input
              type="file"
              id="files"
              name="files"
              className="mt-1 p-2 w-full border rounded-md"
              multiple
              onChange={(e) => setFiles(e.target.files)} // Use e.target.files directly
            />
          </div>
          <div className="flex justify-center">
            <button
              type="button"
              className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
              onClick={handleAddProduct}
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </Sidebar>
  );
};

// Export the component
export default AddProductForm;
