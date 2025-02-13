import React, { useEffect, useState } from "react";
import AddTiffinForm from "./AddTiffinForm";
import TiffinSettings from "../../ManageSettingComponets/TiffinSettings";
import TiffinMenumanagement from "../../../pages/Add-Tiffin";
import { Link, useNavigate } from "react-router-dom";

const AddTiffin = () => {
  const [step, setStep] = useState(1); // Current form step
  let [email, setEmail] = useState(null); // Restaurant ID
  const bagdeStyle = `bg-white p-2 py-1 rounded-lg font-semibold border-[.5px] border-black focus:outline-none`;

  // Step navigation
  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  // useEffect(() => {
  //   setEmail(localStorage.getItem("ownerEmail"));
  // }, [localStorage.getItem("ownerEmail")]);

  return (
    <div className="pt-2">
      {step === 1 && (
        <>
          <TiffinSettings
            nextStep={nextStep}
            prevStep={prevStep}
            email={email}
            setEmail={setEmail}
          />
        </>
      )}

      {step === 2 && (
        <>
          <TiffinMenumanagement
            nextStep={nextStep}
            prevStep={prevStep}
            email={email}
            setEmail={setEmail}
          />
        </>
      )}

      {step === 3 && <ThirdPage />}
    </div>
  );
};

const ThirdPage = () => {
  const navigate = useNavigate();

  const handleRedirectClick = () => {
    localStorage.removeItem("ownerEmail");
    navigate("/");
  };

  return (
    <div className="h-screen place-content-center flex flex-wrap">
      <h1 className="w-full text-center text-6xl font-semibold mb-2">
        Thanks for registering your tiffin services with us
      </h1>
      <button
        onClick={handleRedirectClick}
        className="py-1 px-4 bg-blue-500 text-xl rounded text-white"
      >
        Go to dashboard
      </button>
    </div>
  );
};

export default AddTiffin;
