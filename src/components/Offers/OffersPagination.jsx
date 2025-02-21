// src/components/Offers/OffersPagination.jsx
import React from "react";

function OffersPagination({
  currentPage,
  totalPages,
  totalItems,
  rowsPerPage,
  startIndex,
  onPageChange,
}) {
  if (totalPages <= 1) {
    // If there's only one page, hide pagination entirely (optional)
    return null;
  }

  return (
    <div className="flex items-center justify-between mt-2">
      <div className="text-sm text-gray-600">
        {startIndex + 1} – {Math.min(startIndex + rowsPerPage, totalItems)} of{" "}
        {totalItems}
      </div>
      <div className="space-x-2">
        <button
          className="border px-2 py-1 rounded disabled:opacity-50"
          disabled={currentPage === 1}
          onClick={() => onPageChange("prev")}
        >
          Previous
        </button>
        <button
          className="border px-2 py-1 rounded disabled:opacity-50"
          disabled={currentPage === totalPages || totalPages === 0}
          onClick={() => onPageChange("next")}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default OffersPagination;
