import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const TotalSavings = () => {
  const [TotalSavings, setTot] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3001/api/getTotalsavings",
          {}
        );
        console.log("response data : ", response.data[0].sum);
        setTot(response.data[0].sum);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div
      className="container bg-gradient-to-r from-brown to-tan text-white font-semibold py-4 px-8 rounded-lg shadow-md mx-auto mt-8 "
      style={{
        fontFamily: "'Open Sans', sans-serif",
        backgroundImage: "linear-gradient(to right, #A79277, #D1BB9E)",
        width: "20vw",
      }}
    >
      <span className="text-xl">Total Savings: Rs {TotalSavings}</span>
    </div>
  );
};
