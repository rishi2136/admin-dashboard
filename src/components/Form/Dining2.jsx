import React, { useState } from "react";
import css from "./Dining.module.css";
import { useForm } from "react-hook-form";

const Dining2 = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  const subHeadingStyle = `col-span-2 text-lg text-semibold`;

  return (
    <div className={css.diningContainer}>
      <div className={css.contentWrapper}>
        <div className={css.formWrapper}>
          <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
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
                {...register("restaurantName", { required: true })}
                placeholder="Enter your restaurant name"
              />
            </div>

            <div className={css.formGroup}>
              <label htmlFor="ownerName">Owner's Full Name</label>
              <input
                type="text"
                id="ownerName"
                {...register("ownerName", { required: true })}
                placeholder="Enter the owner's name"
              />
            </div>

            <div className={css.formGroup}>
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email address"
                {...register("email", { required: true })}
              />
            </div>

            <div className={css.formGroup}>
              <label htmlFor="phoneNumber">Phone Number</label>
              <div className={css.phoneWrapper}>
                <span className={css.countryCode}>+91</span>
                <input
                  type="tel"
                  id="phoneNumber"
                  placeholder="Enter your phone number"
                  {...register("phoneNumber", { required: true })}
                />
              </div>
            </div>

            <div className={css.formGroup}>
              <label htmlFor="location">Restaurant Location</label>
              <input
                type="text"
                id="location"
                placeholder="Search for area or street name"
                {...register("phoneNumber", { required: true })}
              />
            </div>

            <div className={css.formGroup}>
              <label htmlFor="area">Area / Sector / Locality</label>
              <input
                type="text"
                id="area"
                placeholder="Enter your locality"
                {...register("area", { required: true })}
              />
            </div>

            <div className={css.formGroup}>
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                placeholder="Enter your city"
                {...register("city", { required: true })}
              />
            </div>

            <div className=" border border-dashed rounded-sm flex place-content-center">
              <input
                type="file"
                id="image[]"
                multiple
                className="border-none bg-white text-white self-center justify-self-center"
                {...register("image", { required: true })}
              />
            </div>
            <div>
              <div>Choose the category</div>
              <div className="flex gap-2 items-end">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="veg"
                    value={"veg"}
                    {...register("category")}
                  />
                  <label htmlFor="veg">Veg</label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="non-veg"
                    value={"non-veg"}
                    {...register("category")}
                  />
                  <label htmlFor="non-veg">Non- veg</label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="eggless"
                    value={"eggless"}
                    {...register("category")}
                  />
                  <label htmlFor="eggless">Eggless</label>
                </div>
              </div>
            </div>

            <select {...register("choice", { required: true })}>
              <option value={"a"}>A</option>
              <option value={"b"}>B</option>
              <option value={"c"}>c</option>
            </select>

            <div>
              <div>Choose the category</div>
              <div className="flex gap-2 items-end">
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="veg"
                    value={"veg"}
                    {...register("radioSelect")}
                  />
                  <label htmlFor="veg">Veg</label>
                </div>

                <div className="flex items-center">
                  <input
                    type="radio"
                    name="non-veg"
                    value={"non-veg"}
                    {...register("radioSelect")}
                  />
                  <label htmlFor="non-veg">Non- veg</label>
                </div>

                <div className="flex items-center">
                  <input
                    type="radio"
                    name="eggless"
                    value={"eggless"}
                    {...register("radioSelect")}
                  />
                  <label htmlFor="eggless">Eggless</label>
                </div>
              </div>
            </div>

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

export default Dining2;
