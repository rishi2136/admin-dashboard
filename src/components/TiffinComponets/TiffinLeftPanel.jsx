import React, { useState, useEffect } from "react";

<<<<<<< HEAD
const TiffinLeftPanel = ({ onselectComponet }) => {
=======
const TiffinLeftPanel = ({ onselectComponet, nextStep }) => {
>>>>>>> c7983b2717f06e0ff11610ca4a58703a0c141e69
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedComponet, setselectedComponet] = useState(null);

  const handleSelectedComponet = (componet) => {
    setselectedComponet(componet);
    onselectComponet(componet);
    // console.log("Selected Componet is:", selectedComponet);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory((prev) => (prev === category ? null : category));
  };

  return (
<<<<<<< HEAD
    <div className="w-full bg-gray-50 border-r border-gray-200 p-4 flex custom-scrollbar">
      <section className="top-sec flex">
        <div
          onClick={() => handleSelectedComponet("Manage-Tiffin")}
          className={`mb-2`}
        >
          <div
            className={`cursor-pointer py-2 px-3  rounded-md shadow-sm hover:bg-gray-100  transition-all duration-300 ease-in-out flex justify-between items-center ${
              selectedComponet == "Manage-Tiffin" ? "bg-gray-100" : "bg-white"
            }`}
            onClick={() => handleCategoryClick("Manage-Tiffin")}
          >
            <h2 className="font-semibold text-gray-700">Manage-Tiffin</h2>
          </div>
        </div>

        <div
          onClick={() => handleSelectedComponet("Instructions")}
          className="mb-2"
        >
          <div
            className={`cursor-pointer py-2 px-3  rounded-md shadow-sm hover:bg-gray-100  transition-all duration-300 ease-in-out flex justify-between items-center ${
              selectedComponet == "Instructions" ? "bg-gray-100" : "bg-white"
            }`}
            onClick={() => handleCategoryClick("Instructions")}
          >
            <h2 className="font-semibold text-gray-700">Instructions</h2>
          </div>
        </div>

        {/* <div onClick={() => handleSelectedComponet("Reviews")} className="mb-2">
          <div
            className={`cursor-pointer py-2 px-3  rounded-md shadow-sm hover:bg-gray-100  transition-all duration-300 ease-in-out flex justify-between items-center ${
              selectedComponet == "Reviews" ? "bg-gray-100" : "bg-white"
            }`}
            onClick={() => handleCategoryClick("Reviews")}
          >
            <h2 className="font-semibold text-gray-700">Reviews</h2>
          </div>
        </div> */}
=======
    <div className="w-full bg-gray-50 border-r border-gray-200 p-4 flex  overflow-y-hidden custom-scrollbar">
      <section className="top-sec">
        <h1 className="text-xl font-semibold mb-4 text-gray-700">
          Tiffin Details
        </h1>
        <div className="flex gap-2">
          <div
            onClick={() => handleSelectedComponet("Manage-Tiffin")}
            className={`mb-2`}
          >
            <div
              className={`cursor-pointer py-2 px-3  rounded-md shadow-sm hover:bg-gray-100  transition-all duration-300 ease-in-out flex justify-between items-center ${
                selectedComponet == "Manage-Tiffin" ? "bg-gray-100" : "bg-white"
              }`}
              onClick={() => handleCategoryClick("Manage-Tiffin")}
            >
              <h2 className="font-semibold text-gray-700">Manage-Tiffin</h2>
            </div>
          </div>

          <div
            onClick={() => handleSelectedComponet("Instructions")}
            className="mb-2"
          >
            <div
              className={`cursor-pointer py-2 px-3  rounded-md shadow-sm hover:bg-gray-100  transition-all duration-300 ease-in-out flex justify-between items-center ${
                selectedComponet == "Instructions" ? "bg-gray-100" : "bg-white"
              }`}
              onClick={() => handleCategoryClick("Instructions")}
            >
              <h2 className="font-semibold text-gray-700">Instructions</h2>
            </div>
          </div>

          {/* <div
            onClick={() => handleSelectedComponet("Reviews")}
            className="mb-2"
          >
            <div
              className={`cursor-pointer py-2 px-3  rounded-md shadow-sm hover:bg-gray-100  transition-all duration-300 ease-in-out flex justify-between items-center ${
                selectedComponet == "Reviews" ? "bg-gray-100" : "bg-white"
              }`}
              onClick={() => handleCategoryClick("Reviews")}
            >
              <h2 className="font-semibold text-gray-700">Reviews</h2>
            </div>
          </div> */}
          <button onClick={nextStep}>Save and Move</button>
        </div>
>>>>>>> c7983b2717f06e0ff11610ca4a58703a0c141e69
      </section>
    </div>
  );
};

export default TiffinLeftPanel;
