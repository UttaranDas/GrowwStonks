'use client';
import React, { useEffect, useState } from "react";
import PrimarySearchAppBar from "../../components/Navbar";
import StockChart from "../../components/Graph";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Products = ({ params }) => {
  const symbol = params.product || TESCO;
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(); // Error state
  
  useEffect(() => {
    fetch(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${process.env.API_KEY}`)
    // fetch(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=IBM&apikey=demo`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("page data", data);
        if (data["Error Message"] || data=={}) {
          throw new Error("Data not available");
        }
        setData(data);
        setLoading(false); // Set loading to false once the data is available
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading data...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }


  return (
    <>
      <Head>
        <title>{data.Name}</title>
      </Head>
      <PrimarySearchAppBar />
      <div className="mx-52 my-10">
        <div className="flex flex-row justify-between">
          <div>
            <Image width={100} height={100} src={`https://logo.clearbit.com/ibm.com`} alt="IBM" />
            <h1>{data.Name}</h1>
            <p>
              {data.Symbol}, {data.AssetType}
            </p>
            <p>{data.Exchange}</p>
          </div>

          <div></div>
        </div>

        <StockChart />

        <div>
          <h1>About section</h1>
          <p>{data.Description}</p>
        </div>

        <div className="flex flex-row justify-between">
          <div>
            <p>52 week low</p>
            <h2>{data["52WeekLow"]}</h2>
          </div>

          <div>
            <p>52 week high</p>
            <h2>{data["52WeekHigh"]}</h2>
          </div>
        </div>

        <hr></hr>
        <hr></hr>
        <hr></hr>
        <hr></hr>

        <div className="flex flex-row justify-between">
          <div>
            <h2>Market Cap</h2>
            <p>{data.MarketCapitalization}</p>
          </div>

          <div>
            <h2>P/E Ratio</h2>
            <p>{data.PERatio}</p>
          </div>

          <div>
            <h2>Beta</h2>
            <p>{data.Beta}</p>
          </div>

          <div>
            <h2>Dividend Yield</h2>
            <p>{data.DividendYield}</p>
          </div>

          <div>
            <h2>Profit Margin</h2>
            <p>{data.ProfitMargin}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
