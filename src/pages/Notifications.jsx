<<<<<<< HEAD
import React, { useState } from "react";
import { FaFilter } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Notifications = () => {
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState({
    restaurants: [
      {
        name: "Bites & Brilliance",
        hasChanges: true,
        id: 1,
        region: "East",
        description: "Updated menu and extended opening hours.",
        type: "Fine Dining",
        date: "2024-01-01",
      },
      {
        name: "Culinary Canopy",
        hasChanges: true,
        id: 2,
        region: "South",
        description: "Introduced new family combo meals.",
        type: "Casual Dining",
        date: "2024-01-05",
      },
      {
        name: "Taste & Tell Bistro",
        hasChanges: true,
        id: 3,
        region: "East",
        description: "Added a weekend brunch menu.",
        type: "Bistro",
        date: "2024-01-08",
      },
    ],
    menuSections: [
      {
        name: "Drinks",
        hasChanges: true,
        restaurantId: 1,
        changes: "Added seasonal cocktails and mocktails.",
        restaurantname: "Chill Bites",
        date: "2024-01-01",
      },
      {
        name: "Appetizers",
        hasChanges: true,
        restaurantId: 2,
        changes: "Included new starters like cheese balls and dips.",
        restaurantname: "Chill Bites",
        date: "2024-01-05",
      },
      {
        name: "Butter Chicken",
        hasChanges: true,
        restaurantId: 3,
        changes: "Included new starters like cheese balls and dips.",
        restaurantname: "Chill Bites",
        date: "2024-01-07",
      },
    ],
    tiffin: [
      {
        name: "Healthy Eats",
        hasChanges: true,
        id: 1,
        region: "North",
        description: "Added gluten-free and vegan options.",
        type: "Daily Tiffin Service",
        date: "2024-01-01",
      },
      {
        name: "Home Delight",
        hasChanges: true,
        id: 2,
        region: "West",
        description: "Special festive menu introduced.",
        type: "Homemade Meals",
        date: "2024-01-04",
      },
      {
        name: "Quick Bites Tiffin",
        hasChanges: true,
        id: 3,
        region: "South",
        description: "New subscription plans available.",
        type: "Office Tiffin Service",
        date: "2024-01-06",
      },
      {
        name: "Wholesome Box",
        hasChanges: true,
        id: 4,
        region: "East",
        description: "Menu updated with seasonal ingredients.",
        type: "Family Tiffin",
        date: "2024-01-08",
      },
      {
        name: "Flavorful Feasts",
        hasChanges: true,
        id: 5,
        region: "North",
        description: "Introduced 'meal customization' option.",
        type: "Custom Tiffin Service",
        date: "2024-01-10",
      },
    ],
    moderator: [
      {
        text: "Customer not happy about service.",
        resolved: false,
        restaurantId: 1,
        date: "2024-01-01",
      },
      {
        text: "Suggestion to add more vegan options.",
        resolved: false,
        restaurantId: 2,
        date: "2024-01-05",
      },
      {
        text: "Customer not happy about service.",
        resolved: false,
        restaurantId: 1,
        date: "2024-01-01",
      },
      {
        text: "Customer not happy about service.",
        resolved: false,
        restaurantId: 1,
        date: "2024-01-01",
      },
    ],
    flags: [
      {
        text: "Complaint: Delayed order delivery.",
        resolved: false,
        restaurantId: 1,
        date: "2024-01-02",
      },
      {
        text: "Complaint: Incorrect order received.",
        resolved: true,
        restaurantId: 2,
        date: "2024-01-03",
      },
      {
        text: "Customer not happy about service.",
        resolved: false,
        restaurantId: 1,
        date: "2024-01-01",
      },
    ],
    LiveEvents: [
      {
        text: "Customer reported an issue during event registration.",
        resolved: true,
        restaurantId: 1,
        date: "2024-01-02",
      },
      {
        text: "New user registered for an upcoming live cooking session.",
        resolved: true,
        restaurantId: 2,
        date: "2024-01-05",
      },

      {
        text: "Customer experienced delay in receiving event updates via SMS.",
        resolved: true,
        restaurantId: 1,
        date: "2024-02-10",
      },
    ],
  });
=======
import React, { useEffect, useState } from "react";
import { FaFilter } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { BsThreeDots } from "react-icons/bs";
import { IoCheckmarkSharp } from "react-icons/io5";
import { IoCloseSharp } from "react-icons/io5";
import Tooltip from "../utils/Tooltip";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import { IoPerson } from "react-icons/io5";
import axios from "axios";
import { IoInformationCircleOutline } from "react-icons/io5";

const Notifications = () => {
  const navigate = useNavigate();
  const [notifys, setNotifys] = useState(null);
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    const onFetch = async () => {
      const res = await axios.get(import.meta.env.VITE_SERVER_URL + "/notify");
      setNotifys(res.data);
    };
    onFetch();
  }, [trigger]);

>>>>>>> c7983b2717f06e0ff11610ca4a58703a0c141e69
  const handleRestaurantClick = (restaurant) => {
    // Navigate to /restaurants page
    navigate("/restaurants");
  };
