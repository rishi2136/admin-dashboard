import React from "react";

const Filter = ({ filter }) => {
  return (
    <div
      className={`flex text-[9px] gap-[2px] cursor-pointer transition flex-wrap duration-200 `}
    >
      {filter.map((el, idx) => (
        <span
          key={idx}
          className="rounded-md p-1 flex font-semibold items-center  bg-gray-200 border"
        >
          {el}
        </span>
      ))}
    </div>
  );
};

export default Filter;
