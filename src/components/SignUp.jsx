import React, { useState } from "react";
import axios from "axios";
import "tailwindcss/tailwind.css"; // Import Tailwind CSS

export const Signup = () => {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [birthday, setBirthday] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [national_id, setNationalId] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [branch, setBranch] = useState(0);
  const [successful, setSuccessful] = useState(false);
  const [error, setError] = useState(false);
  const [validationError, setValidationError] = useState("");

  const gotoLogin = () => {
    window.location.href = "/";
  };

  const validateInput = (value) => {
    const forbiddenChars = ["`", '"', "||", "/"];
    for (let i = 0; i < forbiddenChars.length; i++) {
      if (value.includes(forbiddenChars[i])) {
        return false;
      }
    }
    return true;
  };

  const sanitizeInput = (value) => {
    return value.replace(/[`"||/]/g, "");
  };

  const handleSignup = async () => {
    if (
      !validateInput(first_name) ||
      !validateInput(last_name) ||
      !validateInput(street) ||
      !validateInput(city) ||
      !validateInput(province) ||
      !validateInput(phone_number) ||
      !validateInput(national_id) ||
      !validateInput(username) ||
      !validateInput(password)
    ) {
      setValidationError(
        "You can't use characters like `, \", ||, / in the input fields."
      );
      return;
    }

    try {
      const response = await axios.post("http://localhost:3001/api/signup", {
        first_name: sanitizeInput(first_name),
        last_name: sanitizeInput(last_name),
        street: sanitizeInput(street),
        city: sanitizeInput(city),
        province: sanitizeInput(province),
        birthday,
        phone_number: sanitizeInput(phone_number),
        national_id: sanitizeInput(national_id),
        username: sanitizeInput(username),
        password: sanitizeInput(password),
        branch, // Include branch in the request
      });
      console.log(branch);
      setSuccessful(true);
      console.log(response.data.message);
      // You can perform additional actions on successful signup
    } catch (error) {
      console.error("Error signing up:", error.response.data.error);
      if (
        error.response.data.error === "Duplicate entry. User already exists."
      ) {
        setError(true);
      }
      // Handle error, display error message to the user, etc.
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-teal-400 to-blue-500 flex-col">
      <div
        className="my-9"
        style={{
          height: "5vh",
        }}
      ></div>
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Sign Up</h2>
          <p className="text-gray-600"></p>
        </div>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="first_name"
              className="block text-gray-700 font-semibold mb-2"
            >
              First Name
            </label>
            <input
              type="text"
              id="first_name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={first_name}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="last_name"
              className="block text-gray-700 font-semibold mb-2"
            >
              Last Name
            </label>
            <input
              type="text"
              id="last_name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={last_name}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="street"
              className="block text-gray-700 font-semibold mb-2"
            >
              Street
            </label>
            <input
              type="text"
              id="street"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="city"
              className="block text-gray-700 font-semibold mb-2"
            >
              City
            </label>
            <input
              type="text"
              id="city"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="province"
              className="block text-gray-700 font-semibold mb-2"
            >
              Province
            </label>
            <input
              type="text"
              id="province"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={province}
              onChange={(e) => setProvince(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="birthday"
              className="block text-gray-700 font-semibold mb-2"
            >
              Birthday
            </label>
            <input
              type="date"
              id="birthday"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="phone_number"
              className="block text-gray-700 font-semibold mb-2"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phone_number"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={phone_number}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="national_id"
              className="block text-gray-700 font-semibold mb-2"
            >
              National ID
            </label>
            <input
              type="text"
              id="national_id"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={national_id}
              onChange={(e) => setNationalId(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="username"
              className="block text-gray-700 font-semibold mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 font-semibold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-gray-700 font-semibold mb-2"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="branch"
              className="block text-gray-700 font-semibold mb-2"
            >
              Branch
            </label>
            <select
              id="branch"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={branch}
              onChange={(e) => setBranch(parseInt(e.target.value))}
            >
              <option value="">Select Branch</option>
              <option value="1">Branch 1</option>
              <option value="2">Branch 2</option>
              <option value="3">Branch 3</option>
              {/* Add more options for branch4, branch5, ..., branch10 */}
            </select>
          </div>
          <div className="text-center">
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={handleSignup}
            >
              Sign Up
            </button>
          </div>

          {validationError && (
            <p className="text-red-500 text-center mt-4">{validationError}</p>
          )}

          {successful && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <p className="text-green-500 text-center mb-4">
                  User Details Entered Successfully
                </p>
                <div className="text-center">
                  <button
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={gotoLogin}
                  >
                    Login
                  </button>
                </div>
              </div>
            </div>
          )}
          {error && (
            <p className="text-red-500 text-center mt-4">
              Duplication Happened
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
