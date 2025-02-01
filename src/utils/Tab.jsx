import React from "react";

const Tab = ({ text, hovered }) => {
  return (
    <>
      {hovered === text && (
        <span
          className={`absolute bg-white text-black rounded-md top-0 left-[100px] p-2 z-200`}
        >
          {text}
        </span>
      )}
    </>
  );
};

export default Tab;
