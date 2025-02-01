import React, { useState } from "react";
import Filter from "./Filter";
import Sorting from "./Sorting";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { AnimatePresence, motion } from "motion/react";

const Listing = ({ categories, filter, handleSwitch }) => {
  const [expanded, setExpanded] = useState(true);
  const list = [
    "Newest",
    "Oldest",
    "Most Events",
    "Most Campaigns",
    "Most Changed",
    "Recently Updated",
    "Restaurants delisted ",
  ];

  const ListingSideBar = `
    ${expanded ? "w-[25%] min-w-[270px]" : "w-0"}
    h-full
    border-r border-gray-200
    p-4 pe-2
    sticky top-0
    bg-gray-50
    overflow-hidden
    flex flex-col
  `;

  return (
    <>
      <div className={ListingSideBar}>
        <button
          onClick={() => setExpanded(!expanded)}
          className={`text-black focus:outline-none transition-all self-end duration-200  ${
            expanded ? "self-end" : "self-start"
          }`}
        >
          {expanded ? <FaArrowLeft /> : <FaArrowRight />}
        </button>

        {/* Render categories similarly to screenshot */}

        <div
          className={`h-[50vh] transition-all  duration-200 ${
            expanded ? "block opacity-100" : "hidden opacity-0"
          }`}
        >
          <div
            className={`justify-between transition flex duration-200  ${
              expanded ? "flex" : "hidden "
            }`}
          >
            <Filter filter={filter} />
            <Sorting list={list} />
          </div>

          <ul className="w-full h-[70%] overflow-y-scroll">
            {categories.map((cat, idx) => (
              <li
                key={cat.name}
                className="py-2  border-b text-gray-700 hover:bg-gray-200 "
                onClick={() => handleSwitch(cat.id - 1)}
              >
                <div className="flex  justify-between cursor-pointer ">
                  {/* Category name */}
                  <span>{cat.name}</span>
                  {/* <span className={`text-red-500 text-[8px] `}>
                     <FaCircle className="flex items-center" />
                   </span> */}
                </div>
              </li>
            ))}
          </ul>
          <button className="mt-4 text-blue-500 hover:text-blue-600">
            + Add More Restaurants
          </button>
        </div>
      </div>
    </>
  );
};

export default Listing;
