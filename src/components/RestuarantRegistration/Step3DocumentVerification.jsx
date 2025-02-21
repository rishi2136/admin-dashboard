import React from "react";

const Step3DocumentVerification = ({
  formData,
  updateFormData,
  nextStep,
  prevStep,
}) => {
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    updateFormData(name, files[0]);
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Document Verification</h3>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Upload FSSAI Certificate
        </label>
        <input
          type="file"
          name="fssaiCertificate"
          onChange={handleFileChange}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Upload GST Certificate
        </label>
        <input type="file" name="gstCertificate" onChange={handleFileChange} />
      </div>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={prevStep}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Back
        </button>
        <button
          type="button"
          onClick={nextStep}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Step3DocumentVerification;
