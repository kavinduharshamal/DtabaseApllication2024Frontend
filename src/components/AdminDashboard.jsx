import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Assistant from "./Assistant";
import { Manager } from "./Manager";
import { Superviser } from "./Superviser";

export const AdminDashboard = () => {
  const { id } = useParams();
  const [adminPosition, setAdminPosition] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3001/api/admindatafetch",
          {
            emp_id: id,
          }
        );

        setAdminPosition(response.data.data);
        console.log(adminPosition);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  // Conditional rendering based on adminPosition
  return (
    <div>
      {adminPosition === "Assistant" && <Assistant />}
      {adminPosition === "Manager" && <Manager />}
      {adminPosition === "Supervisor" && <Superviser />}
    </div>
  );
};
