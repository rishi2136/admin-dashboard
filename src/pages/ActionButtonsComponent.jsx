import React from "react";

const ActionButtonsComponent = ({ onSave, onCancel }) => (
  <div className="flex gap-4 mt-4">
    <button
      onClick={onSave}
      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
    >
      Save Changes
    </button>
    <button
      onClick={onCancel}
      className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400"
    >
      Cancel
    </button>
  </div>
);

export default ActionButtonsComponent;
