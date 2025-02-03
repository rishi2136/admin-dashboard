import React, { useState } from "react";
import AddRestaurant from "../AddRestaurant";
// import TiffinRegistrationForm from "../Tiffin/TiffinRegistrationForm";
import Upload from "../../../pages/Upload";
// import AddTiffinForm from "../Tiffin/AddTiffinForm";
import AddTiffin from "../Tiffin/AddTiffin";

const FormSwitch = () => {
  let [comp, setComp] = useState(<AddRestaurant />);

  let [title, setTitle] = useState("Register Restaurant Service");
  const bagdeStyle = `bg-white p-2 py-1 rounded-lg font-semibold border-[.5px] border-black focus:outline-none`;

  const handleTabSwicth = (option) => {
    switch (option) {
      case "restaurant":
        setComp(<AddRestaurant />);
        setTitle("Register Restaurant Service");
        break;
      case "tiffin":
        setComp(<AddTiffin />);
        setTitle("Register Tiffin Service");
        break;
      case "excel-upload":
        setComp(<Upload />);
        setTitle("Restaurant list upload");
        break;
      default:
        setComp(<AddRestaurant />);
        setTitle("Register Restaurant Service");
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between p-1 pb-0">
        <h1 className="font-bold text-xl ps-2">{title}</h1>
        <div className="flex gap-2 justify-end">
          <button
            className={bagdeStyle}
            onClick={() => handleTabSwicth("restaurant")}
          >
            Restaurant
          </button>
          <button
            className={bagdeStyle}
            onClick={() => handleTabSwicth("tiffin")}
          >
            Tiffin
          </button>
          <button
            className={bagdeStyle}
            onClick={() => handleTabSwicth("excel-upload")}
          >
            Excel Uplood
          </button>
        </div>
      </div>

      {comp && <div>{comp}</div>}
    </div>
  );
};

export default FormSwitch;
