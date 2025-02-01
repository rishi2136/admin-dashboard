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
  const handleRestaurantClick = (restaurant) => {
    // Navigate to /restaurants page
    navigate("/restaurants");
  };
  // Rename handleItemClick to handleMenuItemClick if it conflicts
  const handleMenuItemClick = (item, type) => {
    const details = {
      ...item,
      why: type === "restaurant" ? "Customer demand" : "Seasonal updates",
    };

    // Perform additional logic if necessary
  };

  const [selectedFilter, setSelectedFilter] = useState(null);
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [selectedDetails, setSelectedDetails] = useState(null);
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
  );
};

export default Notifications;
