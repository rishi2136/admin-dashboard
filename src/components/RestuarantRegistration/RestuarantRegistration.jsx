import React, { useState } from "react";
import Step1OwnerDetails from "./Step1OwnerDetails";
import Step2MenuManagement from "./Step2MenuManagement";
import Step3DocumentVerification from "./Step3DocumentVerification";
import Step4Success from "./Step4Success";

const RestaurantRegistration = () => {
  const [step, setStep] = useState(1); // Current form step
  const [formData, setFormData] = useState({
    ownerName: "",
    ownerContact: "",
    ownerEmail: "",
    restaurantName: "",
    address: "",
    city: "",
    pincode: "",
    description: "",
    menuItems: [],
    fssaiCertificate: null,
    gstCertificate: null,
  });

  // Handle data update
  const updateFormData = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  // Step navigation
  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6">
        Restaurant Registration
      </h2>
      {step === 1 && (
        <Step1OwnerDetails
          formData={formData}
          updateFormData={updateFormData}
          nextStep={nextStep}
        />
      )}
      {step === 2 && (
        <Step2MenuManagement
          formData={formData}
          updateFormData={updateFormData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}
      {step === 3 && (
        <Step3DocumentVerification
          formData={formData}
          updateFormData={updateFormData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}
      {step === 4 && <Step4Success formData={formData} />}
    </div>
  );
};

export default RestaurantRegistration;
