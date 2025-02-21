import React, { useState, useEffect } from "react";
import downArrow from '/icons/down-arrow.png';

const events = [
  "Forgot Password",
  "On Account Delete",
  "Order Placed",
  "Order Failed",
  "Order Cancelled",
  "Sign Up",
  "Weekly",
  "Login",
  'Platform Policy Update',
  'Account Suspension Warning',
  'Promotional Email',
  'Emergency Notification',
  'Account Suspended',
  'New Order Received'      // for restaurant
];

const EventSelector = ({ event, onChange, isEditMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(event);

  useEffect(() => {
    setSelectedEvent(event); // Sync with parent when `event` prop changes
  }, [event]);

  const toggleDropdown = () => {
    if (isEditMode) setIsOpen((prev) => !prev); // Only toggle dropdown if editable
  };

  const handleEventSelect = (event) => {
    setSelectedEvent(event);
    onChange(event); // Notify parent
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block">
      <button
        id="event"
        className={`flex items-center justify-between px-3 py-2 font-medium  border rounded-md cursor-pointer min-w-[150px] max-w-full ${isEditMode ? "bg-gray-100 text-gray-700 border-gray-300" : "bg-gray-100 text-gray-500 cursor-not-allowed"
          }`}
        onClick={toggleDropdown}
        disabled={!isEditMode}
      >
        <span className="ml-1 flex-grow text-left truncate">
          {selectedEvent !== "Select Event" ? selectedEvent : "Select Event"}
        </span>
        <span className="ml-2">
          {!isOpen ? (
            <img className="w-4 transition-transform" src={downArrow} alt="Down Arrow" />
          ) : (
            <img
              className="w-4 transition-transform transform rotate-180"
              src={downArrow}
              alt="Up Arrow"
            />
          )}
        </span>
      </button>
      {isOpen && isEditMode && ( // Ensure dropdown only opens in edit mode
        <div className="absolute left-0 z-10 w-[180px] max-h-[300px] overflow-y-auto bg-white border border-gray-300 rounded-md shadow-md">
          {events.map((event, index) => (
            <div
              key={index}
              className="px-4 py-2 text-sm cursor-pointer hover:bg-gray-100"
              onClick={() => handleEventSelect(event)}
            >
              {event}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};


export default EventSelector;
