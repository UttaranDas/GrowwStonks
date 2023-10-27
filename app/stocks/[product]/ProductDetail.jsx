"use client";
import React, { useEffect, useState } from "react";
import StockChart from "../../components/Graph";
import Head from "next/head";
import Image from "next/image";

const ProductDetail = ({ symbol }) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(); // Error state

  useEffect(() => {
    fetch(`../api/overview?symbol=${symbol}`, {
      next: { revalidate: 300 },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data["Error Message"] || data == {}) {
          throw new Error("Data not available");
        }
        console.log(data);
        console.log(data.overview);
        setData(data.overview);
        setLoading(false); // Set loading to false once the data is available
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [symbol]);

  if (loading) {
    return <p>Loading data...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <>
      <div className="mx-52 my-10">
        <div className="flex flex-row justify-between items-center">
          <div>
            <Image
              width={100}
              height={100}
              src={`https://logo.clearbit.com/ibm.com`}
              alt="IBM"
              className="mb-3"
            />
            <h1 className="text-2xl font-bold">{data.Name}</h1>
            <p className="text-sm">
              {data.Symbol}, {data.AssetType}
            </p>
            <p className="text-sm font-bold text-emerald-700">
              {data.Exchange}
            </p>
          </div>
        </div>

        <StockChart symbol={symbol} />

        <div className="my-6 bg-white">
          <h1 className="text-xl font-semibold">About section</h1>
          <p className="text-sm">{data.Description}</p>
        </div>

        <div className="flex flex-row justify-between mt-4 p-4">
          <div>
            <p className="text-sm">52 week low</p>
            <h2 className="text-lg font-semibold">{data["52WeekLow"]}</h2>
          </div>

          <div className="w-8/12">
            <label
              htmlFor="price-slider"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Current Price
            </label>
            <input
              id="price-slider"
              type="range"
              min={data["52WeekLow"]}
              max={data["52WeekHigh"]}
              value={
                Number(data["52WeekLow"]) +
                Math.random(data["52WeekHigh"] - data["52WeekLow"])
              }
              className="w-full h-1 mb-6 bg-gray-200 rounded-lg appearance-none cursor-default range-sm dark:bg-gray-700 align-middle"
              disabled
            />
          </div>
          <div>
            <p className="text-sm">52 week high</p>
            <h2 className="text-lg font-semibold">{data["52WeekHigh"]}</h2>
          </div>
        </div>

        <div className="flex felx-row justify-between flex-wrap">
          <div className="p-4 bg-white my-2">
            <h2 className="text-sm font-semibold">Market Cap</h2>
            <p className="text-sm">{data.MarketCapitalization}</p>
          </div>

          <div className="p-4 bg-white my-2">
            <h2 className="text-sm font-semibold">P/E Ratio</h2>
            <p className="text-sm">{data.PERatio}</p>
          </div>

          <div className="p-4 bg-white my-2">
            <h2 className="text-sm font-semibold">Beta</h2>
            <p className="text-sm">{data.Beta}</p>
          </div>

          <div className="p-4 bg-white my-2">
            <h2 className="text-sm font-semibold">Dividend Yield</h2>
            <p className="text-sm">{data.DividendYield}</p>
          </div>
          <div className="p-4 bg-white my-2">
            <h2 className="text-sm font-semibold">Profit Margin</h2>
            <p className="text-sm">{data.ProfitMargin}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
