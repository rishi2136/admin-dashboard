// src/components/Offers/CreateOfferForm.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";

function CreateOfferForm({ onSave, categories, subCategories, items }) {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState("");
  const [scope, setScope] = useState("item");
  const [categoryName, setCategoryName] = useState("");
  const [subCategoryName, setSubCategoryName] = useState("");
  const [selectedItemIds, setSelectedItemIds] = useState([]);

  const handleSave = () => {
    const newOffer = {
      id: Date.now().toString(),
      name,
      code,
      discount,
      scope,
      categoryName: scope === "category" ? categoryName : null,
      subCategoryName: scope === "subcategory" ? subCategoryName : null,
      itemIds: scope === "item" ? selectedItemIds : [],
      active: true,
      validUntil: "2024-12-31",
    };
    onSave(newOffer);

    // Reset form
    setName("");
    setCode("");
    setDiscount("");
    setScope("item");
    setCategoryName("");
    setSubCategoryName("");
    setSelectedItemIds([]);
  };

  const handleItemCheckbox = (e) => {
    const val = parseInt(e.target.value, 10);
    setSelectedItemIds((prev) =>
      prev.includes(val) ? prev.filter((id) => id !== val) : [...prev, val]
    );
  };

  return (
    <motion.div
      className="border p-4 rounded shadow-md bg-white"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-xl font-bold mb-4 text-gray-800">
        Create a New Offer
      </h2>
      <div className="space-y-3">
        <div>
          <label className="block font-semibold text-gray-700">
            Offer Name
          </label>
          <input
            className="border w-full px-3 py-1.5 rounded focus:outline-none focus:border-blue-400"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., 20% Off Starters"
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700">
            Offer Code
          </label>
          <input
            className="border w-full px-3 py-1.5 rounded focus:outline-none focus:border-blue-400"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="e.g., START20"
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700">Discount</label>
          <input
            className="border w-full px-3 py-1.5 rounded focus:outline-none focus:border-blue-400"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            placeholder="e.g., 20%, $5, BOGO"
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700">Scope</label>
          <select
            className="border w-full px-3 py-1.5 rounded focus:outline-none focus:border-blue-400"
            value={scope}
            onChange={(e) => setScope(e.target.value)}
          >
            <option value="item">Item</option>
            <option value="subcategory">Subcategory</option>
            <option value="category">Category</option>
          </select>
        </div>

        {scope === "category" && (
          <div>
            <label className="block font-semibold text-gray-700">
              Select Category
            </label>
            <select
              className="border w-full px-3 py-1.5 rounded focus:outline-none focus:border-blue-400"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            >
              <option value="">-- Select --</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        )}

        {scope === "subcategory" && (
          <div>
            <label className="block font-semibold text-gray-700">
              Select Subcategory
            </label>
            <select
              className="border w-full px-3 py-1.5 rounded focus:outline-none focus:border-blue-400"
              value={subCategoryName}
              onChange={(e) => setSubCategoryName(e.target.value)}
            >
              <option value="">-- Select --</option>
              {subCategories.map((sub) => (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
          </div>
        )}

        {scope === "item" && (
          <div>
            <label className="block font-semibold text-gray-700">
              Select Items
            </label>
            <div className="max-h-32 overflow-auto border p-2 rounded">
              {items.map((itm) => (
                <label key={itm.id} className="block text-gray-600">
                  <input
                    type="checkbox"
                    value={itm.id}
                    checked={selectedItemIds.includes(itm.id)}
                    onChange={handleItemCheckbox}
                  />
                  <span className="ml-2">{itm.name}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        <button
          className="mt-2 bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition-colors"
          onClick={handleSave}
        >
          Save Offer
        </button>
      </div>
    </motion.div>
  );
}

export default CreateOfferForm;
