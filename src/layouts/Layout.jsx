import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import TopNav from "../components/TopNav";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState(""); // State to manage the current page title
  const location = useLocation(); // Get current route

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* Sidebar */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        setCurrentPage={setCurrentPage} // Pass setter function to Sidebar to update currentPage
      />

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Conditionally render TopNav */}
        <TopNav />
        <TopNav title={currentPage} /> {/* Display current page title */}
        {/* Outlet for nested routes */}
        <div className="p-4 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;

// {modalOpen && (
//   <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//     <div className="bg-white p-4 rounded shadow-md max-w-lg w-full">
//       <h3 className="text-lg font-bold mb-2">Details</h3>
//       <p><strong>Why:</strong> {selectedDetails.why}</p>
//       <p><strong>When:</strong> {selectedDetails.when}</p>
//       <p><strong>Who:</strong> {selectedDetails.who}</p>
//       <p><strong>Address:</strong> {selectedDetails.address}</p>
//       <p><strong>Email:</strong> {selectedDetails.email}</p>
//       <p><strong>Phone:</strong> {selectedDetails.phone}</p>
//       <p><strong>Description:</strong> {selectedDetails.description}</p>
//       <p><strong>Last Update:</strong> {selectedDetails.lastUpdate}</p>
//       <p><strong>Status:</strong> {selectedDetails.status}</p>
//       <div className="mt-2 text-right">
//         <button
//           onClick={() => setModalOpen(false)}
//           className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//         >
//           Close
//         </button>
//       </div>
//     </div>
//   </div>
// )}
