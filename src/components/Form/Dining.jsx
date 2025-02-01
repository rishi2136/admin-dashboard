import React, { useState } from "react";
import css from "./Dining.module.css";
import { useForm } from "react-hook-form";

const Dining = () => {
  const [formData, setFormData] = useState({
    restaurantName: "",
    ownerName: "",
    email: "",
    phoneNumber: "",
    location: "",
    area: "",
    city: "",
    referred: false,
    // socialMedia: [],
    link1: "",
    link2: "",
    file: "",
  });

  const [activeStep, setActiveStep] = useState(0);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // const handleLinkChange = (e) => {
  //   let { name, value } = e.target;
  //   setLink(value);
  //   setFormData((prev) => ({ ...prev, socialMedia: [...socialMedia, link] }));
  // };
  const handleFileUpload = () => {};

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
    alert("Your information has been submitted successfully!");
  };

  const subHeadingStyle = `col-span-2 text-lg text-semibold`;

  return (
    <div className={css.diningContainer}>
      <div className={css.contentWrapper}>
        <div className={css.formWrapper}>
          <form onSubmit={handleSubmit} className={css.form}>
            <h2 className={subHeadingStyle}>
              {" "}
              Restaurant Details
              <hr />
            </h2>
            <div className={css.formGroup}>
              <label htmlFor="restaurantName">Restaurant Name</label>
              <input
                type="text"
                id="restaurantName"
                name="restaurantName"
                value={formData.restaurantName}
                onChange={handleChange}
                placeholder="Enter your restaurant name"
                required
              />
            </div>

            <div className={css.formGroup}>
              <label htmlFor="ownerName">Owner's Full Name</label>
              <input
                type="text"
                id="ownerName"
                name="ownerName"
                value={formData.ownerName}
                onChange={handleChange}
                placeholder="Enter the owner's name"
                required
              />
            </div>

            <div className={css.formGroup}>
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                required
              />
            </div>

            <div className={css.formGroup}>
              <label htmlFor="phoneNumber">Phone Number</label>
              <div className={css.phoneWrapper}>
                <span className={css.countryCode}>+91</span>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  required
                />
              </div>
            </div>

            <div className={css.formGroup}>
              <label htmlFor="location">Restaurant Location</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Search for area or street name"
                required
              />
            </div>

            <div className={css.formGroup}>
              <label htmlFor="area">Area / Sector / Locality</label>
              <input
                type="text"
                id="area"
                name="area"
                value={formData.area}
                onChange={handleChange}
                placeholder="Enter your locality"
                required
              />
            </div>

            <div className={css.formGroup}>
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Enter your city"
                required
              />
            </div>

            <div>
              <label htmlFor="image">Upload file</label>
              <input
                type="file"
                id="image"
                name="image"
                value={formData.file}
                onChange={handleFileUpload}
                required
              />
            </div>

            {/* <div className="flex gap-2">
              <input
                type="text"
                value={link}
                onChange={handleLinkChange}
                name="link1"
                placeholder="facebook link"
              />
              <input
                type="text"
                value={link}
                onChange={handleLinkChange}
                name="link2"
                placeholder="instagram link"
              />
            </div> */}
            <hr />

            <h2 className={subHeadingStyle}>
              {" "}
              Menu Description and Other
              <hr />
            </h2>

            <button type="submit" className={css.submitButton}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Dining;
