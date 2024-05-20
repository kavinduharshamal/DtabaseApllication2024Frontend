import React from "react";
import { SearchCompornent } from "./SearchCompornent";

const Assistant = () => {
  return (
    <div>
      <div
        style={{ background: "#D6DAC8", width: "20vw", height: "10vh" }}
        className="flex justify-center items-center font-bold text-xl rounded-lg shadow-lg m-4"
      >
        Welcome Assistant
      </div>
      <SearchCompornent />
    </div>
  );
};

export default Assistant;
