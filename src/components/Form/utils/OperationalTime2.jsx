import React, { useState } from "react";

const OperationalTime = ({ day, operationalTime, setOperationalTime }) => {
  const [time, setTime] = useState({
    day: day,
    open: "",
    close: "",
  });

  const handleChange = (e) => {
    setTime((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddTime = (time) => {
    setOperationalTime((prev) =>
      prev.some((el) => el.day === time.day)
        ? [...prev.map((el) => (el.day === time.day ? time : el))]
        : [...prev, time]
    );
  };

  return (
    <>
      <div className="flex gap-x-2 mt-2">
        <span className="w-[20%]">{day}</span>
        <div className="w-[80%] flex gap-2">
          <input
            type="time"
            placeholder="opening"
            value={time.open}
            name="open"
            onChange={handleChange}
          />
          <input
            type="time"
            placeholder="closing"
            value={time.close}
            name="close"
            onChange={handleChange}
          />
          <button
            type="button"
            className="bg-black text-white px-2"
            onClick={() => handleAddTime(time)}
          >
            Add
          </button>
        </div>
      </div>
    </>
  );
};

export default OperationalTime;
