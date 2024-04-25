import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { checkAdminLoggedIn } from "../auth/check_admin";

interface ProductDetailProps {
  productId: number;
}

const EditProductDataForm: React.FC<ProductDetailProps> = ({ productId }) => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [typeId, setTypeId] = useState(0);
  const [detail, setDetail] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [how_to_use, setHow_to_use] = useState("");
  const [price, setPrice] = useState(0);
  const [amount, setAmount] = useState(0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [types, setTypes] = useState<{ id: number; name: string }[]>([]);
  const [product, setProduct] = useState<any>();

  useEffect(() => {
    const { loggedIn } = checkAdminLoggedIn();
    if (!loggedIn) {
      router.push("/login");
    }
  }, []);

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

  const handleEditProduct = async () => {
    try {
      setLoading(true);

      const newData = {
        name: name ? name : data.name,
        typeId: typeId ? typeId : data.typeId,
        detail: detail ? detail : data.detail,
        ingredient: ingredient ? ingredient : data.ingredient,
        how_to_use: how_to_use ? how_to_use : data.how_to_use,
        price: price ? price : data.price,
        amount: amount ? amount : data.amount,
      };

      const response = await fetch(
        `http://localhost:8000/product/update-data/${productId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newData),
        }
      );

      if (response.ok) {
        console.log("Product edited successfully");
        Swal.fire({
          title: "Success!",
          text: "Product edited successfully!",
          icon: "success",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            router.push("/admin/product/manage");
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

  if (!product || product.length === 0) {
    return <div>Product not found</div>;
  }

  const data = product[0];

  return (
    <Sidebar>
      <div className="max-w-5xl mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-semibold mb-4">แก้ไขข้อมูลสินค้า</h2>
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
              value={name || data.name}
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
              value={typeId || data.typeId}
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
              value={detail || data.detail}
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
              value={ingredient || data.ingredient}
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
              value={how_to_use || data.how_to_use}
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
              value={price || data.price}
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
              value={amount || data.amount}
              onChange={(e) => setAmount(parseInt(e.target.value))}
            />
          </div>
          <div className="flex justify-center">
            <button
              type="button"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
              onClick={handleEditProduct}
            >
              ยืนยันแก้ไข
            </button>
          </div>
        </form>
      </div>
    </Sidebar>
  );
};

export default EditProductDataForm;
