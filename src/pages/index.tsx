import Footer from "@/components/Home/Footer";
import Navbar from "@/components/Home/Navbar";
import "slick-carousel/slick/slick.css";
import VDO from "@/components/Home/VDO";
import Slide from "@/components/Home/Slide";
import Productslist from "@/components/Home/Productslist";
import Agency from "@/components/Home/Agency";
import Review from "@/components/Home/Review";
import Question from "@/components/Home/Question";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import UserNav from "@/components/Home/UserNav";
import { checkUserLoggedIn } from "@/components/auth/check_user";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

export default function Home() {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    const { loggedIn: isLoggedIn } = checkUserLoggedIn();
    setLoggedIn(isLoggedIn);
  }, []);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {isClient ? (
        <>
          <Head>
            <title>Olylife</title>
          </Head>
          {loggedIn ? <UserNav /> : <Navbar />}
          <Slide />
          <Productslist />
          <Agency />
          <VDO />
          <Review />
          <Question />
          <Footer />
        </>
      ) : (
        // "Prerendered"
        ""
      )}
    </>
  );
}
