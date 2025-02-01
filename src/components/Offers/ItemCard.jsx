// src/components/Offers/ItemCard.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { getApplicableOffers } from "../../utils/offerUtils";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

function ItemCard({ item, allOffers }) {
  const matchedOffers = getApplicableOffers(item, allOffers);
  const imageUrl = item.images?.[0] || "https://via.placeholder.com/300x200";

  const [showAllOffers, setShowAllOffers] = useState(false);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    hover: { scale: 1.03 },
  };

  const handleToggleOffers = (e) => {
    e.stopPropagation();
    setShowAllOffers((prev) => !prev);
  };

  return (
    <motion.div
      className="bg-white rounded-lg shadow-md overflow-hidden mb-4 cursor-pointer
                 transition-transform hover:shadow-lg relative"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
    >
      {/* Item Image */}
      <div className="h-40 w-full overflow-hidden">
        <img
          src={imageUrl}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Card Content */}
      <div className="p-4">
        <h4 className="font-semibold text-gray-800 text-lg">{item.name}</h4>
        <p className="text-sm text-gray-500">
          {item.category} &gt; {item.subCategory}
        </p>

        {/* Pricing & Offers */}
        <div className="mt-2">
          <p className="text-gray-600 font-medium">
            Price: ${item.pricing?.toFixed?.(2) ?? item.pricing}
          </p>

          {/* Show matched offers */}
          {matchedOffers.length === 0 ? (
            <span className="text-xs text-gray-400">No current offers</span>
          ) : matchedOffers.length === 1 ? (
            // If exactly 1 offer
            <div className="flex flex-wrap gap-2 mt-1">
              <span
                key={matchedOffers[0].id}
                className="inline-block bg-green-50 text-green-700 px-2 py-1
                           text-xs font-semibold rounded-full shadow-sm
                           border border-green-100"
              >
                {matchedOffers[0].discount} OFF (Code: {matchedOffers[0].code})
              </span>
            </div>
          ) : (
            // If multiple offers
            <div className="flex items-center gap-2 mt-1">
              <span
                key={matchedOffers[0].id}
                className="inline-block bg-green-50 text-green-700 px-2 py-1
                           text-xs font-semibold rounded-full shadow-sm
                           border border-green-100"
              >
                {matchedOffers[0].discount} OFF (Code: {matchedOffers[0].code})
              </span>

              {/* Info icon to toggle additional offers */}
              <button
                onClick={handleToggleOffers}
                className="relative text-green-700 hover:text-green-800 focus:outline-none"
              >
                <InformationCircleIcon className="w-5 h-5" />
              </button>

              {/* Popover for additional offers */}
              {showAllOffers && (
                <div
                  className="absolute top-16 left-4 z-10 w-64 bg-white border border-gray-200
                             rounded shadow-lg p-2 text-sm"
                  onClick={(e) => e.stopPropagation()}
                >
                  <p className="font-semibold text-gray-700 mb-1">
                    Additional Offers
                  </p>
                  <div className="space-y-1">
                    {matchedOffers.slice(1).map((offer) => (
                      <div
                        key={offer.id}
                        className="bg-green-50 text-green-700 px-2 py-1
                                   rounded-full shadow-sm border border-green-100"
                      >
                        {offer.discount} OFF (Code: {offer.code})
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => setShowAllOffers(false)}
                    className="mt-2 text-xs text-gray-500 underline"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/*
          Removed the item.description block.
          If you want to re-enable later, just add it back:
          {item.description && (
            <p className="text-sm text-gray-700 mt-2 line-clamp-2">
              {item.description}
            </p>
          )}
        */}
      </div>
    </motion.div>
  );
}

export default ItemCard;
