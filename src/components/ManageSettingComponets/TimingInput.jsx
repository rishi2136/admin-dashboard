import React from 'react';

function TimingInput({ day, openTime, closeTime, onOpenChange, onCloseChange }) {
  return (
    <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-sm">
      <label className="w-20 font-medium text-gray-700 text-sm">{day}</label>
      <div className="flex-1 flex items-center space-x-2">
        <input
          type="time"
          value={openTime}
          onChange={(e) => onOpenChange(e.target.value)}
          className="w-32 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <span className="text-gray-500">to</span>
        <input
          type="time"
          value={closeTime}
          onChange={(e) => onCloseChange(e.target.value)}
          className="w-32 px-3  border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
}

export default TimingInput;