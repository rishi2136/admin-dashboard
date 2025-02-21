<<<<<<< HEAD
import React, { useState } from "react";
=======
import React, { useState, useEffect } from "react";
>>>>>>> c7983b2717f06e0ff11610ca4a58703a0c141e69
import { FaSave } from "react-icons/fa";
import { OperatingHoursSection } from "./OperatingHoursSection";
import { ClosureDaysSection } from "./ClosureDaysSection";
import { AdditionalSettingsSection } from "./AdditionalSettingsSection";
<<<<<<< HEAD
=======
import TiffinDetails from "./TiffinDetails";
import axios from "axios";
>>>>>>> c7983b2717f06e0ff11610ca4a58703a0c141e69

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

<<<<<<< HEAD
export default function TiffinSettings() {
=======
export default function TiffinSettings({ nextStep, email, setEmail }) {
>>>>>>> c7983b2717f06e0ff11610ca4a58703a0c141e69
  const [timings, setTimings] = useState(
    daysOfWeek.reduce(
      (acc, day) => ({
        ...acc,
        [day]: { open: "", close: "" },
      }),
      {}
    )
  );
  const [useMonday, setUseMonday] = useState(false);
  const [closureDates, setClosureDates] = useState([]);
<<<<<<< HEAD
=======
  // const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
>>>>>>> c7983b2717f06e0ff11610ca4a58703a0c141e69
  const [additionalSettings, setAdditionalSettings] = useState({
    catering: false,
    houseParty: false,
    specialEvents: false,
    freeDelivery: "",
    deliveryDetails: "",
    deliveryCity: "",
    specialMealDay: "",
<<<<<<< HEAD
    location: "",
=======
  });

  const [tiffinFormData, setTiffinFormData] = useState({
    email: "",
    phone: {
      countryCode: "+1",
      number: "",
      fullNumber: "",
    },
    tiffinName: "",
    category: "veg",
    address: "",
    city: "",
    ownerName: "",
>>>>>>> c7983b2717f06e0ff11610ca4a58703a0c141e69
  });

  const handleTimingChange = (day, type, value) => {
    setTimings((prev) => ({
      ...prev,
      [day]: { ...prev[day], [type]: value },
    }));
  };

  const applyMondayTiming = () => {
    if (useMonday) {
      const mondayTiming = timings["Monday"];
      setTimings(
        daysOfWeek.reduce(
          (acc, day) => ({
            ...acc,
            [day]: { ...mondayTiming },
          }),
          {}
        )
      );
    }
  };

<<<<<<< HEAD
=======
  useEffect(() => {
    if (useMonday) {
      applyMondayTiming();
    }
  }, [useMonday]);

>>>>>>> c7983b2717f06e0ff11610ca4a58703a0c141e69
  const handleClosureDateAdd = (date) => {
    setClosureDates((prev) => [...prev, date]);
  };

  const handleAdditionalSettingChange = (setting, value) => {
    setAdditionalSettings((prev) => ({
      ...prev,
      [setting]: value,
    }));
  };

<<<<<<< HEAD
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting settings:", {
      timings,
      closureDates,
      additionalSettings,
    });
  };

  return (
    <div className="container bg-gray-50">
      <form onSubmit={handleSubmit} className="space-y-2">
=======
  const handleTiffinDetailsChange = (newTiffinFormData) => {
    setTiffinFormData(newTiffinFormData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (localStorage.getItem("ownerEmail")) {
      localStorage.removeItem("ownerEmail");
    }
    try {
      const endpoint = `${import.meta.env.VITE_SERVER_URL}/api/add-tiffin`;

      const response = await axios["post"](endpoint, {
        email: tiffinFormData.email,
        phone: tiffinFormData.phone,
        tiffinName: tiffinFormData.tiffinName,
        category: tiffinFormData.category,
        ownerName: tiffinFormData.ownerName,
        city: tiffinFormData.city,
        address: tiffinFormData.address,
        serviceClouserDay: closureDates,
        operatingTimes: timings,
        additionalSettings: additionalSettings,
      });
      if (response.data) {
        alert("Data updated successfully!");
        // console.log(response.data.ownerMail);
        // console.log(response.data);
        localStorage.setItem("ownerEmail", response.data.data.ownerMail);
        // console.log(localStorage.getItem("ownerEmail"));
        nextStep();
        // if (localStorage.getItem("ownerEmail") !== null) {
        // }
        // setEmail(response.data.ownerMail);
      }
    } catch (error) {
      console.error(
        "Error saving tiffin details:",
        error.response?.data || error.message
      );
      alert(error.response?.data?.message || "Error saving data");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  // if (error) {
  //   return <div className="text-red-500">Error: {error}</div>;
  // }

  return (
    <div className="container bg-gray-50">
      <form onSubmit={handleSubmit} className="space-y-3">
        <TiffinDetails
          tiffinFormData={tiffinFormData}
          ontiffinFormDataChange={handleTiffinDetailsChange}
        />
>>>>>>> c7983b2717f06e0ff11610ca4a58703a0c141e69
        <OperatingHoursSection
          timings={timings}
          handleTimingChange={handleTimingChange}
          useMonday={useMonday}
          setUseMonday={setUseMonday}
          applyMondayTiming={applyMondayTiming}
          daysOfWeek={daysOfWeek}
        />
<<<<<<< HEAD

=======
>>>>>>> c7983b2717f06e0ff11610ca4a58703a0c141e69
        <ClosureDaysSection
          closureDates={closureDates}
          handleClosureDateAdd={handleClosureDateAdd}
          setClosureDates={setClosureDates}
        />
<<<<<<< HEAD

=======
>>>>>>> c7983b2717f06e0ff11610ca4a58703a0c141e69
        <AdditionalSettingsSection
          additionalSettings={additionalSettings}
          handleAdditionalSettingChange={handleAdditionalSettingChange}
        />
<<<<<<< HEAD

        <div className="flex justify-end">
=======
        <div className="flex justify-end space-x-2">
>>>>>>> c7983b2717f06e0ff11610ca4a58703a0c141e69
          <button
            type="submit"
            className="px-4 py-2 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-150 ease-in-out flex items-center space-x-2"
          >
            <FaSave />
<<<<<<< HEAD
            <span>Save Settings</span>
          </button>
=======
            <span>{"Register your Tiffin"}</span>
          </button>
          {localStorage.getItem("ownerEmail") !== null && (
            <button
              className="bg-blue-500 rounded p-2 text-white"
              onClick={nextStep}
            >
              Next
            </button>
          )}
>>>>>>> c7983b2717f06e0ff11610ca4a58703a0c141e69
        </div>
      </form>
    </div>
  );
}
