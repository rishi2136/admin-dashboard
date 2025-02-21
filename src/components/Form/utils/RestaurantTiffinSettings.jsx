import React, { useState, useEffect } from "react";
import { FaSave } from "react-icons/fa";
import { OperatingHoursSection } from "../../ManageSettingComponets/OperatingHoursSection";
import { ClosureDaysSection } from "../../ManageSettingComponets/ClosureDaysSection";
import { AdditionalSettingsSection } from "../../ManageSettingComponets/AdditionalSettingsSection";
import TiffinDetails from "../../ManageSettingComponets/TiffinDetails";
import axios from "axios";

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function RestaurantTiffinSettings({ ID }) {
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
  const [error, setError] = useState(null);

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

  useEffect(() => {
    if (useMonday) {
      applyMondayTiming();
    }
  }, [useMonday]);

  const handleClosureDateAdd = (date) => {
    setClosureDates((prev) => [...prev, date]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = `${
        import.meta.env.VITE_SERVER_URL
      }/firm/${ID}/update-time`;

      const response = await axios["post"](endpoint, {
        serviceClouserDay: closureDates,
        operatingTimes: timings,
      });
      console.log(response.data);
    } catch (error) {
      console.error(
        "Error saving tiffin details:",
        error.response?.data || error.message
      );
      alert(error.response?.data?.message || "Error saving data");
    }
  };

  // if (error) {
  //   return <div className="text-red-500">Error: {error}</div>;
  // }

  return (
    <div className="container mx-auto bg-gray-50">
      <form onSubmit={handleSubmit} className="space-y-3">
        <ClosureDaysSection
          closureDates={closureDates}
          handleClosureDateAdd={handleClosureDateAdd}
          setClosureDates={setClosureDates}
        />
        <OperatingHoursSection
          timings={timings}
          handleTimingChange={handleTimingChange}
          useMonday={useMonday}
          setUseMonday={setUseMonday}
          applyMondayTiming={applyMondayTiming}
          daysOfWeek={daysOfWeek}
        />

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-150 ease-in-out flex items-center space-x-2"
          >
            <FaSave />
            <span>{"Add Details"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
