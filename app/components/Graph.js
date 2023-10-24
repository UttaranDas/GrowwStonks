import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";

const StockChart = () => {
  const [stockData, setStockData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch stock data from the API
    axios
      .get(
        "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&outputsize=full&apikey=demo"
      )
      .then((response) => {
        const data = response.data["Time Series (Daily)"];
        const dates = Object.keys(data);
        const prices = dates.map((date) => parseFloat(data[date]["4. close"]));

        // Create a chart data object
        const chartData = {
          labels: dates.reverse(), // Reverse the dates for chronological order
          datasets: [
            {
              label: "IBM Stock Price",
              data: prices.reverse(), // Reverse the prices to match the dates
              fill: false,
              borderColor: "blue",
              pointRadius: 0, // Disable point drawing for this dataset
            },
          ],
        };

        setStockData(chartData);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching stock data:", error);
      });
  }, []);

  const handleClick = () => {
    console.log("button clicked");
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div>
        <Line
          data={stockData}
          options={{ plugins: { legend: { display: false } } }}
        />
      </div>
      <div>
        <button>5y</button>
        <button>10y</button>
        <button>50y</button>
      </div>
    </>
  );
};

export default StockChart;
