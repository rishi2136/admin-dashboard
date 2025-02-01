// src/components/Offers/OffersTable.jsx
import React from "react";

function OffersTable({
  columns,
  selectedColumns,
  data,
  sortColumn,
  sortDirection,
  onSort,
  ChevronDownIcon,
  ChevronUpIcon,
}) {
  return (
    <div className="bg-white shadow rounded overflow-auto">
      <table className="min-w-full text-left">
        <thead>
          <tr>
            {/* Optional checkbox column for row selection */}
            <th className="px-4 py-2">
              <input type="checkbox" />
            </th>

            {columns.map((col) => {
              if (!selectedColumns.includes(col.key)) return null;
              return (
                <th
                  key={col.key}
                  className="px-4 py-2 cursor-pointer select-none"
                  onClick={() => onSort(col.key)}
                >
                  <div className="flex items-center">
                    {col.label}
                    {sortColumn === col.key &&
                      (sortDirection === "asc" ? (
                        <ChevronUpIcon className="h-4 w-4 ml-1" />
                      ) : (
                        <ChevronDownIcon className="h-4 w-4 ml-1" />
                      ))}
                  </div>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={selectedColumns.length + 1}
                className="px-4 py-4 text-center text-gray-500"
              >
                No discounts found.
              </td>
            </tr>
          ) : (
            data.map((offer) => (
              <tr key={offer.id} className="border-b hover:bg-gray-50">
                {/* Row selection checkbox */}
                <td className="px-4 py-2">
                  <input type="checkbox" />
                </td>
                {columns.map((col) => {
                  if (!selectedColumns.includes(col.key)) return null;
                  return (
                    <td key={col.key} className="px-4 py-2">
                      {offer[col.key]}
                    </td>
                  );
                })}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default OffersTable;
