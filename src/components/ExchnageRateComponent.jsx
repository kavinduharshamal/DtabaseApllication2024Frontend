import React, { useState, useEffect } from "react";
import axios from "axios";

const ExchangeRateComponent = () => {
  const [exchangeRate, setExchangeRate] = useState(null);

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

    // Fetch exchange rate on component mount
    fetchExchangeRate();

    // Optionally, you can set up a timer to periodically fetch the exchange rate
    const intervalId = setInterval(fetchExchangeRate, 60000); // Fetch every minute

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div
      className="container bg-gradient-to-r from-D1BB9E via-EAD8C0 to-FFF2E1 rounded-lg shadow-lg p-4 m-2 text-A79277 hover:scale-105 transition-transform duration-300"
      style={{ width: "20vw", background: "#D6DAC8" }}
    >
      <h2 className="text-2xl font-semibold mb-2">Exchange Rate</h2>
      {exchangeRate !== null ? (
        <p>1 USD = {exchangeRate} LKR</p>
      ) : (
        <p>Loading exchange rate...</p>
      )}
    </div>
  );
};

export default ExchangeRateComponent;
