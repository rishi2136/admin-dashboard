import React, { useState } from "react";

const CustomSelect = ({
  listedCuisines,
  setCuisines,
  cuisines,
  headingText,
}) => {
  let [text, setText] = useState("");

  const handleCuisineChange = (e) => {
    setCuisines((prev) =>
      prev.includes(e.target.value)
        ? prev.filter((el) => el !== e.target.value)
        : [...prev, e.target.value]
    );
  };

  const handleCustomCuisineChange = (e, text) => {
    e.preventDefault();

    if (text === "") {
      alert("Empty item not added");
      return;
    }

    setCuisines((prev) => {
      if (prev.includes(text)) {
        return prev;
      } else {
        return [...prev, text];
      }
    });
    setText("");
  };

  const handleRemove = (text) => {
    setCuisines((prev) => prev.filter((el) => el !== text));
  };

  return (
    <div>
      <div>
        <div className="font-semibold text-md">{headingText} </div>
        <div className="flex">
          <select
            name="cuisines"
            className="bg-gray-200 focus:outline-none"
            id=""
            multiple={false}
            onChange={handleCuisineChange}
          >
            {listedCuisines.map((cuisines) => (
              <option key={cuisines}>{cuisines}</option>
            ))}
          </select>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button
            className="py-1 px-2 rounded text-xl bg-blue-500"
            onClick={(e) => handleCustomCuisineChange(e, text)}
          >
            +
          </button>
        </div>
        {cuisines.length > 0 && (
          <ul className="flex gap-2 w-full flex-wrap">
            {cuisines.map((cuisine) => (
              <li key={cuisine} className="flex items-center gap-1">
                <span>{cuisine}</span>
                <button
                  className="py-1 px-2 text-white rounded-full bg-black"
                  onClick={() => handleRemove(cuisine)}
                >
                  X
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CustomSelect;
