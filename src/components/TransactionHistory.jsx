import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const TransactionHistory = (props) => {
  const [history, setHistory] = useState(null);
  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3001/api/historyofsavings",
          {
            user_id: props.user_id,
          }
        );
        console.log(response.data.results);
        setHistory(response.data.results);
        prepareGraphData(response.data.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [props.user_id]);

  const prepareGraphData = (transactions) => {
    const positiveData = {};
    const negativeData = {};

    transactions.forEach((transaction) => {
      const transactionDate = new Date(transaction.transaction_date);
      const month = transactionDate.getMonth() + 1;
      const year = transactionDate.getFullYear();
      const amount = parseFloat(transaction.amount);

      if (amount >= 0) {
        if (!positiveData[year]) {
          positiveData[year] = {};
        }
        if (!positiveData[year][month]) {
          positiveData[year][month] = 0;
        }
        positiveData[year][month] += amount;
      } else {
        if (!negativeData[year]) {
          negativeData[year] = {};
        }
        if (!negativeData[year][month]) {
          negativeData[year][month] = 0;
        }
        negativeData[year][month] += amount;
      }
    });

    const graphData = [];
    const years = Object.keys(positiveData).concat(Object.keys(negativeData));
    const uniqueYears = [...new Set(years)];

    uniqueYears.forEach((year) => {
      const positiveMonths = positiveData[year] || {};
      const negativeMonths = negativeData[year] || {};
      const months = Object.keys(positiveMonths).concat(
        Object.keys(negativeMonths)
      );
      const uniqueMonths = [...new Set(months)];

      uniqueMonths.forEach((month) => {
        graphData.push({
          month: `${year}-${month.toString().padStart(2, "0")}`,
          positive: positiveMonths[month] || 0,
          negative: negativeMonths[month] || 0,
        });
      });
    });

    setGraphData(graphData);
  };

  return (
    <div
      className="bg-gradient-to-r from-D1BB9E via-EAD8C0 to-FFF2E1 rounded-lg p-6 m-4 shadow-lg hover:scale-105 transition-transform duration-300"
      style={{
        background: "#D6DAC8",
      }}
    >
      <h2 className="text-3xl font-semibold text-A79277 mb-6">
        Transaction History
      </h2>
      <div className="history overflow-auto" style={{ maxHeight: "400px" }}>
        {history ? (
          <ul className="space-y-4">
            {history.map((transaction) => (
              <li
                key={transaction.savings_id}
                className={`bg-white p-4 rounded-lg shadow-md ${
                  parseFloat(transaction.amount) < 0
                    ? "text-red-500"
                    : "text-green-500"
                }`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-lg font-semibold">
                      Amount:{" "}
                      {parseFloat(transaction.amount)
                        .toFixed(2)
                        .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
                    </p>
                    <p className="text-gray-500">
                      Date: {transaction.transaction_date}
                    </p>
                  </div>
                  {transaction.transferred_from !== null && (
                    <p className="text-gray-500">
                      From: {transaction.transferred_from}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">Loading...</p>
        )}
      </div>
    </div>
  );
};

export default TransactionHistory;
