// Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserProfile from "./UserProfile";
import "tailwindcss/tailwind.css";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        navigate(`/user/${userData.userData.id}`);
      } else {
        const errorResponse = await response.json();
        setError(errorResponse.error || "Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("An error occurred during login");
    }
  };

  const handleSignUp = () => {
    console.log("Signing up with:", username, password);
    navigate("/signup");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        background: `linear-gradient(45deg, #EFBC9B, #FBF3D5, #D6DAC8, #9CAFAA)`,
        backgroundSize: "400% 400%",
        animation: "gradient 15s ease infinite",
      }}
    >
      <div
        className="max-w-xl w-full bg-white p-8 rounded-md shadow-md"
        style={{}}
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-semibold text-gray-800">ABC Bank</h2>
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 font-semibold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            id="username"
            type="text"
            className="appearance-none border rounded-md py-3 px-4 w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
              transition: "box-shadow 0.3s ease-in-out",
            }}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 font-semibold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            className="appearance-none border rounded-md py-3 px-4 w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
              transition: "box-shadow 0.3s ease-in-out",
            }}
          />
        </div>
        {error && (
          <p className="text-red-500 mb-6 text-center font-semibold">{error}</p>
        )}
        <div className="flex justify-between items-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-md focus:outline-none focus:shadow-outline"
            onClick={handleLogin}
            style={{
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
              transition: "box-shadow 0.3s ease-in-out",
            }}
          >
            Login
          </button>
          <button
            className="text-blue-500 hover:text-blue-700 font-semibold focus:outline-none"
            onClick={handleSignUp}
          >
            Sign Up
          </button>
        </div>
      </div>
      <style>
        {`
          @keyframes gradient {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }
        `}
      </style>
    </div>
  );
};
