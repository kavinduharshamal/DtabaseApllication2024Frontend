import axios from "axios";
import React, { useEffect, useState } from "react";

export const FixedDeposite = (props) => {
  const [amount, setAmount] = useState("");
  const [startDate, setStartDate] = useState("");
  const [withdrawDate, setWithdrawDate] = useState("");
  const [interestRate, setInterestRate] = useState(""); // Default interest rate is 10%
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [allInputsFilled, setAllInputsFilled] = useState(false);
  const [message, setMessage] = useState(false);
  const [buttonhide, setButtonhide] = useState(false);
  const [balance, setTotalBalance] = useState(0);
  const num = 0;

  const fetchTotalBalance = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/user/${props.user_id}/totalbalance`
      );
      if (response.ok) {
        const totalBalanceData = await response.json();
        console.log(totalBalanceData.total_balance);
        setTotalBalance(totalBalanceData.total_balance);
      } else {
        console.error("Failed to fetch total balance");
      }
    } catch (error) {
      console.error("Error fetching total balance:", error);
    }
  };

  useEffect(() => {
    fetchTotalBalance();
  });

  const handleSubmit = async () => {
    console.log(balance, amount);
    setShowSuccessMessage(false);
    if (parseFloat(balance) > parseFloat(amount)) {
      const formattedStartDate = new Date(startDate).toLocaleString();
      const formattedWithdrawDate = new Date(withdrawDate).toLocaleString();

      const data = {
        amount: parseFloat(amount),
        startDate: formattedStartDate,
        withdrawDate: formattedWithdrawDate,
        interestRate: parseFloat(interestRate),
      };

      console.log(data);

      try {
        const response = await axios.post(
          "http://localhost:3001/api/fixeddeposite",
          {
            user_id: props.user_id,
            amount: amount,
            date_of_deposit: startDate,
            date_of_withdrawal: withdrawDate,
            interest_rate: interestRate,
          }
        );
        console.log(response.data);
        setShowSuccessMessage(true); // Show success message
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    } else {
      setMessage(true);
    }
  };

  // Function to calculate the difference in days between two dates
  const calculateDateDifference = () => {
    const start = new Date(startDate);
    const withdraw = new Date(withdrawDate);
    const differenceInDays = (withdraw - start) / (1000 * 60 * 60 * 24);
    return differenceInDays;
  };

  // Function to determine the interest rate options based on the date difference
  const renderInterestRateOptions = () => {
    const differenceInDays = calculateDateDifference();
    if (differenceInDays >= 300) {
      return (
        <>
          <input
            type="radio"
            value="25"
            checked={interestRate === "25"}
            onChange={() => setInterestRate("25")}
            className="form-radio text-9CAFAA focus:ring-9CAFAA"
          />
          <label className="ml-2 text-9CAFAA font-light">25%</label>
        </>
      );
    } else if (differenceInDays >= 100) {
      return (
        <>
          <input
            type="radio"
            value="10"
            checked={interestRate === "10"}
            onChange={() => setInterestRate("10")}
            className="form-radio text-9CAFAA focus:ring-9CAFAA"
          />
          <label className="ml-2 text-A79277 font-semibold">10%</label>
          {differenceInDays >= 200 && (
            <>
              <input
                type="radio"
                value="15"
                checked={interestRate === "15"}
                onChange={() => setInterestRate("15")}
                className="form-radio text-9CAFAA focus:ring-9CAFAA"
              />
              <label className="ml-2 text-A79277 font-semibold">15%</label>
            </>
          )}
        </>
      );
    } else {
      return (
        <label className="text-A79277 font-bold text-xl">
          Enter more than 3 months time period
        </label>
      );
    }
  };

  // Function to check if all inputs are filled
  const checkAllInputsFilled = () => {
    if (amount && startDate && withdrawDate) {
      setAllInputsFilled(true);
    } else {
      setAllInputsFilled(false);
    }
  };

  // Call checkAllInputsFilled whenever inputs change
  React.useEffect(() => {
    checkAllInputsFilled();
  }, [amount, startDate, withdrawDate]);

  return (
    <div
      className="container p-8 m-6 rounded-2xl shadow-lg flex flex-col items-center hover:scale-105 transition-transform duration-300"
      style={{
        width: "30vw",
        background: "#D6DAC8",
      }}
    >
      <h2 className="text-3xl font-bold mb-6 text-A79277">Fixed Deposit</h2>
      <div className="mb-4">
        <label
          htmlFor="amount"
          className="block mb-2 font-semibold text-A79277"
        >
          Amount:
        </label>
        <input
          type="number"
          step="0.01"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className={`p-3 rounded-lg border-2 focus:outline-none focus:ring-2 ${
            amount ? "border-A79277 focus:ring-A79277" : "border-gray-300"
          } bg-FBF3D5 text-A79277`}
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="startDate"
          className="block mb-2 font-semibold text-A79277"
        >
          Start Date:
        </label>
        <input
          type="date"
          id="startDate"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className={`p-3 rounded-lg border-2 focus:outline-none focus:ring-2 ${
            startDate ? "border-A79277 focus:ring-A79277" : "border-gray-300"
          } bg-FBF3D5 text-A79277`}
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="withdrawDate"
          className="block mb-2 font-semibold text-A79277"
        >
          Withdraw Date:
        </label>
        <input
          type="date"
          id="withdrawDate"
          value={withdrawDate}
          onChange={(e) => setWithdrawDate(e.target.value)}
          className={`p-3 rounded-lg border-2 focus:outline-none focus:ring-2 ${
            withdrawDate ? "border-A79277 focus:ring-A79277" : "border-gray-300"
          } bg-FBF3D5 text-A79277`}
        />
      </div>
      <div className="mb-6">
        <label className="block mb-2 font-semibold text-A79277">
          Interest Rate:
        </label>
        <div className="flex items-center">{renderInterestRateOptions()}</div>
      </div>
      {allInputsFilled && interestRate.length > 1 && (
        <button
          onClick={handleSubmit}
          className="bg-A79277 text-white py-3 px-6 rounded-md hover:bg-opacity-80 transition-colors duration-300 font-semibold text-lg"
          style={{
            boxShadow:
              "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)",
            background: "#EFBC9B",
          }}
        >
          Submit
        </button>
      )}
      {showSuccessMessage && (
        <div className="mt-6 bg-green-100 text-green-700 p-4 rounded-lg font-semibold">
          Fixed deposit added successfully!
        </div>
      )}
      {message && (
        <div className="mt-6 bg-red-100 text-red-700 p-4 rounded-lg font-semibold">
          Fixed deposit added unsuccessfully. Insufficient margin.
        </div>
      )}
    </div>
  );
};
