import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaFilter } from "react-icons/fa6";
import Tooltip from "../../utils/Tooltip";

const SelectMultiRole = ({
  roles,
  userId = null,
  setToggleAccess,
  setUserCollection = () => {},
  // setFilterRoles = () => {},
}) => {
  let [dropdown, setDropdown] = useState(false);
  let [changedRole, setChangedRole] = useState([...roles]);
  let [isUpdate, setIsUpdate] = useState(false);
  let [isApplied, setIsApplied] = useState(false);

  const options = [
    { label: "Restaurant Owner", value: "restaurantOwner" },
    { label: "Kitchen Owner", value: "kitchenOwner" },
    { label: "Event Creator", value: "eventCreator" },
    { label: "Admin", value: "admin" },
    { label: "Moderator", value: "moderator" },
    { label: "User", value: "user" },
    { label: "Marketing Guy", value: "marketingGuy" },
  ];

  useEffect(() => {
    if (userId === null) {
      const multiRoleFilter = async () => {
        const res = await axios.post(
          import.meta.env.VITE_SERVER_URL + "/user/mutli-role-filter",
          { roles: changedRole },
          {
            headers: {
              "content-type": "application/json",
              token: localStorage.getItem("token"),
            },
          }
        );
        console.log(res.data);

        if (res.data.response === "ok") {
          // alert("Filter applied");
          // console.log(res.data.users);
          setUserCollection(res.data.users);
        }
      };
      multiRoleFilter();
    }
  }, [isApplied]);

  const handleDropdown = () => {
    setDropdown((prev) => !prev);
  };

  const handleRoleChange = (value) => {
    setChangedRole((prev) =>
      prev.includes(value)
        ? prev.filter((el) => el !== value)
        : [...prev, value]
    );
    if (userId !== null) {
      setIsUpdate(true);
    } else {
      setIsApplied((prev) => !prev);
    }
  };

  const updateAccess = async () => {
    const res = await axios.post(
      import.meta.env.VITE_SERVER_URL + "/user/change-control/" + userId,
      { role: changedRole },
      {
        headers: {
          "content-type": "application/json",
          token: localStorage.getItem("token"),
        },
      }
    );

    if (res.data.response === "ok") {
      alert(res.data.message);
      setIsUpdate(false);
      setDropdown(false);
      setToggleAccess((prev) => !prev);
    }
  };

  const clearFilter = () => {
    setChangedRole([]);
    setIsApplied((prev) => !prev);
    setDropdown(false);
  };

  return (
    <>
      {roles && (
        <>
          <div className="relative overflow-visible">
            <div className="flex gap-x-1">
              <div
                className="text-[9px] font-semibold px-2 py-2 bg-gray-100 rounded hover:bg-gray-200"
                onClick={handleDropdown}
              >
                {userId === null ? <FaFilter /> : "Access Control"}
              </div>

              {userId !== null ? (
                <>
                  {isUpdate ? (
                    <button
                      className="text-[9px] font-semibold px-1 py-1 h-auto bg-gray-100 rounded hover:bg-gray-200"
                      onClick={() => updateAccess()}
                    >
                      Save Changes
                    </button>
                  ) : (
                    <div className="rounded-xl text-[9px] font-semibold opacity-75 border p-2 scale-75 text-blue-400 bg-white border-blue-400">
                      Updated
                    </div>
                  )}
                </>
              ) : (
                <button onClick={clearFilter}>Clear</button>
              )}
            </div>

            {dropdown && (
              <div className="absolute bg-white border border-gray-300 shadow-lg rounded p-2 z-50 w-[200px] -left-[110px]">
                {options.map(({ label, value }) => (
                  <div key={value} className="flex items-center gap-2 py-1">
                    <input
                      type="checkbox"
                      id={value}
                      value={value}
                      checked={changedRole.includes(value)}
                      onChange={() => handleRoleChange(value)}
                      className="cursor-pointer"
                    />
                    <label htmlFor={value} className="cursor-pointer">
                      {label}
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default SelectMultiRole;
