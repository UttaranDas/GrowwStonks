import { React, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import Link from "next/link";
import Card from "./Card";
import InfiniteScroll from "react-infinite-scroll-component";

export default function CompanyGrid(props) {
  const route = props.route;
  const [page, setPage] = useState(1);
  const [companies, setCompanies] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);

  const fetchMoreData = async (pageNum) => {
    setLoading(true);

    try {
      const apiResponse = await fetch(`/api/${route}?page=${pageNum}`);
      const data = await apiResponse.json();
      const companies = data[`${route}`];
      console.log("data", data, data[`${route}`]);

      if (companies?.length === 0) {
        setHasMore(false); // No more data to load
      } else {
        setCompanies([...companies, ...companies]);
        setPage(pageNum + 1);
        console.log(pageNum);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (!initialLoadComplete) {
      fetchMoreData(page);
      setInitialLoadComplete(true);
    }
  }, [initialLoadComplete]);

  return (
    <>
      <div className="flex flex-grow-1 mt-6">
        <InfiniteScroll
          dataLength={companies.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          {/* <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
            sx={{ flexGrow: 1 }}
          >
            {companies.map((company, index) => (
              <Grid item xs={2} sm={2} md={2} key={index}>
                <Link href={`/stocks/${company.ticker}`} passHref>
                    <Card data={company} />
                </Link>
              </Grid>
            ))}
          </Grid> */}
          <div className="w-full grid grid-cols-4 gap-5 justify-between">
            {companies.map((company, index) => (
              <div key={index}>
                <Link href={`/stocks/${company.ticker}`} passHref>
                  <Card data={company} />
                </Link>
              </div>
            ))}
          </div>
        </InfiniteScroll>
        {/* {initialLoadComplete || ( */}
          <button
            onClick={() => {
              fetchMoreData(page);
              setInitialLoadComplete(true);
            }}
          >
            Load More
          </button>
        {/* )} */}
      </div>
    </>
  );
}
