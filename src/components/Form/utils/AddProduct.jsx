import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../../data/info";
import { Link, useNavigate } from "react-router-dom";
// const URL = import.meta.env.VITE_SERVER_URL;

const AddProduct = ({ ID, nextStep, prevStep, setID }) => {
  const [formData, setFormData] = useState({
    productName: "",
    price: "",
    description: "",
    bestSeller: "",
    category: "veg",
    images: [],
    dietary: [],
    group: "",
  });
  const [productCount, setProductCount] = useState(0);
  const [productList, setProductList] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleReturn = () => {
    setID(null);
    // navigate("/");
    nextStep();
  };
  const dietaryOptions = [
    { label: "Vegetarian", value: "vegetarian" },
    { label: "Vegan", value: "vegan" },
    { label: "Gluten-Free", value: "gluten-free" },
    { label: "Nut-Free", value: "nut-free" },
    { label: "Organic", value: "organic" },
    { label: "Dairy-Free", value: "dairy-free" },
    { label: "Halal", value: "halal" },
  ];

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "images") {
      const fileArray = Array.from(files);
      setFormData((prev) => ({
        ...prev,
        [name]: fileArray,
      }));
      setImagePreviews(fileArray.map((file) => URL.createObjectURL(file)));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Fetch product list from the backend
  useEffect(() => {
    if (productCount > 0) {
      const fetchProducts = async () => {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_SERVER_URL}/product/${ID}/all-products`
          );
          console.log(response);
          if (response.data.message) {
            return alert(response.data.message);
          }
          setProductList(response.data);
        } catch (err) {
          console.error("Failed to fetch products:", err);
        }
      };

      fetchProducts();
    }
  }, [productCount]);

  console.log(ID); //firm id
  // Submit form data to the backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formPayload = new FormData();

    // Append all non-image form data
    for (const key in formData) {
      if (key !== "images" && key !== "dietary") {
        formPayload.append(key, formData[key]);
      }
    }

    // Append multiple images
    formData.images.forEach((file) => {
      formPayload.append("images", file);
    });

    formData.dietary.forEach((item, idx) => {
      formPayload.append(`dietary`, item);
    });

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/product/${ID}/add-product`,
        formPayload,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      // alert("Product added successfully!");
      // console.log(res.data)
      console.log(res.data);
      if (res.data.response === "ok") {
        alert(res.data.message);
      }
      setProductCount((prev) => prev + 1);
      // Reset form data
      setFormData({
        productName: "",
        price: "",
        description: "",
        bestSeller: "",
        category: "veg",
        images: [],
        dietary: [],
        group: "",
      });
      setImagePreviews([]);
    } catch (err) {
      console.error("Error while uploading product:", err);
    }
  };

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};
    if (!formData.productName)
      newErrors.productName = "Product name is required";
    if (!formData.price) newErrors.price = "Price is required";
    if (!formData.description)
      newErrors.description = "Description is required";
    if (!formData.group) newErrors.group = "Group is required";
    if (!formData.images.length)
      newErrors.images = "At least one product image is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleDietaryChange = (event) => {
    const { value, checked } = event.target;

    setFormData((prevData) => {
      const updatedDietary = checked
        ? [...prevData.dietary, value]
        : prevData.dietary.filter((item) => item !== value);

      return { ...prevData, dietary: updatedDietary };
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-3">
      <button
        onClick={handleReturn}
        className="rounded-md py-1 px-2 bg-blue-500 text-white float-end"
      >
        Done and Move Forward
      </button>
      <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
      <form onSubmit={handleSubmit}>
        {/* Product Name */}
        <label
          className="block mb-2 text-sm font-semibold"
          htmlFor="productName"
        >
          Product Name*
        </label>
        <input
          type="text"
          id="productName"
          name="productName"
          value={formData.productName}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md"
        />
        {errors.productName && (
          <span className="text-red-500">{errors.productName}</span>
        )}

        {/* Price */}
        <label className="block mb-2 text-sm font-semibold" htmlFor="price">
          Price*
        </label>
        <input
          type="text"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md"
        />
        {errors.price && <span className="text-red-500">{errors.price}</span>}

        {/* Description */}
        <label
          className="block mb-2 text-sm font-semibold"
          htmlFor="description"
        >
          Description*
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md"
        />
        {errors.description && (
          <span className="text-red-500">{errors.description}</span>
        )}

        {/* Best Seller */}
        <div className="mt-4">
          <label className="block mb-2 text-sm font-semibold">
            Best Seller
          </label>
          <div className="flex gap-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="bestSeller"
                value="true"
                checked={formData.bestSeller === "true"}
                onChange={handleChange}
              />
              <span>Yes</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="bestSeller"
                value="false"
                checked={formData.bestSeller === "false"}
                onChange={handleChange}
              />
              <span>No</span>
            </label>
          </div>
        </div>

        {/* Category */}
        <label className="block mb-2 text-sm font-semibold" htmlFor="category">
          Select Category*
        </label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md"
        >
          <option value="veg">Veg</option>
          <option value="non-veg">Non-Veg</option>
          <option value="both">Both</option>
        </select>

        <label htmlFor="group" className="block mb-2 text-sm font-semibold">
          Group*
        </label>
        <input
          type="text"
          name="group"
          id="group"
          className="w-full px-3 py-2 border rounded-md"
          value={formData.group}
          onChange={handleChange}
          placeholder="i.e. Beverage, Appetizers"
        />

        <label>Dietary Preferences:</label>
        <div className="flex items-center flex-wrap">
          {dietaryOptions.map(({ label, value }) => (
            <div key={value} className="flex items-center">
              <input
                type="checkbox"
                value={value}
                checked={formData.dietary.includes(value)}
                onChange={handleDietaryChange}
              />
              <label className="me-2 mb-0">{label}</label>
            </div>
          ))}
        </div>

        {/* Image Upload */}
        <label
          htmlFor="images"
          className="block mt-4 mb-2 text-sm font-semibold"
        >
          Choose Product Images
        </label>
        <input
          type="file"
          id="images"
          name="images"
          multiple
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md"
        />
        {errors.images && <span className="text-red-500">{errors.images}</span>}

        {/* Image Previews */}
        <div className="mt-4 flex flex-wrap gap-4">
          {imagePreviews.map((imageSrc, index) => (
            <img
              key={index}
              src={imageSrc}
              alt={`Preview ${index + 1}`}
              className="w-24 h-24 object-cover rounded-md"
            />
          ))}
        </div>

        <button
          type="submit"
          className="mt-4 p-2 bg-blue-500 text-white rounded-md"
        >
          Add Product
        </button>
        {/* <button
          type="button"
          className="mt-4 ml-2 p-2 bg-gray-400 text-white rounded-md"
          onClick={prevStep}
        >
          Back
        </button> */}
      </form>

      {/* Display Added Products */}

      <h3 className="mt-8 text-lg font-semibold">Product List</h3>
      <ul className="mb-4 ">
        {productList.length > 0 &&
          productList.map((product) => (
            <li key={product._id} className="border-b py-2 ">
              <div className="bg-gray-300 rounded h-14 w-14">
                <img src={product.images[0].url || ""} alt="" />
              </div>
              <div>
                <strong>{product.productName}</strong> - ${product.price}
                <p>{product.description}</p>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default AddProduct;
