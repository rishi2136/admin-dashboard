// src/components/RightPanel/HeaderComponent.jsx
import React, { useEffect, useState } from "react";
import { FiEdit, FiTrash2, FiCopy, FiX } from "react-icons/fi";
import { FaToggleOff, FaToggleOn } from "react-icons/fa";

const HeaderComponent = ({
  data,
  isEditMode,
  onEdit,
  onCancel,
  onDelete,
  onChange
}) => {
  const [editableTitle, setEditableTitle] = useState(data.title || 'Untitled');
  const [isDefault, setIsDefault] = useState(data.isDefault || false);
  
  useEffect(() => {
    setEditableTitle(data.title);
    setIsDefault(data.isDefault || false)
  }, [data]);

  const handleTitleChange = (e) => {
    const newValue = e.target.value;
    setEditableTitle(newValue);
    if (onChange) {
      onChange('title', newValue)
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onCancel();
    } else if (e.key === 'Escape') {
      setEditableTitle(data.title);
      if (onChange) {
        onChange('name', data.title);
      }
      onCancel();
    }
  }

  const handleDefault = () => {
    const newValue = !isDefault;
    setIsDefault(newValue);
    if (onChange) {
      onChange("isDefault", newValue);
    }
  };
  return (
    <div className="flex justify-between items-center mb-4 border-b pb-2">
      {isEditMode ? (
        <input
          type="text"
          value={editableTitle}
          onChange={handleTitleChange}
          onKeyDown={handleKeyDown}
          placeholder="Title..."
          className="text-2xl font-semibold text-gray-800 bg-gray-50 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent w-full mr-4"
          autoFocus
        />
      ) : (
        <input value={data.title} placeholder="Untitled" readOnly className="outline-none text-2xl font-semibold text-gray-800" />
      )}

      <div className="flex gap-4">

          {/* set default Banner */}
        {data.isDefault !== undefined && (

          <div className="flex items-center gap-2">
            <label
              className="block text-gray-700 text-sm font-bold"
              htmlFor="default"
            >
              Default:
            </label>
            <button
              id="default"
              className={isDefault ? "text-green-500" : "text-gray-500"}
              onClick={handleDefault}
              disabled={!isEditMode}
            >
              {isDefault ? <FaToggleOn size={30} /> : <FaToggleOff size={30} />}
            </button>
          </div>
        )}




        <button
          onClick={onDelete}
          className="text-red-500 hover:text-red-700"
          title="Delete"
        >
          <FiTrash2 size={20} />
        </button>
        {!isEditMode ? (
          <button
            onClick={onEdit}
            className="text-gray-500 hover:text-blue-500"
            title="Edit"
          >
            <FiEdit size={20} />
          </button>
        ) : (
          <button
            onClick={onCancel}
            className="text-gray-500 hover:text-red-500"
            title="Cancel"
          >
            <FiX size={20} />
          </button>
        )}
      </div>
    </div>
  );
};

export default HeaderComponent;