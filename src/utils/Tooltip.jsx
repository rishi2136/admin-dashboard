import React, { useState } from "react";

const Tooltip = ({ children, text, position = "top" }) => {
  const [isVisible, setIsVisible] = useState(false);

  const tooltipPositions = {
    top: "bottom-full left-1/2 transform -translate-x-1/2 -mb-2",
    bottom: "top-full left-1/2 transform -translate-x-1/2 -mt-2",
    left: "top-1/2 left-full transform -translate-y-1/2 -ml-2",
    right: "top-1/2 right-full transform -translate-y-1/2 -mr-2",
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div
          className={`absolute whitespace-nowrap bg-gray-700 text-white text-sm px-2 py-1 rounded shadow-lg z-10 ${tooltipPositions[position]}`}
        >
          {text}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
