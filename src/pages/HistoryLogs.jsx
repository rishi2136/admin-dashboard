// import React, { useState } from "react";
// import { FaFilter } from "react-icons/fa";

// const HistoryLogs = () => {
//   const [logs, setLogs] = useState([
//     {
//       id: 1,
//       ID: 1234,
//       user: "234:Gourmet Paradise",
//       time: "12|12|1024 12:12 am",
//       message:
//         "added a new dish 'Truffle Pasta' to the menu nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn.",
//       type: "menu-update",
//       details: "The dish is priced at $15 and includes black truffle shavings.",
//       tab: "Menu",
//       status: "Successful",
//       tailAction: "Forwarded for approval to moderator",
//     },
//     {
//       id: 2,
//       ID: 5678,
//       user: "678:La Fiesta",
//       time: "12|12|1024 12:12 am",
//       message: "updated restaurant timings to 10:00 AM - 11:00 PM.",
//       type: "restaurant-update",
//       details:
//         "La Fiesta extended evening hours by 1 hour to accommodate late diners.",
//       tab: "Timings",
//       status: "Rejected",
//       tailAction: "Awaiting approval",
//     },
//     {
//       id: 3,
//       ID: 9012,
//       user: "012:Cafe Delight",
//       time: "12|12|1024 12:12 am",
//       message: "received a 5-star review for 'Hazelnut Cappuccino'.",
//       type: "review",
//       details:
//         "The review mentioned exceptional taste and excellent customer service.",
//       tab: "Reviews",
//       status: "Successful",
//       tailAction: "Reviewed by manager",
//     },
//     {
//       id: 4,
//       ID: 3456,
//       user: "123:Bistro Heaven",
//       time: "12|12|1024 12:12 am",
//       message: "added a promotional offer: '20% off on all desserts'.",
//       type: "promotion",
//       details:
//         "The offer is valid from Jan 4th to Jan 10th and applies to dine-in orders.",
//       tab: "Promotions",
//       status: "Rejected",
//       tailAction: "Live on website",
//     },
//     {
//       id: 5,
//       ID: 7890,
//       user: "123:Pasta House",
//       time: "12|12|1024 12:12 am",
//       message: "updated pricing for 'Spaghetti Bolognese'.",
//       type: "menu-update",
//       details: "The new price is $12, reduced from $14.",
//       tab: "Menu",
//       status: "Successful",
//       tailAction: "Updated in system",
//     },
//   ]);

//   const [expandedLog, setExpandedLog] = useState(null);
//   const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
//   const [filterCriteria, setFilterCriteria] = useState("");
//   const [filteredLogs, setFilteredLogs] = useState(logs);

//   const toggleDetails = (id) => {
//     setExpandedLog(expandedLog === id ? null : id);
//   };

//   const toggleFilterDropdown = () => {
//     setFilterDropdownOpen(!filterDropdownOpen);
//   };

//   const handleFilterSelection = (criteria) => {
//     setFilterCriteria(criteria);
//     setFilterDropdownOpen(false);

//     // Filter the logs based on the selected criteria
//     const newFilteredLogs = logs.filter((log) => {
//       switch (criteria) {
//         case "User":
//           return log.user.toLowerCase().includes("123");
//         case "Type":
//           return log.type.toLowerCase().includes("menu-update");
//         case "Status":
//           return log.status.toLowerCase() === "successful";
//         case "Tail Action":
//           return log.tailAction.toLowerCase().includes("approval");
//         default:
//           return true;
//       }
//     });

//     setFilteredLogs(newFilteredLogs);
//   };

