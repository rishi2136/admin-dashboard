import React, { useState } from "react";
import {
  MdExpandMore,
  MdExpandLess,
  MdArrowBack,
  MdArrowForward,
} from "react-icons/md";
import { FaSearch } from "react-icons/fa";

const EmailTopBar = ({ count, countFirst, setPage, onSearch,filter }) => {
  const [hoverShowMore, setHoverShowMore] = useState(false);
  const [pagination, setPagination] = useState({ start: countFirst, total: count });
  const [searchText, setSearchText] = useState("");
  const [filterValue,setFilterValue]=useState('');
  const handlePrev = () => {
    if (pagination.start > 1) {
      const newStart = Math.max(pagination.start - 10, 1);
      setPagination((prev) => ({ ...prev, start: newStart }));
      setPage(newStart);
    }
  };

  const handleNext = () => {
    if (pagination.start + 10 <= pagination.total) {
      const newStart = pagination.start + 10;
      setPagination((prev) => ({ ...prev, start: newStart }));
      setPage(newStart);
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchText(value);
    if (onSearch) onSearch(value);
  };
  const handleFilterName=(value)=>{
    if(value)
      filter(value)
    console.log(value);
  }
  return (
    <div className="h-16 flex items-center px-1 gap-1">
      {/* Checkbox & Show More */}
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          className="h-4 w-4 cursor-pointer focus:ring-blue-500"
        />
        <div
          className="relative"
          onMouseEnter={() => setHoverShowMore(true)}
          onMouseLeave={() => setHoverShowMore(false)}
        >
          <button className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-200">
            {hoverShowMore ? <MdExpandLess /> : <MdExpandMore />}
          </button>
          {hoverShowMore && (
            <div className="absolute bg-white shadow-md border rounded-lg p-2 w-32 z-10">
              <ul>
                <li className="hover:bg-gray-200 p-2 cursor-pointer" onClick={()=>handleFilterName("read")}>Read</li>
                <li className="hover:bg-gray-200 p-2 cursor-pointer" onClick={()=>handleFilterName("unread")}>Unread</li>
                
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex w-3/4 bg-slate-100 h-12 rounded-full shadow-md items-center px-4 gap-2">
        <FaSearch className="text-gray-500" />
        <input
          type="text"
          placeholder="Search for a particular email"
          value={searchText}
          onChange={handleSearchChange}
          className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400 border-none"
        />
      </div>

      {/* Pagination Info */}
      <div className="flex items-center ml-5 text-gray-700 gap-1">
        <span>
          {pagination.start} of {pagination.total}
        </span>
        <button
          className={`p-2 rounded-full ${pagination.start === 1 ? "text-gray-400" : "hover:bg-gray-200"}`}
          onClick={handlePrev}
          disabled={pagination.start === 1}
        >
          <MdArrowBack />
        </button>
        <button
          className={`p-2 rounded-full ${
            pagination.start + 50 > pagination.total ? "text-gray-400" : "hover:bg-gray-200"
          }`}
          onClick={handleNext}
          disabled={pagination.start + 50 > pagination.total}
        >
          <MdArrowForward />
        </button>
      </div>
    </div>
  );
};

export default EmailTopBar;
