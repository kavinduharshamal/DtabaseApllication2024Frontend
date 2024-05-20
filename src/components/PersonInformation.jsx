import React from "react";

export const PersonInformation = (props) => {
  const calculateAge = (birthdate) => {
    const today = new Date();
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  return (
    <div
      className="userInfor w-2/6 h-full bg-light-tan rounded-lg p-9 font-mono shadow-lg  transition-transform duration-300 hover:scale-105"
      style={{
        fontFamily: "'Poppins', sans-serif",
        background: "#D6DAC8",
      }}
    >
      <div className="text-brown font-semibold mb-2">Name: {props.name}</div>
      <div className="text-brown mb-2">Address: {props.address}</div>
      <div className="text-brown mb-2">
        Age: {calculateAge(props.age)} years old
      </div>
      <div className="text-brown mb-2">UserName: {props.username}</div>
      <div className="text-brown mb-2">BranchNumber: {props.branch}</div>
    </div>
  );
};
