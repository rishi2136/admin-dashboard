import React, { useState } from "react";

export default function DineInMenu() {
  // Track active tab if you need multiple sub-features
  const [activeTab, setActiveTab] = useState("items");

  // Example categories for Dine-In
  const categories = [
    { name: "Appetizers", subCount: 2, itemCount: 8 },
    { name: "Main Course", subCount: 3, itemCount: 12 },
    { name: "Desserts", subCount: 1, itemCount: 6 },
    { name: "Breads & Rice", subCount: 2, itemCount: 10 },
    { name: "Beverages", subCount: 1, itemCount: 5 },
  ];

  // Example sub-lists for demonstration
  const vegItems = [
    { name: "Paneer Roll", price: 220 },
    { name: "Mixed Veg Platter", price: 280 },
  ];
  const nonVegItems = [
    { name: "Chicken Lollipop", price: 300 },
    { name: "Mutton Seekh", price: 350 },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Top bar: title, search, tabs */}
      <div className="flex items-center justify-between border-b p-4">
        {/* Left: Title */}
        <h1 className="text-2xl font-bold text-gray-800">Dine-In Menu</h1>

        {/* Center: Search bar */}
        <div className="relative w-1/2 max-w-md">
          <input
            type="text"
            placeholder="Search items, categories..."
            className="w-full border border-gray-300 pl-10 pr-3 py-2 rounded focus:outline-none focus:border-red-500"
          />
          <svg
            className="w-5 h-5 text-gray-400 absolute left-3 top-2.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.87-4.87M3 11a8 8 0 1116 0 8 8 0 01-16 0z"
            />
          </svg>
        </div>

        {/* Right: Tabs (if you have multiple features for dine-in) */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab("items")}
            className={`px-4 py-2 border-b-2 ${
              activeTab === "items"
                ? "border-red-500 text-red-500 font-semibold"
                : "border-transparent text-gray-600"
            }`}
          >
            Items
          </button>
          <button
            onClick={() => setActiveTab("addons")}
            className={`px-4 py-2 border-b-2 ${
              activeTab === "addons"
                ? "border-red-500 text-red-500 font-semibold"
                : "border-transparent text-gray-600"
            }`}
          >
            Add-ons
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left side: Categories */}
        <div className="w-1/3 border-r overflow-y-auto p-4 bg-gray-50">
          <h2 className="text-lg font-semibold mb-4">Menu listing</h2>
          <ul>
            {categories.map((cat) => (
              <li key={cat.name} className="py-2 border-b text-gray-700">
                <div className="flex justify-between items-center cursor-pointer">
                  <span>
                    {cat.name}{" "}
                    <span className="text-sm text-gray-500">
                      ({cat.subCount} sub, {cat.itemCount} items)
                    </span>
                  </span>
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </li>
            ))}
          </ul>

          <button className="mt-4 text-blue-500 hover:text-blue-600">
            + Add Menu Category
          </button>
        </div>

        {/* Right side: Items, details, etc. */}
        <div className="flex-1 overflow-y-auto p-4">
          {/* Example sub-lists for “Appetizers” or “Main Course” */}
          <div className="mb-6">
            <h2 className="font-semibold text-lg text-gray-700 mb-2">
              Appetizers
            </h2>

            {/* Veg Items */}
            <div className="ml-4 mb-2">
              <div className="text-gray-600 font-medium mb-1">Veg Dine-In</div>
              <ul className="pl-2">
                {vegItems.map((item) => (
                  <li
                    key={item.name}
                    className="flex justify-between items-center text-gray-700 py-1"
                  >
                    <span>{item.name}</span>
                    <span className="text-sm">₹{item.price}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Non Veg Items */}
            <div className="ml-4">
              <div className="text-gray-600 font-medium mb-1">
                Non Veg Dine-In
              </div>
              <ul className="pl-2">
                {nonVegItems.map((item) => (
                  <li
                    key={item.name}
                    className="flex justify-between items-center text-gray-700 py-1"
                  >
                    <span>{item.name}</span>
                    <span className="text-sm">₹{item.price}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Buttons for adding items or combos */}
            <div className="mt-2 flex items-center gap-4 ml-4 text-blue-500 text-sm">
              <button className="hover:underline">+ Add item</button>
              <button className="hover:underline">+ Map existing item</button>
              <button className="hover:underline">+ Create Combo</button>
            </div>
          </div>

          {/* Sample "Item Detail / Edit" section, matching the style of DeliveryMenu */}
          <div className="border p-4 rounded-md bg-white">
            <h2 className="text-gray-800 font-semibold mb-2">
              Item Detail / Edit Section
            </h2>
            <div className="flex gap-4">
              {/* Pricing */}
              <div className="w-1/3">
                <div className="mb-2">
                  <label className="block text-gray-600 text-sm">
                    Base Price
                  </label>
                  <input
                    type="number"
                    className="border px-2 py-1 w-full rounded"
                    defaultValue={180}
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-gray-600 text-sm">
                    Taxes & Charges
                  </label>
                  <select className="border px-2 py-1 w-full rounded">
                    <option>No tax</option>
                    <option>GST 5%</option>
                    <option>GST 12%</option>
                  </select>
                </div>
              </div>

              {/* Images */}
              <div className="w-1/3">
                <label className="block text-gray-600 text-sm mb-1">
                  Images and Video
                </label>
                <div className="flex gap-2">
                  <div className="w-16 h-16 border flex items-center justify-center text-gray-400">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 5h18M3 10h18M3 15h18M3 20h18"
                      />
                    </svg>
                  </div>
                  <div className="w-16 h-16 border flex items-center justify-center text-gray-400">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </div>
                  <div className="w-16 h-16 border flex items-center justify-center text-gray-400">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16 8l-4 4-4-4"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Description + Dish Details */}
              <div className="flex-1">
                <label className="block text-gray-600 text-sm">
                  Item Description
                </label>
                <textarea
                  rows={3}
                  className="border w-full rounded px-2 py-1"
                  defaultValue="Delicious paneer roll perfect for dine-in..."
                ></textarea>

                <div className="flex gap-2 mt-2">
                  <div>
                    <label className="block text-sm text-gray-600">
                      Serving info
                    </label>
                    <select className="border rounded px-2 py-1">
                      <option>Serves</option>
                      <option>Pieces</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600">
                      Calorie count
                    </label>
                    <input
                      type="number"
                      className="border rounded px-2 py-1 w-16"
                      defaultValue={1}
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600">
                      Portion Size
                    </label>
                    <input
                      type="number"
                      className="border rounded px-2 py-1 w-16"
                      defaultValue={1}
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600">
                      Preparation Time
                    </label>
                    <input
                      type="text"
                      className="border rounded px-2 py-1 w-20"
                      defaultValue="10 mins"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 mt-4">
              <button className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600">
                Save Changes
              </button>
              <button className="bg-gray-200 px-4 py-1 rounded hover:bg-gray-300">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
