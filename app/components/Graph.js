import React, { useState, useEffect } from "react";
import "chart.js/auto";
import { Line } from "react-chartjs-2";

const StockChart = (params) => {
  const symbol = params.symbol || "IBM";
  console.log(symbol, params.symbol, "symbol");
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
          return {
            labels: trimmedDates,
            datasets: [
              {
                label: "IBM Stock Price",
                data: trimmedPrices,
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
          data={stockData}
          options={{ plugins: { legend: { display: false } } }}
        />
      </div>
      {/* <div className="flex flex-row">
        <button
          onClick={() => setStockData(trim5)}
          className="mx-0.5 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {" "}
          5y{" "}
        </button>
        <button
          onClick={() => setStockData(trim10)}
          className="mx-0.5 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {" "}
          10y{" "}
        </button>
        <button
          onClick={() => setStockData(trim50)}
          className="mx-0.5 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {" "}
          50y{" "}
        </button>
        <button
          onClick={() => setStockData(trimAllTime)}
          className="mx-0.5 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {" "}
          All time{" "}
        </button>
      </div> */}

      <div class="inline-flex rounded-md shadow-sm" role="group">
        <button
          type="button"
          onClick={() => {setStockData(trim5); setSelectedButton(1); console.log(selectedButton);}}
          class={`px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg 
          hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 
          focus:text-blue-700 dark:bg-${selectedButton!=1 ? "gray" : "red"}-700 dark:border-gray-600 dark:text-white dark:hover:text-white 
          dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white`}>
          5y
        </button>
        <button
          type="button"
          onClick={() => {setStockData(trim10); setSelectedButton(2); console.log(selectedButton);}}
          class={`px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 
          hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 
          focus:text-blue-700 dark:bg-${selectedButton!=2 ? "gray" : "red"}-700 dark:border-gray-600 dark:text-white dark:hover:text-white 
          dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white`}
        >
          10y
        </button>
        <button
          type="button"
          onClick={() => {setStockData(trim50); setSelectedButton(3); console.log(selectedButton);}}
          class={`px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 
          hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-${selectedButton!=3 ? "gray" : "red"}-700 dark:border-gray-600 dark:text-white dark:hover:text-white 
          dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white`}
        >
          50y
        </button>
        <button
          type="button"
          onClick={() => {setStockData(trimAllTime); setSelectedButton(4); console.log(selectedButton);}}
          class={`px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 
          rounded-r-md hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-${selectedButton!=4 ? "gray" : "red"}-700 
          dark:border-gray-600 dark:text-white dark:hover:text-white 
          dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white`}
        >
          All time
        </button>
      </div>



      
    </>
  );
};

export default StockChart;
