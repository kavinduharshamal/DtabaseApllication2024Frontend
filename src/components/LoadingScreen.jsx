import React from "react";

const LoadingScreen = () => {
  return (
    <div
      className="min-h-screen flex justify-center items-center"
      style={{ backgroundColor: "#f3f4f6" }}
    >
      <div
        className="loading-panel"
        style={{
          width: "200px",
          height: "200px",
          backgroundColor: "#ffffff",
          borderRadius: "10px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <div
          className="loading-circle"
          style={{
            border: "5px solid #f3f3f3",
            borderTop: "5px solid #333",
            borderRadius: "50%",
            width: "50px",
            height: "50px",
            animation: "spin 1s linear infinite",
          }}
        ></div>
        <p className="mt-4">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
