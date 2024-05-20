import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Username:", username);
    console.log("Password:", password);
    try {
      const response = await axios.post(
        "http://localhost:3001/api/adminlogin",
        {
          username: username,
          password: password,
        }
      );
      console.log(response.data.empId);
      if (response.data.results === "notAdmin") {
        alert("You are not authorized as an admin.");
      } else {
        navigate(`/admindashboard/${response.data.empId}`);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #f0f9ff 0%, #cbebff 47%, #a1dbff 100%)",
      }}
    >
      <div
        className="container bg-white m-5 flex flex-col justify-center items-center rounded-lg shadow-lg"
        style={{
          width: "400px",
          padding: "40px",
          boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
          borderRadius: "10px",
          animation: "fadeIn 0.5s ease-in-out",
        }}
      >
        <h2
          className="text-3xl font-bold mb-8 text-center"
          style={{
            background: "linear-gradient(135deg, #3c8ce7 0%, #00eaff 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            animation: "slideIn 0.5s ease-in-out",
          }}
        >
          Admin Login
        </h2>
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              marginBottom: "20px",
              padding: "12px",
              width: "100%",
              borderRadius: "5px",
              border: "1px solid #ccc",
              boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.1)",
              transition: "box-shadow 0.3s ease-in-out",
            }}
            className="focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              marginBottom: "20px",
              padding: "12px",
              width: "100%",
              borderRadius: "5px",
              border: "1px solid #ccc",
              boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.1)",
              transition: "box-shadow 0.3s ease-in-out",
            }}
            className="focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="my-7 px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300"
            style={{
              width: "100%",
            }}
          >
            Submit
          </button>
        </form>
      </div>
      <style>
        {`
          @keyframes fadeIn {
            0% {
              opacity: 0;
              transform: translateY(-20px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes slideIn {
            0% {
              opacity: 0;
              transform: translateX(-20px);
            }
            100% {
              opacity: 1;
              transform: translateX(0);
            }
          }
        `}
      </style>
    </div>
  );
};

export default AdminLogin;
