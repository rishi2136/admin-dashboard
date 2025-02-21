import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { FiSave } from "react-icons/fi";

const Cuisines = ({ cuisines, title }) => {
  const [editableIndex, setEditableIndex] = useState(-1); // Tracks the currently editable item index
  const [tempValue, setTempValue] = useState(""); // Holds the temporary value during editing
  const [updatedCuisines, setUpdatedCuisines] = useState(cuisines); // Stores the updated cuisines list

  const handleEdit = (index, currentValue) => {
    if (editableIndex === index) {
      // Save the value
      const updatedItems = [...updatedCuisines];
      updatedItems[index] = tempValue;
      setUpdatedCuisines(updatedItems);
      setEditableIndex(-1); // Exit edit mode
      setTempValue("");
    } else {
      // Enter edit mode
      setEditableIndex(index);
      setTempValue(currentValue);
    }
  };

  return (
    <div className="my-2">
      <h1 className="overview-heading ">{title}</h1>
      <div className="grid grid-cols-4 gap-2">
        {updatedCuisines.map((el, idx) => (
          <div
            key={idx}
            className="text-gray-700 bg-white rounded-lg shadow-sm border border-gray-200 px-4 py-2 flex items-center hover:shadow-md hover:bg-gray-100 transition-all duration-200"
          >
            <button
              className="bg-transparent border-0 me-1 focus:outline-none"
              onClick={() => handleEdit(idx, el)}
            >
              {editableIndex === idx ? (
                <FiSave title="save" />
              ) : (
                <FiEdit title="edit" />
              )}
            </button>

            {editableIndex === idx ? (
              <input
                type="text"
                value={tempValue}
                onChange={(e) => setTempValue(e.target.value)}
                className="border border-gray-300 rounded p-1 flex-1"
                autoFocus
              />
            ) : (
              <span>{el}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cuisines;
