import React, { useState } from "react";

const Step2MenuManagement = ({
  formData,
  updateFormData,
  nextStep,
  prevStep,
}) => {
  const [menuItem, setMenuItem] = useState("");

  const addMenuItem = () => {
    if (menuItem.trim()) {
      updateFormData("menuItems", [...formData.menuItems, menuItem]);
      setMenuItem("");
    }
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Menu Management</h3>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Add Menu Items</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={menuItem}
            onChange={(e) => setMenuItem(e.target.value)}
            className="flex-1 p-2 border border-gray-300 rounded"
          />
          <button
            type="button"
            onClick={addMenuItem}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Add
          </button>
        </div>
      </div>
      <ul className="mb-4">
        {formData.menuItems.map((item, index) => (
          <li key={index} className="p-2 border-b">
            {item}
          </li>
        ))}
      </ul>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={prevStep}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Back
        </button>
        <button
          type="button"
          onClick={nextStep}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Step2MenuManagement;
