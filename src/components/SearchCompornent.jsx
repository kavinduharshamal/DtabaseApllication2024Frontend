// Manager.js
import React, { useEffect, useState } from "react";
import axios from "axios";

export const SearchCompornent = () => {
  const [userData, setUserData] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const handleInputChange = (e) => {
    setUserData(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/userckerinadmin",
        {
          searchinput: userData,
        }
      );
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleCheckHistory = (userId) => {
    setSelectedUserId(userId);
  };

  return (
    <div className="container mx-auto p-4">
      <div
        className="searchContainer m-3 p-3 rounded-lg shadow-md"
        style={{
          background: "#D6DAC8",
        }}
      >
        <label
          className="block mb-2 text-gray-700 font-semibold"
          htmlFor="usercheck"
        >
          Usercheck - Add Anything Like Name, ID, and Phone number
        </label>
        <input
          className="border p-2 mb-4 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-[#EFBC9B]"
          type="text"
          id="usercheck"
          value={userData}
          onChange={handleInputChange}
          style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}
        />
        <button
          className="bg-[#EFBC9B] text-white px-4 py-2 rounded hover:bg-[#D6DAC8] transition-colors duration-300"
          onClick={handleSubmit}
        >
          Submit
        </button>

        {/* Display fetched data */}
        <div
          className="mt-4 max-h-[60vh] overflow-y-auto"
          style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}
        >
          {searchResults.map((user, index) => (
            <div
              key={index}
              className="border p-4 mb-2 bg-[#FBF3D5] rounded-lg shadow-md"
            >
              <p className="text-gray-700 font-semibold">
                User ID: {user.user_id}
              </p>
              <p className="text-gray-700 font-semibold">
                Name: {user.first_name} {user.last_name}
              </p>
              <p className="text-gray-700 font-semibold">
                Birthday: {new Date(user.birthday).toLocaleDateString()}
              </p>
              <p className="text-gray-700 font-semibold">
                Address: {user.address}
              </p>
              <p className="text-gray-700 font-semibold">City: {user.city}</p>
              <p className="text-gray-700 font-semibold">
                Province: {user.province}
              </p>
              <p className="text-gray-700 font-semibold">
                Street: {user.street}
              </p>
              <p className="text-gray-700 font-semibold">
                Phone Number: {user.phone_number}
              </p>
              <p className="text-gray-700 font-semibold">
                National ID: {user.national_id}
              </p>
              <button
                className="bg-[#EFBC9B] text-white px-4 py-2 rounded hover:bg-[#D6DAC8] transition-colors duration-300 mt-2"
                onClick={() => handleCheckHistory(user.user_id)}
              >
                Check History
              </button>
            </div>
          ))}
        </div>
      </div>
      {selectedUserId && <TransactionHistory user_id={selectedUserId} />}
    </div>
  );
};

// TransactionHistory.js

const TransactionHistory = (props) => {
  const [history, setHistory] = useState(null);
  const [totalBalance, setTotalBalance] = useState(0);

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
        calculateTotalBalance(response.data.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (props.user_id) {
      fetchData();
    }
  }, [props.user_id]);

  const calculateTotalBalance = (transactions) => {
    const balance = transactions.reduce((total, transaction) => {
      return total + parseFloat(transaction.amount);
    }, 0);
    setTotalBalance(balance);
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
          <>
            <p className="text-xl font-semibold mb-4">
              Total Balance:{" "}
              {totalBalance.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}
            </p>
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
          </>
        ) : (
          <p className="text-gray-500">Loading...</p>
        )}
      </div>
    </div>
  );
};
