import axios from "axios";
import React, { useEffect, useState } from "react";

export const Schedulepayment = (props) => {
  const [payments, setPayment] = useState(null);
  const [countdownActive, setCountdownActive] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3001/api/getSchedulepayment",
          {
            user_id: props.user_id,
          }
        );
        setPayment(response.data);
        console.log(payments);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [props.user_id]);

  return (
    <div
      className="container rounded-lg m-6 p-8 overflow-auto shadow-lg hover:scale-105 transition-transform duration-300"
      style={{
        width: "34vw",
        maxHeight: "40vh",
        background: "#D6DAC8",
      }}
    >
      <h2 className="text-3xl font-bold mb-6 text-A79277">
        Scheduled Payments
      </h2>
      {payments && payments.length > 0 ? (
        <ul className="space-y-4">
          {payments.map((payment, index) => (
            <li
              key={payment.schedule_id}
              className=" p-6 rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
              style={{
                background: "#FBF3D5",
              }}
            >
              <div className="mb-4">
                <label htmlFor="" className="block font-semibold text-A79277">
                  Schedule ID: {payment.schedule_id}
                </label>
              </div>
              <div className="flex flex-col space-y-2">
                <label htmlFor="" className="font-semibold text-A79277">
                  Amount: {payment.amount}
                </label>
                <label htmlFor="" className="font-semibold text-A79277">
                  Transfer Date:{" "}
                  {new Date(
                    payment.date_of_plan_to_transfer
                  ).toLocaleDateString()}
                </label>
                <label htmlFor="" className="font-semibold text-A79277">
                  Created Date:{" "}
                  {new Date(
                    payment.date_of_schedule_created
                  ).toLocaleDateString()}
                </label>
                <label htmlFor="" className="font-semibold text-A79277">
                  User ID: {payment.user_id}
                </label>
                <label htmlFor="" className="font-semibold text-A79277">
                  Receiver User ID: {payment.user_id_of_receiver}
                </label>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500">
          No scheduled payments found.
        </p>
      )}
    </div>
  );
};
