import React, { useState, useEffect } from "react";
import axios from "axios";
const URL = import.meta.env.VITE_SERVER_URL;

const predefinedMealTypeLabels = [
  "Basic Combo",
  "Premium Combo",
  "Deluxe Combo",
  "Light Meal",
  "Protein Boost",
  "Kids Meal",
  "Vegan Combo",
];

const MealTypePopup = ({
  editingItem,
  setEditingItem,
  closePopup,
  refreshData,
  mealTypes = [],
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [applyTo, setApplyTo] = useState("all");
  const [selectedPlans, setSelectedPlans] = useState([]);
  const [prices, setPrices] = useState({});
  const [Plans, setPlans] = useState([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState(
    predefinedMealTypeLabels
  );
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Tracks missing fields
  const [missingFields, setMissingFields] = useState({
    label: false,
    description: false,
    prices: {},
  });

  useEffect(() => {
    const mapMealPlans = async () => {
      const response = await axios.get(`${URL}/api/menu`);
      setPlans(response.data.plans);
      // console.log("The Plans is:", response.data.plans)
    };
    mapMealPlans();
  }, []);

  if (!editingItem) {
    return null; // Prevent rendering if editingItem is undefined
  }

  useEffect(() => {
    if (editingItem && Array.isArray(editingItem.specificPlans)) {
      const allPlanValues = Plans.map((plan) => plan.label);
      console.log("AllPlans:", allPlanValues);
      // Check if all plans are selected
      const hasAllPlans =
        editingItem.specificPlans.length === allPlanValues.length &&
        editingItem.specificPlans.every((plan) => allPlanValues.includes(plan));
      console.log("HasAllPlans:", hasAllPlans);

      // Determine apply to based on plan selection
      const newApplyTo = hasAllPlans ? "all" : "specific";
      setApplyTo(newApplyTo);
      console.log("newApplyto:", newApplyTo);

      // Set selected plans, filtering out any invalid plans
      const normalizedPlans = editingItem.specificPlans.filter((plan) =>
        allPlanValues.includes(plan)
      );
      console.log("NormalizedPlans:", normalizedPlans);
      setSelectedPlans(normalizedPlans);
    }
  }, [editingItem, Plans]);

  const validateFields = () => {
    const missingPrices = Plans.reduce((acc, plan) => {
      if (!editingItem.prices[plan._id]) acc[plan._id] = true;
      return acc;
    }, {});

    setMissingFields({
      label: !editingItem.label?.trim(),
      description: !editingItem.description?.trim(),
      prices: missingPrices,
    });

    return (
      !editingItem.label?.trim() ||
      !editingItem.description?.trim() ||
      Object.keys(missingPrices).length > 0
    );
  };

  const handleCheckboxChange = (plan) => {
    if (selectedPlans.includes(plan.label)) {
      setSelectedPlans(selectedPlans.filter((value) => value !== plan.label));
    } else {
      setSelectedPlans([...selectedPlans, plan.label]);
    }
  };

  const handlePriceChange = (_id, value) => {
    const updatedPrices = { ...editingItem.prices, [_id]: value };
    setEditingItem({ ...editingItem, prices: updatedPrices });

    if (value) {
      setMissingFields((prev) => ({
        ...prev,
        prices: { ...prev.prices, [_id]: false },
      }));
    }
  };
  const checkForDuplicates = () => {
    const editingMealTypeId = editingItem.mealTypeId;
    // Check for duplicates in mealTypes & Details Both
    const duplicateMealType = mealTypes.some(
      (mealType) =>
        mealType.mealTypeId !== editingMealTypeId &&
        mealType.label.toLowerCase() ===
          editingItem.label.trim().toLowerCase() &&
        mealType.description.toLowerCase() ===
          editingItem.description.trim().toLowerCase()
    );

    // Check for duplicates in mealtype only
    const duplicateTypeOnly = mealTypes.some(
      (mealType) =>
        mealType.mealTypeId !== editingMealTypeId &&
        mealType.label.toLowerCase() === editingItem.label.trim().toLowerCase()
    );

    return duplicateMealType || duplicateTypeOnly;
  };

  const handleSave = async () => {
    if (validateFields()) {
      setError("Please fill all required fields.");
      return;
    }

    if (checkForDuplicates()) {
      setError("A meal type with the same name and details already exists.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      if (editingItem.mealTypeId) {
        // Edit Meal Type
        await axios.put(`${URL}/api/edit-meal-type/${editingItem.mealTypeId}`, {
          label: editingItem.label,
          description: editingItem.description,
          prices: editingItem.prices,
          applyTo,
          selectedPlans:
            applyTo === "all" ? Plans.map((plan) => plan.label) : selectedPlans,
        });
      } else {
        // Add Meal Type
        const mealTypeResponse = await axios.post(`${URL}/api/add-meal-type`, {
          label: editingItem.label,
          description: editingItem.description,
          prices: editingItem.prices,
        });

        const newMealTypeId =
          mealTypeResponse.data.tiffin.menu.mealTypes.slice(-1)[0].mealTypeId;

        const planData = {
          mealTypeId: newMealTypeId,
          applyTo,
          selectedPlans:
            applyTo === "all" ? Plans.map((plan) => plan.label) : selectedPlans,
        };

        await axios.post(`${URL}/api/apply-meal-plans`, planData);
      }

      if (refreshData) {
        await refreshData();
      }
      closePopup();
    } catch (err) {
      console.error("Error details:", err);
      setError(err.response?.data?.message || "Error saving meal type");
    } finally {
      setIsLoading(false);
    }
  };
  const handleMealTypeInputChange = (e) => {
    const inputValue = e.target.value;
    setEditingItem({ ...editingItem, label: inputValue });

    // Filter suggestions based on the input
    const filtered = predefinedMealTypeLabels.filter((label) =>
      label.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredSuggestions(filtered);

    // Show the dropdown if input is not empty
    setShowSuggestions(inputValue.trim() !== "");
  };

  // Handle selecting a suggestion from the dropdown
  const handleSuggestionClick = (suggestion) => {
    setEditingItem({ ...editingItem, label: suggestion });
    setShowSuggestions(false);
  };

  // Handle adding a new suggestion to the predefined list
  const addNewSuggestion = () => {
    if (
      editingItem.label.trim() &&
      !predefinedMealTypeLabels.includes(editingItem.label.trim())
    ) {
      predefinedMealTypeLabels.push(editingItem.label.trim());
      setFilteredSuggestions(predefinedMealTypeLabels);
    }
    setShowSuggestions(false);
  };

  const handleApplyToChange = (value) => {
    setApplyTo(value);

    if (value === "all") {
      // Automatically select all plans when "all" is selected
      const allPlanLabels = Plans.map((plan) => plan.label);
      setSelectedPlans(allPlanLabels);
    } else if (value === "specific") {
      // Reset to the previously selected specific plans or empty
      setSelectedPlans(editingItem.specificPlans || []);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-[90vw] md:w-[40vw] max-h-[90vh] overflow-auto">
        <div className="pl-6 pt-4 space-y-2">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            {editingItem.mealTypeId ? "Edit Meal Type" : "Add New Meal Type"}
          </h3>

          <div className="space-y-2">
            <div>
              <label
                htmlFor="mealType"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Meal Type{" "}
                {missingFields.label && <span className="text-red-500">*</span>}
              </label>
              <input
                id="mealType"
                type="text"
                value={editingItem.label || ""}
                onChange={handleMealTypeInputChange}
                onFocus={() => setShowSuggestions(true)}
                className={`w-full p-3 border ${
                  missingFields.label ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white`}
                placeholder="Enter or select a meal type"
              />

              {/* Suggestions Dropdown */}
              {showSuggestions && (
                <ul className="mt-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 max-h-40 overflow-y-auto">
                  {filteredSuggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="px-4 py-2 cursor-pointer hover:bg-blue-500 hover:text-white dark:hover:bg-blue-600"
                    >
                      {suggestion}
                    </li>
                  ))}
                  {/* Option to add a new suggestion */}
                  {editingItem.label.trim() &&
                    !filteredSuggestions.includes(editingItem.label) && (
                      <li
                        onClick={addNewSuggestion}
                        className="px-4 py-2 cursor-pointer text-blue-600 hover:underline"
                      >
                        Add "{editingItem.label}"
                      </li>
                    )}
                </ul>
              )}
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Meal Details{" "}
                {missingFields.description && (
                  <span className="text-red-500">*</span>
                )}
              </label>
              <textarea
                id="description"
                placeholder="eg.,4 Roti • 1 Veg (12 Oz)/Non-Veg (12 Oz)"
                value={editingItem.description || ""}
                onChange={(e) => {
                  setEditingItem({
                    ...editingItem,
                    description: e.target.value,
                  });
                  if (e.target.value.trim()) {
                    setMissingFields((prev) => ({
                      ...prev,
                      description: false,
                    }));
                  }
                }}
                className={`w-full p-3 border ${
                  missingFields.description
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Price for each plan{" "}
                {Object.keys(missingFields.prices).length > 0 && (
                  <span className="text-red-500">*</span>
                )}
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {Plans.map((plan) => (
                  <div
                    key={plan._id}
                    className="flex flex-col items-start space-y-1"
                  >
                    {/* Plan label */}
                    <div className="flex items-center space-x-2">
                      {/* Checkbox to select plan */}
                      {applyTo === "specific" && (
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            value={plan.label}
                            checked={selectedPlans.includes(plan.label)}
                            onChange={() => handleCheckboxChange(plan)}
                            className="mr-2 rounded text-blue-600 focus:ring-blue-500 dark:bg-gray-700"
                          />
                        </label>
                      )}
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300 ">
                        {plan.label} ({plan.label == 1 ? "Trial" : "Days"})
                      </span>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {missingFields.prices[plan._id] && (
                          <span className="text-red-500">*</span>
                        )}
                      </span>
                    </div>
                    {/* Price input field */}
                    <input
                      type="number"
                      value={editingItem.prices[plan._id] || ""}
                      onChange={(e) =>
                        handlePriceChange(plan._id, e.target.value)
                      }
                      placeholder={`Price for ${plan.label} (${
                        plan.label == 1 ? "Trial" : "Days"
                      })`}
                      className={`w-full p-2 border ${
                        missingFields.prices[plan._id]
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white`}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Apply to Plans
                </label>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="applyTo"
                      value="all"
                      checked={applyTo === "all"}
                      onChange={() => handleApplyToChange("all")}
                      className="mr-2 text-blue-600 focus:ring-blue-500 dark:bg-gray-700"
                    />
                    <span className="text-gray-700 dark:text-gray-300">
                      All Plans
                    </span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="applyTo"
                      value="specific"
                      checked={applyTo === "specific"}
                      onChange={() => handleApplyToChange("specific")}
                      className="mr-2 text-blue-600 focus:ring-blue-500 dark:bg-gray-700"
                    />
                    <span className="text-gray-700 dark:text-gray-300">
                      Specific Plans
                    </span>
                  </label>
                </div>
              </div>
              {error && <div className="text-red-500 text-sm">{error}</div>}
            </div>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 flex justify-end space-x-4">
          <button
            onClick={closePopup}
            disabled={isLoading}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isLoading}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200 flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Saving...
              </>
            ) : (
              "Save"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MealTypePopup;
