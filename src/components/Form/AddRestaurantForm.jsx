import React, { useState } from "react";
import css from "./AddRestaurantForm.module.css";
import { useForm } from "react-hook-form";
import CustomSelect from "./utils/CustomSelect";
import axios from "axios";
import PhoneInput from "react-phone-number-input";
const URL = import.meta.env.VITE_SERVER_URL;

const AddRestaurantForm = ({ nextStep, prevStep, setID, ID }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  let [isLoading, setIsLoading] = useState(false);
  let [features, setFeatures] = useState([]);
  let [cuisines, setCuisines] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState();

  let listedCuisines = [
    "south-indian",
    "north-indian",
    "chinese",
    "indian",
    "mexican",
    "american-classics",
    "italian",
    "japanese",
    "thai",
    "korean",
    "mediterranean",
    "seafood",
    "global-fusion",
  ];
  let listedFeatures = [
    "dance",
    "music",
    "live-music",
    "dj",
    "bar",
    "hookah",
    "rooftop",
    "outdoor-seating",
    "buffet",
    "wifi",
  ];

  // let days = [
  //   "Sunday",
  //   "Monday",
  //   "Tuesday",
  //   "Wednesday",
  //   "Thursday",
  //   "Friday",
  //   "Saturday",
  // ];

  const onSubmit = async (data) => {
    const formData = new FormData();
    setIsLoading(true);

    // Append all data from the form
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        if (key === "image" && data[key][0]) {
          // File input: Append only if a file exists
          formData.append(key, data[key][0]);
        } else if (Array.isArray(data[key])) {
          // Handle checkboxes or arrays
          data[key].forEach((item) => formData.append(key, item));
        } else {
          // Append other inputs
          formData.append(key, data[key]);
        }
      }
    }

    // Append features array
    features.forEach((feature, index) => {
      formData.append(`otherServices`, feature);
    });

    // Append cuisines array
    cuisines.forEach((cuisine, index) => {
      formData.append(`cuisines`, cuisine);
    });

    formData.append("phoneNumber", phoneNumber);

    // formData.append("closeDays", closeDays);

    try {
      const res = await axios.post(`${URL}/firm/add-res`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // console.log(res.data);
      reset(); // Reset the form
      setIsLoading(false);
      setFeatures([]);
      setCuisines([]);
      // setCloseDays("");
      setID(res.data._id);
      if (res.data._id !== null) {
        nextStep();
        alert("Restaurant registered successfully");
      }
    } catch (err) {
      if (err.name === "MulterError") {
        alert(err.message);
        return;
      }
      console.error("Error:", err.response || err.message);
      alert("You encountered an error");
    }
  };

  const subHeadingStyle = `col-span-2 text-lg text-semibold`;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 h-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`block gap-2 col-span-1 md:col-span md:grid`}
      >
        <div className={css.formGroup}>
          <label className="m-0 ms-1" htmlFor="firmName">
            Restaurant Name *
          </label>
          <input
            type="text"
            id="firmName"
            {...register("firmName", { required: true })}
            placeholder="Enter your restaurant name"
          />
          {errors.firmName && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>

        <div className={css.formGroup}>
          <label className="m-0 ms-1" htmlFor="ownerName">
            Owner's Full Name *
          </label>
          <input
            type="text"
            id="ownerName"
            {...register("ownerName", { required: true })}
            placeholder="Enter the owner's name"
          />
          {errors.ownerName && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>

        <div className={css.formGroup}>
          <label className="m-0 ms-1" htmlFor="email">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email address"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>

        <div className={css.formGroup}>
          <label className="m-0 ms-1" htmlFor="phoneNumber">
            Phone Number *
          </label>
          <div className={css.phoneWrapper}>
            <PhoneInput
              className="w-full"
              name="phoneNumber"
              placeholder="Enter your phone number"
              value={phoneNumber}
              onChange={setPhoneNumber}
            />
          </div>
          {errors.phoneNumber && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>

        <div className={css.formGroup}>
          <label className="m-0 ms-1" htmlFor="location">
            Restaurant Location *
          </label>
          <input
            type="text"
            id="location"
            placeholder="Search for area or street name"
            {...register("location", { required: true })}
          />
          {errors.location && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>

        <div className={css.formGroup}>
          <label className="m-0 ms-1" htmlFor="area">
            Area / Sector / Locality *
          </label>
          <input
            type="text"
            id="area"
            placeholder="Enter your locality"
            {...register("area", { required: true })}
          />
          {errors.area && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>

        <div className={css.formGroup}>
          <label className="m-0 ms-1" htmlFor="city">
            City *
          </label>
          <input
            type="text"
            id="city"
            placeholder="Enter your city"
            {...register("city", { required: true })}
          />
          {errors.city && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>

        <div className=" border border-dashed rounded-sm flex flex-col gap-2 justify-center">
          <input
            type="file"
            id="image"
            className="border-none  self-center justify-self-center"
            {...register("image", { required: true })}
          />
          <div className="text-center">Upload file less than 2 MB</div>
          {errors.image && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>

        <div className={css.formGroup}>
          <label className="m-0 ms-1" htmlFor="city">
            Ratings
          </label>
          <input
            type="number"
            id="ratings"
            placeholder="i.e in between 0 to 5"
            {...register("ratings", { min: 0, max: 5 })}
          />
          {errors.city && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>
        <div className={css.formGroup}>
          <label className="m-0 ms-1" htmlFor="city">
            Popularity
          </label>
          <input
            type="number"
            id="popularity"
            placeholder="i.e in between 0 to 10"
            {...register("popularity", { min: 0, max: 10 })}
          />
          {errors.city && (
            <span className="text-red-500">This field is required</span>
          )}
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
              <label className="m-0 ms-1" htmlFor="veg">
                Veg
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="non-veg"
                value={"non-veg"}
                {...register("category")}
              />
              <label className="m-0 ms-1" htmlFor="non-veg">
                Non- veg
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="both"
                value={"both"}
                {...register("category")}
              />
              <label className="m-0 ms-1" htmlFor="both">
                both
              </label>
            </div>
          </div>
        </div>

        <div>
          <div>Available Payment Options</div>
          <div className="flex gap-2 items-end">
            <div className="flex items-center">
              <input
                type="checkbox"
                name="creditCard"
                value={"creditCard"}
                {...register("paymentOption")}
              />
              <label className="m-0 ms-1" htmlFor="creditCard">
                Credit Card
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="debitCard"
                value={"debitCard"}
                {...register("paymentOption")}
              />
              <label className="m-0 ms-1" htmlFor="debitCard">
                Debit Card
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="onlinePayment"
                value={"onlinePayment"}
                {...register("paymentOption")}
              />
              <label className="m-0 ms-1" htmlFor="onlinePayment">
                Online Payment
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                name="bankTransfer"
                value={"bankTransfer"}
                {...register("paymentOption")}
              />
              <label className="m-0 ms-1" htmlFor="bankTransfer">
                Bank Transfer
              </label>
            </div>
          </div>
        </div>

        <div className="">
          <div>Services Offered</div>
          <div className="flex gap-2 items-end">
            <div className="flex items-center">
              <input
                type="checkbox"
                name="nightLife"
                value={"nightLife"}
                {...register("services")}
              />
              <label className="m-0 ms-1" htmlFor="creditCard">
                Night Life
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="dineOut"
                value={"dineOut"}
                {...register("services")}
              />
              <label className="m-0 ms-1" htmlFor="dineOut">
                Dine Out
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="delivery"
                value={"delivery"}
                {...register("services")}
              />
              <label className="m-0 ms-1" htmlFor="delivery">
                Delivery
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                name="tiffin"
                value={"tiffin"}
                {...register("services")}
              />
              <label className="m-0 ms-1" htmlFor="tiffin">
                Tiffin
              </label>
            </div>
          </div>
        </div>

        <div className="">
          <div>Available Dietary</div>
          <div className="flex gap-2 items-end">
            <div className="flex items-center">
              <input type="checkbox" value="halal" {...register("dietary")} />
              <label className="m-0 ms-1" htmlFor="halal">
                Halal
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                value="gluten-free"
                {...register("dietary")}
              />
              <label className="m-0 ms-1" htmlFor="gluten-free">
                Gluten-Free
              </label>
            </div>

            <div className="flex items-center">
              <input type="checkbox" value="vegan" {...register("dietary")} />
              <label className="m-0 ms-1" htmlFor="vegan">
                Vegan
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                value="nut-free"
                {...register("dietary")}
              />
              <label className="m-0 ms-1" htmlFor="nut-free">
                Nut-Free
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                value="dairy-free"
                {...register("dietary")}
              />
              <label className="m-0 ms-1" htmlFor="dairy-free">
                Dairy-Free
              </label>
            </div>
          </div>
        </div>

        <CustomSelect
          listedCuisines={listedCuisines}
          cuisines={cuisines}
          setCuisines={setCuisines}
          headingText="Add Cuisines"
        />
        <CustomSelect
          listedCuisines={listedFeatures}
          cuisines={features}
          setCuisines={setFeatures}
          headingText="Other Services"
        />

        <button type="submit" className={css.submitButton}>
          {isLoading ? "Loading..." : ID ? "Submitted" : "Submit"}
        </button>
        {ID && (
          <button className={css.submitButton} onClick={nextStep}>
            Next
          </button>
        )}
      </form>
    </div>
  );
};

export default AddRestaurantForm;
