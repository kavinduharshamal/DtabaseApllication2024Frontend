import axios from "axios";
import React, { useEffect, useState } from "react";

export const FixedDepositeDateChecker = (props) => {
  const [dates, setDates] = useState(null);
  const [countdownActive, setCountdownActive] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3001/api/fixeddepositeGetdata",
          {
            user_id: props.user_id,
          }
        );
        setDates(response.data.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [props.user_id]);

  const calculateRemainingDays = (endDate) => {
    const currentDate = new Date();
    const withdrawalDate = new Date(endDate);
    const remainingDays = Math.floor(
      (withdrawalDate - currentDate) / (24 * 60 * 60 * 1000)
    );
    return remainingDays;
  };

  useEffect(() => {
    if (dates) {
      let anyRemaining = false;
      dates.forEach((dataitem) => {
        const remainingDays = calculateRemainingDays(
          dataitem.date_of_withdrawal
        );
        if (remainingDays <= 0) {
          anyRemaining = true;
        } else if (remainingDays === 1 && countdownActive) {
          setCountdownActive(false);
        }
      });
      if (!anyRemaining) {
        setCountdownActive(false);
      }
    }
  }, [dates, countdownActive]);

  return (
    <div
      className="container rounded-lg m-6 p-8 overflow-auto shadow-lg"
      style={{
        width: "34vw",
        maxHeight: "40vh",
        background: "#D6DAC8",
      }}
    >
      <h2 className="text-3xl font-bold mb-6 text-A79277">
        Fixed Deposit Date Checker
      </h2>
      <ul className="space-y-4">
        {dates &&
          dates.map((dataitem) => {
            const remainingDays = calculateRemainingDays(
              dataitem.date_of_withdrawal
            );
            if (remainingDays > 0) {
              return (
                <li
                  key={dataitem.fixeddepositid}
                  className=" p-6 rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
                  style={{ background: "#FBF3D5" }}
                >
                  <div className="mb-4">
                    <label
                      htmlFor=""
                      className="block font-semibold text-A79277"
                    >
                      Fixed Deposit ID: {dataitem.fixeddepositid}
                    </label>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <label htmlFor="" className="font-semibold text-A79277">
                      Amount: {dataitem.amount}
                    </label>
                    <label htmlFor="" className="font-semibold text-A79277">
                      Interest Rate: {dataitem.interest_rate}%
                    </label>
                    <label htmlFor="" className="font-semibold text-A79277">
                      Remaining Days: {remainingDays}{" "}
                      {remainingDays === 1 && !countdownActive && (
                        <span className="text-green-600">
                          Your money has been added to the main account.
                        </span>
                      )}
                    </label>
                  </div>
                </li>
              );
            } else {
              return null; // Exclude records with remaining days <= 0
            }
          })}
      </ul>
    </div>
  );
};
