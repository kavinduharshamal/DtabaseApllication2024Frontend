import React, { useState } from "react";

const ATMComponent = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [amount, setAmount] = useState("");
  const [transactionType, setTransactionType] = useState("deposit");
  const [transactionSuccess, setTransactionSuccess] = useState(false);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleTransactionTypeChange = (type) => {
    setTransactionType(type);
  };

  const handleTransaction = async () => {
    try {
      // Validate username and password (you may want to implement this on the server)
      // For simplicity, assuming a successful validation for this example
      const response = await fetch(`http://localhost:3001/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        // If validation is successful, perform the transaction (add or subtract amount from savings)
        const userData = await response.json();
        const transactionAmount =
          transactionType === "deposit"
            ? parseFloat(amount)
            : -parseFloat(amount);

        const savingsResponse = await fetch(
          `http://localhost:3001/api/add-to-savings`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user_id: userData.userData.id,
              amount: transactionAmount,
            }),
          }
        );

        if (savingsResponse.ok) {
          setTransactionSuccess(true);
        } else {
          console.error("Failed to perform transaction");
        }
      } else {
        console.error("Invalid username or password");
      }
    } catch (error) {
      console.error("Error performing transaction:", error);
    }
  };

  return (
    <div
      className="container mx-auto mt-8 p-8 rounded-lg shadow-lg relative overflow-hidden flex justify-center items-center flex-col "
      style={{
        backgroundColor: "#FBF3D5",
        fontFamily: "'Open Sans', sans-serif",
        position: "absolute",
        top: "22%",
        left: "7%",
      }}
    >
      <h2
        className="text-3xl font-semibold mb-6 text-black animate-slide-in-left"
        style={{ color: "#9CAFAA" }}
      >
        ABC Bank ATM
      </h2>
      {!transactionSuccess ? (
        <div>
          <div className="mb-4 animate-slide-in-left animation-delay-200">
            <label
              htmlFor="username"
              className="block font-semibold mb-2 text-black"
              style={{ color: "#000000" }}
            >
              Username:
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={handleUsernameChange}
              className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EFBC9B]"
              style={{
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                transition: "box-shadow 0.3s ease-in-out",
                color: "#000000",
              }}
            />
          </div>
          <div className="mb-4 animate-slide-in-left animation-delay-400">
            <label
              htmlFor="password"
              className="block font-semibold mb-2 text-black"
              style={{ color: "#000000" }}
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EFBC9B]"
              style={{
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                transition: "box-shadow 0.3s ease-in-out",
                color: "#000000",
              }}
            />
          </div>
          <div className="mb-4 animate-slide-in-left animation-delay-600">
            <label
              htmlFor="amount"
              className="block font-semibold mb-2 text-black"
              style={{ color: "#000000" }}
            >
              Amount:
            </label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={handleAmountChange}
              className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EFBC9B]"
              style={{
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                transition: "box-shadow 0.3s ease-in-out",
                color: "#000000",
              }}
            />
          </div>
          <div className="mb-6 animate-slide-in-left animation-delay-800">
            <button
              onClick={() => handleTransactionTypeChange("deposit")}
              className={`px-4 py-2 rounded-md mr-4 font-semibold focus:outline-none focus:ring-2 focus:ring-[#EFBC9B] ${
                transactionType === "deposit"
                  ? "bg-[#EFBC9B] text-black"
                  : "bg-[#D6DAC8] text-black"
              }`}
              style={{
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                transition: "box-shadow 0.3s ease-in-out",
              }}
            >
              Deposit
            </button>
            <button
              onClick={() => handleTransactionTypeChange("withdraw")}
              className={`px-4 py-2 rounded-md font-semibold focus:outline-none focus:ring-2 focus:ring-[#EFBC9B] ${
                transactionType === "withdraw"
                  ? "bg-[#EFBC9B] text-black"
                  : "bg-[#D6DAC8] text-black"
              }`}
              style={{
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                transition: "box-shadow 0.3s ease-in-out",
              }}
            >
              Withdraw
            </button>
          </div>
          <button
            onClick={handleTransaction}
            className="bg-[#EFBC9B] text-black px-6 py-3 rounded-md font-semibold focus:outline-none focus:ring-2 focus:ring-[#9CAFAA] animate-pulse"
            style={{
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
              transition: "box-shadow 0.3s ease-in-out",
            }}
          >
            Perform Transaction
          </button>
        </div>
      ) : (
        <p
          className="text-black animate-slide-in-left"
          style={{ color: "#000000" }}
        >
          Transaction successful! Amount has been{" "}
          {transactionType === "deposit" ? "added to" : "withdrawn from"}{" "}
          savings.
        </p>
      )}
      <div
        className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#EFBC9B] to-[#FBF3D5] animate-gradient-animation"
        style={{ zIndex: -1 }}
      ></div>
    </div>
  );
};

export default ATMComponent;
