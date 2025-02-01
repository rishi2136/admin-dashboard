import React, { useState, useEffect } from "react";
import OrderDetails from "./OrderDetails";
import { MdDone } from "react-icons/md";
import { MdOutlineCancel } from "react-icons/md";

const ManageOrders = () => {
    const initialRecentActivity = [
        {
            id: "#1423",
            restaurantname: "Pizza Hut",
            claimername: "Alice Johnson",
            phone: "+1 (555) 111-2222",
            restaurantaddress: "456 Elm St, Springfield, SP 54321",
            status: "Claimed",
            time: "5 mins ago",
            dateofrequest: "2025-01-02",
            dateofclaimsubmission: "2025-01-02",
        },
        {
        id: "#1425",
        restaurantname: "Taco Bell",
        claimername: "Fiona Gallagher",
        phone: "+1 (555) 111-3333",
        restaurantaddress: "159 Spruce St, Coast City, CO 11223",
        status: "Claimed",
        time: "15 mins ago",
        dateofrequest: "2025-06-25",
        dateofclaimsubmission: "2025-06-27",
    },
    {
        id: "#1426",
        restaurantname: "Starbucks",
        claimername: "Greg House",
        phone: "+1 (555) 222-4444",
        restaurantaddress: "753 Maple St, Riverdale, RV 33445",
        status: "UnClaimed",
        time: "5 hours ago",
        dateofrequest: "2025-07-07",
        dateofclaimsubmission: "2025-07-10",
    },
    {
        id: "#1427",
        restaurantname: "McDonald's",
        claimername: "Hank Schrader",
        phone: "+1 (555) 666-7777",
        restaurantaddress: "852 Redwood St, Hill Valley, HV 55667",
        status: "Claimed",
        time: "10 mins ago",
        dateofrequest: "2025-08-14",
        dateofclaimsubmission: "2025-08-16",
    },
        {
            id: "#1422",
            restaurantname: "Burger King",
            claimername: "Bob Smith",
            phone: "+1 (555) 333-4444",
            restaurantaddress: "789 Oak St, Metropolis, MP 98765",
            status: "UnClaimed",
            time: "20 mins ago",
            dateofrequest: "2025-02-10",
            dateofclaimsubmission: "2025-02-12",
        },
        {
            id: "#1421",
            restaurantname: "KFC",
            claimername: "Charlie Brown",
            phone: "+1 (555) 555-6666",
            restaurantaddress: "321 Pine St, Gotham, GT 67890",
            status: "Revoked",
            time: "1 hour ago",
            dateofrequest: "2025-03-15",
            dateofclaimsubmission: "2025-03-20",
        },
        {
            id: "#1420",
            restaurantname: "Subway",
            claimername: "Diana Prince",
            phone: "+1 (555) 777-8888",
            restaurantaddress: "654 Cedar St, Star City, SC 13579",
            status: "Pending",
            time: "30 mins ago",
            dateofrequest: "2025-04-05",
            dateofclaimsubmission: "2025-04-08",
        },
    ];

    const [recentActivity, setRecentActivity] = useState(initialRecentActivity);
    const [statusFilter, setStatusFilter] = useState("");
    const [selectedOrder, setSelectedOrder] = useState(initialRecentActivity[0]);

    useEffect(() => {
        const filteredActivity = initialRecentActivity.filter(
            (order) => !statusFilter || order.status === statusFilter
        );
        setRecentActivity(filteredActivity);
    }, [statusFilter]);

    const statusChange = (orderId, newStatus) => {
        const updatedOrders = recentActivity.map((order) =>
            order.id === orderId ? { ...order, status: newStatus } : order
        );
        setRecentActivity(updatedOrders);

        if (selectedOrder.id === orderId) {
            setSelectedOrder({ ...selectedOrder, status: newStatus });
        }
    };

    return (
        <div className="flex gap-2">
            <div className="bg-white rounded shadow p-2 w-[60%]">
                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-lg font-semibold">REQUESTS</h2>
                    <select
                        className="text-sm border border-gray-300 rounded px-2 py-1 cursor-pointer"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="">All Status</option>
                        <option className="text-green-500" value="Claimed">
                            Claimed
                        </option>
                        <option className="text-red-800" value="UnClaimed">
                            UnClaimed
                        </option>
                        <option className="text-green-800" value="Pending">
                            Pending
                        </option>
                        <option className="text-red-800" value="Revoked">
                            Revoked
                        </option>
                    </select>
                </div>

                <div className="overflow-x-auto ">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="text-black border-b">
                                <th className="py-2 px-2 text-left">Restaurant ID</th>
                                <th className="py-2 px-2 text-left">Restaurant Name</th>
                                <th className="py-2 px-2 text-left">Claimer Name</th>
                                <th className="py-2 px-2 text-left">Time</th>
                                <th className="py-2 px-2 text-left">Status</th>
                                <th className="py-2 px-2 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentActivity.map((order) => (
                                <tr
                                    key={order.id}
                                    className={`cursor-pointer border-b last:border-0 
                                        ${selectedOrder.id === order.id ? "bg-gray-100" : "" }`}
                                    onClick={() => setSelectedOrder(order)}
                                >
                                    <td className="py-2 px-2">{order.id}</td>
                                    <td className="py-2 px-2">{order.restaurantname}</td>
                                    <td className="py-2 px-2">{order.claimername}</td>
                                    <td className="py-2 px-2">{order.time}</td>
                                    <td className="py-2 px-2">
                                        <span
                                            className={`text-xs font-semibold px-2 py-1 rounded ${
                                                order.status === "Claimed"
                                                    ? "bg-green-100 text-green-800"
                                                    : order.status === "UnClaimed"
                                                    ? "bg-red-100 text-red-800"
                                                    : order.status === "Pending"
                                                    ? "bg-blue-100 text-blue-800"
                                                    : "bg-gray-100 text-gray-800"
                                            }`}
                                        >
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="py-2 flex items-center gap-2">
                                        {order.status === "Claimed" && (
                                            <>
                                                <span
                                                    className="text-green-500 cursor-pointer"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        statusChange(order.id, "Pending");
                                                    }}
                                                >
                                                    <MdDone size={20} />
                                                </span>
                                                <span
                                                    className="text-red-500 cursor-pointer"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        statusChange(order.id, "Revoked");
                                                    }}
                                                >
                                                    <MdOutlineCancel size={20} />
                                                </span>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="w-[40%]">
                <OrderDetails order={selectedOrder} onStatusChange={statusChange} />
            </div>
        </div>
    );
};

export default ManageOrders;
