// ------------------------
// src/pages/DashboardHome.jsx
// ------------------------

import React from "react";
import TopNav from "../components/TopNav"; // Import TopNav component

export default function DashboardHome() {
  // Sample data for demonstration
  const stats = [
    {
      label: "Today’s Orders",
      value: 78,
      bg: "bg-pink-600",
    },
    {
      label: "Revenue (Today)",
      value: "₹ 14,500",
      bg: "bg-blue-600",
    },
    {
      label: "Active Items",
      value: 112,
      bg: "bg-green-600",
    },
    {
      label: "Pending Orders",
      value: 9,
      bg: "bg-yellow-600",
    },
  ];

  const recentActivity = [
    {
      id: "#1423",
      customer: "John Doe",
      total: "₹ 450",
      status: "Delivered",
      time: "10 mins ago",
    },
    {
      id: "#1422",
      customer: "Jane Smith",
      total: "₹ 1200",
      status: "Processing",
      time: "20 mins ago",
    },
    {
      id: "#1421",
      customer: "Ravi Kumar",
      total: "₹ 800",
      status: "Delivered",
      time: "30 mins ago",
    },
    {
      id: "#1420",
      customer: "Ayesha Khan",
      total: "₹ 650",
      status: "Cancelled",
      time: "45 mins ago",
    },
  ];

  return (
    <div className="p-4 space-y-6">
      {/* Title */}
      <h1 className="text-2xl font-bold text-gray-700">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`flex items-center justify-between p-4 rounded shadow text-white ${stat.bg}`}
          >
            <div className="flex flex-col">
              <span className="text-sm font-medium opacity-90">
                {stat.label}
              </span>
              <span className="text-xl font-bold mt-1">{stat.value}</span>
            </div>
            {/* Icon placeholder (replace with actual icons if you like) */}
            <svg
              className="w-8 h-8 opacity-75"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11 5l-7 7 7 7M5 12h14"
              />
            </svg>
          </div>
        ))}
      </div>

      {/* Analytics or Chart Placeholder */}
      <div className="bg-white rounded shadow p-4">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">
          Order Analytics
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          Here you could display a chart of daily/weekly orders, revenue trends,
          etc.
        </p>
        <div className="border-2 border-dashed border-gray-300 rounded h-40 flex items-center justify-center text-gray-400">
          Chart Placeholder
        </div>
      </div>

      {/* Recent Activity or Orders */}
      <div className="bg-white rounded shadow p-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold text-gray-700">Recent Orders</h2>
          <button className="text-sm text-blue-500 hover:underline">
            View All
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-gray-500 border-b">
                <th className="py-2">Order ID</th>
                <th className="py-2">Customer</th>
                <th className="py-2">Total</th>
                <th className="py-2">Status</th>
                <th className="py-2">Time</th>
              </tr>
            </thead>
            <tbody>
              {recentActivity.map((order) => (
                <tr key={order.id} className="border-b last:border-0">
                  <td className="py-2">{order.id}</td>
                  <td className="py-2">{order.customer}</td>
                  <td className="py-2">{order.total}</td>
                  <td className="py-2">
                    <span
                      className={`
                        text-xs font-semibold px-2 py-1 rounded
                        ${
                          order.status === "Delivered"
                            ? "bg-green-100 text-green-800"
                            : ""
                        }
                        ${
                          order.status === "Processing"
                            ? "bg-yellow-100 text-yellow-800"
                            : ""
                        }
                        ${
                          order.status === "Cancelled"
                            ? "bg-red-100 text-red-800"
                            : ""
                        }
                      `}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="py-2 text-gray-500">{order.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
