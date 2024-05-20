import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { PersonInformation } from "./PersonInformation";
import TransactionHistory from "./TransactionHistory";
import CardDeatils from "./CardDeatils";
import { MoneyContainer } from "./MoneyContainer";
import ExchangeRateComponent from "./ExchnageRateComponent";
import UserChecker from "./UserChecker";
import { ForignExchnage } from "./ForignExchnage";
import { FixedDeposite } from "./FixedDeposite";
import { FixedDepositeDateChecker } from "./FixedDepositeDateChecker";
import { Schedulepayment } from "./Schedulepayment";
import LoadingScreen from "./LoadingScreen";
import Header from "./Header";
import Message from "./Message";

const DashboardComponent = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [totalBalance, setTotalBalance] = useState(0.0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/user/${id}`);
        if (response.ok) {
          const userData = await response.json();
          setUserData(userData);
          console.log(userData);
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const fetchTotalBalance = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/user/${id}/totalbalance`
        );
        if (response.ok) {
          const totalBalanceData = await response.json();
          console.log(totalBalanceData.total_balance);
          setTotalBalance(totalBalanceData.total_balance);
        } else {
          console.error("Failed to fetch total balance");
        }
      } catch (error) {
        console.error("Error fetching total balance:", error);
      }
    };

    const loadData = async () => {
      await Promise.all([fetchUserData(), fetchTotalBalance()]);
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    };

    loadData();
  }, [id]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!userData || totalBalance === null) {
    return <p>Loading...</p>;
  }

  return (
    <div
      className="min-h-screen text-white p-8"
      style={{ background: "white", color: "black" }}
    >
      <Header />
      <div className="container mx-auto">
        <div className="flex justify-center items-center">
          <PersonInformation
            name={`${userData.first_name} ${userData.last_name}`}
            address={`${userData.street}, ${userData.city}, ${userData.province}`}
            age={`${userData.birthday}`}
            username={userData.username}
            branch={userData.branch_number}
          />
          <div className="flex flex-col justify-center items-center">
            <CardDeatils user_id={id} />
            <ExchangeRateComponent />
          </div>
          <MoneyContainer user_id={id} />
        </div>
        <TransactionHistory user_id={id} />
        <UserChecker
          fullname={userData.first_name + userData.last_name}
          userID={id}
        />
        <div className="flex items-center justify-center">
          <ForignExchnage user_id={id} Balance={totalBalance} />
          <FixedDeposite user_id={id} />
        </div>
        <div className="flex items-center justify-center">
          <FixedDepositeDateChecker user_id={id} Balance={totalBalance} />
          <Schedulepayment user_id={id} />
        </div>
        <Message />
      </div>
    </div>
  );
};

export default DashboardComponent;
