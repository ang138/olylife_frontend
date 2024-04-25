import Footer from "@/components/Home/Footer";
import Navbar from "@/components/Home/Navbar";
import ProductPass from "@/components/Products/ProductPass";
import React from "react";
import Head from "next/head";

export default function ProductReview() {
  return (
    <>
      <Head>
        <title>Rating</title>
      </Head>
      <Navbar />
      <ProductPass />
      <Footer />
    </>
  );
}
