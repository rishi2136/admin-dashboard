// src/components/TopBar.jsx
import React from "react";

const TopBar = ({ title, onSearch }) => {
  return (
    <div className="w-full bg-white shadow-md border-b border-gray-200 px-6 py-4 flex items-center justify-between gap-4">
      {/* Title on the Left */}
      <h1 className="text-2xl font-bold text-gray-800 whitespace-nowrap">
        {title}
      </h1>

      {/* Search Bar on the Right */}
      <div className="relative w-1/3 max-w-md">
        <input
          type="text"
          placeholder="Search the Restaurant"
          onChange={(e) => onSearch(e.target.value)}
          className="w-full border border-gray-300 pl-10 pr-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
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
    </div>
  );
};

export default TopBar;
