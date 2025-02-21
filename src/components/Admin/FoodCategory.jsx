import React from "react";

const FoodCategory = ({ title, category }) => {
  // const category = ["Veg", "Non-Veg", "Vegan", "Halal", "Gluten-Free"];
  return (
    <div className="my-4">
      <h1 className="overview-heading ">{title}</h1>
      <div className="flex gap-2 flex-wrap">
        {category.map((item, index) => (
          <span key={index} className="rounded-xl  bg-white px-4 py-2 border  ">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

export default FoodCategory;
