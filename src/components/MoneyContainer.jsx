import axios from "axios";
import React, { useEffect, useState } from "react";

export const MoneyContainer = (props) => {
  console.log(props.user_id);
  const [localMoney, setLocalMoney] = useState(0);
  const [foreignMoney, setForeignMoney] = useState(0);

  useEffect(() => {
    const fetchTotalBalance = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/user/${props.user_id}/totalbalance`
        );
        if (response.ok) {
          const totalBalanceData = await response.json();
          console.log(totalBalanceData.total_balance);
          setLocalMoney(totalBalanceData.total_balance);
        } else {
          console.error("Failed to fetch total balance");
        }
      } catch (error) {
        console.error("Error fetching total balance:", error);
      }
    };

    const fetchTotalBalanceForeignCurrency = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/user/${props.user_id}/totalbalanceforign`
        );
        if (response.ok) {
          const totalBalanceData = await response.json();
          console.log(totalBalanceData.total_balance);
          setForeignMoney(totalBalanceData.total_balance);
        } else {
          console.error("Failed to fetch total balance");
        }
      } catch (error) {
        console.error("Error fetching total balance:", error);
      }
    };

    fetchTotalBalance();
    fetchTotalBalanceForeignCurrency();
  }, [props.user_id]);

  return (
    <div
      className="container rounded-lg shadow-lg flex flex-col justify-center items-center p-6 hover:scale-105 transition-transform duration-300"
      style={{ width: "25vw", height: "15vh", backgroundColor: "#D6DAC8" }}
    >
      <h2 className="text-2xl font-semibold mb-4">Money Container</h2>
      <div className="flex justify-between w-full">
        <div className="text-lg">
          <span className="font-semibold">Local Money:</span>{" "}
          <span className="text-green-600">{localMoney}</span>
        </div>
        <div className="text-lg">
          <span className="font-semibold">Foreign Savings:</span>{" "}
          <span className="text-blue-600">{foreignMoney} USD</span>
        </div>
      </div>
    </div>
  );
};
