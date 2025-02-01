import React from "react";

const StatisticCard = ({ label, lastMonth, total, icon }) => {
  return (
    <div className="flex flex-col border-2 my-2 rounded-lg w-[100%] md:w-[180px] ">
      <div className="p-2 pb-2 text-lg shadow font-medium flex justify-between items-center">
        <span>{label}</span>
        {icon}
      </div>
      <hr />
      <div className="p-4">
        <div className="text-[28px] leading-8">
          {label === "Cash Flow" && "$"}
          {total}
        </div>
        <div>{lastMonth} last month</div>
      </div>
    </div>
  );
};

export default StatisticCard;
