import React, { useState } from "react";
import readXlsxFile from "read-excel-file";
import axios from "axios";

const Upload = () => {
  const [restaurantData, setRestaurantData] = useState(null);

  const arrOfObj = [];
  const handleChange = async (e) => {
    e.preventDefault();
    //   console.log(e.target.files[0]);
    const data = await readXlsxFile(e.target.files[0]);
    const key = data[0];
    for (let i = 1; i < data.length; i++) {
      let obj = {};
      data[i].map((el, idx) => (obj[key[idx]] = el));
      arrOfObj.push(obj);
    }
    setRestaurantData(arrOfObj);
  };

  const handleSubmit = async () => {
    try {
      if (restaurantData === null) {
        alert("You need to upload data");
        return;
      }
      const res = await axios.post(
        "http://localhost:5000/upload",
        restaurantData
      );
      console.log("After save to the memroy", res);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div>
      <h1 className="text-xl font-medium">Upload restaurant data</h1> <br />
      <div className="border w-48 h-24 p-8 border-dashed bg-white flex flex-col place-content-center">
        <label for="file-upload" class="custom-file-upload">
          click here to add
        </label>
        <input
          id="file-upload"
          type="file"
          onChange={handleChange}
          accept=".xlsx"
          className="hidden"
        />
      </div>
      <button onClick={handleSubmit} className="m-2 p-2 bg-black text-white">
        Upload
      </button>
    </div>
  );
};

export default Upload;
