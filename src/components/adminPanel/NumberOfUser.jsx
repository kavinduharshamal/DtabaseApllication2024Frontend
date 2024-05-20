import axios from "axios";
import React, { useEffect, useState } from "react";

const NumberOfUser = () => {
  const [totaluser, SetTotalUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3001/api/getTotaluser",
          {}
        );
        console.log("response data : ", response.data[0].countUser);
        SetTotalUser(response.data[0].countUser);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div
      className="bg-white rounded-lg shadow-md p-6 flex items-center justify-center"
      style={{
        fontFamily: "'Open Sans', sans-serif",
        backgroundColor: "#FBF3D5",
        color: "#9CAFAA",
        width: "20vw",
      }}
    >
      <div className="flex items-center">
        <div className="mr-4 text-black">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
          </svg>
        </div>
        <div>
          <h3 className="text-2xl font-semibold text-black">
            Number of Customers
          </h3>
          <p className="text-4xl font-bold text-black">{totaluser}</p>
        </div>
      </div>
    </div>
  );
};

export default NumberOfUser;
