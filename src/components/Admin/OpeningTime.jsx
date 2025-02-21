import React from "react";

const OpeningTime = ({ time, title }) => {
  return (
    <>
      {time && (
        <div className="my-4 absolute z-20 top-0 bg-white p-1  border rounded-sm">
          {/* <h1 className="heading">{title}</h1> */}
          <div className="flex flex-col gap-2">
            {" "}
            {time.map(([key, value]) => {
              return (
                <div
                  key={key}
                  className="flex justify-between px-4 py-1 border-b-2 font-medium"
                >
                  <span className="me-4">{key.slice(0, 3)} </span>
                  <span>{value}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default OpeningTime;
