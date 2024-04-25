// import React, { useEffect, useState } from "react";
// import Navbar from "@/components/Home/Navbar";
// import ProductCart from "@/components/Products/ProductCart";
// import Footer from "@/components/Home/Footer";
// import Head from "next/head";
// import { useRouter } from "next/router";
// import { checkUserLoggedIn } from "@/components/auth/check_user";
// import UserNav from "@/components/Home/UserNav";

// // export default function ProductsCarts() {
// //   return (
// //     <>
// //       <Head>
// //         <title>Cart</title>
// //       </Head>
// //       <Navbar />
// //       <ProductCart />
// //       <Footer />
// //     </>
// //   );
// // }

// const ProductsCarts = ({ userId }: any) => {

//   const router = useRouter();
//   const [loggedIn, setLoggedIn] = useState(false);

//   useEffect(() => {
//     const { loggedIn: isLoggedIn } = checkUserLoggedIn();
//     setLoggedIn(isLoggedIn);
//     if (!isLoggedIn) {
//       router.push("/login");
//     }
//   }, []);
  
//   return (
//     <>
//       <Head>
//         <title>Product Detail</title>
//       </Head>
//       {loggedIn ? <UserNav /> : <Navbar />}
//       <ProductCart userId={userId} />
//       <Footer />
//     </>
//   );
// };

// export async function getServerSideProps({ params }: any) {
//   return {
//     props: {
//       userId: params.userId,
//     },
//   };
// }

// export default ProductsCarts;
