import { React, useState, useEffect } from "react";
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
      const apiResponse = await fetch(`/api/${route}?page=${pageNum}`, {
        next: { revalidate: 300 },
      });
      const data = await apiResponse.json();
      const companies = data[`${route}`];

      if (companies?.length === 0) {
        setHasMore(false); // No more data to load
      } else {
        setCompanies([...companies, ...companies]);
        setPage(pageNum + 1);
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
      </div>
    </>
  );
}
