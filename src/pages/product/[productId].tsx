// pages/product/[productId].tsx
import Footer from "@/components/Home/Footer";
import Navbar from "@/components/Home/Navbar";
import UserNav from "@/components/Home/UserNav";
import ProductDetail from "@/components/Products/ProductDetail";
import { checkUserLoggedIn } from "@/components/auth/check_user";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const ProductPage = ({ productId }: any) => {

  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const { loggedIn: isLoggedIn } = checkUserLoggedIn();
    setLoggedIn(isLoggedIn);
    if (!isLoggedIn) {
      router.push("/login");
    }
  }, []);
  
  return (
    <>
      <Head>
        <title>Product Detail</title>
      </Head>
      {loggedIn ? <UserNav /> : <Navbar />}
      <ProductDetail productId={productId} />
      <Footer />
    </>
  );
};

export async function getServerSideProps({ params }: any) {
  return {
    props: {
      productId: params.productId,
    },
  };
}

export default ProductPage;
