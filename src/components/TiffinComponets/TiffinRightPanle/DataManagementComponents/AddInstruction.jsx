import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdOutlineIntegrationInstructions } from "react-icons/md";
import { FiEdit, FiTrash2 } from "react-icons/fi";
const URL = import.meta.env.VITE_SERVER_URL;

export const dummyInstructions = {
  instructions: [
    {
      title: "Order Cut-off Time",
      details: "Place orders before 9:00 PM on the previous day.",
    },
    {
      title: "Flexi Plans",
      details:
        "For changes in current orders, skipping a delivery, pausing a plan, or canceling a plan, inform us before the cut-off time.",
    },
    {
      title: "Delivery Timings",
      details:
        "Delivery may be affected by ±45 minutes due to traffic, road closures, or weather conditions.",
    },
    {
      title: "Extra Items",
      details:
        "Extra items can only be ordered with a meal plan and from the same seller.",
    },
    {
      title: "Refund Policy",
      details:
        "A cancellation fee of $5 applies to trial orders and $10 applies to all other orders.",
    },
    {
      title: "Delivery Time",
      details: "9:00 AM to 3:00 PM",
    },
  ],
};

const AddInstruction = () => {
  const [instructionData, setInstructionData] = useState([]);
  const [newInstruction, setNewInstruction] = useState({
    title: "",
    details: "",
  });
  const [editingIndex, setEditingIndex] = useState(null); // Track the index being edited
  const [editInstruction, setEditInstruction] = useState({
    title: "",
    details: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const ownerEmail = localStorage.getItem("ownerEmail");

  // Load initial instructions from the backend
  useEffect(() => {
    const fetchInstructions = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/api/menu/${ownerEmail}`
        );
        setInstructionData(response.data.instructions || []);
      } catch (err) {
        console.error("Error loading instructions:", err);
      }
    };
    fetchInstructions();
  }, []);

  const handleInstructionChange = (e) => {
    const { name, value } = e.target;
    setNewInstruction((prev) => ({ ...prev, [name]: value }));
  };

  const handleSuggestionClick = (suggestion) => {
    setNewInstruction({ ...suggestion });
    setShowSuggestions(false);
  };

  const handleEditClick = (index) => {
    setEditingIndex(index);
    setEditInstruction({ ...instructionData[index] });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditInstruction((prev) => ({ ...prev, [name]: value }));
  };

  const checkForDuplicates = () => {
    // Check for duplicates in mealTypes & Details Both
    const duplicateInstructions = instructionData.some(
      (instruction) =>
        instruction.title.toLowerCase() ===
          newInstruction.title.trim().toLowerCase() &&
        instruction.details.toLowerCase() ===
          newInstruction.details.trim().toLowerCase()
    );

    const duplicateEditInstructions = instructionData.some(
      (instruction) =>
        instruction.title.toLowerCase() ===
          editInstruction.title.trim().toLowerCase() &&
        instruction.details.toLowerCase() ===
          editInstruction.details.trim().toLowerCase()
    );

    const duplicateInstructiontitle = instructionData.some(
      (instruction) =>
        instruction.title.toLowerCase() ===
        newInstruction.title.trim().toLowerCase()
    );

    const duplicateEditInstructiontitle = instructionData.some(
      (instruction) =>
        instruction.title.toLowerCase() ===
        editInstruction.title.trim().toLowerCase()
    );

    const duplicateInstructionDetails = instructionData.some(
      (instruction) =>
        instruction.details.toLowerCase() ===
        newInstruction.details.trim().toLowerCase()
    );

    const duplicateEditInstructionDetails = instructionData.some(
      (instruction) =>
        instruction.details.toLowerCase() ===
        editInstruction.details.trim().toLowerCase()
    );

    return (
      duplicateInstructions ||
      duplicateInstructiontitle ||
      duplicateInstructionDetails ||
      duplicateEditInstructions ||
      duplicateEditInstructionDetails ||
      duplicateEditInstructiontitle
    );
  };

  const handleSave = async () => {
    if (checkForDuplicates()) {
      setError("A Instruction with the same title and details already exists.");
      return;
    }
    if (!newInstruction.title || !newInstruction.details) {
      setError("Both title and details are required.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/add-instruction/${ownerEmail}`,
        {
          title: newInstruction.title,
          details: newInstruction.details,
        }
      );

      const newInstructionWithId = {
        ...newInstruction,
        _id: response.data._id,
      };
      setInstructionData((prevData) => [...prevData, newInstructionWithId]);
      setNewInstruction({ title: "", details: "" });
      window.location.reload();
    } catch (err) {
      setError("Error saving instruction.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveEdit = async (index) => {
    if (
      instructionData[index].title === editInstruction.title.trim() &&
      instructionData[index].details === editInstruction.details.trim()
    ) {
      setEditingIndex(null);
      return;
    }

    if (checkForDuplicates()) {
      setError("A Instruction with the same title and details already exists.");
      return;
    }

    if (!editInstruction.title || !editInstruction.details) {
      setError("Both title and details are required.");
      return;
    }
    setIsLoading(true);
    setError("");

    try {
      await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/api/edit-instruction/${
          instructionData[index]._id
        }/${ownerEmail}`,
        {
          title: editInstruction.title,
          details: editInstruction.details,
        }
      );

      const updatedInstructions = [...instructionData];
      updatedInstructions[index] = { ...editInstruction };
      setInstructionData(updatedInstructions);
      setEditingIndex(null);
    } catch (err) {
      setError("Error updating instruction.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this instruction?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(
        `${
          import.meta.env.VITE_SERVER_URL
        }/api/delete-instruction/${id}/${ownerEmail}`
      );
      setInstructionData((prevData) =>
        prevData.filter((instruction) => instruction._id !== id)
      );
    } catch (err) {
      console.error("Error deleting instruction:", err);
    }
  };

  return (
    <div className="flex flex-col w-full h-full">
      <div className="bg-white">
        {/* Reusable FieldValidator Component */}
        <h3 className="text-lg font-medium text-gray-800">Add Instruction</h3>
        <input
          type="text"
          name="title"
          value={newInstruction.title}
          onChange={handleInstructionChange}
          onFocus={() => setShowSuggestions(true)}
          placeholder="Instruction Title"
          className="w-full border border-gray-300 rounded-md p-2 mt-1 mb-2"
        />
        {showSuggestions && (
          <ul className="border border-gray-300 bg-white rounded-md shadow-md max-h-40 overflow-y-auto">
            {dummyInstructions.instructions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-4 py-2 cursor-pointer hover:bg-blue-500 hover:text-white"
              >
                {suggestion.title}
              </li>
            ))}
          </ul>
        )}
        <textarea
          name="details"
          value={newInstruction.details}
          onChange={handleInstructionChange}
          placeholder="Instruction Details"
          className="w-full border border-gray-300 rounded-md p-2 mb-1"
        />
        <button
          onClick={handleSave}
          className="bg-red-500 py-2 px-2 flex gap-2 items-center rounded-md hover:bg-red-600"
        >
          <MdOutlineIntegrationInstructions size={18} className="text-white" />
          <span className="text-white font-medium text-sm">
            Add Instruction
          </span>
        </button>

        {error && <p className="text-red-500 pt-1 text-sm">{error}</p>}
      </div>

      <div className="space-y-2 mt-4">
        <h2 className="text-lg font-semibold mb-2 text-gray-800">
          Instructions
        </h2>
        {instructionData.map((instruction, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm"
          >
            {editingIndex === index ? (
              <div className="space-y-1">
                <input
                  type="text"
                  name="title"
                  value={editInstruction.title}
                  onChange={handleEditChange}
                  className="w-full border border-gray-300 rounded-md p-3"
                />
                <textarea
                  name="details"
                  value={editInstruction.details}
                  onChange={handleEditChange}
                  className="w-full border border-gray-300 rounded-md p-3"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => handleSaveEdit(index)}
                    className="bg-green-500 text-white px-4 py-2 rounded-md"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingIndex(null)}
                    className="bg-gray-400 px-4 py-2 text-white rounded-md"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <h3 className="font-semibold">{instruction.title}</h3>
                <p className="text-sm">{instruction.details}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditClick(index)}
                    className="text-blue-500"
                  >
                    <FiEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(instruction._id)}
                    className="text-red-500"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddInstruction;
