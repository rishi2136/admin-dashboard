import React from "react";
import Dining2 from "./Dining2";

const AddRestaurant = () => {
  const bagdeStyle = `bg-white p-2 py-1 rounded-lg font-semibold border-[.5px] border-black focus:outline-none`;

  return (
    <div className="pt-2">
      <div className="flex justify-between">
        <h1 className="font-bold text-xl ps-2">Add restaurant</h1>
        <div className="flex gap-2 justify-end">
          <button className={bagdeStyle}>Restaurant</button>
          <button className={bagdeStyle}>Tiffin</button>
          <button className={bagdeStyle}>Excel Uplood</button>
        </div>
      </div>

      <Dining2 />
    </div>
  );
};

export default AddRestaurant;
