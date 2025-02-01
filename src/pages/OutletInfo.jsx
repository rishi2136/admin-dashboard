import React, { useContext } from "react";
import { OutletContext } from "../context/OutletContext";

export default function OutletInfo() {
  const { outletInfo } = useContext(OutletContext);

  return (
    <div className="p-4 space-y-6 relative">
      <h1 className="text-2xl font-bold text-gray-700">Outlet Info</h1>

      <div className="bg-white rounded shadow p-4 space-y-3 relative group transition-all">
        <div className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 cursor-pointer">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13 16h-1v-4h1m0-4h-1m1 0H7m8 0h-3"
            ></path>
          </svg>
          {/* Simple tooltip on hover */}
          <div className="absolute bg-black text-white text-xs rounded py-1 px-2 -top-8 right-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
            Info Card
          </div>
        </div>

        <div className="hover:shadow-lg transition-shadow p-2 rounded">
          <span className="text-gray-500 text-sm">Name:</span>
          <span className="ml-2 text-gray-700 font-medium">
            {outletInfo.name || "Loading..."}
          </span>
        </div>
        <div className="hover:shadow-lg transition-shadow p-2 rounded">
          <span className="text-gray-500 text-sm">RES ID:</span>
          <span className="ml-2 text-gray-700 font-medium">
            {outletInfo.resId || "N/A"}
          </span>
        </div>
        <div className="hover:shadow-lg transition-shadow p-2 rounded">
          <span className="text-gray-500 text-sm">Address:</span>
          <span className="ml-2 text-gray-700 font-medium">
            {outletInfo.address || "N/A"}
          </span>
        </div>
      </div>

      <p className="text-sm text-gray-500">
        You can add more info or an edit functionality here. This page is
        dynamically showing data from the context.
      </p>
    </div>
  );
}
