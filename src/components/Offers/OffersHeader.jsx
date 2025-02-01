// src/components/Offers/OffersHeader.jsx
import React, { useState } from "react";

function OffersHeader({
  title,
  searchQuery,
  onSearch,
  columns,
  selectedColumns,
  onToggleColumn,
}) {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
      {/* Page Title */}
      <h1 className="text-2xl font-bold">{title}</h1>

      {/* Search Input */}
      <div className="flex items-center space-x-2">
        <input
          type="text"
          placeholder="Search discounts by name or code..."
          className="border px-2 py-1 rounded"
          value={searchQuery}
          onChange={onSearch}
        />
      </div>

      {/* Filters Dropdown */}
      <div className="relative">
        <button
          className="border px-2 py-1 rounded hover:bg-gray-50"
          onClick={() => setShowFilters(!showFilters)}
        >
          Filters
        </button>
        {showFilters && (
          <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow p-2 z-10">
            {columns.map((col) => (
              <label key={col.key} className="flex items-center mb-1">
                <input
                  type="checkbox"
                  checked={selectedColumns.includes(col.key)}
                  onChange={() => onToggleColumn(col.key)}
                  className="mr-2"
                />
                {col.label}
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default OffersHeader;
