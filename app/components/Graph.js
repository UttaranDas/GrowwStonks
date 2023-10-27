import React, { useState, useEffect } from "react";
import "chart.js/auto";
import { Line } from "react-chartjs-2";

const StockChart = (params) => {
  // const symbol = params.symbol || "IBM";
  const symbol = "IBM";
  const [stockData, setStockData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [trim5, setTrim5] = useState({});
  const [trim10, setTrim10] = useState({});
  const [trim50, setTrim50] = useState({});
  const [trimAllTime, setTrimAllTime] = useState({});
  const [selectedButton, setSelectedButton] = useState(4);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiResponse = await fetch(
          `/api/timeSeriesDaily?symbol=${symbol}`,
          { next: { revalidate: 300 } }
        );

        if (!apiResponse.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await apiResponse.json();
        const timeSeriesData = data.data["Time Series (Daily)"];
        const dates = Object.keys(timeSeriesData);
        const prices = dates.map((date) =>
          parseFloat(timeSeriesData[date]["4. close"])
        );

        let isProfit = prices[0] > prices[prices.length - 1];
        // Create a chart data object
        const chartData = {
          labels: dates.reverse(),
          datasets: [
            {
              label: "IBM Stock Price",
              data: prices.reverse(),
              fill: false,
              borderColor: isProfit ? "green" : "red",
              borderWidth: 0.8,
              pointRadius: 0,
            },
          ],
        };

        setStockData(chartData);
        setTrimAllTime(chartData);

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
          isProfit = trimmedPrices[0] < trimmedPrices[trimmedPrices.length - 1];
          return {
            labels: trimmedDates,
            datasets: [
              {
                label: "IBM Stock Price",
                data: trimmedPrices,
                fill: false,
                borderColor: isProfit ? "green" : "red",
                borderWidth: 0.8,
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
      <div className="bg-white p-4 rounded shadow-2xl my-6">
        <Line
          data={stockData}
          options={{ plugins: { legend: { display: false } } }}
        />
      </div>

      <div className="inline-flex rounded-md shadow-sm my-10" role="group">
        <button
          type="button"
          onClick={() => {
            setStockData(trim5);
            setSelectedButton(1);
          }}
          className={`px-4 py-2 text-sm font-medium text-gray-900 rounded-l-lg 
      bg-${selectedButton !== 1 ? "gray" : "red"}-700 border-gray-600 
      text-white hover:text-white hover:bg-gray-600 focus:ring-blue-500 
      focus:text-white dark:bg-${selectedButton !== 1 ? "gray" : "red"}-700 
      dark:border-gray-600 dark:text-white dark:hover:text-white 
      dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white`}
        >
          5y
        </button>
        <button
          type="button"
          onClick={() => {
            setStockData(trim10);
            setSelectedButton(2);
          }}
          className={`px-4 py-2 text-sm font-medium text-gray-900 
      bg-${selectedButton !== 2 ? "gray" : "red"}-700 border-gray-600 
      text-white hover:text-white hover:bg-gray-600 focus:ring-blue-500 
      focus:text-white dark:bg-${selectedButton !== 2 ? "gray" : "red"}-700 
      dark:border-gray-600 dark:text-white dark:hover:text-white 
      dark:hover-bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white`}
        >
          10y
        </button>
        <button
          type="button"
          onClick={() => {
            setStockData(trim50);
            setSelectedButton(3);
          }}
          className={`px-4 py-2 text-sm font-medium text-gray-900 
      bg-${selectedButton !== 3 ? "gray" : "red"}-700 border-gray-600 
      text-white hover:text-white hover:bg-gray-600 focus:ring-blue-500 
      focus:text-white dark:bg-${selectedButton !== 3 ? "gray" : "red"}-700 
      dark:border-gray-600 dark:text-white dark:hover:text-white 
      dark:hover-bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white`}
        >
          50y
        </button>
        <button
          type="button"
          onClick={() => {
            setStockData(trimAllTime);
            setSelectedButton(4);
            console.log("button", selectedButton);
          }}
          className={`px-4 py-2 text-sm font-medium rounded-r-md text-gray-900 
      bg-${selectedButton !== 4 ? "gray" : "red"}-700 border-gray-600 
      text-white hover:text-white hover:bg-gray-600 focus:ring-blue-500 focus:text-white 
      dark:bg-${selectedButton !== 4 ? "gray" : "red"}-700 dark:border-gray-600 
      dark:text-white dark:hover:text-white dark:hover-bg-gray-600 dark:focus:ring-blue-500 
      dark:focus:text-white`}
        >
          All time
        </button>
      </div>
    </>
  );
};

export default StockChart;
