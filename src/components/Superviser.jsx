import axios from "axios";
import React, { useEffect } from "react";
import { SearchCompornent } from "./SearchCompornent";

export const Superviser = () => {
  return (
    <div>
      <div
        style={{ background: "#D6DAC8", width: "20vw", height: "10vh" }}
        className="flex justify-center items-center font-bold text-xl rounded-lg shadow-lg m-4"
      >
        Welcome Supervisor
      </div>
      <SearchCompornent />
    </div>
  );
};
