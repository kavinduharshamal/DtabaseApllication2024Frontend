import axios from "axios";
import React, { useEffect, useState } from "react";

const CardDetails = (props) => {
  const [card, setCard] = useState(null);
  const [part1, setPart1] = useState(null);
  const [part2, setPart2] = useState(null);
  const [part3, setPart3] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3001/api/cardDeatils",
          {
            user_id: props.user_id,
          }
        );

        console.log(response.data.results);
        if (response.data.results.length > 0) {
          setCard(response.data.results);
          splitCardNumber(response.data.results[0].card_number);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [props.user_id]);

  const splitCardNumber = (cardNumber) => {
    const cardNumberStr = String(cardNumber);

    setPart1(cardNumberStr.slice(0, 3));
    setPart2(cardNumberStr.slice(3, 6));
    setPart3(cardNumberStr.slice(6));
  };

  const generateRandomCardNumber = () => {
    const min = 100000000;
    const max = 999999999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const generateRandomCVVNumber = () => {
    const min = 100;
    const max = 999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const getDebitCardExpirationDate = () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;

    const formattedCurrentDate = `${currentMonth}/${String(currentYear).slice(
      -2
    )}`;

    const expirationDate = new Date(currentYear + 4, currentMonth - 1);

    const formattedExpirationDate = `${expirationDate.getMonth() + 1}/${String(
      expirationDate.getFullYear()
    ).slice(-2)}`;

    return {
      formattedCurrentDate,
      formattedExpirationDate,
    };
  };

  const createDebitcard = async () => {
    const cardNumber = generateRandomCardNumber();
    const cvv = generateRandomCVVNumber();
    const { formattedCurrentDate, formattedExpirationDate } =
      getDebitCardExpirationDate();
    console.log("Current Date:", formattedExpirationDate);
    try {
      const response = await axios.post(
        "http://localhost:3001/api/createdebitcard",
        {
          card_number: cardNumber,
          cvv: cvv,
          user_id: props.user_id,
          exp_data: formattedExpirationDate,
        }
      );

      console.log(response.data.results);
      if (response.data.results.length > 0) {
        setCard(response.data.results);
      }

      console.log(response.data);
      if (response.data.message === "sucessfully added the card") {
        location.reload();
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div
      className="card rounded-lg m-5 shadow-lg hover:scale-105 transition-transform duration-300"
      style={{
        width: "30vw",
        height: "15vh",
        fontFamily: "'Open Sans', sans-serif",
        background: "linear-gradient(to right, #F5EBE0, #E8E8E4)",
      }}
    >
      {card ? (
        <div className="p-4">
          <div className="cardnumber flex justify-center items-center py-3 font-mono text-gray-600">
            <div className="p-2">{part1}</div>
            <div className="p-2">{part2}</div>
            <div className="p-2">{part3}</div>
          </div>
          <div className="flex justify-between px-12 font-mono text-gray-600">
            <div>
              CVV <br />
              {card[0].cvv}
            </div>
            <div>
              EXP
              <br />
              {card[0].exp_date}
            </div>
          </div>
        </div>
      ) : (
        <div className="createcard flex flex-col items-center justify-center py-10 text-gray-600">
          Create Your Own Debit Card
          <button
            className="button bg-white p-2 rounded-xl shadow-md text-gray-600 mt-4 hover:bg-gray-200 transition-colors duration-300"
            onClick={createDebitcard}
          >
            Request a Card
          </button>
        </div>
      )}
    </div>
  );
};

export default CardDetails;
