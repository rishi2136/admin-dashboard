import React, { useState } from "react";

const HandleCustomOption = () => {
  const [customOption, setCustomOption] = useState("");
  const [options, setOptions] = useState(["Option 1", "Option 2", "Option 3"]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleAddCustomOption = () => {
    if (customOption && !options.includes(customOption)) {
      setOptions([...options, customOption]);
      setCustomOption("");
    }
  };

  const handleCheckboxChange = (option) => {
    setSelectedOptions((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Select or Add Options</h2>

      <div>
        <label
          htmlFor="custom-option"
          className="block text-sm font-medium mb-2"
        >
          Add Custom Option:
        </label>
        <div className="flex gap-2">
          <input
            id="custom-option"
            type="text"
            value={customOption}
            onChange={(e) => setCustomOption(e.target.value)}
            className="border rounded p-2 flex-1"
            placeholder="Type a custom option"
          />
          <button
            onClick={handleAddCustomOption}
            className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
          >
            Add
          </button>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Predefined Options:</h3>
        <div className="flex flex-wrap gap-4">
          {options.map((option, index) => (
            <label key={index} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedOptions.includes(option)}
                onChange={() => handleCheckboxChange(option)}
                className="accent-blue-500"
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Selected Options:</h3>
        <ul className="list-disc pl-5">
          {selectedOptions.length > 0 ? (
            selectedOptions.map((option, index) => (
              <li key={index}>{option}</li>
            ))
          ) : (
            <li>No options selected yet.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default HandleCustomOption;
