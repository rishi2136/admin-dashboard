import React, { useState } from "react";

const MultiSelect = () => {
  // State to manage dropdown and selected options
  const [state, setState] = useState({
    dropdownOpen: false,
    selectedOptions: [], // Array to store selected option IDs
  });

  // Options for the dropdown
  const options = [
    { id: 1, label: "Option 1" },
    { id: 2, label: "Option 2" },
    { id: 3, label: "Option 3" },
    { id: 4, label: "Option 4" },
  ];

  // Handle dropdown toggle
  const toggleDropdown = () => {
    setState((prev) => ({ ...prev, dropdownOpen: !prev.dropdownOpen }));
  };

  // Handle checkbox selection
  const handleCheckboxChange = (optionId) => {
    setState((prev) => {
      const isSelected = prev.selectedOptions.includes(optionId);
      return {
        ...prev,
        selectedOptions: isSelected
          ? prev.selectedOptions.filter((id) => id !== optionId) // Remove if already selected
          : [...prev.selectedOptions, optionId], // Add if not selected
      };
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="relative w-64">
        {/* Dropdown Button */}
        <button
          onClick={toggleDropdown}
          className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Select Options
        </button>

        {/* Dropdown Menu */}
        {state.dropdownOpen && (
          <div className="absolute left-0 z-10 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg">
            {options.map((option) => (
              <label
                key={option.id}
                className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100"
              >
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={state.selectedOptions.includes(option.id)}
                  onChange={() => handleCheckboxChange(option.id)}
                />
                {option.label}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Selected Options */}
      <div className="mt-4">
        <h2 className="text-lg font-semibold">Selected Options:</h2>
        {state.selectedOptions.length > 0 ? (
          <ul className="mt-2 list-disc list-inside">
            {state.selectedOptions.map((id) => (
              <li key={id}>
                {options.find((option) => option.id === id)?.label}
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-2 text-gray-500">No options selected.</p>
        )}
      </div>
    </div>
  );
};

export default MultiSelect;
