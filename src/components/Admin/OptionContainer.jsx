import React from "react";

const OptionContainer = ({ types, title }) => {
  return (
    <div className="my-2">
      <h1 className="overview-heading ">{title}</h1>
      <div className="flex gap-2 flex-wrap">
        {types.map((el, idx) => (
          <span key={idx} className="rounded-xl  bg-white px-4 py-2 border  ">
            {el}
          </span>
        ))}
      </div>
    </div>
  );
};

export default OptionContainer;
