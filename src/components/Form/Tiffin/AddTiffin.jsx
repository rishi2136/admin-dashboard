import React, { useState } from "react";
import AddTiffinForm from "./AddTiffinForm";
import TiffinSettings from "../../ManageSettingComponets/TiffinSettings";
import TiffinMenumanagement from "../../../pages/Add-Tiffin";

const AddTiffin = () => {
  const [step, setStep] = useState(1); // Current form step
  let [ID, setID] = useState(null); // Restaurant ID
  const bagdeStyle = `bg-white p-2 py-1 rounded-lg font-semibold border-[.5px] border-black focus:outline-none`;

  // Step navigation
  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <div className="pt-2">
      {step === 1 && (
        <>
          <AddTiffinForm
            nextStep={nextStep}
            prevStep={prevStep}
            ID={ID}
            setID={setID}
          />
          <TiffinSettings />
        </>
      )}

      {step === 2 && (
        <>
          <TiffinMenumanagement />
        </>
      )}
    </div>
  );
};

export default AddTiffin;
