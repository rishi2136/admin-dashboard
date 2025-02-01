import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  HiOutlineHome,
  HiOutlineTruck,
  HiOutlineCurrencyDollar,
  HiOutlineGift,
  HiOutlineCog,
  HiOutlineInformationCircle,
  HiOutlineChartBar,
  HiOutlineUserGroup,
  HiOutlineBell,
  HiViewList,
  HiOutlineQuestionMarkCircle,
} from "react-icons/hi";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import { MdOutlineDining } from "react-icons/md";
import { dummyData } from "../data/dummy";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import Popup from "../utils/Popup";
import { IoRestaurantSharp } from "react-icons/io5";
import { FiUpload } from "react-icons/fi";
import { LuPartyPopper } from "react-icons/lu";
import { BiSupport } from "react-icons/bi";
import { GoShieldLock } from "react-icons/go";

export default function Sidebar() {
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState("");
  const [userDropdownOpen, setUserDropdownOpen] = useState(false); // State for user management dropdown
  const [adminDropdownOpen, setAdminDropdownOpen] = useState(false); // State for admin dashboard dropdown
  const navigate = useNavigate(); // Initialize the navigate function

  // Adjusted sidebar container classes
  const sidebarClasses = `
    ${expanded ? "w-64" : "w-10"}
    flex flex-col
     border-r border-gray-800
    bg-gray-900
    text-white
    transition-all duration-300 ease-in-out overflow-hidden
  `;

  // Top bar behind the “zomato” text: red accent
  const topBarClasses = `
    w-full py-4 px-4
    bg-red-600
    flex flex-col items-start
  `;

  // Adjusted restaurant dashboard line classes
  const restaurantDashClasses = `
    transition-all duration-300 ease-in-out overflow-hidden
    ${expanded ? "max-h-10 mt-1 opacity-100" : "max-h-0 mt-0 opacity-0"}
  `;

  // Adjusted bottom outlet info: slide/fade in/out
  const bottomInfoClasses = `
    border-t border-gray-800 text-sm leading-tight
    transition-all duration-300 ease-in-out overflow-hidden
    ${expanded ? "max-h-32 p-4 opacity-100" : "max-h-0 p-0 opacity-0"}
  `;

  const { outletInfo } = dummyData;
  const handleHover = (text) => {
    setHovered(text);
  };

  // Nav items helper: icons + label fade
  function navItem(to, Icon, label, external = false) {
    if (external) {
      return (
        <a
          href={to}
          target="_blank"
          rel="noopener noreferrer"
          className="block rounded-md text-gray-200 hover:bg-gray-700 transition-colors duration-200"
        >
          <div className="flex items-center gap-2 px-3 py-2">
            <Icon size={20} className="flex-shrink-0" />
            <span
              className={`whitespace-nowrap
                transition-all duration-300 ease-in-out
                ${expanded ? "opacity-100 w-auto" : "opacity-0 w-0"}
                overflow-hidden`}
            >
              {label}
            </span>
          </div>
        </a>
      );
    }
    return (
      <NavLink
        to={to}
        className={({ isActive }) =>
          `block rounded-md
            ${isActive ? "bg-gray-700 font-semibold" : "font-medium"}
            hover:bg-gray-700
            text-gray-200
            transition-colors duration-200
          `
        }
      >
        <div className="flex items-center gap-2 px-3 py-2">
          <Icon size={20} className="flex-shrink-0" />
          <span
            className={`
              whitespace-nowrap
              transition-all duration-300 ease-in-out
              ${expanded ? "opacity-100 w-auto" : "opacity-0 w-0"}
              overflow-hidden
            `}
          >
            {label}
          </span>
        </div>
      </NavLink>
    );
  }

  const handleUserManagementClick = () => {
    setUserDropdownOpen(!userDropdownOpen); // Toggle dropdown
    navigate("/usermanagement"); // Navigate to /usermanagement page
  };

  const handleAdminDashboardClick = () => {
    setAdminDropdownOpen(!adminDropdownOpen); // Toggle dropdown for Admin Dashboard
  };

  const Tab = ({ text, to, icon }) => {
    return (
      <>
        <li
          onMouseOver={() => handleHover(text)}
          onMouseOut={() => handleHover("")}
          className="relative"
        >
          {navItem(to, icon, text)}
          {!expanded && <Popup hovered={hovered} text={text} />}
        </li>
      </>
    );
  };

  return (
    <div className={sidebarClasses}>
      {/* Top bar with brand + toggle, using bg-red-600 */}
      <div className={topBarClasses}>
        <button
          onClick={() => setExpanded(!expanded)}
          className={`text-white focus:outline-none  transition-all self-end duration-200 ${
            expanded ? "self-end" : "self-start"
          }`}
        >
          {expanded ? <FaArrowLeft /> : <FaArrowRight />}
        </button>
        <div className="flex items-center justify-between w-full">
          <div className="font-bold text-2xl">{expanded ? "zomato" : "z"}</div>
        </div>
        <div
          className="text-sm font-medium mt-1 flex items-center gap-2 px-3 py-2 cursor-pointer"
          onClick={handleAdminDashboardClick}
        >
          <div
            className={`whitespace-nowrap
              transition-all duration-300 ease-in-out
              ${expanded ? "opacity-100 w-auto" : "opacity-0 w-0"}
              overflow-hidden`}
          >
            Admin Dashboard
          </div>
          <span
            className={`transition-transform duration-300 ${adminDropdownOpen ? "rotate-90" : ""}`}
          >
            {expanded ? ">" : ""}
          </span>
        </div>

        {/* Dropdown Icon */}
        {adminDropdownOpen && (
          <div className="absolute left-0 top-full bg-gray-900 border border-gray-700 rounded-md shadow-lg z-[100] mt-1">
            <ul className="ml-0 space-y-1 p-2 w-56">
              <li>{navItem("https://super-piroshki-0e56df.netlify.app/", HiOutlineUserGroup, "Marketing Dashboard", true)}</li>
              <li>{navItem("https://stellar-lolly-15c5c4.netlify.app/", HiOutlineUserGroup, "Event Dashboard", true)}</li>
              <li>{navItem("https://deft-entremet-2b5784.netlify.app/", HiOutlineTruck, "Moderator Dashboard", true)}</li>
              <li>{navItem("/setting", MdOutlineRestaurantMenu, "Restaurant Dashboard", true)}</li>
            </ul>
          </div>
        )}
      </div>

      {/* Navigation links (dark theme) */}
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1">
          <Tab text="Dashboard" to="/" icon={HiOutlineHome} />
          <Tab
            text="Restaurants"
            to="/restaurants"
            icon={MdOutlineRestaurantMenu}
          />
          <Tab text="Upload" to={"/upload"} icon={FiUpload} />
          <Tab text="Access Control" to="/control" icon={GoShieldLock} />

          {/* User Management Dropdown */}
          <li>
            <div
              className="block rounded-md text-gray-200 hover:bg-gray-700 transition-colors duration-200 cursor-pointer"
              onClick={handleUserManagementClick}
            >
              <div className="flex items-center justify-between px-3 py-2">
                <div className="flex items-center gap-2">
                  <HiOutlineUserGroup size={20} className="flex-shrink-0" />
                  <span
                    className={`whitespace-nowrap
                                transition-all duration-300 ease-in-out
                                ${expanded
                                  ? "opacity-100 w-auto"
                                  : "opacity-0 w-0"}
                                overflow-hidden`}
                  >
                    User Management
                  </span>
                </div>
                <span
                  className={`transition-transform duration-300 ${
                    userDropdownOpen ? "rotate-90" : ""
                  }`}
                >
                  {expanded ? ">" : ""}
                </span>
              </div>
            </div>
            {userDropdownOpen && (
              <ul className="ml-6 mt-1 space-y-1">
                <li>
                  {navItem(
                    "/manage-admins",
                    HiOutlineUserGroup,
                    "Manage Admins"
                  )}
                </li>
                <li>
                  {navItem(
                    "/manage-customers",
                    HiOutlineUserGroup,
                    "Manage Customers"
                  )}
                </li>
                <li>
                  {navItem("/manage-drivers", HiOutlineTruck, "Manage Drivers")}
                </li>
              </ul>
            )}
          </li>

          <Tab text="Order Management" to="/orders" icon={HiOutlineTruck} />
          <Tab text="Event Management" to="/event" icon={HiOutlineInformationCircle} />
          <Tab text="Help" to="/help" icon={HiOutlineGift} />
          <Tab text="Offers" to="/offers" icon={HiOutlineGift} />
          <Tab text="Taxes and Charges" to="/taxes" icon={HiOutlineGift}/>
          <Tab text="Claim Restaurant" to="/claim-restaurant" icon={HiOutlineInformationCircle} />
          <Tab text="Collection Management" to="/collection-management" icon={HiOutlineInformationCircle} />
          <Tab text="Settings" to="/settings" icon={HiOutlineCog} />
          <Tab
            text="History Logs"
            to="/historylogs"
            icon={HiOutlineQuestionMarkCircle}
          />
        </ul>
      </nav>

      {/* Bottom outlet info (slide/fade) */}
      <div className={bottomInfoClasses}>
        <div className="font-semibold">{outletInfo.name || "Loading..."}</div>
        <div>{"res_id278364726"}</div>
        <div>{"12 street, New way"}</div>
      </div>
    </div>
  );
}