<<<<<<< HEAD
  // Rename handleItemClick to handleMenuItemClick if it conflicts
  const handleMenuItemClick = (item, type) => {
    const details = {
      ...item,
      why: type === "restaurant" ? "Customer demand" : "Seasonal updates",
    };

    // Perform additional logic if necessary
  };
=======
>>>>>>> c7983b2717f06e0ff11610ca4a58703a0c141e69

  const [selectedFilter, setSelectedFilter] = useState(null);
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [selectedDetails, setSelectedDetails] = useState(null);
<<<<<<< HEAD
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const toggleFilterDropdown = () => setFilterDropdownOpen(!filterDropdownOpen);

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    setFilterDropdownOpen(false);
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    if (name === "startDate") setStartDate(value);
    if (name === "endDate") setEndDate(value);
  };

  const getFilteredData = (section) => {
    let data = notifications[section];

    if (startDate && endDate) {
      data = data.filter((item) => {
        const itemDate = new Date(item.date);
        return itemDate >= new Date(startDate) && itemDate <= new Date(endDate);
      });
    }

    switch (selectedFilter) {
      case "Latest":
        return [...data].sort((a, b) => b.id - a.id);
      case "Region":
        return section === "restaurants"
          ? data.filter((item) => item.region === "North")
          : data;
      case "Status":
        return data.filter((item) =>
          section === "flags" || section === "moderator"
            ? !item.resolved
            : item.hasChanges
        );
      default:
        return data;
    }
  };

  const resolveItem = (section, index) => {
    const updatedSection = [...notifications[section]];
    updatedSection[index].resolved = true;
    setNotifications({ ...notifications, [section]: updatedSection });
  };

  const handleItemClick = (item, type) => {
    const details = {
      ...item,
      why: type === "restaurant" ? "Customer demand" : "Seasonal updates",
      when: "2024-01-01",
      who: "Restaurant Owner",
      address: "123 Food St, City, Country",
      email: "contact@restaurant.com",
      phone: "+1234567890",
      description: item.description,
      lastUpdate: "2024-01-10",
      status: item.hasChanges ? "Pending" : "Resolved",
    };
    setSelectedDetails(details);
    setModalOpen(true);

    if (type === "restaurant") {
      setSelectedRestaurant(item.id);
    }
  };

  const getRestaurantNameById = (id) =>
    notifications.restaurants.find((restaurant) => restaurant.id === id)
      ?.name || "Unknown";

  const filteredModerator = getFilteredData("moderator");
  const filteredFlags = getFilteredData("flags");

  const filteredMenuSections = selectedRestaurant
    ? notifications.menuSections.filter(
        (menu) => menu.restaurantId === selectedRestaurant
      )
    : notifications.menuSections;

  return (
    <div className="p-0 m-0 pt-0 mt-0 min-h-screen">
      <div className="flex justify-end mt-0 pt-0">
        <div className="relative">
          <button
            className="flex items-center gap-1 px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={toggleFilterDropdown}
          >
            <FaFilter />
          </button>
          {filterDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow">
              <ul className="py-1">
                {"Latest Priority Region Status".split(" ").map((filter) => (
                  <li
                    key={filter}
                    className="px-3 py-1 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleFilterChange(filter)}
                  >
                    {filter}
                  </li>
                ))}
                <li className="px-3 py-1 hover:bg-gray-100 cursor-pointer">
                  <div>
                    <label>Start Date:</label>
                    <input
                      type="date"
                      name="startDate"
                      value={startDate}
                      onChange={handleDateChange}
                      className="p-1 border rounded"
                    />
                  </div>
                </li>
                <li className="px-3 py-1 hover:bg-gray-100 cursor-pointer">
                  <div>
                    <label>End Date:</label>
                    <input
                      type="date"
                      name="endDate"
                      value={endDate}
                      onChange={handleDateChange}
                      className="p-1 border rounded"
                    />
                  </div>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <div className="bg-white p-2 rounded shadow-md h-[250px] relative">
          <h2 className="font-bold text-base mb-1">Restaurants</h2>
          <ul className="space-y-1">
            {getFilteredData("restaurants").map((restaurant, index) => (
              <li
                key={index}
                className="p-1 rounded bg-gray-100 relative cursor-pointer flex items-center justify-between"
                onMouseEnter={() => setHoveredItem(restaurant)}
                onMouseLeave={() => setHoveredItem(null)}
                onClick={() => handleRestaurantClick(restaurant)} // Handling the click event
              >
                <div className="flex items-center">
                  {restaurant.hasChanges && (
                    <span className="text-red-500 font-bold mr-2">●</span>
                  )}
                  <span>{restaurant.name}</span>
                </div>
                <img src="/info.png" alt="Info Icon" className="w-4 h-4" />
                {hoveredItem === restaurant && (
                  <div className="absolute top-full left-0 mt-1 w-72 bg-white border rounded shadow-lg p-2 z-10">
                    <p>
                      <strong>Changes:</strong> {restaurant.description}
                    </p>
                    <p>
                      <strong>Region:</strong> {restaurant.region}
                    </p>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white p-2 rounded shadow-md h-[250px] relative">
          <h2 className="font-bold text-base mb-1">Menu Sections</h2>
          <ul className="space-y-1">
            {filteredMenuSections.map((section, index) => (
              <li
                key={index}
                className="p-1 rounded bg-gray-100 relative cursor-pointer flex items-center justify-between"
                onMouseEnter={() => setHoveredItem(section)}
                onMouseLeave={() => setHoveredItem(null)}
                onClick={() => handleItemClick(section)} // Handling click to navigate
              >
                <div className="flex items-center">
                  {section.hasChanges && (
                    <span className="text-red-500 font-bold mr-2">●</span>
                  )}
                  <span>{section.name}</span>
                </div>
                <img src="/info.png" alt="Info Icon" className="w-4 h-4" />
                {hoveredItem === section && (
                  <div className="absolute top-full left-0 mt-1 w-72 bg-white border rounded shadow-lg p-2 z-10">
                    <p>
                      <strong>Changes:</strong> {section.changes}
                    </p>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white p-2 rounded shadow-md h-[250px] relative">
          <h2 className="font-bold text-base mb-1">Flags</h2>
          <ul className="space-y-1">
            {filteredFlags.map((flag, index) => (
              <li
                key={index}
                className="p-1 rounded bg-gray-100 relative cursor-pointer"
                onClick={() => handleItemClick(flag, "flag")}
              >
                {flag.text}{" "}
                {flag.resolved && (
                  <span className="text-green-500 font-bold">✔</span>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white p-2 rounded shadow-md h-[250px] relative">
          <h2 className="font-bold text-base mb-1">Comments</h2>
          <ul className="space-y-1">
            {filteredModerator.map((note, index) => (
              <li
                key={index}
                className="p-1 rounded bg-gray-100 relative cursor-pointer"
                onClick={() => handleItemClick(note, "moderator")}
              >
                {note.text}{" "}
                {note.resolved && (
                  <span className="text-green-500 font-bold">✔</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* Modal */}
      <div className="flex justify-end mt-0 pt-0">
        <div className="relative">
          <button
            className="flex items-center gap-1 px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={toggleFilterDropdown}
          >
            <FaFilter />
          </button>
          {filterDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow">
              <ul className="py-1">
                {"Latest Priority Region Status".split(" ").map((filter) => (
                  <li
                    key={filter}
                    className="px-3 py-1 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleFilterChange(filter)}
                  >
                    {filter}
                  </li>
                ))}
                <li className="px-3 py-1 hover:bg-gray-100 cursor-pointer">
                  <div>
                    <label>Start Date:</label>
                    <input
                      type="date"
                      name="startDate"
                      value={startDate}
                      onChange={handleDateChange}
                      className="p-1 border rounded"
                    />
                  </div>
                </li>
                <li className="px-3 py-1 hover:bg-gray-100 cursor-pointer">
                  <div>
                    <label>End Date:</label>
                    <input
                      type="date"
                      name="endDate"
                      value={endDate}
                      onChange={handleDateChange}
                      className="p-1 border rounded"
                    />
                  </div>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <div className="bg-white p-2 rounded shadow-md h-[250px] relative">
          <h2 className="font-bold text-base mb-1">Tiffin Services</h2>
          <ul className="space-y-1">
            {getFilteredData("tiffin").map((tiffin, index) => (
              <li
                key={index}
                className="p-1 rounded bg-gray-100 relative cursor-pointer flex items-center justify-between"
                onMouseEnter={() => setHoveredItem(tiffin)}
                onMouseLeave={() => setHoveredItem(null)}
                onClick={() => handleItemClick(tiffin, "tiffin")}
              >
                <div className="flex items-center">
                  {tiffin.hasChanges && (
                    <span className="text-red-500 font-bold mr-2">●</span>
                  )}
                  <span>{tiffin.name}</span>
                </div>
                <img src="/info.png" alt="Info Icon" className="w-4 h-4" />
                {hoveredItem === tiffin && (
                  <div className="absolute top-full left-0 mt-1 w-72 bg-white border rounded shadow-lg p-2 z-10">
                    <p>
                      <strong>Changes:</strong> {tiffin.description}
                    </p>
                    <p>
                      <strong>Region:</strong> {tiffin.region}
                    </p>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white p-1 rounded shadow-md h-[250px] relative">
          <h2 className="font-bold text-base mb-0">Live Events</h2>
          <ul className="space-y-1">
            {notifications.LiveEvents.map((event, index) => (
              <li
                key={index}
                className="p-1 rounded bg-gray-100 relative cursor-pointer flex items-center justify-between"
                onMouseEnter={() => setHoveredItem(event)}
                onMouseLeave={() => setHoveredItem(null)}
                onClick={() => handleItemClick(event, "LiveEvents")}
              >
                <div className="flex items-center">
                  {event.resolved ? (
                    <span className="text-red-500 font-bold mr-2">●</span>
                  ) : (
                    <span className="text-red-500 font-bold mr-2">●</span>
                  )}
                  <span>{event.text}</span>
                </div>
                <img src="/info.png" alt="Info Icon" className="w-4 h-4" />
                {hoveredItem === event && (
                  <div className="absolute top-full left-0 mt-1 w-72 bg-white border rounded shadow-lg p-1 z-10">
                    <p>
                      <strong>Status:</strong>{" "}
                      {event.resolved ? "Resolved" : "Unresolved"}
                    </p>
                    <p>
                      <strong>Date:</strong> {event.date}
                    </p>
                    <p>
                      <strong>Restaurant ID:</strong> {event.restaurantId}
                    </p>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white p-2 rounded shadow-md h-[250px] relative">
          <h2 className="font-bold text-base mb-1">Moderator</h2>
          <ul className="space-y-1">
            {filteredFlags.map((flag, index) => (
              <li
                key={index}
                className="p-1 rounded bg-gray-100 relative cursor-pointer"
                onClick={() => handleItemClick(flag, "flag")}
              >
                {flag.text}{" "}
                {flag.resolved && (
                  <span className="text-green-500 font-bold">✔</span>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white p-2 rounded shadow-md h-[250px] relative">
          <h2 className="font-bold text-base mb-1">System </h2>
          <ul className="space-y-1">
            {filteredModerator.map((note, index) => (
              <li
                key={index}
                className="p-1 rounded bg-gray-100 relative cursor-pointer"
                onClick={() => handleItemClick(note, "moderator")}
              >
                {note.text}{" "}
                {note.resolved && (
                  <span className="text-green-500 font-bold">✔</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded shadow-md max-w-lg w-full">
            <h3 className="text-lg font-bold mb-2">Details</h3>
            <p>
              <strong>Why:</strong> {selectedDetails.why}
            </p>
            <p>
              <strong>When:</strong> {selectedDetails.when}
            </p>
            <p>
              <strong>Who:</strong> {selectedDetails.who}
            </p>
            <p>
              <strong>Address:</strong> {selectedDetails.address}
            </p>
            <p>
              <strong>Email:</strong> {selectedDetails.email}
            </p>
            <p>
              <strong>Phone:</strong> {selectedDetails.phone}
            </p>
            <p>
              <strong>Description:</strong> {selectedDetails.description}
            </p>
            <p>
              <strong>Last Update:</strong> {selectedDetails.lastUpdate}
            </p>
            <p>
              <strong>Status:</strong> {selectedDetails.status}
            </p>
            <div className="mt-2 text-right">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
=======
  const [modalOpen, setModalOpen] = useState(false);
  const [drop, setDrop] = useState(false);

  const toggleFilterDropdown = () => setDrop((prev) => !prev);
  // console.log(filterDropdownOpen);
  // console.log(drop);

  // const handleFilterChange = (filter) => {
  //   setSelectedFilter(filter);
  //   setFilterDropdownOpen(false);
  // };

  const handleInfoBadgeClick = (Info) => {
    const data = {
      Level: Info.level,
      Message: Info.message,
      Date:
        new Date(Info.timestamp).toLocaleDateString() +
        " " +
        new Date(Info.timestamp).toLocaleTimeString(),
      Action: Info.metadata.action,
      Actor: Info.metadata.actor,
      notify_type: Info.metadata.nType,
    };

    setSelectedDetails(data);
    setModalOpen(true);
  };

  const handleItemClick = async (ID) => {
    try {
      const res = await axios.put(
        import.meta.env.VITE_SERVER_URL + "/notify/" + ID
      );
      if (res.data.response === "ok") {
        setTrigger(true);
        alert("User update");
      }
    } catch (err) {
      console.log(err);
      alert(err.message);
    }

    // console.log(Info);
  };

  //method triggered on the btn click
  const actions = {
    onAccept: async function (e, id) {
      e.stopPropagation();
      alert("Change accepted");
    },
    onReject: async function (e, id) {
      e.stopPropagation();
      const res = await axios.delete(
        import.meta.env.VITE_SERVER_URL + "/notify/" + id
      );
      if (res.data.response == "ok") {
        setTrigger(!trigger);
        alert("Change rejected");
      }
    },
    onFirmVisit: async function (e, id) {
      e.stopPropagation();
      console.log(id);
    },
    onProfileVisit: async function (e, id) {
      e.stopPropagation();
      console.log(id);
    },
  };
  const actionBtnClass = `border-2 font-medium text-lg  rounded focus:outline-none active:drop-shadow-xl active:outline-none`;

  //action btn element
  const actionBtn = {
    accept: (id) => (
      <Tooltip text={"accept"} position="right">
        <button
          title="accept"
          className="border-0 bg-transparent items-start flex h-0 rounded"
          onClick={(e) => actions.onAccept(e, id)}
        >
          <IoCheckmarkSharp
            className={` text-green-400 border-green-400 ${actionBtnClass}`}
          />
        </button>
      </Tooltip>
    ),
    reject: (id) => (
      <Tooltip text={"reject"} position="right">
        <button
          title="reject"
          className="border-0 bg-transparent items-start flex h-0 rounded"
          onClick={(e) => actions.onReject(e, id)}
        >
          <IoCloseSharp
            className={` text-red-400 border-red-400 ${actionBtnClass}`}
          />
        </button>
      </Tooltip>
    ),
    visitFirm: (id) => (
      <Tooltip text={"restaurant"} position="right">
        <button
          title="reject"
          className="border-0 bg-transparent items-start flex h-0 rounded"
          onClick={(e) => actions.onReject(e, id)}
        >
          <MdOutlineRestaurantMenu
            className={`text-yellow-400 border-yellow-400 ${actionBtnClass}`}
          />
        </button>
      </Tooltip>
    ),
    visitProfile: (id) => (
      <Tooltip text={"profile"} position="right">
        <button
          title="reject"
          className="border-0 bg-transparent items-start flex h-0 rounded"
          onClick={(e) => actions.onReject(e, id)}
        >
          <IoPerson
            className={`text-black-400 border-green-400 ${actionBtnClass}`}
          />
        </button>
      </Tooltip>
    ),
  };

  const handleFilter = async (text) => {
    let res;
    switch (text) {
      case "latest":
        res = await axios.get(
          import.meta.env.VITE_SERVER_URL + "/notify/" + text
        );
        console.log(text);
        setNotifys(res.data);
        break;
      case "oldest":
        res = await axios.get(
          import.meta.env.VITE_SERVER_URL + "/notify/" + text
        );
        console.log(text);
        setNotifys(res.data);
        break;
      case "unread":
        res = await axios.get(
          import.meta.env.VITE_SERVER_URL + "/notify/" + text
        );
        console.log(text);
        setNotifys(res.data);
        break;
    }
  };
  // console.log(notifys);

  const dateBadgeStyleClass = `text-[9px] rounded p-1 bg-gray-200`;

  return (
    <>
      {notifys ? (
        <div className="p-0 m-0 pt-0 mt-0 min-h-screen ">
          <div className="flex justify-end mt-0 pt-0">
            <div className="relative">
              {/* <button onClick={() => setModalOpen((prev) => !prev)}>open</button> */}
              <button
                className="flex items-center gap-1 px-2 py-1 border text-black border-black rounded"
                onClick={toggleFilterDropdown}
              >
                <FaFilter />
              </button>
              {drop && (
                <div className="bg-gray-200 absolute top-4 -left-10 z-30 ">
                  <ul className="bg-gray-200">
                    <li
                      className="cursor-pointer hover:bg-gray-300 p-2"
                      onClick={() => handleFilter("latest")}
                    >
                      latest
                    </li>
                    <li
                      className="cursor-pointer hover:bg-gray-300 p-2"
                      onClick={() => handleFilter("oldest")}
                    >
                      oldest
                    </li>
                    <li
                      className="cursor-pointer hover:bg-gray-300 p-2"
                      onClick={() => handleFilter("unread")}
                    >
                      unread
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4">
            <div className="bg-white p-2 rounded shadow-md h-[250px] relative">
              <h2 className="font-bold text-base mb-1 flex justify-between">
                Restaurants
                <div className="fixed top-24 w-52 text-right"></div>
              </h2>
              {/* <div className="w-full flex">
                <input
                  type="text"
                  placeholder="Search on Restaurant"
                  className="flex-1 rounded  focus:border-black my-1 ps-2 focus:outline-none"
                />
              </div> */}

              <ul className="space-y-1 overflow-x-hidden overflow-y-scroll h-[70%]">
                {notifys ? (
                  notifys.map(
                    (el, index) =>
                      el.metadata.nType === "restaurant" && (
                        <li
                          key={el._id}
                          className="py-1 ps-1 rounded bg-gray-100 relative cursor-pointer flex pe-[70px]"
                          onMouseEnter={() => setHoveredItem(el._id)}
                          onMouseLeave={() => setHoveredItem(null)}
                          onClick={() => {
                            handleItemClick(el._id);
                          }}
                        >
                          {el.metadata.isViewed === false && (
                            <span className="text-red-500 font-bold mr-2">
                              ●
                            </span>
                          )}
                          <div className=" ">
                            {el.message}{" "}
                            <span className={dateBadgeStyleClass}>
                              {new Date(el.timestamp).toLocaleDateString()}
                            </span>{" "}
                          </div>

                          <div className="flex  gap-1 absolute end-0 top-1">
                            {actionBtn.accept(el._id)}
                            {actionBtn.reject(el._id)}
                            <IoInformationCircleOutline
                              className=" text-xl"
                              onClick={() => handleInfoBadgeClick(el)}
                            />
                          </div>
                          {hoveredItem === el._id && (
                            <div className="absolute top-full left-0 mt-1 w-72 bg-white border rounded shadow-lg p-2 z-10">
                              <p>
                                <strong>Changes:</strong> {el.message}
                              </p>
                              <p>
                                <strong>Action:</strong> {el.metadata.action}
                              </p>
                            </div>
                          )}

                          {/* ew Date(timestamp).toLocaleString */}
                        </li>
                      )
                  )
                ) : (
                  <h2>No data available</h2>
                )}
              </ul>
            </div>

            <div className="bg-white p-2 rounded shadow-md h-[250px] relative">
              <h2 className="font-bold text-base mb-1 flex justify-between">
                Orders
                <div className="fixed top-24 w-52 text-right"></div>
              </h2>
              <ul className="space-y-1 overflow-x-hidden  overflow-y-scroll h-4/5">
                {notifys &&
                  notifys.map(
                    (el, index) =>
                      el.metadata.nType === "order" && (
                        <li
                          key={el._id}
                          className="p-1 rounded bg-gray-100 relative cursor-pointer flex  pe-[70px]"
                          onMouseEnter={() => setHoveredItem(el._id)}
                          onMouseLeave={() => setHoveredItem(null)}
                        >
                          {el.metadata.isViewed === false && (
                            <span className="text-red-500 font-bold mr-2">
                              ●
                            </span>
                          )}
                          <div className=" ">
                            {el.message}{" "}
                            <span className={dateBadgeStyleClass}>
                              {new Date(el.timestamp).toLocaleDateString()}
                            </span>{" "}
                          </div>
                          <div className="flex gap-1 absolute end-0 top-1">
                            {actionBtn.accept(el._id)}
                            {actionBtn.reject(el._id)}
                            <IoInformationCircleOutline
                              className=" text-xl"
                              onClick={() => handleInfoBadgeClick(el)}
                            />
                          </div>
                          {hoveredItem === el._id && (
                            <div className="absolute top-full left-0 mt-1 w-72 bg-white border rounded shadow-lg p-2 z-10">
                              <p>
                                <strong>Changes:</strong> {el.message}
                              </p>
                              <p>
                                <strong>Action:</strong> {el.metadata.action}
                              </p>
                            </div>
                          )}
                        </li>
                      )
                  )}
              </ul>
            </div>
            <div className="bg-white p-2 rounded shadow-md h-[250px] relative">
              <h2 className="font-bold text-base mb-1 flex justify-between">
                Flag
                <div className="fixed top-24 w-52 text-right"></div>
              </h2>
              <ul className="space-y-1 overflow-x-hidden  overflow-y-scroll h-4/5">
                {notifys &&
                  notifys.map(
                    (el, index) =>
                      el.metadata.nType === "flag" && (
                        <li
                          key={el._id}
                          className="p-1 rounded bg-gray-100 relative cursor-pointer flex pe-[70px] "
                          onMouseEnter={() => setHoveredItem(el._id)}
                          onMouseLeave={() => setHoveredItem(null)}
                        >
                          {el.metadata.isViewed === false && (
                            <span className="text-red-500 font-bold mr-2">
                              ●
                            </span>
                          )}
                          <div className=" ">
                            {el.message}{" "}
                            <span className={dateBadgeStyleClass}>
                              {new Date(el.timestamp).toLocaleDateString()}
                            </span>{" "}
                          </div>
                          <div className="flex gap-2  absolute end-0 top-1">
                            {actionBtn.accept(el._id)}
                            {actionBtn.reject(el._id)}
                            <IoInformationCircleOutline
                              className=" text-xl"
                              onClick={() => handleItemClick(el)}
                            />
                          </div>
                          {hoveredItem === el._id && (
                            <div className="absolute top-full left-0 mt-1 w-72 bg-white border rounded shadow-lg p-2 z-10">
                              <p>
                                <strong>Changes:</strong> {el.message}
                              </p>
                              <p>
                                <strong>Action:</strong> {el.metadata.action}
                              </p>
                            </div>
                          )}
                        </li>
                      )
                  )}
              </ul>
            </div>
            <div className="bg-white p-2 rounded shadow-md h-[250px] relative">
              <h2 className="font-bold text-base mb-1">Comments</h2>
              <ul className="space-y-1 overflow-x-hidden  overflow-y-auto h-4/5">
                {notifys &&
                  notifys.map(
                    (el, index) =>
                      el.metadata.nType === "comment" && (
                        <li
                          key={index}
                          className="p-1 rounded bg-gray-100 relative cursor-pointer flex pe-[90px]"
                        >
                          <div className=" ">
                            {el.message}{" "}
                            <span className={dateBadgeStyleClass}>
                              {new Date(el.timestamp).toLocaleDateString()}
                            </span>{" "}
                          </div>
                          {/* {note.resolved && (
                        <span className="text-green-500 font-bold">✔</span>
                      )} */}
                          <div className="flex gap-2  absolute end-0 top-1">
                            {actionBtn.accept(100)}
                            {actionBtn.reject(200)}
                            {actionBtn.visitFirm(300)}
                            {actionBtn.visitProfile(400)}
                          </div>
                        </li>
                      )
                  )}
              </ul>
            </div>
            <div className="bg-white p-2 rounded shadow-md h-[250px] relative">
              <h2 className="font-bold text-base mb-1 flex justify-between">
                Marketing
                <div className="fixed top-24 w-52 text-right"></div>
              </h2>
              <ul className="space-y-1 overflow-x-hidden  overflow-y-scroll h-4/5">
                {notifys &&
                  notifys.map(
                    (el, index) =>
                      el.metadata.nType === "marketing" && (
                        <li
                          key={el._id}
                          className="p-1 rounded bg-gray-100 relative cursor-pointer flex  pe-[70px]"
                          onMouseEnter={() => setHoveredItem(el._id)}
                          onMouseLeave={() => setHoveredItem(null)}
                        >
                          {el.metadata.isViewed === false && (
                            <span className="text-red-500 font-bold mr-2">
                              ●
                            </span>
                          )}
                          <div className=" ">
                            {el.message}{" "}
                            <span className={dateBadgeStyleClass}>
                              {new Date(el.timestamp).toLocaleDateString()}
                            </span>{" "}
                          </div>
                          <div className="flex gap-2  absolute end-0 top-1">
                            {actionBtn.accept(el._id)}
                            {actionBtn.reject(el._id)}
                            <IoInformationCircleOutline
                              className=" text-xl"
                              onClick={() => handleItemClick(el)}
                            />
                          </div>
                          {hoveredItem === el._id && (
                            <div className="absolute top-full left-0 mt-1 w-72 bg-white border rounded shadow-lg p-2 z-10">
                              <p>
                                <strong>Changes:</strong> {el.message}
                              </p>
                              <p>
                                <strong>Action:</strong> {el.metadata.action}
                              </p>
                            </div>
                          )}
                        </li>
                      )
                  )}
              </ul>
            </div>
            <div className="bg-white p-2 rounded shadow-md h-[250px] relative">
              <h2 className="font-bold text-base mb-1 flex justify-between">
                Chat
                <div className="fixed top-24 w-52 text-right"></div>
              </h2>
              <ul className="space-y-1 overflow-x-hidden  overflow-y-scroll h-4/5">
                {notifys &&
                  notifys.map(
                    (el, index) =>
                      el.metadata.nType === "chat" && (
                        <li
                          key={el._id}
                          className="p-1 rounded bg-gray-100 relative cursor-pointer flex  pe-[70px]"
                          onMouseEnter={() => setHoveredItem(el._id)}
                          onMouseLeave={() => setHoveredItem(null)}
                        >
                          {el.metadata.isViewed === false && (
                            <span className="text-red-500 font-bold mr-2">
                              ●
                            </span>
                          )}
                          <div className=" ">
                            {el.message}{" "}
                            <span className={dateBadgeStyleClass}>
                              {new Date(el.timestamp).toLocaleDateString()}
                            </span>{" "}
                          </div>
                          <div className="flex gap-2 absolute end-0 top-1 ">
                            {actionBtn.accept(el._id)}
                            {actionBtn.reject(el._id)}
                            <IoInformationCircleOutline
                              className=" text-xl"
                              onClick={() => handleItemClick(el)}
                            />
                          </div>
                          {hoveredItem === el._id && (
                            <div className="absolute top-full left-0 mt-1 w-72 bg-white border rounded shadow-lg p-2 z-10">
                              <p>
                                <strong>Message:</strong> {el.message}
                              </p>
                              <p>
                                <strong>Action:</strong> {el.metadata.action}
                              </p>
                            </div>
                          )}
                        </li>
                      )
                  )}
              </ul>
            </div>

            <div className="bg-white p-2 rounded shadow-md h-[250px] relative">
              <h2 className="font-bold text-base mb-1 flex justify-between">
                Tiffin
                <div className="fixed top-24 w-52 text-right"></div>
              </h2>
              <ul className="space-y-1 overflow-x-hidden  overflow-y-scroll h-4/5">
                {notifys &&
                  notifys.map(
                    (el, index) =>
                      el.metadata.nType === "tiffin" && (
                        <li
                          key={el._id}
                          className="p-1 rounded bg-gray-100 relative cursor-pointer flex pe-[70px]"
                          onMouseEnter={() => setHoveredItem(el._id)}
                          onMouseLeave={() => setHoveredItem(null)}
                        >
                          {el.metadata.isViewed === false && (
                            <span className="text-red-500 font-bold mr-2 ">
                              ●
                            </span>
                          )}
                          <div className=" ">
                            {el.message}{" "}
                            <span className={dateBadgeStyleClass}>
                              {new Date(el.timestamp).toLocaleDateString()}
                            </span>{" "}
                          </div>
                          <div className="flex gap-2 absolute end-0 top-1 ">
                            {actionBtn.accept(el._id)}
                            {actionBtn.reject(el._id)}
                            <IoInformationCircleOutline
                              className=" text-xl"
                              onClick={() => handleItemClick(el)}
                            />
                          </div>
                          {hoveredItem === el._id && (
                            <div className="absolute top-full left-0 mt-1 w-72 bg-white border rounded shadow-lg p-2 z-10">
                              <p>
                                <strong>Changes:</strong> {el.message}
                              </p>
                              <p>
                                <strong>Action:</strong> {el.metadata.action}
                              </p>
                            </div>
                          )}
                        </li>
                      )
                  )}
              </ul>
            </div>
            <div className="bg-white p-2 rounded shadow-md h-[250px] relative">
              <h2 className="font-bold text-base mb-1 flex justify-between">
                Live Events
                <div className="fixed top-24 w-52 text-right"></div>
              </h2>
              <ul className="space-y-1 overflow-x-hidden  overflow-y-scroll h-4/5">
                {notifys &&
                  notifys.map(
                    (el, index) =>
                      el.metadata.nType === "event" && (
                        <li
                          key={el._id}
                          className="p-1 rounded bg-gray-100 relative cursor-pointer flex pe-[70px] "
                          onMouseEnter={() => setHoveredItem(el._id)}
                          onMouseLeave={() => setHoveredItem(null)}
                        >
                          {el.metadata.isViewed === false && (
                            <span className="text-red-500 font-bold mr-2">
                              ●
                            </span>
                          )}
                          <div className=" ">
                            {el.message}{" "}
                            <span className={dateBadgeStyleClass}>
                              {new Date(el.timestamp).toLocaleDateString()}
                            </span>{" "}
                          </div>
                          <div className="flex gap-2 absolute end-0 top-1 ">
                            {actionBtn.accept(el._id)}
                            {actionBtn.reject(el._id)}
                            <IoInformationCircleOutline
                              className=" text-xl"
                              onClick={() => handleItemClick(el)}
                            />
                          </div>
                          {hoveredItem === el._id && (
                            <div className="absolute top-full left-0 mt-1 w-72 bg-white border rounded shadow-lg p-2 z-10">
                              <p>
                                <strong>Changes:</strong> {el.message}
                              </p>
                              <p>
                                <strong>Action:</strong> {el.metadata.action}
                              </p>
                            </div>
                          )}
                        </li>
                      )
                  )}
              </ul>
            </div>

            <div className="bg-white p-2 rounded shadow-md h-[250px] relative">
              <h2 className="font-bold text-base mb-1 flex justify-between">
                Modrator
                <div className="fixed top-24 w-52 text-right"></div>
              </h2>
              <ul className="space-y-1 overflow-x-hidden  overflow-y-scroll h-4/5">
                {notifys &&
                  notifys.map(
                    (el, index) =>
                      el.metadata.nType === "event" && (
                        <li
                          key={el._id}
                          className="p-1 rounded bg-gray-100 relative cursor-pointer flex pe-[70px]"
                        >
                          {el.metadata.isViewed === false && (
                            <span className="text-red-500 font-bold mr-2">
                              ●
                            </span>
                          )}
                          <div className=" ">
                            {el.message}{" "}
                            <span className={dateBadgeStyleClass}>
                              {new Date(el.timestamp).toLocaleDateString()}
                            </span>{" "}
                          </div>
                          <div className="flex gap-2 absolute end-0 top-1 ">
                            {actionBtn.accept(el._id)}
                            {actionBtn.reject(el._id)}
                            <IoInformationCircleOutline
                              className=" text-xl"
                              onClick={() => handleItemClick(el)}
                            />
                          </div>
                        </li>
                      )
                  )}
              </ul>
            </div>
            <div className="bg-white p-2 rounded shadow-md h-[250px] relative">
              <h2 className="font-bold text-base mb-1">System </h2>

              <ul className="space-y-1 overflow-x-hidden overflow-y-scroll">
                {notifys &&
                  notifys.map(
                    (el, index) =>
                      el.metadata.nType === "restaurant" && (
                        <li
                          key={index}
                          className="p-1 rounded bg-gray-100 relative cursor-pointer flex  pe-[70px]"
                          // onClick={() => handleItemClick(note, "moderator")}
                        >
                          <div className=" ">
                            {el.message}{" "}
                            <span className={dateBadgeStyleClass}>
                              {new Date(el.timestamp).toLocaleDateString()}
                            </span>{" "}
                          </div>
                          <div className="flex gap-2 absolute top-1 end-0">
                            {actionBtn.accept(el._id)}
                            {actionBtn.reject(el._id)}
                          </div>
                          {/* {note.resolved && (
                  <span className="text-green-500 font-bold">✔</span>
                )} */}
                        </li>
                      )
                  )}
              </ul>
            </div>
          </div>
          {modalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white p-4 rounded shadow-md max-w-lg w-full">
                <h3 className="text-lg font-bold mb-2">Details</h3>
                <p>
                  <strong>Level: {selectedDetails.Level}</strong>
                </p>
                <p>
                  <strong>Message: {selectedDetails.Message}</strong>
                </p>
                <p>
                  <strong>Notify_At: {selectedDetails.Date}</strong>
                </p>
                <p>
                  <strong>Action: {selectedDetails.Action}</strong>
                </p>
                <p>
                  <strong>Actor: {selectedDetails.Actor}</strong>
                </p>
                <p>
                  <strong>
                    Notification Type: {selectedDetails.notify_type}
                  </strong>
                </p>
                <div className="mt-2 text-right">
                  <button
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <h1>There is no Notifications available yet</h1>
      )}
    </>
>>>>>>> c7983b2717f06e0ff11610ca4a58703a0c141e69
  );
};

export default Notifications;
