import React, { useState, useEffect } from "react";
import axios from "axios";

function ItemList() {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);

  // Form fields
  const [itemName, setItemName] = useState("");
  const [basePrice, setBasePrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  // Fetch data on mount
  useEffect(() => {
    getAllItems();
    getAllCategories();
  }, []);

  const getAllItems = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/items");
      setItems(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getAllCategories = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/categories");
      setCategories(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const addNewItem = async () => {
    try {
      let uploadedImageUrl = "";

      // If a file is selected, upload first
      if (selectedFile) {
        const formData = new FormData();
        formData.append("image", selectedFile);
        const uploadRes = await axios.post(
          "http://localhost:5000/api/upload",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        uploadedImageUrl = uploadRes.data.imageUrl; // e.g. "/uploads/1692888888888-dish.png"
      }

      // Create the item with the imageUrl
      await axios.post("http://localhost:5000/api/items", {
        itemName,
        categoryId,
        basePrice,
        imageUrl: uploadedImageUrl,
      });

      // Reset form
      setItemName("");
      setBasePrice("");
      setCategoryId("");
      setSelectedFile(null);

      // Refresh items
      getAllItems();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Items</h1>

      <ul className="mb-4 space-y-4">
        {items.map((item) => (
          <li key={item._id} className="border p-3 rounded bg-white shadow-sm">
            <div className="text-lg font-semibold">
              {item.itemName} - ₹{item.basePrice}
            </div>
            {item.categoryId && (
              <div className="text-sm text-gray-600">
                Category: {item.categoryId.categoryName}
              </div>
            )}
            {item.imageUrl ? (
              <img
                src={`http://localhost:5000${item.imageUrl}`}
                alt="Dish"
                className="mt-2 w-24 h-24 object-cover"
              />
            ) : (
              <div className="mt-2 text-sm text-gray-500">No image</div>
            )}
          </li>
        ))}
      </ul>

      {/* Form to add a new item */}
      <div className="bg-white p-4 rounded shadow-sm">
        <h2 className="text-xl font-bold mb-2">Add New Item</h2>
        <div className="flex flex-col gap-2">
          <input
            type="text"
            placeholder="Item Name"
            className="border px-2 py-1"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Base Price"
            className="border px-2 py-1"
            value={basePrice}
            onChange={(e) => setBasePrice(e.target.value)}
          />
          <select
            className="border px-2 py-1"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.categoryName}
              </option>
            ))}
          </select>
          <input
            type="file"
            onChange={handleFileChange}
            className="border px-2 py-1"
          />
          <button
            onClick={addNewItem}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 mt-2 w-fit"
          >
            Add Item
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemList;
