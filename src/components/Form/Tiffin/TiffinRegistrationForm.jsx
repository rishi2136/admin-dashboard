import React, { useState } from "react";
import axios from "axios";
import { FaCloudUploadAlt } from "react-icons/fa";
import { AiFillStar } from "react-icons/ai";
const URL = import.meta.env.VITE_SERVER_URL;

const TiffinRegistrationForm = () => {
  const [formData, setFormData] = useState({
    kitchenName: "",
    category: "",
    images: [],
    specialMealDay: "",
    location: "",
    freeDelivery: "",
    deliveryDetails: "",
    deliveryCity: "",
    ratings: 0,
    catering: false,
    houseParty: false,
    specialEvents: false,
    ownerName: "",
    email: "",
    phoneNumber: "",
    area: "",
    city: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle file input for images
  const handleFileChange = (e) => {
    setFormData({ ...formData, images: Array.from(e.target.files) });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare data for submission
    const formPayload = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "images") {
        formData.images.forEach((file) => formPayload.append("images", file));
      } else {
        formPayload.append(key, formData[key]);
      }
    });

    try {
      const response = await axios.post(
        `${URL}/api/tiffin/register`,
        formPayload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Tiffin service registered successfully!");
      setFormData({
        kitchenName: "",
        category: "",
        images: [],
        specialMealDay: "",
        location: "",
        freeDelivery: "",
        deliveryDetails: "",
        deliveryCity: "",
        ratings: 0,
        catering: false,
        houseParty: false,
        specialEvents: false,
        ownerName: "",
        email: "",
        phoneNumber: "",
        area: "",
        city: "",
      });
    } catch (error) {
      console.error("Error registering tiffin service:", error);
      alert("Failed to register tiffin service.");
    }
  };

  return (
    <div className="  p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Register Tiffin Service</h2>
      <form onSubmit={handleSubmit} className="gap-2 grid grid-cols-2">
        {/* Kitchen and Owner Details */}
        <div>
          <label className="block font-semibold">Kitchen Name</label>
          <input
            type="text"
            name="kitchenName"
            value={formData.kitchenName}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div>
          <label className="block font-semibold">Owner Name</label>
          <input
            type="text"
            name="ownerName"
            value={formData.ownerName}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div>
          <label className="block font-semibold">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div>
          <label className="block font-semibold">Phone Number</label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="block font-semibold">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          >
            <option value="">Select Category</option>
            <option value="veg">Veg</option>
            <option value="non-veg">Non-Veg</option>
            <option value="both">Both</option>
          </select>
        </div>

        {/* Delivery Details */}
        <div>
          <label className="block font-semibold">Delivery City</label>
          <input
            type="text"
            name="deliveryCity"
            value={formData.deliveryCity}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div>
          <label className="block font-semibold">Free Delivery</label>
          <input
            type="text"
            name="freeDelivery"
            value={formData.freeDelivery}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* Upload Images */}
        <div>
          <label className="block font-semibold">Upload Images</label>
          <div className="flex items-center gap-2">
            <input
              type="file"
              name="images"
              multiple
              onChange={handleFileChange}
              className="w-full p-2 border rounded-md"
            />
            <FaCloudUploadAlt className="text-xl" />
          </div>
        </div>

        {/* Catering, House Party, and Special Events Checkboxes */}
        <div className="flex gap-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="catering"
              checked={formData.catering}
              onChange={handleChange}
              className="mr-2"
            />
            Catering
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              name="houseParty"
              checked={formData.houseParty}
              onChange={handleChange}
              className="mr-2"
            />
            House Party
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              name="specialEvents"
              checked={formData.specialEvents}
              onChange={handleChange}
              className="mr-2"
            />
            Special Events
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w- p-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
        >
          Register Tiffin Service
        </button>
      </form>
    </div>
  );
};

export default TiffinRegistrationForm;
