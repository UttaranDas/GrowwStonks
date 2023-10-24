import { React, useState, useEffect } from "react";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import axios from "axios";
import Image from "next/image";

const Card = (props) => {
  const data = props.data;

  const [companyName, setCompanyName] = useState("");
  // useEffect(() => {
  //   axios.get(`/api/tickerSearch?keywords=tesco`).then((res) => {
  //     setCompanyName(res.data.name);
  //   });
  // }, []); // Re-run when the ticker changes

  return (
    <div className="w-60 h-60 border border-gray-300 rounded-md p-4 flex-col text-left">
      <div className="w-16 h-16 rounded-full flex items-center overflow-hidden">
        {/* Set a fixed width and height, and use rounded-full for a circular profile picture */}
        <Image
          src="groww-logo-light.svg"
          alt="company img"
          width={64}
          height={64}
          className="w-full h-full object-cover object-left"
        />
      </div>
      <div className="h-max mt-1 mx-1 flex flex-col justify-between flex-grow">
        <h1 className="font-bold mb-4">
          {companyName} ({data.ticker})
        </h1>
        <div>
          <p>$ {data.price}</p>
          <p>
            {data.change_percentage}
            {data.change_amount < 0 ? (
              <ArrowDropDownIcon style={{ color: "Red" }} />
            ) : (
              <ArrowDropUpIcon style={{ color: "Green" }} />
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
