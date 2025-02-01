import React from "react";
import { FiPhone, FiMapPin, FiCalendar, FiFileText } from "react-icons/fi";
import { FaCheckCircle, FaTimesCircle, FaClock, FaUndo } from "react-icons/fa";
import { FcAcceptDatabase} from "react-icons/fc";
import { IoMdClose } from "react-icons/io";
import { MdOutlineWatchLater } from "react-icons/md";
export default function OrderDetails({ order, onStatusChange }) {
    if (!order) return <div className="text-gray-500">Select an order to view details.</div>;

    return (
        <div className="bg-white shadow-md rounded-md p-4 w-full">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Restaurant Details</h2>
                <span className="text-sm px-2 py-1 border rounded text-gray-700">{order.id}</span>
            </div>

            <div className="mb-2">
                <h3 className="text-lg font-bold">{order.restaurantname}</h3>
                <div className="flex items-center text-sm text-gray-500">
                    <FiPhone className="mr-2" />
                    {order.phone}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                    <FiMapPin className="mr-2" />
                    {order.restaurantaddress}
                </div>
            </div>

            <hr className="my-4" />

            <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                <div>
                    <h4 className="font-semibold">Date of Request</h4>
                    <p className="text-gray-500 flex items-center">
                        <FiCalendar className="mr-2" />
                        {order.dateofrequest}
                    </p>
                </div>
                <div>
                    <h4 className="font-semibold">Date of Claim Submission</h4>
                    <p className="text-gray-500 flex items-center">
                        <FiCalendar className="mr-2" />
                        {order.dateofclaimsubmission}
                    </p>
                </div>
                <div>
                    <h4 className="font-semibold">Status</h4>
                    <p className={`text-white px-2 py-1 rounded ${getStatusColor(order.status)}`}>
                        {order.status}
                    </p>
                </div>
                <div>
                    <h4 className="font-semibold">Time</h4>
                    <p className="text-gray-500">{order.time}</p>
                </div>
            </div>

            <hr className="my-4" />

            <div className="mb-4">
                <h4 className="text-sm font-semibold mb-2">Restaurant Documents</h4>
                <div className="flex items-center gap-2 border border-gray-300 p-3 rounded">
                    <FiFileText className="text-gray-600" size={20} />
                    <span className="text-gray-500">No documents uploaded yet</span>
                </div>
            </div>

            <hr className="my-4" />

            {/* Admin Actions */}
            <div className="flex justify-around gap-1 mt-1">
                <button
                    className="flex items-center gap-1 text-black  px-4 py-2 bg-white"
                    onClick={() => onStatusChange(order.id, "Approved")}
                >
                    <FcAcceptDatabase className="h-6 w-6" />
                 
                </button>

                <button
                    className="flex items-center gap-2  bg-white text-black px-4 py-2 "
                    onClick={() => onStatusChange(order.id, "Rejected")}
                >
                    <IoMdClose className="h-6 w-6" />
                 
                </button>

                <button
                    className="flex items-center gap-2 bg-white text-black px-4 py-2 "
                    onClick={() => onStatusChange(order.id, "Later")}
                >
                    <MdOutlineWatchLater className="h-6 w-6" />
                  
                </button>

                <button
                    className="flex items-center gap-2 bg-white text-black px-4 py-2 "
                    onClick={() => onStatusChange(order.id, "Revoked")}
                >
                    <FaUndo className="h-4 w-4" />
                   
                </button>
            </div>
        </div>
    );
}

// Helper function to determine status colors
const getStatusColor = (status) => {
    switch (status) {
        case "Claimed":
            return "bg-yellow-500";
        case "Pending":
            return "bg-blue-500";
        case "Unclaimed":
            return "bg-red-500";
        default:
            return "bg-gray-400";
    }
};
