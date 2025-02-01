// frontend/src/components/CategoryList.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import CategoryModal from "./CategoryModal";

function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/categories");
      setCategories(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveCategory = async (name) => {
    try {
      await axios.post("http://localhost:5000/api/categories", {
        categoryName: name,
      });
      fetchCategories();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Categories</h1>
      <ul className="mb-4">
        {categories.map((cat) => (
          <li key={cat._id} className="py-1">
            {cat.categoryName}
          </li>
        ))}
      </ul>

      <button
        onClick={() => setModalOpen(true)}
        className="bg-blue-500 text-white px-4 py-2"
      >
        Add Category
      </button>

      <CategoryModal
        isOpen={modalOpen}
        setIsOpen={setModalOpen}
        onSave={handleSaveCategory}
      />
    </div>
  );
}

export default CategoryList;
