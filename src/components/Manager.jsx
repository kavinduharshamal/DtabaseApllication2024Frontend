import axios from "axios";
import React, { useState } from "react";
import { TotalSavings } from "./adminPanel/TotalSavings";
import { MonthlySavings } from "./adminPanel/MonthlySavings";
import NumberOfUser from "./adminPanel/NumberOfUser";
import { SearchCompornent } from "./SearchCompornent";

export const Manager = () => {
  const [userData, setUserData] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [editedData, setEditedData] = useState({});

  const handleInputChange = (e) => {
    setUserData(e.target.value);
  };

  const handleEditClick = (index, user) => {
    const newEditedData = { ...editedData };
    newEditedData[index] = { ...user };
    setEditedData(newEditedData);
  };

  const handleEditChange = (e, index, field) => {
    const newEditedData = { ...editedData };
    newEditedData[index][field] = e.target.value;
    setEditedData(newEditedData);
  };

  const handleSubmitEdit = async (index) => {
    const editedUser = editedData[index];
    console.log(editedUser);
    try {
      const response = await axios.post(
        "http://localhost:3001/api/editthedata",
        {
          user_id: editedUser.user_id,
          first_name: editedUser.first_name,
          last_name: editedUser.last_name,
          street: editedUser.street,
          city: editedUser.city,
          province: editedUser.province,
          birthday: editedUser.birthday,
          phone_number: editedUser.phone_number,
          national_id: editedUser.national_id,
        }
      );

      console.log(response.data.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/userckerinadmin",
        {
          searchinput: userData,
        }
      );
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="container mx-auto p-4 ">
      <div
        style={{ background: "#D6DAC8", width: "20vw", height: "10vh" }}
        className="flex justify-center items-center font-bold text-xl rounded-lg shadow-lg"
      >
        Welcome Manager
      </div>
      <div
        className="searchContainer m-3 p-3 rounded-lg shadow-md"
        style={{
          background: "#D6DAC8",
        }}
      >
        <label
          className="block mb-2 text-gray-700 font-semibold"
          htmlFor="usercheck"
        >
          Usercheck - Add Anything Like Name, ID, and Phone number
        </label>
        <input
          className="border p-2 mb-4 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-[#EFBC9B]"
          type="text"
          id="usercheck"
          value={userData}
          onChange={handleInputChange}
          style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}
        />
        <button
          className="bg-[#EFBC9B] text-white px-4 py-2 rounded hover:bg-[#D6DAC8] transition-colors duration-300"
          onClick={handleSubmit}
        >
          Submit
        </button>

        {/* Display fetched data */}
        <div
          className="mt-4 max-h-[60vh] overflow-y-auto"
          style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}
        >
          {searchResults.map((user, index) => (
            <div
              key={index}
              className="border p-4 mb-2 bg-[#FBF3D5] rounded-lg shadow-md"
            >
              <button
                className="bg-[#EFBC9B] text-white px-3 py-1 rounded hover:bg-[#D6DAC8] transition-colors duration-300 mb-2"
                onClick={() => handleEditClick(index, user)}
              >
                Edit
              </button>
              {editedData[index] ? (
                <div className="flex flex-col">
                  <label
                    className="my-1 text-gray-700 font-semibold"
                    htmlFor={`first_name_${index}`}
                  >
                    First Name:
                  </label>
                  <input
                    className="my-1 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EFBC9B]"
                    type="text"
                    id={`first_name_${index}`}
                    value={editedData[index].first_name}
                    onChange={(e) => handleEditChange(e, index, "first_name")}
                    placeholder="First Name"
                  />
                  <label className="my-1" htmlFor={`last_name_${index}`}>
                    Last Name:
                  </label>
                  <input
                    className="my-1 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EFBC9B]"
                    type="text"
                    id={`last_name_${index}`}
                    value={editedData[index].last_name}
                    onChange={(e) => handleEditChange(e, index, "last_name")}
                    placeholder="Last Name"
                  />
                  <label className="my-1" htmlFor={`birthday_${index}`}>
                    Birthday:
                  </label>
                  <input
                    className="my-1 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EFBC9B]"
                    type="date"
                    id={`birthday_${index}`}
                    value={editedData[index].birthday}
                    onChange={(e) => handleEditChange(e, index, "birthday")}
                    placeholder="Birthday"
                  />
                  <label className="my-1" htmlFor={`address_${index}`}>
                    Address:
                  </label>
                  <input
                    className="my-1 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EFBC9B]"
                    type="text"
                    id={`address_${index}`}
                    value={editedData[index].address}
                    onChange={(e) => handleEditChange(e, index, "address")}
                    placeholder="Address"
                  />
                  <label className="my-1" htmlFor={`city_${index}`}>
                    City:
                  </label>
                  <input
                    className="my-1 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EFBC9B]"
                    type="text"
                    id={`city_${index}`}
                    value={editedData[index].city}
                    onChange={(e) => handleEditChange(e, index, "city")}
                    placeholder="City"
                  />
                  <label className="my-1" htmlFor={`province_${index}`}>
                    Province:
                  </label>
                  <input
                    className="my-1 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EFBC9B]"
                    type="text"
                    id={`province_${index}`}
                    value={editedData[index].province}
                    onChange={(e) => handleEditChange(e, index, "province")}
                    placeholder="Province"
                  />
                  <label className="my-1" htmlFor={`street_${index}`}>
                    Street:
                  </label>
                  <input
                    className="my-1 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EFBC9B]"
                    type="text"
                    id={`street_${index}`}
                    value={editedData[index].street}
                    onChange={(e) => handleEditChange(e, index, "street")}
                    placeholder="Street"
                  />
                  <label className="my-1" htmlFor={`phone_number_${index}`}>
                    Phone Number:
                  </label>
                  <input
                    className="my-1 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EFBC9B]"
                    type="tel"
                    id={`phone_number_${index}`}
                    value={editedData[index].phone_number}
                    onChange={(e) => handleEditChange(e, index, "phone_number")}
                    placeholder="Phone Number"
                  />
                  <label className="my-1" htmlFor={`national_id_${index}`}>
                    National ID:
                  </label>
                  <input
                    className="my-1 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EFBC9B]"
                    type="text"
                    id={`national_id_${index}`}
                    value={editedData[index].national_id}
                    onChange={(e) => handleEditChange(e, index, "national_id")}
                    placeholder="National ID"
                  />
                  <button
                    className="bg-[#EFBC9B] text-white px-4 py-2 rounded hover:bg-[#D6DAC8] transition-colors duration-300 mt-2"
                    onClick={() => handleSubmitEdit(index)}
                  >
                    Submit
                  </button>
                </div>
              ) : (
                <>
                  <p className="text-gray-700 font-semibold">
                    User ID: {user.user_id}
                  </p>
                  <p className="text-gray-700 font-semibold">
                    Name: {user.first_name} {user.last_name}
                  </p>
                  <p className="text-gray-700 font-semibold">
                    Birthday: {new Date(user.birthday).toLocaleDateString()}
                  </p>
                  <p className="text-gray-700 font-semibold">
                    Address: {user.address}
                  </p>
                  <p className="text-gray-700 font-semibold">
                    City: {user.city}
                  </p>
                  <p className="text-gray-700 font-semibold">
                    Province: {user.province}
                  </p>
                  <p className="text-gray-700 font-semibold">
                    Street: {user.street}
                  </p>
                  <p className="text-gray-700 font-semibold">
                    Phone Number: {user.phone_number}
                  </p>
                  <p className="text-gray-700 font-semibold">
                    National ID: {user.national_id}
                  </p>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center items-center">
        <TotalSavings />
        <NumberOfUser />
      </div>

      <MonthlySavings />
      <SearchCompornent />
    </div>
  );
};
