// src/components/TopBar.jsx
import React from "react";

const TopBar = ({ title, onSearch }) => {
  return (
    <div className="w-full bg-white shadow-sm border-b border-gray-200 px-2 py-1 flex items-center justify-between h-12">
      {/* Title on the Left */}
      <h1 className="text-sm font-medium text-gray-800 whitespace-nowrap">
        {title}
      </h1>
      

      {/* Search Bar on the Right */}
      <div className="relative w-40 sm:w-48">
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => onSearch(e.target.value)}
          className="w-full border border-gray-300 pl-8 pr-2 py-1 text-xs rounded focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-500"
        />
        <svg
          className="w-4 h-4 text-gray-400 absolute left-2 top-1/2 transform -translate-y-1/2"
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
    </div>
  );
};

export default TopBar;
