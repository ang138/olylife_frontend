import Sidebar from "@/components/admin/Sidebar";
import { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { checkUserLoggedIn } from "@/components/auth/check_user";
import UserNav from "@/components/Home/UserNav";
import Navbar from "@/components/Home/Navbar";
import Head from "next/head";
import Footer from "@/components/Home/Footer";
import { FaAddressCard } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import Swal from "sweetalert2";

const UserProfile = () => {
  const router = useRouter();
  const [user, setUser] = useState({ name: "", email: "" });

  const [addressData, setAddressData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  const [openProfile, setOpenProfile] = useState(true);
  const [openAddress, setOpenAddress] = useState(false);

  const [openAddressForm, setOpenAddressForm] = useState(false);

  const [error, setError] = useState("");

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [tel, setTel] = useState("");
  const [address, setAddress] = useState("");
  const [userId, setUserId] = useState(0);
  const [token, setToken] = useState("");

  useEffect(() => {
    const { loggedIn: isLoggedIn, userId, token } = checkUserLoggedIn();
    setLoggedIn(isLoggedIn);
    if (!isLoggedIn) {
      router.push("/login");
    } else if (userId !== null) {
      console.log("User is logged in with ID:", userId);
      fetchUserData(userId, token);
      fetchAddressData(userId, token);
      setUserId(userId);
      setToken(token);
    }
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value.replace(/\D/g, ""); // กรองเฉพาะตัวเลข
    if (input.length > 10) {
      input = input.slice(0, 10); // จำกัดความยาวไม่เกิน 10 ตัวอักษร
    }
    setTel(input);
  };

  const fetchUserData = async (userId: number, token: string) => {
    try {
      const response = await fetch(
        `http://localhost:8000/auth/user/${userId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const userdata = await response.json();
        setUser(userdata);
        console.log("Fetched User:", userdata);
      } else {
        console.error("Failed to fetch user data:", response.status);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
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

  const handleOpenProfile = () => {
    setOpenProfile(true);
    setOpenAddress(false);
  };

  const handleOpenAddress = () => {
    setOpenAddress(true);
    setOpenProfile(false);
  };

  const handleOpenAddressForm = () => {
    setOpenAddressForm(true);
  };

  const handleCloseAddressForm = () => {
    setOpenAddressForm(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // ป้องกันการรีเฟรชหน้าเว็บเมื่อกด submit

    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:8000/address/add/${userId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ firstname, lastname, tel, address, userId }),
        }
      );

      console.log(userId, token);

      if (response.ok) {
        console.log("Product edited successfully");

        Swal.fire({
          title: "เพิ่มที่อยู่สำเร็จ",
          text: `เพิ่มที่อยู่เรียบร้อยแล้ว`,
          icon: "success",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            handleCloseAddressForm(); // ปิดป็อปอัพเมื่อแก้ไขเสร็จสมบูรณ์
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

  if (loading) {
    return (
      <div className="flex justify-center items-center flex-col text-center p-4">
        <h2 className="text-3xl font-bold mb-4">Loading...</h2>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Product Detail</title>
      </Head>
      {loggedIn ? <UserNav /> : <Navbar />}
      <div className="bg-gray-100">
        <div className="flex justify-center">
          <div className="max-w-6xl rounded overflow-hidden">
            <div className="container mx-auto py-8">
              <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
                <div className="col-span-4 sm:col-span-3">
                  <div className="p-6">
                    <div className="flex flex-col items-center">
                      <img
                        src="/images/profile.png"
                        className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0"
                      ></img>
                      <div className="mt-1 flex flex-wrap gap-4 justify-center">
                        <h1 className="text-xl font-bold">{user.name}</h1>
                      </div>
                    </div>
                    <hr className="my-4 border-t border-gray-300" />
                    <div className="flex flex-col">
                      <ul>
                        <li className="mb-4">
                          <button
                            type="button"
                            onClick={handleOpenProfile}
                            className={`flex items-center ${
                              openProfile ? " text-orange-600" : ""
                            }`}
                          >
                            <FaUser />
                            <span className="ms-4 whitespace-nowrap">
                              ข้อมูลส่วนตัว
                            </span>
                          </button>
                        </li>
                        <li className="mb-4">
                          <button
                            type="button"
                            onClick={handleOpenAddress}
                            className={`flex items-center ${
                              openAddress ? "text-orange-600" : ""
                            }`}
                          >
                            <FaAddressCard />
                            <span className="ms-4 whitespace-nowrap">
                              ที่อยู่
                            </span>
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                {openProfile && (
                  <div className="w-full col-span-4 sm:col-span-9">
                    <div className="bg-white shadow rounded-sm p-6 h-full">
                      <h2 className="text-xl font-bold mb-4">ข้อมูลส่วนตัว</h2>
                      <hr className="my-4 border-t border-gray-300" />
                      <div className="flex justify-center">
                        <table className="w-1/2 text-sm ">
                          <tbody>
                            <tr>
                              <th
                                scope="col"
                                className="px-2 py-4 w-24 text-right"
                              >
                                ชื่อ
                              </th>
                              <td scope="col" className="px-2 py-4">
                                {user.name}
                              </td>
                            </tr>
                            <tr>
                              <th
                                scope="col"
                                className="px-2 py- w-20 text-right"
                              >
                                อีเมล
                              </th>
                              <td scope="col" className="px-2 py-4">
                                {user.email}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                {openAddress && (
                  <div className="w-full col-span-5 sm:col-span-9">
                    <div className="bg-white shadow rounded-sm p-6 h-full">
                      <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold">ที่อยู่</h2>
                        <button
                          type="button"
                          onClick={handleOpenAddressForm}
                          className="flex items-center bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:border-green-300"
                        >
                          <IoIosAddCircle size={20} className="mr-2" />
                          เพิ่มที่อยู่
                        </button>
                      </div>
                      <hr className="my-4 border-t border-gray-300" />
                      <div className="flex">
                        {loading ? (
                          <p className="text-lg font-semibold text-center">
                            ยังไม่มีการรีวิวจากผู้ใช้งาน
                          </p>
                        ) : (
                          <div className="w-full">
                            {addressData.length > 0 ? (
                              addressData.map((addressdata) => (
                                <div
                                  key={addressdata.id}
                                  className="flex-row items-center"
                                >
                                  <div className="flex items-center justify-between w-full">
                                    <div>
                                      <h1>
                                        {addressdata.firstname}{" "}
                                        {addressdata.lastname} |{" "}
                                        <span className="text-gray-500">
                                          {addressdata.tel}
                                        </span>
                                      </h1>
                                      <h1 className="text-gray-500">
                                        {addressdata.address}
                                      </h1>
                                    </div>
                                    <div className="-mt-9">
                                      <button className="ml-2">แก้ไข</button> |{""}
                                      <button className="ml-2">ลบ</button>
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
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {openAddressForm && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-md p-4 w-3/6">
            <h2 className="text-lg font-semibold mb-4">ที่อยู่ใหม่</h2>
            <hr className="my-4 border-t border-gray-300" />
            {/* ฟอร์มสำหรับแก้ไขข้อมูล */}
            <form onSubmit={handleSubmit}>
              <div className="mb-4 grid grid-cols-3 gap-4">
                <div className="col-span-1">
                  <label htmlFor="firstname" className="block font-medium">
                    ชื่อ :
                  </label>
                  <input
                    type="text"
                    id="firstname"
                    name="firstname"
                    className="mt-1 p-2 border rounded-sm w-full"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                  />
                </div>
                <div className="col-span-1">
                  <label htmlFor="lastname" className="block font-medium">
                    นามสกุล :
                  </label>
                  <input
                    type="text"
                    id="lastname"
                    name="lastname"
                    className="mt-1 p-2 border rounded-sm w-full"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                  />
                </div>
                <div className="col-span-1">
                  <label htmlFor="phone" className="block font-medium">
                    เบอร์โทรศัพท์ :
                  </label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    className="mt-1 p-2 border rounded-sm w-full"
                    value={tel}
                    onChange={handleChange}
                    maxLength={10} // จำกัดความยาวที่ 10 ตัวอักษร
                  />
                </div>

                <div className="col-span-3">
                  <label htmlFor="address" className="block font-medium">
                    ที่อยู่ :
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    className="mt-1 p-2 border rounded-sm w-full"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  เพิ่มที่อยู่
                </button>
                <button
                  type="button"
                  onClick={handleCloseAddressForm}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 ml-2"
                >
                  ยกเลิก
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default UserProfile;
