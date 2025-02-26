import React, { useEffect, useState } from "react";
import AddProduct from "./utils/AddProduct";

const URL = import.meta.env.VITE_SERVER_URL;

const MenuManagement = ({ nextStep, prevStep, ID, setID }) => {
  const subHeadingStyle = `col-span-2 text-lg text-semibold`;
  return (
    <div>
      {/* <h2 className={subHeadingStyle}> </h2> */}
      <AddProduct
        nextStep={nextStep}
        prevStep={prevStep}
        ID={ID}
        setID={setID}
      />
    </div>
  );
};

export default MenuManagement;
