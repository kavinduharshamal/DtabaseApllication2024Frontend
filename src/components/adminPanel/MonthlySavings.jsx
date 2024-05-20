import axios from "axios";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

export const MonthlySavings = () => {
  const [monthlyData, setMonthlyData] = useState([]);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3001/api/getSavingsAsMonthly",
          {}
        );
        console.log(response.data);
        setMonthlyData(response.data);
        prepareChartData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const prepareChartData = (data) => {
    const labels = data.map((item) =>
      new Date(item.transaction_date).toLocaleDateString()
    );
    const amounts = data.map((item) => parseFloat(item.sum));
    setChartData({
      labels,
      datasets: [
        {
          label: "Monthly Savings",
          data: amounts,
          fill: false,
          backgroundColor: "#D1BB9E",
          borderColor: "#A79277",
          tension: 0.4,
          pointBackgroundColor: "#FFF2E1",
          pointBorderColor: "#A79277",
          pointHoverBackgroundColor: "#A79277",
          pointHoverBorderColor: "#FFF2E1",
        },
      ],
    });
  };

  return (
    <div
      className="container mx-auto mt-8 p-4 rounded-lg shadow-lg"
      style={{
        fontFamily: "'Open Sans', sans-serif",
        backgroundColor: "#FFF2E1",
        width: "80vw",
        height: "80vh",
      }}
    >
      <h1 className="text-2xl font-semibold mb-4 text-brown">
        Monthly Savings
      </h1>
      {chartData && (
        <div
          className="chart-container"
          style={{ position: "relative", height: "100%" }}
        >
          <Line
            data={chartData}
            options={{
              scales: {
                y: {
                  ticks: {
                    color: "#A79277",
                  },
                },
                x: {
                  ticks: {
                    color: "#A79277",
                  },
                },
              },
              plugins: {
                tooltip: {
                  backgroundColor: "#FFF2E1",
                  bodyColor: "#A79277",
                  titleColor: "#A79277",
                  borderColor: "#A79277",
                  borderWidth: 1,
                },
                legend: {
                  labels: {
                    color: "#A79277",
                  },
                },
              },
            }}
          />
        </div>
      )}
    </div>
  );
};
