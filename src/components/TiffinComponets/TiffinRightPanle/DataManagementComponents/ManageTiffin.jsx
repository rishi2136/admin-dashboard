import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiEdit, FiPlus, FiTrash2, FiAlertCircle } from "react-icons/fi";
import MealPlanPopup from "./MealPlanPopup";
import MealTypePopup from "./MealTypePopup";
import { HiOutlineInformationCircle } from "react-icons/hi";
import ImageSelector from "./ManageImages";

const ManageTiffin = () => {
  const [plans, setPlans] = useState([]);
  const [mealTypes, setMealTypes] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null); //plans[0]._id
  const [selectedMealType, setSelectedMealType] = useState(null); //mealTypes[0].mealTypeId
  const [isEditing, setIsEditing] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [isFlexibleDates, setIsFlexibleDates] = useState(false);
  const [serviceDays, setServiceDays] = useState([]);
  const [Tiffin, setTiffin] = useState();
  const ownerEmail = localStorage.getItem("ownerEmail");
  console.log(ownerEmail);

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  useEffect(() => {
    const mapMenu = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/menu/${ownerEmail}`
      );
      const response1 = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/tiffin/${ownerEmail}`
      );
      const data = response1.data.data;
      console.log("Responce1:", data);
      setPlans(response.data.plans);
      setServiceDays(response.data.serviceDays || []);
      setIsFlexibleDates(response.data.isFlexibleDates || false);
      setMealTypes(response.data.mealTypes);
      setSelectedPlan(response.data.plans[0]._id);
      setSelectedMealType(response.data.mealTypes[0].mealTypeId);
      // console.log("The Plans is:", response.data.plans);
      // console.log("The Type is:", response.data.mealTypes);
      setTiffin(data.kitchenName);
    };
    mapMenu();
  }, []);

  useEffect(() => {
    const mapTiffin = async () => {
      const response1 = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/tiffin/${ownerEmail}`
      );
      const data = response1.data.data;
      console.log("Responce1:", data);
      setTiffin(data.kitchenName);
    };
    mapTiffin();
  }, []);

  // Handle checkbox toggle
  const handleDayChange = (day) => {
    if (serviceDays.includes(day)) {
      // Remove the day if it's already selected
      setServiceDays(serviceDays.filter((d) => d !== day));
    } else {
      // Add the day if it's not selected
      setServiceDays([...serviceDays, day]);
    }
  };

  // Function to save meal days and flexible dates
  const handleSaveMealDays = async () => {
    try {
      const response = await axios.post(
        `${
          import.meta.env.VITE_SERVER_URL
        }/api/manage_mealdays&Flexidates/${ownerEmail}`,
        {
          serviceDays,
          isFlexibleDates,
        }
      );
      // console.log("Response:", response.data);
      alert("Meal days and flexible dates updated successfully.");
    } catch (error) {
      console.error("Error updating meal days & flexible dates:", error);
      alert("Failed to update meal days and flexible dates.");
    }
  };

  // Save meal days to the backend
  // console.log("Plan is", plans)
  const handleEdit = (item, type) => {
    setIsEditing(true);
    setEditingItem({ ...item, type });
  };

  const handleEditMenu = (item, type) => {
    setIsEditing(true);
    setEditingItem({ ...item, type });
  };

  const handleSave = () => {
    if (editingItem.type === "plan") {
      setPlans(plans.map((p) => (p._id === editingItem._id ? editingItem : p)));
    } else if (editingItem.type === "mealType") {
      setMealTypes(
        mealTypes.map((m) =>
          m.mealTypeId === editingItem.mealTypeId ? editingItem : m
        )
      );
    }
    setIsEditing(false);
    setEditingItem(null);
  };
  const handleAdd = (type) => {
    setIsEditing(true);

    if (type === "mealType") {
      const newMealTypeTemplate = {
        mealTypeId: null,
        label: "",
        description: "",
        prices: plans.reduce((acc, plan) => ({ ...acc, [plan._id]: "" }), {}),
      };

      setEditingItem({ ...newMealTypeTemplate, type });
    } else if (type === "plan") {
      const newPlanTemplate = {
        _id: null,
        label: "",
      };

      setEditingItem({ ...newPlanTemplate, type });
    }
  };

  const handleDelete = async (item, type) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete this ${
        type === "plan" ? "meal plan" : "meal type"
      }?`
    );

    if (!confirmDelete) return;

    try {
      if (type === "plan") {
        // Call the delete plan route
        await axios.delete(
          `${import.meta.env.VITE_SERVER_URL}/api/delete-plan/${
            item._id
          }/${ownerEmail}`
        );
        setPlans(plans.filter((plan) => plan._id !== item._id));
      } else if (type === "mealType") {
        // Call the delete meal type route
        await axios.delete(
          `${import.meta.env.VITE_SERVER_URL}/api/delete-meal-type/${
            item.mealTypeId
          }/${ownerEmail}`
        );
        setMealTypes(
          mealTypes.filter(
            (mealType) => mealType.mealTypeId !== item.mealTypeId
          )
        );
      }
      alert(
        `${type === "plan" ? "Meal plan" : "Meal type"} deleted successfully.`
      );
      window.location.reload();
    } catch (error) {
      console.error(`Error deleting ${type}:`, error);
      alert(`Failed to delete ${type === "plan" ? "meal plan" : "meal type"}.`);
    }
  };

  const refreshData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/menu/${ownerEmail}`
      );
      const menuData = response.data;
      setPlans(menuData.plans);
      setMealTypes(menuData.mealTypes);
    } catch (error) {
      console.error("Error fetching menu data:", error);
    }
  };

  const checkMissingPrices = (type) => {
    // Check if any plan associated with the meal type has a missing price
    return plans.some((plan) => !type.prices || !type.prices[plan._id]);
  };
  console.log("Tiffin:", Tiffin);

  return (
    <div className="font-inter h-screen overflow-y-auto w-full mx-auto p-1">
      <div className="bg-white w-full mx-auto mb-4">
        <div className="flex flex-col md:flex-row gap-4">
          <ImageSelector />
          <div className="flex-1 space-y-4">
            <h1 className="text-3xl font-medium">{Tiffin}</h1>
            <div className="">
              <div className="flex gap-2 items-center">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Meal Plan
                </label>
                <div className="relative group">
                  <HiOutlineInformationCircle
                    size={15}
                    className="text-gray-600 cursor-pointer hover:text-gray-800"
                  />
                  <div className="absolute w-[25vw] mt-4 top-full -left-16 hidden group-hover:flex items-center justify-center bg-gray-700 text-white text-xs rounded-md px-2 py-1 shadow-md">
                    <span>
                      Meal plan is a predefined set of meals offered over a
                      specific period, like trial, weekly, or monthly, for
                      efficient meal delivery managemen
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {plans.length === 0 ? (
                  <p className="w-full border p-2 text-sm rounded-md">
                    Add Meal Plan
                  </p>
                ) : (
                  <select
                    value={selectedPlan}
                    onChange={(e) => setSelectedPlan(e.target.value)}
                    className="p-2 w-full border border-gray-300  text-sm cursor-pointer"
                  >
                    {plans.map((plan) => (
                      <option key={plan._id} value={plan._id}>
                        {plan.label} ({plan.label == 1 ? "Trial" : "Days"})
                      </option>
                    ))}
                  </select>
                )}
                <button
                  onClick={() => handleAdd("plan")}
                  className="text-sm font-semibold"
                >
                  <FiPlus size={16} />
                </button>
                <button
                  onClick={() =>
                    handleEdit(
                      plans.find((p) => p._id === selectedPlan),
                      "plan"
                    )
                  }
                  className="text-blue-500"
                >
                  <FiEdit size={16} />
                </button>
                <button
                  onClick={() =>
                    handleDelete(
                      plans.find((p) => p._id === selectedPlan),
                      "plan"
                    )
                  }
                  className="text-red-500"
                >
                  <FiTrash2 size={16} />
                </button>
              </div>
            </div>

            <div>
              <div className="flex gap-2 items-center">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Meal Details
                </label>
                <div className="relative group">
                  <HiOutlineInformationCircle
                    size={15}
                    className="text-gray-600 cursor-pointer hover:text-gray-800"
                  />
                  <div className="absolute w-[25vw] mt-2 top-full -left-16 hidden group-hover:flex items-center justify-center bg-gray-700 text-white text-xs rounded-md px-2 py-1 shadow-md">
                    <span>
                      Meal types (e.g., Basic, Deluxe) include items like 4
                      roti, dal, with specific prices for each plan (Trial,
                      Weekly, Monthly).
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {mealTypes.length === 0 ? (
                  <p className="w-full border p-2 text-sm rounded-md">
                    Add Meal Type
                  </p>
                ) : (
                  <select
                    value={selectedMealType}
                    onChange={(e) => setSelectedMealType(e.target.value)}
                    className="p-2 w-full border border-gray-300 rounded text-sm cursor-pointer"
                  >
                    {mealTypes.map((mealType) => {
                      return (
                        <option
                          key={mealType.mealTypeId}
                          value={mealType.mealTypeId}
                        >
                          {mealType.label}
                        </option>
                      );
                    })}
                  </select>
                )}
                <button
                  onClick={() => handleAdd("mealType")}
                  className="flex gap-1 items-center rounded text-sm font-semibold"
                >
                  <FiPlus />
                </button>
                <button
                  onClick={() =>
                    handleEdit(
                      mealTypes.find((m) => m.mealTypeId === selectedMealType),
                      "mealType"
                    )
                  }
                  className="text-blue-500"
                >
                  <FiEdit size={16} />
                </button>
                <button
                  onClick={() =>
                    handleDelete(
                      mealTypes.find((m) => m.mealTypeId === selectedMealType),
                      "mealType"
                    )
                  }
                  className="text-red-500"
                >
                  <FiTrash2 size={16} />
                </button>
              </div>
            </div>

            <div className="border border-gray-300 rounded-md p-3 flex flex-col gap-2 mr-2">
              <div className="flex gap-2 items-center">
                <label htmlFor="" className="font-medium text-gray-700 text-sm">
                  Meal Days
                </label>
                <div className="relative group mt-1">
                  <HiOutlineInformationCircle
                    size={15}
                    className="text-gray-600 cursor-pointer hover:text-gray-800"
                  />
                  <div className="absolute w-[25vw] mt-2 top-full -left-32 hidden group-hover:flex items-center justify-center bg-gray-700 text-white text-xs rounded-md px-2 py-1 shadow-md">
                    <span>
                      Meal days allow you to select which days the meal will be
                      delivered (e.g., Monday, Wednesday, Friday).
                    </span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1">
                {daysOfWeek.map((day) => (
                  <label key={day} className="flex items-center text-[13px]">
                    <input
                      type="checkbox"
                      value={day}
                      checked={serviceDays.includes(day)}
                      onChange={() => handleDayChange(day)}
                      className="mr-2 rounded text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-gray-700">{day}</span>
                  </label>
                ))}
              </div>

              {/* Flexible Dates */}
              <div className="flex justify-between items-center gap-3">
                <div className="flex items-center gap-2">
                  <div
                    className={`relative inline-flex items-center h-6 rounded-full w-11 cursor-pointer ${
                      isFlexibleDates ? "bg-red-500" : "bg-gray-300"
                    }`}
                    onClick={() => setIsFlexibleDates(!isFlexibleDates)}
                  >
                    <span
                      className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
                        isFlexibleDates ? "translate-x-6" : "translate-x-1"
                      }`}
                    ></span>
                  </div>
                  <label className="font-medium text-gray-700">
                    Flexible Order Dates
                  </label>
                  <div className="relative group mt-1">
                    <HiOutlineInformationCircle
                      size={15}
                      className="text-gray-600 cursor-pointer hover:text-gray-800"
                    />
                    <div className="absolute w-[25vw] mt-4 top-full -left-32 hidden group-hover:flex items-center justify-center bg-gray-700 text-white text-xs rounded-md px-2 py-1 shadow-md">
                      <span>
                        Enable Flexible Order Dates for orders (e.g., 7–10 Jan
                        2025). Users can also select specific dates like 2 Jan,
                        5 Jan, or 10 Jan
                      </span>
                    </div>
                  </div>
                </div>
                {/* Save Button */}
                <div className="pr-2">
                  <button
                    onClick={handleSaveMealDays}
                    className="px-4 py-2 text-sm bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isEditing && editingItem.type === "mealType" && (
        <MealTypePopup
          editingItem={editingItem}
          mealTypes={mealTypes}
          setEditingItem={setEditingItem}
          closePopup={() => setIsEditing(false)}
          refreshData={refreshData}
        />
      )}
      {isEditing && editingItem.type === "plan" && (
        <MealPlanPopup
          editingItem={editingItem}
          setEditingItem={setEditingItem}
          closePopup={() => setIsEditing(false)}
          refreshData={refreshData}
          plans={plans}
        />
      )}
      <div className="Menu bg-white border-t-2 pt-2">
        <div className="flex gap-2 items-center">
          <h2 className="text-lg pb-2 font-medium">Meal Details</h2>
          <div className="relative group mb-1">
            <HiOutlineInformationCircle
              size={15}
              className="text-gray-600 cursor-pointer hover:text-gray-800"
            />
            <div className="absolute w-32 mt-2 top-full -left-16 hidden group-hover:flex items-center justify-center bg-gray-700 text-white text-xs rounded-md px-2 py-1 shadow-md">
              <span>List of all meal types</span>
            </div>
          </div>
        </div>
        <div className="space-y-1">
          {mealTypes.map((type) => {
            const hasMissingPrices = checkMissingPrices(type);
            return (
              <div className="flex items-center justify-between gap-2 w-full bg-white shadow-sm border hover:shadow-md p-2 rounded-md">
                <div className="flex gap-1 items-center">
                  <span className="font-medium">{type.label}:</span>
                  <span className="text-sm">{type.description}</span>
                  {hasMissingPrices && (
                    <span className="bg-red-500 w-2 h-2 rounded-full mt-2"></span>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditMenu(type, "mealType")}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <FiEdit size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(type, "mealType")}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FiTrash2 size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ManageTiffin;
