import axios from "axios";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const UserChecker = (props) => {
  const [searchText, setSearchText] = useState("");
  const [transferAmounts, setTransferAmounts] = useState({});
  const [searchresult, setsearchresult] = useState(null);
  const [messageOfResult, setMessage] = useState("");
  const [currentMoney, setMoney] = useState(null);
  const [selectedDates, setSelectedDates] = useState({});

  useEffect(() => {
    fetchTotalBalance();
  }, []);

  const handleSearchSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/searchofuser",
        {
          name: searchText,
        }
      );

      if (response.data.results.length > 0) {
        setsearchresult(response.data.results);
        const initialTransferAmounts = {};
        response.data.results.forEach((user) => {
          initialTransferAmounts[user.user_id] = "";
        });
        setTransferAmounts(initialTransferAmounts);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchTotalBalance = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/user/${props.userID}/totalbalance`
      );
      if (response.ok) {
        const totalBalanceData = await response.json();
        setMoney(totalBalanceData.total_balance);
      } else {
        console.error("Failed to fetch total balance");
      }
    } catch (error) {
      console.error("Error fetching total balance:", error);
    }
  };

  const handleTransfer = async (userId, firstName, lastName) => {
    if (parseInt(currentMoney) > transferAmounts[userId]) {
      try {
        const response = await axios.post(
          "http://localhost:3001/api/transfertoanotheruser",
          {
            user_id: userId,
            amount: transferAmounts[userId],
            transferred_from_user_id: props.userID,
            transferred_from: props.fullname,
            recevername: firstName + " " + lastName,
          }
        );
        setMessage("Transfer Successfully");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    } else {
      setMessage("Transfer Not Successfully");
    }
  };

  const handleSchedulePayment = async (userId, firstName, lastName) => {
    if (parseInt(currentMoney) > transferAmounts[userId]) {
      const currentDate = new Date(selectedDates[userId]);
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, "0");
      const day = String(currentDate.getDate()).padStart(2, "0");
      const date_of_payment_willing_pay = `${year}-${month}-${day}`;

      try {
        const response = await axios.post(
          "http://localhost:3001/api/shedulepayment",
          {
            user_id_transaction: props.userID,
            amount: transferAmounts[userId],
            user_id_reciver: userId,
            date_of_payment_willing_pay: date_of_payment_willing_pay,
          }
        );
        setMessage("Transfer Successfully");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    } else {
      setMessage("Transfer Not Successfully");
    }
  };

  return (
    <div
      className="container mx-auto mt-8 p-8 rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300"
      style={{
        background: "#9CAFAA",
      }}
    >
      <h2 className="text-4xl font-bold mb-6 text-A79277">User Checker</h2>
      <div className="flex flex-col md:flex-row items-center mb-6">
        <input
          type="text"
          placeholder="Enter user name"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="border-2 border-A79277 p-3 mb-4 md:mb-0 md:mr-4 rounded-md focus:outline-none focus:ring-2 focus:ring-A79277 w-full md:w-auto"
          style={{
            backgroundColor: "#FBF3D5",
            color: "#A79277",
          }}
        />
        <button
          onClick={handleSearchSubmit}
          className="bg-A79277 text-white py-3 px-6 rounded-md hover:bg-D1BB9E transition-colors duration-300 font-semibold text-lg"
          style={{ background: "#EFBC9B" }}
        >
          Submit
        </button>
      </div>

      {searchresult && searchresult.length > 0 && (
        <div className="mt-8">
          <h3 className="text-2xl font-semibold mb-4 text-A79277">
            Search Results:
          </h3>
          <ul>
            {searchresult.map((user) => (
              <div
                className="flex flex-col md:flex-row items-center mb-6 bg-FBF3D5 rounded-lg shadow-md p-6"
                style={{
                  background: "#FBF3D5",
                }}
                key={user.user_id}
              >
                <div
                  className="p-4 rounded-lg mb-4 md:mb-0 md:mr-6"
                  style={{ backgroundColor: "#D6DAC8" }}
                >
                  <p className="text-A79277 text-lg">User ID: {user.user_id}</p>
                  <p className="text-A79277 text-lg">
                    Name: {user.first_name} {user.last_name}
                    <br />
                    Card Number: {user.card_numbers || user.national_id}
                  </p>
                </div>
                <div className="flex flex-col md:flex-row items-center">
                  <input
                    type="number"
                    placeholder="Enter amount"
                    value={transferAmounts[user.user_id]}
                    onChange={(e) =>
                      setTransferAmounts((prev) => ({
                        ...prev,
                        [user.user_id]: e.target.value,
                      }))
                    }
                    className="border-2 border-A79277 p-3 mb-4 md:mb-0 md:mr-4 rounded-md focus:outline-none focus:ring-2 focus:ring-A79277 w-full md:w-40"
                    style={{
                      backgroundColor: "#D6DAC8",
                      color: "#A79277",
                    }}
                  />
                  <button
                    onClick={() =>
                      handleTransfer(
                        user.user_id,
                        user.first_name,
                        user.last_name
                      )
                    }
                    className="bg-green-500 text-white py-3 px-6 mb-4 md:mb-0 md:mr-4 rounded-md hover:bg-green-600 transition-colors duration-300 font-semibold text-lg w-full md:w-auto"
                  >
                    Transfer
                  </button>
                  <button
                    onClick={() =>
                      handleSchedulePayment(
                        user.user_id,
                        user.first_name,
                        user.last_name
                      )
                    }
                    className="bg-yellow-500 text-white py-3 px-6 mb-4 md:mb-0 md:mr-4 rounded-md hover:bg-yellow-600 transition-colors duration-300 font-semibold text-lg w-full md:w-auto"
                  >
                    Schedule Payment
                  </button>
                  <DatePicker
                    selected={selectedDates[user.user_id]}
                    onChange={(date) =>
                      setSelectedDates((prev) => ({
                        ...prev,
                        [user.user_id]: date,
                      }))
                    }
                    dateFormat="dd/MM/yyyy"
                    className="border-2 border-A79277 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-A79277 w-full md:w-auto"
                    style={{
                      backgroundColor: "#D6DAC8",
                      color: "#A79277",
                    }}
                  />
                </div>
              </div>
            ))}
          </ul>
        </div>
      )}

      {messageOfResult && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300">
          <div
            className="rounded-2xl shadow-lg p-8 flex flex-col justify-center items-center animate-fadeIn"
            style={{
              background: "linear-gradient(135deg, #EFBC9B, #D6DAC8)",
              width: "30vw",
              height: "30vh",
              border: "2px solid #A79277",
              boxShadow:
                "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)",
            }}
          >
            <div className="text-white mb-6 text-2xl text-center">
              Merging {messageOfResult}
            </div>
            <button
              className="bg-A79277 text-white py-3 px-6 rounded-md hover:bg-opacity-80 transition-colors duration-300 font-semibold text-lg animate-pulse"
              onClick={() => {
                setMessage("");
                document
                  .querySelector(".fixed")
                  .classList.add("animate-fadeOut");
                setTimeout(() => {
                  document
                    .querySelector(".fixed")
                    .classList.remove("animate-fadeOut");
                }, 300);
              }}
              style={{
                background: "#9CAFAA",
                boxShadow:
                  "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)",
              }}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserChecker;
