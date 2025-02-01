import React, { useState } from "react";
import { FaFilter } from "react-icons/fa";

const HistoryLogs = () => {
  const [logs, setLogs] = useState([
    {
      id: 1,
      ID: 1234,
      user: "234:Gourmet Paradise",
      time: "12|12|1024 12:12 am",
      message:
        "added a new dish 'Truffle Pasta' to the menu nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn.",
      type: "menu-update",
      details: "The dish is priced at $15 and includes black truffle shavings.",
      tab: "Menu",
      status: "Successful",
      tailAction: "Forwarded for approval to moderator",
    },
    {
      id: 2,
      ID: 5678,
      user: "678:La Fiesta",
      time: "12|12|1024 12:12 am",
      message: "updated restaurant timings to 10:00 AM - 11:00 PM.",
      type: "restaurant-update",
      details:
        "La Fiesta extended evening hours by 1 hour to accommodate late diners.",
      tab: "Timings",
      status: "Rejected",
      tailAction: "Awaiting approval",
    },
    {
      id: 3,
      ID: 9012,
      user: "012:Cafe Delight",
      time: "12|12|1024 12:12 am",
      message: "received a 5-star review for 'Hazelnut Cappuccino'.",
      type: "review",
      details:
        "The review mentioned exceptional taste and excellent customer service.",
      tab: "Reviews",
      status: "Successful",
      tailAction: "Reviewed by manager",
    },
    {
      id: 4,
      ID: 3456,
      user: "123:Bistro Heaven",
      time: "12|12|1024 12:12 am",
      message: "added a promotional offer: '20% off on all desserts'.",
      type: "promotion",
      details:
        "The offer is valid from Jan 4th to Jan 10th and applies to dine-in orders.",
      tab: "Promotions",
      status: "Rejected",
      tailAction: "Live on website",
    },
    {
      id: 5,
      ID: 7890,
      user: "123:Pasta House",
      time: "12|12|1024 12:12 am",
      message: "updated pricing for 'Spaghetti Bolognese'.",
      type: "menu-update",
      details: "The new price is $12, reduced from $14.",
      tab: "Menu",
      status: "Successful",
      tailAction: "Updated in system",
    },
  ]);

  const [expandedLog, setExpandedLog] = useState(null);
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const [filterCriteria, setFilterCriteria] = useState("");
  const [filteredLogs, setFilteredLogs] = useState(logs);

  const toggleDetails = (id) => {
    setExpandedLog(expandedLog === id ? null : id);
  };

  const toggleFilterDropdown = () => {
    setFilterDropdownOpen(!filterDropdownOpen);
  };

  const handleFilterSelection = (criteria) => {
    setFilterCriteria(criteria);
    setFilterDropdownOpen(false);

    // Filter the logs based on the selected criteria
    const newFilteredLogs = logs.filter((log) => {
      switch (criteria) {
        case "User":
          return log.user.toLowerCase().includes("123");
        case "Type":
          return log.type.toLowerCase().includes("menu-update");
        case "Status":
          return log.status.toLowerCase() === "successful";
        case "Tail Action":
          return log.tailAction.toLowerCase().includes("approval");
        default:
          return true;
      }
    });

    setFilteredLogs(newFilteredLogs);
  };

  return (
    <div className="main-content">
      <div className="content">
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
                <ul>
                  <li
                    className="px-2 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleFilterSelection("User")}
                  >
                    User
                  </li>
                  <li
                    className="px-2 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleFilterSelection("Type")}
                  >
                    Type
                  </li>
                  <li
                    className="px-2 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleFilterSelection("Status")}
                  >
                    Status
                  </li>
                  <li
                    className="px-2 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleFilterSelection("Tail Action")}
                  >
                    Tail Action
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="overview">
          <div className="logs-header">
            <div>User</div>
            <div>Type</div>
            <div>Date & Time</div>
            <div>Tab</div>
            <div>Description</div>
            <div>Status</div>
            <div>Tail Action</div>
          </div>
          <div className="logs">
            {filteredLogs.map((log) => (
              <div key={log.id} className={`log-item ${log.type}`}>
                <div onClick={() => toggleDetails(log.id)}>
                  <div className="log-row">
                    <div>{log.user}</div>
                    <div>{log.type}</div>
                    <div>{log.time}</div>
                    <div>{log.tab}</div>
                    <div>{log.message}</div>
                    <div>{log.status}</div>
                    <div>{log.tailAction}</div>
                  </div>
                </div>
                {expandedLog === log.id && (
                  <div className="log-details">
                    <p>{log.details}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryLogs;
