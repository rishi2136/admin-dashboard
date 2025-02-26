import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MultiSelectDropdown from "../components/UserAccessControl/MultiSelectDropdown";

const Signup = ({ handleCloseClick }) => {
  const navigate = useNavigate();
  const [selectedOptions, setSelectedOptions] = useState([]);
  let [user, setUser] = useState({
    username: "",
    password: "",
    email: "",
    role: selectedOptions,
  });

  console.log(selectedOptions);

  const handleChange = (evt) => {
    let { name, value } = evt.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const res = await axios.post(
        import.meta.env.VITE_SERVER_URL + "/user/signup",
        {
          username: user.username,
          password: user.password,
          email: user.email,
          role: selectedOptions,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res.data);
      if (res.data.response === "ok") {
        alert(res.data.message);
        navigate("/log-in");
      }
      setUser({
        username: "",
        password: "",
        email: "",
        role: [],
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex bg-gray-100">
      <div className="rounded-lg shadow-lg w-96 p-8">
        <div>
          {" "}
          <span
            className="bg-black text-white p-1 m-1 float-end cursor-pointer"
            onClick={handleCloseClick}
          >
            X
          </span>
        </div>
        <h1 className="text-2xl font-bold text-center mb-6">Sign Up</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={user.username}
            onChange={handleChange}
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={user.email}
            onChange={handleChange}
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={user.password}
            onChange={handleChange}
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <MultiSelectDropdown
            selectedOptions={selectedOptions}
            setSelectedOptions={setSelectedOptions}
          />

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
