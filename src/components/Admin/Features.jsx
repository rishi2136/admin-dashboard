import React from "react";
import { IoMdClose } from "react-icons/io";

const Features = ({ features, title }) => {
  return (
    <div className="my-2">
      <h1 className="overview-heading ">{title}</h1>
      <div className="grid sm:grid-cols-2 grid-cols-1 lg:grid-cols-4 gap-4 mx-2">
        {features.map((el, idx) => (
          <div
            key={idx}
            className="p-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:shadow-md hover:bg-gray-200 transition duration-200 ease-in-out flex items-center justify-between"
          >
            <span>{el.text}</span>
            <input
              type="checkbox"
              className="text-lg scale-110"
              name=""
              id=""
            />
            {/* <button className="border-0 bg-transparent ">
              <IoMdClose className="text-[25px]" />
            </button> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
