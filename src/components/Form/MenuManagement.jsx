import React, { useEffect, useState } from "react";
<<<<<<< HEAD
import css from "./AddRestaurantForm.module.css";
import AddProduct from "./utils/AddProduct";
import OperationalTime from "./utils/OperationalTime";
import axios from "axios";
// import { API_URL } from "../../data/info";
const URL = import.meta.env.VITE_SERVER_URL;

const MenuManagement = ({
  nextStep,
  prevStep,
  ID,
  setID,
  productCount,
  setProductCount,
}) => {
  let [menu, setMenu] = useState(null);

  const subHeadingStyle = `col-span-2 text-lg text-semibold`;
  return (
    <div className={css.diningContainer}>
      <div className={css.contentWrapper}>
        <div className={css.formWrapper}>
          <h2 className={subHeadingStyle}>
            {" "}
            <hr />
          </h2>

          <AddProduct
            nextStep={nextStep}
            prevStep={prevStep}
            ID={ID}
            setID={setID}
            productCount={productCount}
            setProductCount={setProductCount}
          />
        </div>
      </div>
=======
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
>>>>>>> c7983b2717f06e0ff11610ca4a58703a0c141e69
    </div>
  );
};

export default MenuManagement;
