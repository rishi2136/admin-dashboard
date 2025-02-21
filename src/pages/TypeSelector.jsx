import React, { useState, useEffect } from "react";
import downArrow from '/icons/down-arrow.png';

const types = [
    'User',
    'Restaurant'
  ];
  
  const TypeSelector = ({ type, onChange, isEditMode }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedType, setSelectedType] = useState(type);
  
    useEffect(() => {
      setSelectedType(type); // Sync with parent when `type` prop changes
    }, [type]);
  
    const toggleDropdown = () => {
      if (isEditMode) setIsOpen((prev) => !prev); // Only toggle dropdown if editable
    };
  
    const handleTypeSelect = (type) => {
      setSelectedType(type);
      onChange(type); // Notify parent
      setIsOpen(false);
    };
  
    return (
      <div className="relative inline-block">
        <button
          className={`flex items-center justify-between px-3 py-2 font-medium  border rounded-md cursor-pointer min-w-[150px] max-w-full ${
            isEditMode ? "bg-gray-100 text-gray-700 border-gray-300" : "bg-gray-100 text-gray-500 cursor-not-allowed"
          }`}
          onClick={toggleDropdown}
          disabled={!isEditMode}
        >
          <span className="ml-1 flex-grow text-left truncate ">
          {selectedType ? selectedType : "Select Receiver"}

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
          <div className="absolute left-0 z-10 w-[150px] max-h-[300px] overflow-y-auto bg-white border border-gray-300 rounded-md shadow-md">
            {types.map((type, index) => (
              <div
                key={index}
                className="px-4 py-2 text-sm cursor-pointer hover:bg-gray-100"
                onClick={() => handleTypeSelect(type)}
              >
                {type}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };
  
  
  export default TypeSelector;
  