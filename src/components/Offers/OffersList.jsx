// src/components/Offers/OffersList.jsx

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";

function OffersList({ offers, onRemoveOffer, onEditOffer, itemMap }) {
  const [editingOfferId, setEditingOfferId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    discount: "",
    validUntil: "",
  });

  // Check if an offer is expired
  const isExpired = (offer) => {
    if (!offer.validUntil) return false;
    return new Date() > new Date(offer.validUntil);
  };

  // Begin edit mode
  const handleEditClick = (offer) => {
    setEditingOfferId(offer.id);
    setFormData({
      name: offer.name || "",
      code: offer.code || "",
      discount: offer.discount || "",
      validUntil: offer.validUntil || "",
    });
  };

  // Track form changes in edit mode
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Save edits
  const handleSave = (offerId) => {
    onEditOffer(offerId, {
      name: formData.name,
      code: formData.code,
      discount: formData.discount,
      validUntil: formData.validUntil,
    });
    setEditingOfferId(null);
  };

  // Cancel edit mode
  const handleCancelEdit = () => {
    setEditingOfferId(null);
  };

  // Build a "target description" for each offer
  const getTargetDescription = (offer) => {
    if (offer.scope === "category") {
      return `Applied to category: ${offer.categoryName}`;
    } else if (offer.scope === "subcategory") {
      return `Applied to subcategory: ${offer.subCategoryName}`;
    } else if (offer.scope === "item") {
      const names = offer.itemIds.map((id) => itemMap[id] || `Item #${id}`);
      return `Applied to items: ${names.join(", ")}`;
    }
    return "";
  };

  // Badge color for scope
  const getScopeBadgeClass = (scope) => {
    if (scope === "item") return "bg-blue-100 text-blue-800";
    if (scope === "subcategory") return "bg-purple-100 text-purple-800";
    return "bg-green-100 text-green-800"; // category
  };

  return (
    <div className="mt-8">
      {/* Title */}
      <h2 className="text-xl font-bold mb-2 text-gray-800">Current Offers</h2>

      {offers.length === 0 ? (
        <p className="text-gray-500">No offers created yet.</p>
      ) : (
        /**
         * We wrap the list in an overflow-auto container with a max-height
         * for about 4 cards. Adjust as needed.
         */
        <div className="overflow-auto max-h-96">
          <ul className="space-y-3 pr-2">
            <AnimatePresence>
              {offers.map((offer) => {
                const expired = isExpired(offer);
                const scopeBg = getScopeBadgeClass(offer.scope);
                const targetDescription = getTargetDescription(offer);

                const isEditing = editingOfferId === offer.id;

                return (
                  <motion.li
                    key={offer.id}
                    className="relative rounded p-4 flex flex-col border border-gray-100
                               shadow-sm hover:shadow-md transition-shadow"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    layout
                  >
                    {isEditing ? (
                      // EDIT MODE
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 mb-1">
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="border px-2 py-1 rounded focus:outline-none
                                       focus:border-blue-400 w-full text-sm"
                            placeholder="Offer Name"
                          />
                          {expired && (
                            <span className="text-xs text-red-500 font-medium">
                              (Expired)
                            </span>
                          )}
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                          <div>
                            <label className="block text-xs font-semibold text-gray-600">
                              Code
                            </label>
                            <input
                              type="text"
                              name="code"
                              value={formData.code}
                              onChange={handleChange}
                              className="border px-2 py-1 rounded w-full focus:outline-none
                                         focus:border-blue-400"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-gray-600">
                              Discount
                            </label>
                            <input
                              type="text"
                              name="discount"
                              value={formData.discount}
                              onChange={handleChange}
                              className="border px-2 py-1 rounded w-full focus:outline-none
                                         focus:border-blue-400"
                            />
                          </div>
                        </div>

                        <div className="flex items-center gap-2 text-xs text-gray-700">
                          <span
                            className={`px-2 py-0.5 font-semibold rounded ${scopeBg}`}
                          >
                            {offer.scope}
                          </span>
                          <span className="text-gray-500">
                            {targetDescription}
                          </span>
                        </div>

                        {offer.validUntil !== undefined && (
                          <div className="mt-2">
                            <label className="block text-xs font-semibold text-gray-600">
                              Expires On
                            </label>
                            <input
                              type="date"
                              name="validUntil"
                              value={formData.validUntil}
                              onChange={handleChange}
                              className="border px-2 py-1 rounded w-full focus:outline-none
                                         focus:border-blue-400 text-sm"
                            />
                          </div>
                        )}

                        {/* Save / Cancel */}
                        <div className="flex items-center gap-3 mt-2">
                          <button
                            className="bg-blue-600 text-white px-3 py-1 rounded text-sm
                                       hover:bg-blue-700"
                            onClick={() => handleSave(offer.id)}
                          >
                            Save
                          </button>
                          <button
                            className="bg-gray-300 text-gray-800 px-3 py-1 rounded text-sm
                                       hover:bg-gray-400"
                            onClick={handleCancelEdit}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      // VIEW MODE
                      <>
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <p className="font-semibold text-gray-900 text-base">
                              {offer.name}
                            </p>
                            {expired && (
                              <span className="text-xs text-red-500 font-medium">
                                (Expired)
                              </span>
                            )}
                          </div>

                          {/* Icons */}
                          <div className="flex gap-2">
                            <PencilIcon
                              className="h-5 w-5 text-blue-600 cursor-pointer
                                         hover:text-blue-800"
                              onClick={() => handleEditClick(offer)}
                            />
                            <TrashIcon
                              className="h-5 w-5 text-red-500 cursor-pointer
                                         hover:text-red-700"
                              onClick={() => onRemoveOffer(offer.id)}
                            />
                          </div>
                        </div>

                        <div className="text-sm text-gray-700 space-y-1">
                          <p>
                            Code: <strong>{offer.code}</strong>
                          </p>
                          <p>
                            Discount: <strong>{offer.discount}</strong>
                          </p>

                          <div className="flex items-center gap-2 flex-wrap">
                            <span
                              className={`px-2 py-0.5 text-xs font-semibold rounded ${scopeBg}`}
                            >
                              {offer.scope}
                            </span>
                            <span className="text-xs text-gray-500">
                              {targetDescription}
                            </span>
                            {offer.validUntil && (
                              <span className="text-xs text-gray-400">
                                Expires on {offer.validUntil}
                              </span>
                            )}
                          </div>
                        </div>
                      </>
                    )}
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </ul>
        </div>
      )}
    </div>
  );
}

export default OffersList;
