import React, { useState, useRef, useEffect } from "react"; // Don't forget to import useEffect
import { HiOutlineSearch, HiOutlineBell, HiOutlineUserCircle } from "react-icons/hi";
import { useNavigate, useLocation } from "react-router-dom";

export default function TopNav({ currentPage }) {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showNotificationsDropdown, setShowNotificationsDropdown] = useState(false);
  const profileRef = useRef(null);
  const notificationRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Handle clicks outside the dropdowns to close them
  const handleClickOutside = (event) => {
    if (profileRef.current && !profileRef.current.contains(event.target)) {
      setShowProfileDropdown(false);
    }
    if (notificationRef.current && !notificationRef.current.contains(event.target)) {
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
  const showTopNav = location.pathname !== "/login" && location.pathname !== "/signup"; // Remove the duplicate declaration here

  if (!showTopNav) {
    return null; // Return nothing if TopNav shouldn't be displayed
  }

  return (
    <div className="flex items-center justify-between bg-white text-gray-700 shadow-sm px-4 py-2 z-10 h-12">
      {/* Title */}

      {/* Search Bar */}
      <div className="relative w-1/3 max-w-sm">
        <HiOutlineSearch size={18} className="absolute top-2.5 left-3 text-gray-400" />
        <input
          type="text"
          placeholder="Search..."
          className="pl-10 pr-3 py-1.5 w-full text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
        />
      </div>
      <div className="w-full flex  items-center justify-start  mr-16 ml-80 text-xl font-semibold">{currentPage}</div>
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
                <button className="mt-2 px-4 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600">
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
