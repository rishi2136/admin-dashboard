import React from "react";
import { FaSearch, FaAdjust } from "react-icons/fa";

function Search() {
  return (
    <>
      <div className="flex items-center justify-between p-4 bg-light-blue">
        {/* Search Field on the Left */}
        <div className="flex items-center w-4/5  p-2 rounded-lg">
          <FaSearch className="text-black mr-2" />
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search mail"
            className="w-full bg-transparent outline-none text-black"
          />
        </div>

        {/* Adjust Icon on the Right */}
        <div className="ml-4 text-black">
          <FaAdjust size={24} />
        </div>
      </div>
    </>
  );
}

export default Search;