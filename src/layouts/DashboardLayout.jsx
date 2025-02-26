import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import TopNav from "../components/TopNav";

export default function DashboardLayout() {
  const location = useLocation();

  // Logic to determine the current page based on the route
  let currentPage = "Dashboard"; // Default title
  if (location.pathname === "/orders") {
    currentPage = "Orders";
  } else if (location.pathname === "/notifications") {
    currentPage = "Notifications";
  } else if (location.pathname === "/support") {
    currentPage = "Support";
  } else if (location.pathname === "/help") {
    currentPage = "Help";
  } else if (location.pathname === "/faq") {
    currentPage = "faqs";
  } else if (location.pathname === "/historylogs") {
    currentPage = "History Logs";
  } else if (location.pathname === "/taxes-charges") {
    // Rename to Taxes and Charges
    currentPage = "Taxes and Charges";
  } else if (location.pathname === "/user-management") {
    // Rename to User Management
    currentPage = "User Management";
  } else if (location.pathname === "/admin-dashboard") {
    // Rename to Admin Dashboard
    currentPage = "Admin Dashboard";
  } else if (location.pathname === "/event-list") {
    // Rename to Event List
    currentPage = "Event List";
  } else if (location.pathname === "/event-management") {
    // Rename to Event Management
    currentPage = "Event Management";
  } else if (location.pathname === "/moderator-dashboard") {
    // Rename to Moderator Dashboard
    currentPage = "Moderator Dashboard";
  } else if (location.pathname === "/collect-payment") {
    // Rename to Collect Payment
    currentPage = "Collect Payment";
  } else if (location.pathname === "/order-management") {
    // Rename to Order Management
    currentPage = "Order Management";
  } else if (location.pathname === "/collection-management") {
    // Rename to Collection Management
    currentPage = "Collection Management";
  } else if (location.pathname === "/offers") {
    // Rename to Offers
    currentPage = "Offers";
  } else if (location.pathname === "/restaurants") {
    // Rename to Restaurants
    currentPage = "Restaurants";
  } else if (location.pathname === "/manage-admins") {
    // Rename to Manage Admins
    currentPage = "Manage Admins";
  } else if (location.pathname === "/manage-customers") {
    // Rename to Manage Customers
    currentPage = "Manage Customers";
  } else if (location.pathname === "/manage-drivers") {
    // Rename to Manage Drivers
    currentPage = "Manage Drivers";
  } else if (location.pathname === "/usermanagement") {
    // Rename to Notifications
    currentPage = "User Management";
  } else if (location.pathname === "/analytics") {
    // Rename to Notifications
    currentPage = "Analytics";
  } else if (location.pathname === "/dine-in-menu") {
    // Rename to Notifications
    currentPage = "Dine-In Menu";
  } else if (location.pathname === "/settings") {
    // Rename to Notifications
    currentPage = "Settings";
  } else if (location.pathname === "/taxes") {
    currentPage = "Taxes and Charges";
    // Rename to Notifications
  } else if (location.pathname === "/claim-restaurant") {
    currentPage = "Claim Restaurant";
    // Rename to Notifications
  }
  // Rename to Notifications

  // Add more conditions as needed for other pages
  // Add more conditions as needed for other pages

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Pass currentPage to TopNav */}
        <TopNav currentPage={currentPage} />

        <main className="flex-1 overflow-y-auto p-4">
          {/* Nested routes */}
          <Outlet />
        </main>
      </div>
    </div>
  );
}
