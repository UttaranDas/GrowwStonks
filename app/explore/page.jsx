import { React } from "react";
import Navbar from "../components/Navbar";
import Head from "next/head";
import TabsContainer from "./TabsContainer";

export const metadata = {
  title: 'Explore',
  description:
    'Explore various stocks and companies listed on the stock market.',
};

export default function Explore() {

  return (
    <>
      <Head>
        <title>GrowwStonks</title>
      </Head>
      <Navbar />
      <TabsContainer />
    </>
  );
}
