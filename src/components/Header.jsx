import React, { useState, useEffect } from "react";

const Header = () => {
  const [currentAd, setCurrentAd] = useState(0);
  const ads = [
    {
      title: "Fixed Deposit Rates",
      content: (
        <ul className="text-2xl text-black" style={{ color: "#141E46" }}>
          <li className="animate-pulse animation-delay-300">3 Months - 10%</li>
          <li className="animate-pulse animation-delay-400">6 Months - 15%</li>
          <li className="animate-pulse animation-delay-500">1 Years - 25%</li>
        </ul>
      ),
    },
    {
      title: "Credit Card Offer",
      content: (
        <span
          className="texr-2xl animate-pulse text-black"
          style={{ color: "#141E46" }}
        >
          Get 10% off on Credit Card Annual Fees
        </span>
      ),
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAd((currentAd + 1) % ads.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="flex items-center justify-between px-8 py-4 rounded-2xl shadow-xl relative overflow-hidden text-xl text-black"
      style={{
        width: "95vw",
        height: "150px",
        backgroundColor: "#EFBC9B",
      }}
    >
      <div className="z-10">
        <h1 className="text-3xl font-bold mb-2 animate-slide-in-left text-black">
          ABC Bank
        </h1>
        <p className="text-3xl animate-slide-in-left animation-delay-200 text-white">
          Your Trusted Financial Partner
        </p>
      </div>
      <div className="flex flex-col items-end z-10">
        <div className="flex items-center mb-2 animate-slide-in-right">
          <span className="text-3xl p-3 font-semibold mr-2 text-black">
            {ads[currentAd].title}:
          </span>
          {ads[currentAd].content}
        </div>
      </div>
      <div
        className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#EFBC9B] to-[#FBF3D5] animate-gradient-animation"
        style={{ color: "black" }}
      ></div>
    </div>
  );
};

export default Header;
