// import Footer from "@/components/Home/Footer";
// import Navbar from "@/components/Home/Navbar";
// import "slick-carousel/slick/slick.css";''
// import Head from "next/head";
// import React, { useEffect, useState } from "react";
// import UserNav from "@/components/Home/UserNav";
// import { checkUserLoggedIn } from "@/components/auth/check_user";
// import { useRouter } from "next/router";
// import ProductAll from "@/components/Products/ProductAll";

// export default function Home() {
//   const router = useRouter();
//   const [loggedIn, setLoggedIn] = useState(false);

//   useEffect(() => {
//     const { loggedIn: isLoggedIn } = checkUserLoggedIn();
//     setLoggedIn(isLoggedIn);
//   }, []);

//   return (
//     <>
//       <Head>
//         <title>Olylife</title>
//       </Head>
//       {loggedIn ? <UserNav username="สมชาย ขายหมี" /> : <Navbar />}
//       <ProductAll />
//       <Footer />
//     </>
//   );
// }
