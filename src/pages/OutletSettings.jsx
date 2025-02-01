import React, { useState } from "react";

export default function OutletSettings() {
  const [outletName, setOutletName] = useState("Empyrean Expedition");
  const [contactNumber, setContactNumber] = useState("");
  const [openingHours, setOpeningHours] = useState("");
  const [closingHours, setClosingHours] = useState("");
  const [deliveryToggle, setDeliveryToggle] = useState(true);

  const saveSettings = () => {
    alert(`Saved settings for ${outletName}`);
  };

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold text-gray-700">Outlet Settings</h1>

      <div className="bg-white rounded shadow p-4 space-y-6">
        {/* Basic Info */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Outlet Name
          </label>
          <input
            type="text"
            className="border rounded w-full px-2 py-1 focus:outline-none focus:border-red-500 transition"
            value={outletName}
            onChange={(e) => setOutletName(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Contact Number
          </label>
          <input
            type="text"
            className="border rounded w-full px-2 py-1 focus:outline-none focus:border-red-500 transition"
            placeholder="e.g. +91 12345 67890"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
          />
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm text-gray-600 mb-1">
              Opening Hours
            </label>
            <input
              type="text"
              className="border rounded w-full px-2 py-1 focus:outline-none focus:border-red-500 transition"
              placeholder="e.g. 10:00 AM"
              value={openingHours}
              onChange={(e) => setOpeningHours(e.target.value)}
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm text-gray-600 mb-1">
              Closing Hours
            </label>
            <input
              type="text"
              className="border rounded w-full px-2 py-1 focus:outline-none focus:border-red-500 transition"
              placeholder="e.g. 11:00 PM"
              value={closingHours}
              onChange={(e) => setClosingHours(e.target.value)}
            />
          </div>
        </div>

        {/* Animated Toggle for Delivery On/Off */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Delivery Service</span>
          <div
            className={`w-12 h-6 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer transition ${
              deliveryToggle ? "justify-end bg-green-400" : "justify-start"
            }`}
            onClick={() => setDeliveryToggle(!deliveryToggle)}
          >
            <div className="bg-white w-4 h-4 rounded-full shadow transition-all" />
          </div>
          <span className="text-sm">
            {deliveryToggle ? "Enabled" : "Disabled"}
          </span>
        </div>

        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          onClick={saveSettings}
        >
          Save Settings
        </button>
      </div>
    </div>
  );
}
