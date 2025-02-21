import React, { useState } from "react";
import AddRestaurantForm from "./AddRestaurantForm";
import MenuManagement from "./MenuManagement";
import { useNavigate } from "react-router-dom";
<<<<<<< HEAD
=======
import css from "./AddRestaurantForm.module.css";
import RestaurantTiffinSettings from "./utils/RestaurantTiffinSettings";
>>>>>>> c7983b2717f06e0ff11610ca4a58703a0c141e69

const AddRestaurant = () => {
  const [step, setStep] = useState(1); // Current form step
  let [ID, setID] = useState(null); // Restaurant ID
<<<<<<< HEAD
  const [productCount, setProductCount] = useState(0);
=======
>>>>>>> c7983b2717f06e0ff11610ca4a58703a0c141e69
  const bagdeStyle = `bg-white p-2 py-1 rounded-lg font-semibold border-[.5px] border-black focus:outline-none`;

  // Step navigation
  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <div className="pt-2">
<<<<<<< HEAD
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
=======
      <div className={css.diningContainer}>
        <div className={css.contentWrapper}>
          <div className={css.formWrapper}>
            {step === 1 && (
              <AddRestaurantForm
                nextStep={nextStep}
                prevStep={prevStep}
                ID={ID}
                setID={setID}
              />
            )}

            {step === 2 && (
              <>
                <MenuManagement
                  nextStep={nextStep}
                  prevStep={prevStep}
                  ID={ID}
                  setID={setID}
                />
                <RestaurantTiffinSettings ID={ID} />
              </>
            )}

            {step === 3 && <ThirdPage />}
          </div>
        </div>
      </div>
    </div>
  );
};

const ThirdPage = () => {
  const navigate = useNavigate();
  return (
    <div className="h-screen place-content-center flex flex-wrap">
      <h1 className="w-full text-center text-6xl font-semibold mb-2">
        Thanks for registering your restaurant with us
      </h1>
      <button
        onClick={() => navigate("/")}
        className="py-1 px-4 bg-blue-500 text-xl rounded text-white"
      >
        Go to dashboard
      </button>
>>>>>>> c7983b2717f06e0ff11610ca4a58703a0c141e69
    </div>
  );
};

export default AddRestaurant;
