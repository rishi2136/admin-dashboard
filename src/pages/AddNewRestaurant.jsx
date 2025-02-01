import React, { useState } from "react";

const AddNewRestaurant = () => {
  const [step, setStep] = useState(1); // Current form step
  const [formData, setFormData] = useState({
    restaurantName: "",
    type: "",
    cuisines: [],
    address: "",
    city: "",
    pincode: "",
    contactNumber: "",
    alternateContact: "",
    email: "",
    website: "",
    ownerName: "",
    ownerContact: "",
    ownerEmail: "",
    openingHours: "",
    closingHours: "",
    seatingCapacity: "",
    deliveryAvailable: false,
    deliveryRadius: "",
    fssaiNumber: "",
    gstNumber: "",
    averageCost: "",
    description: "",
    menu: null,
    restaurantImage: null,
    foodImages: [],
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, files, checked } = e.target;
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else if (type === "file") {
      setFormData({ ...formData, [name]: files });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Proceed to next step
  const nextStep = () => setStep(step + 1);
  // Go back to previous step
  const prevStep = () => setStep(step - 1);

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    alert("Form submitted successfully!");
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">
        Restaurant Registration
      </h2>

      <form onSubmit={handleSubmit}>
        {/* Step 1: Restaurant Details */}
        {step === 1 && (
          <div>
            <h3 className="text-xl font-semibold mb-4">Restaurant Details</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Restaurant Name
              </label>
              <input
                type="text"
                name="restaurantName"
                value={formData.restaurantName}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Type of Restaurant
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              >
                <option value="">Select Type</option>
                <option value="Cafe">Cafe</option>
                <option value="Fine Dining">Fine Dining</option>
                <option value="Fast Food">Fast Food</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Cuisines</label>
              <div className="flex items-center gap-4">
                {["Indian", "Chinese", "Italian"].map((cuisine) => (
                  <label key={cuisine} className="flex items-center gap-1">
                    <input
                      type="checkbox"
                      name="cuisines"
                      value={cuisine}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFormData({
                            ...formData,
                            cuisines: [...formData.cuisines, cuisine],
                          });
                        } else {
                          setFormData({
                            ...formData,
                            cuisines: formData.cuisines.filter(
                              (c) => c !== cuisine
                            ),
                          });
                        }
                      }}
                    />
                    {cuisine}
                  </label>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <button
              type="button"
              onClick={nextStep}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Next
            </button>
          </div>
        )}

        {/* Step 2: Owner Details */}
        {step === 2 && (
          <div>
            <h3 className="text-xl font-semibold mb-4">Owner Details</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Owner's Name
              </label>
              <input
                type="text"
                name="ownerName"
                value={formData.ownerName}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Owner's Contact Number
              </label>
              <input
                type="text"
                name="ownerContact"
                value={formData.ownerContact}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Owner's Email
              </label>
              <input
                type="email"
                name="ownerEmail"
                value={formData.ownerEmail}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <button
              type="button"
              onClick={prevStep}
              className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
            >
              Back
            </button>
            <button
              type="button"
              onClick={nextStep}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Next
            </button>
          </div>
        )}

        {/* Step 3: Additional Details */}
        {step === 3 && (
          <div>
            <h3 className="text-xl font-semibold mb-4">Additional Details</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                FSSAI License Number
              </label>
              <input
                type="text"
                name="fssaiNumber"
                value={formData.fssaiNumber}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Upload Menu
              </label>
              <input
                type="file"
                name="menu"
                onChange={handleChange}
                className="w-full"
              />
            </div>
            <button
              type="button"
              onClick={prevStep}
              className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
            >
              Back
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Submit
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default AddNewRestaurant;
