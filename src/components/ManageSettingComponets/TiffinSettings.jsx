import React, { useState } from "react";
import { FaSave } from "react-icons/fa";
import { OperatingHoursSection } from "./OperatingHoursSection";
import { ClosureDaysSection } from "./ClosureDaysSection";
import { AdditionalSettingsSection } from "./AdditionalSettingsSection";

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function TiffinSettings() {
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
  const [additionalSettings, setAdditionalSettings] = useState({
    catering: false,
    houseParty: false,
    specialEvents: false,
    freeDelivery: "",
    deliveryDetails: "",
    deliveryCity: "",
    specialMealDay: "",
    location: "",
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

  const handleClosureDateAdd = (date) => {
    setClosureDates((prev) => [...prev, date]);
  };

  const handleAdditionalSettingChange = (setting, value) => {
    setAdditionalSettings((prev) => ({
      ...prev,
      [setting]: value,
    }));
  };

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
        <OperatingHoursSection
          timings={timings}
          handleTimingChange={handleTimingChange}
          useMonday={useMonday}
          setUseMonday={setUseMonday}
          applyMondayTiming={applyMondayTiming}
          daysOfWeek={daysOfWeek}
        />

        <ClosureDaysSection
          closureDates={closureDates}
          handleClosureDateAdd={handleClosureDateAdd}
          setClosureDates={setClosureDates}
        />

        <AdditionalSettingsSection
          additionalSettings={additionalSettings}
          handleAdditionalSettingChange={handleAdditionalSettingChange}
        />

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-150 ease-in-out flex items-center space-x-2"
          >
            <FaSave />
            <span>Save Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
}
