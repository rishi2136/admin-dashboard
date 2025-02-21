import React, { useState } from "react";
import readXlsxFile from "read-excel-file";
import axios from "axios";
import { FaCloudUploadAlt } from "react-icons/fa";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { IoInformationCircleOutline } from "react-icons/io5";
const URL = import.meta.env.VITE_SERVER_URL;

const Upload = () => {
  const [restaurantData, setRestaurantData] = useState(null);
  const [headers, setHeaders] = useState(null);
  // const [vendorInfo, setVendorInfo] = useState({
  //   name: "",
  //   email: "",
  //   password: "",
  // });
  const [err, setErr] = useState(null);
  console.log(err);

  const arrOfObj = [];
  const handleChange = async (e) => {
    e.preventDefault();
    //   console.log(e.target.files[0]);
    const data = await readXlsxFile(e.target.files[0]);
    // console.log(data);
    const key = data[0];
    setHeaders(key);
    for (let i = 1; i < data.length; i++) {
      let obj = {};
      data[i].map((el, idx) => (obj[key[idx]] = el));
      arrOfObj.push(obj);
    }
    // console.log(arrOfObj);
    setRestaurantData(arrOfObj);
  };

  const handleSubmit = async () => {
    try {
      if (!restaurantData) {
        alert("You need to upload data");
        return;
      }

      const res = await axios.post(`${URL}/upload`, restaurantData);
      console.log("Data successfully saved:", res.data);
      alert("Data uploaded successfully!");
    } catch (err) {
      if (err.response) {
        console.error(
          "Server Error:",
          err.response.data.error || "Unknown Error"
        );
        setErr(err.response.data.error);
        alert(
          `Error from Server: ${
            err.response.data.error || "Please contact support."
          }`
        );
      } else if (err.request) {
        console.error("No response from server:", err.request);
        alert("No response from server. Please try again later.");
      } else {
        // Errors related to the request configuration or unknown errors
        console.error("Unexpected Error:", err.message);
        alert(`Unexpected Error: ${err.message}`);
      }
    }
  };

  // const handleInputChange = (e) => {
  //   let { name, value } = e.target;
  //   if (name === "phone" && value.length === 10) {
  //     alert("you enter the 10 no.");
  //     return;
  //   }

  //   setVendorInfo((prev) => ({ ...prev, [name]: value }));
  // };

  const handleVendorInfoSubmit = (e) => {
    e.preventDefault();
    console.log(vendorInfo);
  };

  return (
    <div className="w-full h-screen bg-white pt-12">
      {/* <div>
        <form action="##" onSubmit={handleVendorInfoSubmit}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            placeholder="name"
            name="name"
            onChange={(e) => handleInputChange(e)}
            value={vendorInfo.name}
          />
          <label htmlFor="email">Email</label>
          <input
            type="text"
            placeholder="email"
            name="email"
            onChange={(e) => handleInputChange(e)}
            value={vendorInfo.email}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="enter your phone number"
            name="password"
            length={10}
            onChange={(e) => handleInputChange(e)}
            value={vendorInfo.password}
          />
          <button className="px-2 py-1 bg-blue-500">Submit</button>
        </form>
      </div> */}

      <div className="w-[60%] mx-auto p-6 bg-gray-50 rounded-lg shadow-md ">
        <h1 className="text-2xl font-semibold text-gray-700 mb-4 flex justify-between">
          <div>Upload Restaurant Data</div> <TT />
        </h1>

        <div className="border border-dashed border-gray-400 w-full h-32 p-4 bg-white flex flex-col justify-center items-center rounded-md hover:border-blue-500 transition">
          <label
            htmlFor="file-upload"
            className="cursor-pointer text-blue-400 hover:text-blue-500 flex flex-col items-center"
          >
            <FaCloudUploadAlt className="text-4xl mb-2" />
            <span className="font-medium text-lg">Click here to add</span>
          </label>
          <input
            id="file-upload"
            type="file"
            onChange={handleChange}
            accept=".xlsx"
            className="hidden"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="mt-4 w-full p-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition duration-300"
        >
          Click to Upload
        </button>
      </div>

      <div>
        <table className="border-collapse w-full text-sm text-left shadow-md rounded-lg overflow-scroll">
          <thead className="bg-blue-500 text-white uppercase font-bold">
            <tr>
              {headers &&
                headers.map((heading) => (
                  <th key={heading} className="border p-3 text-center">
                    {heading}
                  </th>
                ))}
            </tr>
          </thead>
          <tbody className="bg-white">
            {restaurantData &&
              restaurantData.map((row, idx) => (
                <tr
                  key={idx}
                  className={`border hover:bg-blue-100 ${
                    idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  {Object.entries(row).map(([key, value]) => (
                    <td key={key} className="border p-3">
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const TT = () => {
  return (
    <>
      <Popover>
        <PopoverButton className="block text-sm/6 font-semibold text-black focus:outline-none data-[active]:text-black data-[hover]:text-black data-[focus]:outline-1 data-[focus]:outline-black">
          <IoInformationCircleOutline />
        </PopoverButton>
        <PopoverPanel
          transition
          anchor="bottom"
          className="divide-y divide-white/5 rounded bg-white text-sm/6 transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0 w-[320px] border-black"
        >
          <div className="text-[11px]">
            <h2 className="bg-black text-center text-white">
              Columns Must Required
            </h2>
            <div className="p-4 pt-0 border border-black rounded">
              <div>
                firmName, area, city, location, services, category, cuisines,
                dietary, image, ratings, popularity, video, features(optional),
                socialMedia(optional), closeOn(optional)
              </div>
              <div className="font-semibold text-center">
                Instruction about the field
              </div>
              <ul className="list-disc">
                <li>Rating range i.e 0 to 5</li>
                <li>Popularity range i.e 0 to 10</li>
                <li>
                  If you planned to list multipe features, dietary, cuisines,
                  services then sepearte by commas in each{" "}
                </li>
              </ul>
            </div>
          </div>
        </PopoverPanel>
      </Popover>
    </>
  );
};

export default Upload;
