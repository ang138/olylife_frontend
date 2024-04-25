
import EditProductImageForm from "@/components/admin/Editimage";
import Head from "next/head";
import React from "react";

const EditProductImage = ({ productId }: any) => {
  return (
    <>
      <Head>
        <title>Product Detail</title>
      </Head>
      <EditProductImageForm productId={productId} />
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

export default EditProductImage;
