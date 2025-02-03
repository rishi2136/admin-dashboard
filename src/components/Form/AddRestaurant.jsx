import React, { useState } from "react";
import AddRestaurantForm from "./AddRestaurantForm";
import MenuManagement from "./MenuManagement";
import { useNavigate } from "react-router-dom";

const AddRestaurant = () => {
  const [step, setStep] = useState(1); // Current form step
  let [ID, setID] = useState(null); // Restaurant ID
  const [productCount, setProductCount] = useState(0);
  const bagdeStyle = `bg-white p-2 py-1 rounded-lg font-semibold border-[.5px] border-black focus:outline-none`;

  // Step navigation
  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <div className="pt-2">
      <div className="flex justify-between"></div>
      {step === 1 && (
        <AddRestaurantForm
          nextStep={nextStep}
          prevStep={prevStep}
          ID={ID}
          setID={setID}
        />
      )}

      {step === 2 && (
        <MenuManagement
          nextStep={nextStep}
          prevStep={prevStep}
          ID={ID}
          setID={setID}
          productCount={productCount}
          setProductCount={setProductCount}
        />
      )}
    </div>
  );
};

export default AddRestaurant;
