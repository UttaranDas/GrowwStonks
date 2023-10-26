import React, { useState, useEffect } from "react";
import axios from "axios";
import "chart.js/auto";
import { Line } from "react-chartjs-2";
import next from "next";

const StockChart = (params) => {
  const symbol = params.symbol || "IBM";
  console.log(symbol, params.symbol, "symbol");
  const [stockData, setStockData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [trim5, setTrim5] = useState({});
  const [trim10, setTrim10] = useState({});
  const [trim50, setTrim50] = useState({});
  const [showData, setShowData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiResponse = await fetch(
          `/api/timeSeriesDaily?symbol=${symbol}`,
          { next: { revalidate: 300 } }
        );

        console.log("api responce", apiResponse);
        if (!apiResponse.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await apiResponse.json();
        const timeSeriesData = data.data["Time Series (Daily)"];
        console.log("timeseriesdata", timeSeriesData);
        const dates = Object.keys(timeSeriesData);
        const prices = dates.map((date) =>
          parseFloat(timeSeriesData[date]["4. close"])
        );

        // Create a chart data object
        const chartData = {
          labels: dates.reverse(),
          datasets: [
            {
              label: "IBM Stock Price",
              data: prices.reverse(),
              fill: false,
              borderColor: "blue",
              pointRadius: 0,
            },
          ],
        };

        setStockData(chartData);
        setShowData(chartData);

        // Calculate the start date for 5 years, 10 years, and 50 years ago
        const currentDate = new Date();
        const trim5YearsAgo = new Date(currentDate);
        trim5YearsAgo.setFullYear(currentDate.getFullYear() - 5);
        const trim10YearsAgo = new Date(currentDate);
        trim10YearsAgo.setFullYear(currentDate.getFullYear() - 10);
        const trim50YearsAgo = new Date(currentDate);
        trim50YearsAgo.setFullYear(currentDate.getFullYear() - 50);

        // Trim the data for 5 years, 10 years, and 50 years
        const trimData = (startDate) => {
          const trimmedDates = dates.filter(
            (date) => new Date(date) >= startDate
          );
          const trimmedPrices = trimmedDates.map((date) =>
            parseFloat(timeSeriesData[date]["4. close"])
          );
          return {
            labels: trimmedDates.reverse(),
            datasets: [
              {
                label: "IBM Stock Price",
                data: trimmedPrices.reverse(),
                fill: false,
                borderColor: "blue",
                pointRadius: 0,
              },
            ],
          };
        };

        setTrim5(trimData(trim5YearsAgo));
        setTrim10(trimData(trim10YearsAgo));
        setTrim50(trimData(trim50YearsAgo));
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching and processing stock data:", error);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div>
        <Line
          data={showData}
          options={{ plugins: { legend: { display: false } } }}
        />
      </div>
      <div className="flex flex-row">
        <button
          onClick={() => setShowData(trim5)}
          className="mx-0.5 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {" "}
          5y{" "}
        </button>
        <button
          onClick={() => setShowData(trim10)}
          className="mx-0.5 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {" "}
          10y{" "}
        </button>
        <button
          onClick={() => setShowData(trim50)}
          className="mx-0.5 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {" "}
          50y{" "}
        </button>
      </div>
    </>
  );
};

export default StockChart;
