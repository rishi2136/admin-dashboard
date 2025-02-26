import React, { useEffect, useRef, useState } from "react";
import { FaCheck, FaTimes, FaPhoneAlt, FaFilter } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

const OrderManagement = ({ orders = [], tiffins = [], sectionTitle }) => {
  const [ordersList, setOrdersList] = useState(orders);
  const [tiffinList, setTiffinList] = useState(tiffins);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [filter, setFilter] = useState(""); // State to store the selected filter option
  const [activeSection, setActiveSection] = useState("orders"); // State for active section

  const tiffinSectionRef = useRef(null); // Ref for Tiffin section
  const DineInSectionRef = useRef(null); // Ref for Tiffin section
  const TakeawaySectionRef = useRef(null); // Ref for Tiffin section

  const handleOrderClick = (orderId) => {
    setSelectedOrderId(orderId); // Set selected order for modal
  };

  const handleCloseModal = () => {
    setSelectedOrderId(null); // Close the modal
  };

  const handleConfirm = (orderId, type) => {
    const updateList = (list) =>
      list.map((item) =>
        item.id === orderId ? { ...item, status: "Confirmed" } : item
      );
    type === "order"
      ? setOrdersList((prevOrders) => updateList(prevOrders))
      : setTiffinList((prevTiffins) => updateList(prevTiffins));
  };

  const handleReject = (orderId, type) => {
    const updateList = (list) =>
      list.map((item) =>
        item.id === orderId ? { ...item, status: "Rejected" } : item
      );
    type === "order"
      ? setOrdersList((prevOrders) => updateList(prevOrders))
      : setTiffinList((prevTiffins) => updateList(prevTiffins));
  };

  const handleContactRestaurant = (restaurant) => {
    alert(`Contacting restaurant: ${restaurant}`);
  };

  const handleFilter = (filterOption) => {
    setFilter(filterOption);
  };

  const filteredItems = (list) =>
    list.filter((item) => {
      if (filter === "latest") {
        return new Date(item.date) > new Date() - 24 * 60 * 60 * 1000; // Items in the last 24 hours
      }
      if (filter === "expired") {
        return new Date(item.date) < new Date() - 24 * 60 * 60 * 1000; // Items older than 24 hours
      }
      if (filter === "pending") {
        return item.status === "pending"; // Items with 'pending' status
      }
      return true; // No filter
    });

  const renderCards = (items, type) =>
    items.map((item) => (
      <div
        key={item.id}
        className="bg-white p-2 rounded-lg shadow-lg flex flex-col justify-between w-full"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-1">
          <h4 className="text-sm font-semibold text-gray-800">
            {type.toUpperCase()} ID - {item.id}
          </h4>
          <div className="flex flex-col items-end">
            <img
              src="/info.png"
              alt="Info"
              className="w-4 h-4 cursor-pointer"
              onClick={() => handleOrderClick(item.id)}
            />
            <div className="flex text-xs text-gray-500 mt-1">
              <p>{item.date}</p>
              <span className="mx-1">|</span>
              <p>{item.time}</p>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="flex justify-between items-start mb-2">
          <div className="flex flex-col w-2/3">
            <h3 className="font-semibold text-gray-800">{item.restaurant}</h3>
            <p className="text-xs text-gray-500">Name: {item.Name}</p>
            <p className="font-semibold text-gray-800">
              {item.item} x {item.quantity}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Pick-up Time: {item.pickuptime}
            </p>
            <div className="flex text-xs text-gray-500 mt-1">
              <p className="mr-1">
                <span className="font-medium">Cat:</span> {item.category}
              </p>
              <span className="mx-1">|</span>
              <p className="ml-1">
                <span className="font-medium">Sub:</span> {item.subcategory}
              </p>
            </div>
            <div className="flex flex-col items-start mt-2">
              <div className="flex items-center space-x-1">
                <p className="font-bold text-sm text-gray-800">Price:</p>
                <span className="text-blue-500 font-bold">
                  ${item.price.toFixed(2)}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">{item.payment}</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-around items-center mb-1">
          <button
            className={`flex items-center justify-center w-8 h-8 rounded-full ${
              item.status === "pending"
                ? "bg-white text-black hover:bg-green-600"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            disabled={item.status !== "pending"}
            onClick={() => handleConfirm(item.id, type)}
          >
            <FaCheck className="h-4 w-4" />
          </button>
          <button
            className={`flex items-center justify-center w-8 h-8 text-black rounded-full ${
              item.status === "pending"
                ? "bg-white-500 text-black hover:bg-red-600"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            disabled={item.status !== "pending"}
            onClick={() => handleReject(item.id, type)}
          >
            <IoMdClose className="h-5 w-5" />
          </button>
          <button
            className="flex items-center justify-center w-8 h-8 bg-white text-black rounded-full hover:bg-blue-600"
            onClick={() => handleContactRestaurant(item.restaurant)}
          >
            <FaPhoneAlt className="h-4 w-4" />
          </button>
        </div>

        {/* Status */}
        {item.status && (
          <div className="text-sm font-bold text-gray-800">
            Status: <span className="capitalize">{item.status}</span>
          </div>
        )}
      </div>
    ));

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection("tiffins");
          }
        });
      },
      { threshold: 0.5 }
    );

    if (tiffinSectionRef.current) {
      observer.observe(tiffinSectionRef.current);
    }

    return () => {
      if (tiffinSectionRef.current) {
        observer.unobserve(tiffinSectionRef.current);
      }
    };
  }, []);

  const scrollToTiffin = (text) => {
    setActiveSection(text);
    // tiffinSectionRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="p-0">
      {/* Header Row */}
      <div className="top-0 bg-gray-200 py-2 z-10 flex justify-center items-center relative">
        <div className="flex space-x-24 justify-center items-center">
          <h2
            className={`text-lg font-semibold cursor-pointer ${
              activeSection === "dine-in"
                ? "text-orange-500 border-b-4 border-orange-500"
                : "text-gray-800"
            }`}
            onClick={() => scrollToTiffin("dine-in")}
          >
            DineIn
          </h2>
          <h2
            className={`text-lg font-semibold cursor-pointer ${
              activeSection === "takeaway"
                ? "text-orange-500 border-b-4 border-orange-500"
                : "text-gray-800"
            }`}
            onClick={() => scrollToTiffin("takeaway")}
          >
            Takeaway
          </h2>
          <h2
            className={`text-lg font-semibold cursor-pointer ${
              activeSection === "tiffins"
                ? "text-orange-500 border-b-4 border-orange-500"
                : "text-gray-800"
            }`}
            onClick={() => scrollToTiffin("tiffins")}
          >
            Tiffins
          </h2>
        </div>
        <FaFilter
          className="text-lg cursor-pointer absolute right-4 top-1/2 transform -translate-y-1/2"
          onClick={() => handleFilter(filter === "" ? "latest" : "")} // Toggle between filter options
        />
      </div>

      {/* Dynamic Grid for Orders */}
      <div className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-5 gap-1 mb-4">
        {renderCards(filteredItems(ordersList), "order")}
      </div>

      {/* Tiffins Section */}
      <div ref={tiffinSectionRef} className="mt-6">
        {/* <h3 className="text-lg font-bold mb-2 text-gray-800">Tiffins</h3> */}
        <div className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-5 gap-1 mb-4">
          {renderCards(filteredItems(ordersList), "tiffin")}
        </div>
      </div>

      {/* Modal */}
      {selectedOrderId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-1 rounded-lg shadow-lg max-w-lg w-full relative">
            <button
              className="absolute top-2 right-2 font-bold text-xl leading-none hover:opacity-0"
              onClick={handleCloseModal}
              aria-label="Close"
              text-black
              bg-white
            >
              <IoMdClose />
            </button>

            {ordersList
              .filter((order) => order.id === selectedOrderId)
              .map((order) => (
                <div key={order.id}>
                  <h3 className="text-center font-bold text-lg mb-1">
                    Order Details
                  </h3>
                  <div className="flex items-center mb-1">
                    <img
                      src={order.image}
                      alt={order.restaurant}
                      className="w-20 h-20 object-cover rounded-full mr-4"
                    />
                    <div>
                      <h2 className="text-lg font-semibold">
                        {order.restaurant}
                      </h2>
                      <p className="text-sm text-gray-600">{order.address}</p>
                    </div>
                  </div>
                  <div className="border-t border-b py-1 mb-1">
                    <div className="grid grid-cols-3 text-sm items-center mb-1">
                      <div className="col-span-2 flex justify-between items-center">
                        <div className="flex items-center">
                          <img
                            src="/icons/veg.png"
                            alt="Veg"
                            className="w-4 h-4 ml-0"
                          />
                          <p className="">Coke Pet - 750 Ml</p>
                        </div>
                      </div>
                      <p className="text-right">₹38.00</p>

                      <div className="col-span-2 flex justify-between items-center mt-2">
                        <div className="flex items-center">
                          <img
                            src="/icons/nonveg.png"
                            alt="Non-Veg"
                            className="w-4 h-4 ml-0 mb-2"
                          />
                          <p className="mb-2">Chicken Biryani - 500mg</p>
                        </div>
                      </div>
                      <p className="text-right mb-2">₹149.00</p>

                      <p className="col-span-2">Item Total</p>
                      <p className="text-right">₹187.00</p>

                      <p className="col-span-2 text-green-600">
                        Coupon (TASTY)
                      </p>
                      <p className="text-right text-green-600 font-medium">
                        -₹74.50
                      </p>

                      <p className="col-span-2 mt-1">Taxes & Charges</p>
                      <p className="text-right">₹30.19</p>

                      <p className="col-span-2 text-green-600">
                        Your Total Savings
                      </p>
                      <p className="text-right text-green-600 font-medium">
                        ₹74.50
                      </p>

                      <p className="col-span-2 font-semibold">Grand Total</p>
                      <p className="text-right font-semibold">₹171.68</p>
                    </div>
                    <div>
                      <h4 className="text-gray-700 font-bold mt-4">
                        Order Details
                      </h4>
                      <p>ORDER ID: 4117307093</p>
                      <p>PAYMENT: Paid</p>
                      <p>DATE: 2025-01-15</p>
                      <p>PHONE NUMBER: 411730709XXX</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderManagement;
