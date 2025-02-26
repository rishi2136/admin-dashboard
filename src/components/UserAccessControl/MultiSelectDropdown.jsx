import React, { useState } from "react";
import { FaChevronDown, FaTimes } from "react-icons/fa";

// const options = [
//   "React",
//   "Node.js",
//   "JavaScript",
//   "TypeScript",
//   "Tailwind CSS",
//   "MongoDB",
// ];

const options = [
  { label: "Restaurant Owner", value: "restaurantOwner" },
  { label: "Kitchen Owner", value: "kitchenOwner" },
  { label: "Event Creator", value: "eventCreator" },
  { label: "Admin", value: "admin" },
  { label: "Moderator", value: "moderator" },
  { label: "User", value: "user" },
  { label: "Marketing Guy", value: "marketingGuy" },
];

const MultiSelectDropdown = ({ selectedOptions, setSelectedOptions }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (option) => {
    if (!selectedOptions.includes(option)) {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const removeOption = (option) => {
    setSelectedOptions(selectedOptions.filter((item) => item !== option));
  };

  return (
    <div className="relative w-full">
      <div
        className="border border-gray-300 bg-white rounded-lg px-4 py-2 flex justify-between items-center cursor-pointer shadow-sm"
        onClick={toggleDropdown}
      >
        <div className="flex flex-wrap gap-1">
          {selectedOptions.length > 0 ? (
            selectedOptions.map((option) => (
              <span
                key={option}
                className="bg-blue-500 text-white px-2 py-1 rounded flex items-center gap-1 text-sm"
              >
                {option}
                <FaTimes
                  className="ml-1 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeOption(option);
                  }}
                />
              </span>
            ))
          ) : (
            <span className="text-gray-500">Select options...</span>
          )}
        </div>
        <FaChevronDown className="text-gray-500" />
      </div>
      {isOpen && (
        <ul className="absolute left-0 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-md max-h-60 overflow-auto">
          {options.map(({ label, value }) => (
            <li
              key={value}
              className="px-4 py-2 hover:bg-blue-100 cursor-pointer text-gray-700"
              onClick={() => handleSelect(value)}
            >
              {label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MultiSelectDropdown;
