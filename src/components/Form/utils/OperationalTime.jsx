import React, { useEffect, useState } from "react";
import { IoCheckmarkSharp } from "react-icons/io5";

const OperationalTime = ({
  headingText,
  days,
  allowedDays,
  setAlloweddays,
  ID,
}) => {
  const [time, setTime] = useState({
    open: "",
    close: "",
  });
  const [isAdd, setIsAdd] = useState(false);

  const handleChange = (e) => {
    setTime((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    setTime({
      open: "",
      close: "",
    });
    setIsAdd(false);
  }, [ID]);

  // const handleAllowedDays = (e) => {
  //   // console.log(e.target.name);
  //   setAlloweddays((prev) =>
  //     prev.days.includes(e.target.value)
  //       ? { ...prev, days: days.filter((el) => el !== e.target.value) }
  //       : { ...prev, days: [...prev.days, e.target.value] }
  //   );
  // };

  const handleAllowedDays = (e) => {
    const { value } = e.target;
    setAlloweddays((prev) => ({
      ...prev,
      days: prev.days.includes(value)
        ? prev.days.filter((day) => day !== value) // Remove day if it already exists
        : [...prev.days, value], // Add day if it's not already in the list
    }));
  };

  const handleAddTime = (time) => {
    setAlloweddays((prev) => ({
      ...prev,
      openAt: time.open,
      closeAt: time.close,
    }));
    setIsAdd(true);
  };

  // let days = [
  //   "Sunday",
  //   "Monday",
  //   "Tuesday",
  //   "Wednesday",
  //   "Thrusday",
  //   "Friday",
  //   "Saturday",
  // ];

  return (
    <div>
      <h1 className="font-semibold text-md">{headingText}</h1>
      <div className="flex gap-x-2 mt-2">
        <select
          name="days"
          className="bg-gray-200 focus:outline-none"
          id=""
          multiple={false}
          onChange={handleAllowedDays}
        >
          {days.map((day) => (
            <option key={day}>{day}</option>
          ))}
        </select>
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
          {isAdd && (
            <span>
              <IoCheckmarkSharp />
            </span>
          )}
        </div>
      </div>
      <ul className="flex flex-wrap gap-1">
        {allowedDays.days.length !== 0 &&
          allowedDays.days.map((el) => <li key={el}>{el}</li>)}
      </ul>
    </div>
  );
};

export default OperationalTime;
