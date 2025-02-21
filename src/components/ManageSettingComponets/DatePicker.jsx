import React, { useState } from 'react';
import { FaCalendarAlt } from 'react-icons/fa';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function DatePicker({ onSelect }) {
  const [date, setDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);

  const handleSelect = (newDate) => {
    setDate(newDate);
    onSelect(newDate);
    setShowCalendar(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowCalendar(!showCalendar)}
        className="flex items-center px-4 py-2 border rounded-md hover:bg-gray-50 w-[280px] justify-start text-left"
      >
        <FaCalendarAlt className="mr-2 h-4 w-4" />
        {date ? date.toLocaleDateString() : "Pick a date"}
      </button>
      {showCalendar && (
        <div className="absolute top-full mt-1 z-50 bg-white border rounded-md shadow-lg">
          <Calendar
            onChange={handleSelect}
            value={date}
          />
        </div>
      )}
    </div>
  );
}

export default DatePicker;