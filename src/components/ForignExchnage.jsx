import axios from "axios";
import React, { useEffect, useState } from "react";

export const ForignExchnage = (props) => {
  // localcurrency
  const [amount, setAmount] = useState(0);
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [exchangeRate, setExchangeRate] = useState(null);
  const [currency, setCurrency] = useState(0);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const response = await axios.get(
          "https://api.exchangerate-api.com/v4/latest/USD"
        );
        if (response.status === 200) {
          const exchangeRateData = response.data.rates.LKR;
          setExchangeRate(exchangeRateData);
        } else {
          console.error("Failed to fetch exchange rate");
        }
      } catch (error) {
        console.error("Error fetching exchange rate:", error);
      }
    };

    fetchExchangeRate();
    const intervalId = setInterval(fetchExchangeRate, 60000);

    return () => clearInterval(intervalId);
  }, []);

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleCurrencyCodeChange = (e) => {
    setCurrency(e.target.value);
  };

  const handleExchangeClick = async () => {
    console.log(amount);
    if (amount > 1000) {
      if (parseFloat(props.Balance) < parseFloat(amount)) {
        console.log(props.Balance, amount);
        setMessage("Insufficient Balance!");
      } else {
        setMessage("Successfully Added");
        try {
          const response = await axios.post(
            "http://localhost:3001/api/forigncurrencyexchange",
            {
              amount: amount,
              user_id: props.user_id,
              usdExchnagerate: exchangeRate,
            }
          );
        } catch (error) {
          console.error("Error fetching exchange rate:", error);
        }
      }
    } else {
      setMessage("Please Enter More Than 1000 RS");
    }
  };

  const handleCalculateClick = () => {
    console.log(amount, currency);
    if (currency && exchangeRate !== null) {
      const convertedAmount = parseFloat(currency) * parseFloat(exchangeRate);
      setConvertedAmount(convertedAmount);
      console.log(convertedAmount);
    }
  };
  return (
    <div
      className="container p-8 m-6 rounded-2xl shadow-lg flex flex-col items-center hover:scale-105 transition-transform duration-300"
      style={{
        width: "30vw",
        background: "#D6DAC8",
      }}
    >
      <h2 className="text-3xl font-bold mb-6 text-A79277">Foreign Exchange</h2>
      <div className="mb-4">
        <label
          htmlFor="amountInput"
          className="block mb-2 font-semibold text-A79277"
        >
          Amount (Local Currency):
        </label>
        <input
          type="number"
          id="amountInput"
          placeholder="Enter amount"
          className="p-3 rounded-lg border-2 border-A79277 focus:outline-none focus:ring-2 focus:ring-A79277"
          value={amount}
          onChange={handleAmountChange}
          style={{ backgroundColor: "#FBF3D5", color: "#A79277" }}
        />
      </div>
      {message && <p className="text-red-500 mb-4">{message}</p>}
      <div className="mb-6">
        <label
          htmlFor="amountInput2"
          className="block mb-2 font-semibold text-A79277"
        >
          Enter the Amount of USD:
        </label>
        <input
          type="text"
          id="amountInput2"
          placeholder="Enter amount"
          className="p-3 rounded-lg border-2 border-A79277 focus:outline-none focus:ring-2 focus:ring-A79277"
          value={currency}
          onChange={handleCurrencyCodeChange}
          style={{ backgroundColor: "#FBF3D5", color: "#A79277" }}
        />
      </div>
      <div className="flex justify-center space-x-4">
        <button
          className="bg-A79277 text-white py-3 px-6 rounded-md hover:bg-opacity-80 transition-colors duration-300 font-semibold text-lg"
          onClick={handleExchangeClick}
          style={{
            boxShadow:
              "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)",
            background: "#EFBC9B",
          }}
        >
          Exchange
        </button>
        <button
          className="bg-9CAFAA text-white py-3 px-6 rounded-md hover:bg-opacity-80 transition-colors duration-300 font-semibold text-lg"
          onClick={handleCalculateClick}
          style={{
            boxShadow:
              "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)",
            background: "#EFBC9B",
          }}
        >
          Calculate
        </button>
      </div>
      {convertedAmount !== null && (
        <p className="mt-6 text-xl font-semibold text-A79277">
          Converted Amount: {convertedAmount.toFixed(2)} {currency} (Converted
          Currency)
        </p>
      )}
    </div>
  );
};
