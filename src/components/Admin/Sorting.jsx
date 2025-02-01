import React, { useState } from "react";
import { MdSort } from "react-icons/md";
import { GrSort } from "react-icons/gr";
import { FaFilter } from "react-icons/fa";
import Popup from "../../utils/Popup";
import Tooltip from "../../utils/ToolTip";

const Sorting = ({ label = "", list }) => {
  let [isVisible, setIsVisible] = useState(false);

  const handleClick = () => {
    setIsVisible(!isVisible);
  };
  return (
    <div className="flex justify-end relative ">
      <Tooltip
        text={`${label !== "" ? "rating" : "sorting"}`}
        position="bottom"
      >
        <button
          onClick={handleClick}
          className="rounded-2xl border-0 gap-1 text-[14px]  px-2 py-1 flex items-center justify-end bg-gray-200 "
          title="sort"
        >
          {label === "Filters" ? <FaFilter /> : <GrSort />}
        </button>
      </Tooltip>

      <ul
        className={`m-0 absolute font-semibold overflow-hidden w-[170px] z-10 bg-gray-100 border border-gray-300 top-8 rounded-2xl shadow-lg ${
          isVisible ? "block" : "hidden"
        }`}
      >
        {list.map((item, index) => (
          <li
            key={index}
            className="text-[14px] px-4 py-1 cursor-pointer bg-gray-100 hover:bg-gray-200  "
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sorting;