//   return (
//     <div className="main-content">
//       <div className="content">
//         <div className="flex justify-end mt-0 pt-0">
//           <div className="relative">
//             <button
//               className="flex items-center gap-1 px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
//               onClick={toggleFilterDropdown}
//             >
//               <FaFilter />
//             </button>
//             {filterDropdownOpen && (
//               <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow">
//                 <ul>
//                   <li
//                     className="px-2 py-2 hover:bg-gray-100 cursor-pointer"
//                     onClick={() => handleFilterSelection("User")}
//                   >
//                     User
//                   </li>
//                   <li
//                     className="px-2 py-2 hover:bg-gray-100 cursor-pointer"
//                     onClick={() => handleFilterSelection("Type")}
//                   >
//                     Type
//                   </li>
//                   <li
//                     className="px-2 py-2 hover:bg-gray-100 cursor-pointer"
//                     onClick={() => handleFilterSelection("Status")}
//                   >
//                     Status
//                   </li>
//                   <li
//                     className="px-2 py-2 hover:bg-gray-100 cursor-pointer"
//                     onClick={() => handleFilterSelection("Tail Action")}
//                   >
//                     Tail Action
//                   </li>
//                 </ul>
//               </div>
//             )}
//           </div>
//         </div>
//         <div className="overview">
//           <div className="logs-header">
//             <div>User</div>
//             <div>Type</div>
//             <div>Date & Time</div>
//             <div>Tab</div>
//             <div>Description</div>
//             <div>Status</div>
//             <div>Tail Action</div>
//           </div>
//           <div className="logs">
//             {filteredLogs.map((log) => (
//               <div key={log.id} className={`log-item ${log.type}`}>
//                 <div onClick={() => toggleDetails(log.id)}>
//                   <div className="log-row">
//                     <div>{log.user}</div>
//                     <div>{log.type}</div>
//                     <div>{log.time}</div>
//                     <div>{log.tab}</div>
//                     <div>{log.message}</div>
//                     <div>{log.status}</div>
//                     <div>{log.tailAction}</div>
//                   </div>
//                 </div>
//                 {expandedLog === log.id && (
//                   <div className="log-details">
//                     <p>{log.details}</p>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HistoryLogs;

