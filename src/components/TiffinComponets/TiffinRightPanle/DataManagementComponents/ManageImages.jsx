import React, { useState } from "react";
import { FiPlus, FiEdit, FiTrash2 } from "react-icons/fi";

const ImageSelector = () => {
  const [selectedImage, setSelectedImage] = useState(
    "https://tiffinstash.com/cdn/shop/files/FoodEXPremiumVegTiffinService_dc8c57af-1b52-4e76-ac5e-4e87facb8c0b_1024x1024@2x.png?v=1708080733"
  );

  const images = [
    "https://tiffinstash.com/cdn/shop/files/FoodEXPremiumVegTiffinService_dc8c57af-1b52-4e76-ac5e-4e87facb8c0b_1024x1024@2x.png?v=1708080733",
    "https://b.zmtcdn.com/data/pictures/chains/9/110339/858f303e1b23e8a57df71fbac15e1455_featured_v2.jpg?output-format=webp",
    "https://b.zmtcdn.com/data/pictures/1/21505351/272cf1230eb71ecd8453693030b9bae0_featured_v2.jpg?output-format=webp",
    "https://b.zmtcdn.com/data/pictures/4/19229594/fc3e5cbf6154914633613ffec7c883c8_featured_v2.jpg?output-format=webp",
  ];

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleEdit = () => {
    console.log("Edit action for:", selectedImage);
  };

  const handleDelete = () => {
    console.log("Delete action for:", selectedImage);
  };

  const handleAdd = () => {
    console.log("Add new image action");
  };

  return (
    <div className="flex flex-col max-w-[200px]">
      {/* Main Image Section */}
      <div className="relative">
        <img
          className="rounded-md w-[200px] h-[200px]"
          src={selectedImage}
          alt="Selected Tiffin Service"
        />
        <div className="flex gap-1 items-center absolute top-2 right-1">
          {/* <div
            className="text-white bg-blue-500 rounded-full p-1 cursor-pointer"
            onClick={handleAdd}
          >
            <FiPlus size={10} />
          </div> */}
          <div
            className="text-white bg-blue-500 rounded-full p-1 cursor-pointer"
            onClick={handleEdit}
          >
            <FiEdit size={10} />
          </div>
          <div
            className="text-white bg-red-500 rounded-full p-1 cursor-pointer"
            onClick={handleDelete}
          >
            <FiTrash2 size={10} />
          </div>
        </div>
      </div>

      {/* Thumbnail Section */}
        <div className="flex flex-wrap items-center gap-1 mt-1">
          {images.map((image, index) => (
            <img
              key={index}
              className={`rounded-md w-12 h-12 object-cover cursor-pointer ${selectedImage === image ? "ring-2 ring-blue-500" : ""
                }`}
              src={image}
              alt={`Tiffin ${index + 1}`}
              onClick={() => handleImageClick(image)}
            />
          ))}
          <div
            className="text-white rounded-md bg-gray-300 w-12 h-12 flex items-center justify-center cursor-pointer"
            onClick={handleAdd}
          >
            <FiPlus size={20} />
          </div>
        </div>

      </div>
  );
};

export default ImageSelector;
