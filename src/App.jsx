// App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Login } from "./components/Login";
import { Signup } from "./components/SignUp";
import UserProfile from "./components/UserProfile";
import ATMComponent from "./components/ATMComponent";
import AdminLogin from "./components/AdminLogin";
import { AdminDashboard } from "./components/AdminDashboard";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/atm" element={<ATMComponent />} />
        <Route path="/user/:id" element={<UserProfile />} />{" "}
        <Route path="/admin" element={<AdminLogin />} />{" "}
        <Route path="/admindashboard/:id" element={<AdminDashboard />} />{" "}
        {/* Add :id for route parameter */}
      </Routes>
    </Router>
  );
};

export default App;
