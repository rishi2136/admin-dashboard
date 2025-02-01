import React from "react";

const Step1OwnerDetails = ({ formData, updateFormData, nextStep }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData(name, value);
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Owner & Restaurant Details</h3>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Owner Name</label>
        <input
          type="text"
          name="ownerName"
          value={formData.ownerName}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Owner Contact</label>
        <input
          type="text"
          name="ownerContact"
          value={formData.ownerContact}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Restaurant Name
        </label>
        <input
          type="text"
          name="restaurantName"
          value={formData.restaurantName}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Address</label>
        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <button
        type="button"
        onClick={nextStep}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Next
      </button>
    </div>
  );
};

export default Step1OwnerDetails;