import React, { useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

const HistoryLogs = () => {
  const [logs] = useState([
    {
      id: 1,
      ID: 1234,
      user: "234:Gourmet Paradise",
      time: "1-2-2024 12:12 AM",
      message: "added a new dish 'Truffle Pasta' to the menu.",
      type: "menu-update",
      details: "The dish is priced at $15 and includes black truffle shavings.",
      tab: "Menu",
      status: "Pending",
      tailAction: "Forwarded for approval to moderator",
    },
    {
      id: 2,
      ID: 5678,
      user: "678:La Fiesta",
      time: "2-2-2024 12:12 AM",
      message: "updated restaurant timings to 10:00 AM - 11:00 PM.",
      type: "restaurant-update",
      details: "La Fiesta extended evening hours by 1 hour.",
      tab: "Timings",
      status: "Rejected",
      tailAction: "Awaiting approval",
    },
    {
      id: 3,
      ID: 9012,
      user: "012:Cafe Delight",
      time: "6-2-2024 12:12 AM",
      message: "received a 5-star review for 'Hazelnut Cappuccino'.",
      type: "review",
      details: "The review mentioned exceptional taste and service.",
      tab: "Reviews",
      status: "Successful",
      tailAction: "Reviewed by manager",
    },
    {
      id: 4,
      ID: 3456,
      user: "123:Bistro Heaven",
      time: "2-12-2024 12:12 AM",
      message: "added a promotional offer: '20% off on all desserts'.",
      type: "Promotion",
      details:
        "The offer is valid from Jan 4th to Jan 10th and applies to dine-in orders.",
      tab: "Promotions",
      status: "Pending",
      tailAction: "Live on website",
    },
    {
      id: 5,
      ID: 7890,
      user: "123:Pasta House",
      time: "6-12-2024 12:12 AM",
      message: "updated pricing for 'Spaghetti Bolognese'.",
      type: "Promotion",
      details: "The new price is $12, reduced from $14.",
      tab: "Menu",
      status: "Successful",
      tailAction: "Updated in system",
    },
  ]);

  const [filterType, setFilterType] = useState([]);
  const [filterStatus, setFilterStatus] = useState("");
  const [dateRange, setDateRange] = useState([null, null]);
  const [filteredLogs, setFilteredLogs] = useState(logs);
  const [typeDropdownOpen, setTypeDropdownOpen] = useState(false);
  const [expandedLog, setExpandedLog] = useState(null);
  
  const [startDate, endDate] = dateRange;

  const toggleDetails = (id) => {
    setExpandedLog(expandedLog === id ? null : id);
  };

  const handleSearch = () => {
    let filtered = logs;

    if (filterStatus) {
      filtered = filtered.filter((log) => log.status === filterStatus);
    }

    if (startDate && endDate) {
      filtered = filtered.filter((log) => {
        const logDate = new Date(log.time.split(" ")[0].split("-").reverse().join("-"));
        return logDate >= startDate && logDate <= endDate;
      });
    }

    if (filterType.length > 0) {
      filtered = filtered.filter((log) => filterType.includes(log.type));
    }

    setFilteredLogs(filtered);
  };

  return (
    <div className="main-content p-4">
      <div className="bg-white shadow rounded p-4">
        <div className="grid grid-cols-5 gap-2 mb-4 items-center">
          <div className="relative w-full">
            <button
              className="border p-4 rounded w-full flex justify-between items-center"
              onClick={() => setTypeDropdownOpen(!typeDropdownOpen)}
            >
              Filter by Type
              {typeDropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            {typeDropdownOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg border rounded p-2">
                {Array.from(new Set(logs.map((log) => log.type))).map((type) => (
                  <label key={type} className="flex items-center space-x-2 p-1">
                    <input
                      type="checkbox"
                      value={type}
                      checked={filterType.includes(type)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFilterType([...filterType, type]);
                        } else {
                          setFilterType(filterType.filter((t) => t !== type));
                        }
                      }}
                    />
                    <span>{type}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          
          <select
            className="border p-4 rounded w-full"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="">Filter by Status</option>
            <option value="Successful">Successful</option>
            <option value="Rejected">Rejected</option>
            <option value="Pending">Pending</option>
          </select>

          
          <div className="border p-2 rounded w-full flex items-center">
            <DatePicker
              selectsRange={true}
              startDate={startDate}
              endDate={endDate}
              onChange={(update) => setDateRange(update)}
              isClearable={true}
              className="w-full outline-none border-none"
              placeholderText="Select date range"
            />
          </div>

          
          <button
            className="bg-gray-100 text-black px-4 py-4 rounded shadow-md hover:bg-gray-300 w-full"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>

      
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">User</th>
              <th className="border p-2">Type</th>
              <th className="border p-2">Date & Time</th>
              <th className="border p-2">Tab</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Tail Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.length > 0 ? (
              filteredLogs.map((log) => (
                <React.Fragment key={log.id}>
                  <tr className="border cursor-pointer" onClick={() => toggleDetails(log.id)}>
                    <td className="border p-2">{log.user}</td>
                    <td className="border p-2">{log.type}</td>
                    <td className="border p-2">{log.time}</td>
                    <td className="border p-2">{log.tab}</td>
                    <td className="border p-2 text-center">
                      <span className={`inline-block w-full border font-semibold px-2 py-1 rounded ${
                        log.status === "Successful" ? "text-green-700 bg-green-100" :
                        log.status === "Rejected" ? "text-red-700 bg-red-100" :
                        "text-yellow-700 bg-yellow-100"
                      }`}>
                        {log.status}
                      </span>
                    </td>
                    <td className="border p-2">{log.tailAction}</td>
                  </tr>
                  {expandedLog === log.id && (
                    <tr className="border bg-gray-50">
                      <td colSpan="6" className="p-2">{log.details}</td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center p-2">No logs found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistoryLogs;

