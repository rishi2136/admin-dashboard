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
  );
};

export default Notifications;
