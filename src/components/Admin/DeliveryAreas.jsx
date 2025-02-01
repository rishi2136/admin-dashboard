import React from "react";

const DeliveryAreas = ({ deliveryAreas, title }) => {
  return (
    <div className="my-2">
      <h1 className="overview-heading ">{title}</h1>
      <div className="flex gap-x-2">
        {deliveryAreas.map((el, idx) => (
          <div key={idx}>
            {el} <span className="font-medium"> | </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeliveryAreas;
