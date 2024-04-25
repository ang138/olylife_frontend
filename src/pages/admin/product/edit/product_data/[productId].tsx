import EditProductDataForm from "@/components/admin/Editproduct_form";
import Head from "next/head";
import React from "react";

const EditProductData = ({ productId }: any) => {
  return (
    <>
      <Head>
        <title>Product Detail</title>
      </Head>
      <EditProductDataForm productId={productId} />
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

export default EditProductData;
