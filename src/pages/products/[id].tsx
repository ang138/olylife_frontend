import Footer from "@/components/Home/Footer";
import Navbar from "@/components/Home/Navbar";
import Product from "@/components/Products/Product";
import Head from "next/head";
import React from "react";

export default function Home() {
  return (
    <>
      <Head>
        <title>Product</title>
      </Head>
      <Navbar />
      <Product />
      <Footer />
    </>
  );
}



