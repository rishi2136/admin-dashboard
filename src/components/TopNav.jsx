import React, { useState, useRef, useEffect } from "react"; // Don't forget to import useEffect
<<<<<<< HEAD
import { HiOutlineSearch, HiOutlineBell, HiOutlineUserCircle } from "react-icons/hi";
=======
import {
  HiOutlineSearch,
  HiOutlineBell,
  HiOutlineUserCircle,
} from "react-icons/hi";
>>>>>>> c7983b2717f06e0ff11610ca4a58703a0c141e69
import { useNavigate, useLocation } from "react-router-dom";

export default function TopNav({ currentPage }) {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
<<<<<<< HEAD
  const [showNotificationsDropdown, setShowNotificationsDropdown] = useState(false);
=======
  const [showNotificationsDropdown, setShowNotificationsDropdown] =
    useState(false);
>>>>>>> c7983b2717f06e0ff11610ca4a58703a0c141e69
  const profileRef = useRef(null);
  const notificationRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Handle clicks outside the dropdowns to close them
  const handleClickOutside = (event) => {
    if (profileRef.current && !profileRef.current.contains(event.target)) {
      setShowProfileDropdown(false);
    }
<<<<<<< HEAD
    if (notificationRef.current && !notificationRef.current.contains(event.target)) {
=======
    if (
      notificationRef.current &&
      !notificationRef.current.contains(event.target)
    ) {
>>>>>>> c7983b2717f06e0ff11610ca4a58703a0c141e69
      setShowNotificationsDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Conditionally render the TopNav based on the current route
<<<<<<< HEAD
  const showTopNav = location.pathname !== "/login" && location.pathname !== "/signup"; // Remove the duplicate declaration here
=======
  const showTopNav =
    location.pathname !== "/login" && location.pathname !== "/signup"; // Remove the duplicate declaration here
>>>>>>> c7983b2717f06e0ff11610ca4a58703a0c141e69

  if (!showTopNav) {
    return null; // Return nothing if TopNav shouldn't be displayed
  }

<<<<<<< HEAD
=======
  const handleLogout = () => {
    localStorage.removeItem("token");
    // alert("Y")
    navigate("/log-in");
  };

>>>>>>> c7983b2717f06e0ff11610ca4a58703a0c141e69
  return (
    <div className="flex items-center justify-between bg-white text-gray-700 shadow-sm px-4 py-2 z-10 h-12">
      {/* Title */}

      {/* Search Bar */}
      <div className="relative w-1/3 max-w-sm">
<<<<<<< HEAD
        <HiOutlineSearch size={18} className="absolute top-2.5 left-3 text-gray-400" />
=======
        <HiOutlineSearch
          size={18}
          className="absolute top-2.5 left-3 text-gray-400"
        />
>>>>>>> c7983b2717f06e0ff11610ca4a58703a0c141e69
        <input
          type="text"
          placeholder="Search..."
          className="pl-10 pr-3 py-1.5 w-full text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
        />
      </div>
<<<<<<< HEAD
      <div className="w-full flex  items-center justify-start  mr-16 ml-80 text-xl font-semibold">{currentPage}</div>
=======
      <div className="w-full flex  items-center justify-start  mr-16 ml-80 text-xl font-semibold">
        {currentPage}
      </div>
>>>>>>> c7983b2717f06e0ff11610ca4a58703a0c141e69
      {/* Notification and Profile Icons */}
      <div className="flex items-center gap-4">
        {/* Notifications Dropdown */}
        <div ref={notificationRef} className="relative">
          <HiOutlineBell
            size={20}
            className="cursor-pointer hover:text-blue-500"
            onClick={() => navigate("/notifications")}
          />
        </div>

        {/* Profile Dropdown */}
        <div ref={profileRef} className="relative">
          <HiOutlineUserCircle
            size={20}
            className="cursor-pointer hover:text-blue-500"
            onClick={() => setShowProfileDropdown(!showProfileDropdown)}
          />
          {showProfileDropdown && (
            <div className="absolute right-0 w-48 p-3 mt-2 bg-white text-gray-800 border border-gray-200 shadow-lg rounded-md">
              <div className="flex flex-col items-center">
                <img
                  src={"path/to/default-profile-image.jpg"} // Default profile image
                  alt="Profile"
                  className="w-16 h-16 rounded-full mb-2"
                />
                <p className="font-semibold text-sm">John Doe</p>
                <p className="text-xs text-gray-500">john.doe@example.com</p>
<<<<<<< HEAD
                <button className="mt-2 px-4 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600">
=======
                <button
                  className="mt-2 px-4 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  onClick={handleLogout}
                >
>>>>>>> c7983b2717f06e0ff11610ca4a58703a0c141e69
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
