import React, { useEffect, useState } from "react";
import axios from "axios";
import SelectMultiRole from "../components/UserAccessControl/SelectMultiRole";
import Signup from "./Signup";
import { MdSort } from "react-icons/md";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { FaFilter } from "react-icons/fa6";
import Tooltip from "../utils/Tooltip";
import { FaCaretDown } from "react-icons/fa6";

// const users = [
//   {
//     id: 1,
//     name: "Michael Scott",
//     email: "michael.scott@example.com",
//     role: "Restaurant Owner",
//     lastLogin: "2025-01-12",
//     status: "Active",
//   },
//   // {
//   //   id: 2,
//   //   name: "Pam Beesly",
//   //   email: "pam.beesly@example.com",
//   //   role: "Customer",
//   //   lastLogin: "2025-01-10",
//   //   status: "Inactive",
//   // },
//   // {
//   //   id: 3,
//   //   name: "Jim Halpert",
//   //   email: "jim.halpert@example.com",
//   //   role: "Event Creator",
//   //   lastLogin: "2025-01-08",
//   //   status: "Active",
//   // },
//   // {
//   //   id: 4,
//   //   name: "Angela Martin",
//   //   email: "angela.martin@example.com",
//   //   role: "Moderator",
//   //   lastLogin: "2025-01-11",
//   //   status: "Pending",
//   // },
//   // {
//   //   id: 5,
//   //   name: "Dwight Schrute",
//   //   email: "dwight.schrute@example.com",
//   //   role: "Customer",
//   //   lastLogin: "2025-01-09",
//   //   status: "Banned",
//   // },
// ];

// const users = [
//   {
//     _id: 1,
//     username: "john_doe",
//     email: "john.doe@example.com",
//     isBanned: false,
//     firms: [
//       {
//         id: "firm_001",
//         name: "Doe Enterprises",
//         address: "123 Business Street, NY",
//         registered_at: "2024-01-10",
//       },
//     ],
//     kitchen: [
//       {
//         id: "kitchen_001",
//         name: "John’s Kitchen",
//         location: "456 Food Avenue, CA",
//         established_at: "2023-05-15",
//       },
//     ],
//     events: [
//       {
//         id: "event_001",
//         title: "Food Expo 2025",
//         date: "2025-06-20",
//         location: "LA Convention Center",
//       },
//     ],
//     lastLogin: "2025-02-16T10:30:00Z",
//     role: ["user", "eventCreator"],
//     created_at: "2024-01-01T08:00:00Z",
//     updated_at: "2025-02-15T12:45:00Z",
//   },
//   {
//     _id: 2,
//     username: "emma_smith",
//     email: "emma.smith@example.com",
//     isBanned: false,
//     firms: [
//       {
//         id: "firm_002",
//         name: "Smith Consulting",
//         address: "789 Market Street, TX",
//         registered_at: "2022-11-05",
//       },
//     ],
//     kitchen: [],
//     events: [
//       {
//         id: "event_002",
//         title: "Tech Networking Event",
//         date: "2025-08-10",
//         location: "Austin Tech Hub",
//       },
//     ],
//     lastLogin: "2025-02-14T09:20:00Z",
//     role: ["admin"],
//     created_at: "2023-06-12T14:10:00Z",
//     updated_at: "2025-01-29T18:00:00Z",
//   },
//   {
//     _id: 3,
//     username: "michael_jordan",
//     email: "mjordan@example.com",
//     isBanned: true,
//     firms: [],
//     kitchen: [
//       {
//         id: "kitchen_002",
//         name: "MJ’s BBQ House",
//         location: "Chicago, IL",
//         established_at: "2020-09-20",
//       },
//     ],
//     events: [],
//     lastLogin: "2024-12-30T17:45:00Z",
//     role: ["kitchenOwner"],
//     created_at: "2021-04-22T12:30:00Z",
//     updated_at: "2025-02-10T11:15:00Z",
//   },
//   {
//     _id: 4,
//     username: "sophia_lee",
//     email: "sophia.lee@example.com",
//     isBanned: false,
//     firms: [
//       {
//         id: "firm_003",
//         name: "Lee Innovations",
//         address: "456 Innovation Drive, SF",
//         registered_at: "2023-02-18",
//       },
//     ],
//     kitchen: [],
//     events: [],
//     lastLogin: "2025-01-10T16:00:00Z",
//     role: ["moderator", "eventCreator"],
//     created_at: "2023-05-01T09:40:00Z",
//     updated_at: "2025-02-05T14:55:00Z",
//   },
//   {
//     _id: 5,
//     username: "david_williams",
//     email: "david.williams@example.com",
//     isBanned: false,
//     firms: [],
//     kitchen: [],
//     events: [
//       {
//         id: "event_003",
//         title: "Startup Pitch Night",
//         date: "2025-09-15",
//         location: "NYC Startup Hub",
//       },
//     ],
//     lastLogin: "2025-02-12T08:10:00Z",
//     role: ["user"],
//     created_at: "2023-08-30T13:00:00Z",
//     updated_at: "2025-02-11T19:20:00Z",
//   },
// ];

const UserAccessControl = () => {
  const [filter, setFilter] = useState("All"); // Filter state: "All" by default
  const [expandedRows, setExpandedRows] = useState(-1); // To track expanded rows
  // const [isEdit, setIsEdit] = useState(-1);
  const [toggleAccess, setToggleAccess] = useState(false);

  const [isBanned, setIsBanned] = useState(-1);
  const [userCollection, setUserCollection] = useState(null);
  const [addUser, setAddUser] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [userlist, setUserList] = useState([]);
  const [filterRoles, setFilterRoles] = useState([]);
  const [selectMany, setSelectMany] = useState(false);
  const [multiAccessControl, setMultiAccessControl] = useState([]);

  useEffect(() => {
    const getUser = async () => {
      const res = await axios.get(
        import.meta.env.VITE_SERVER_URL + "/user/all-user",
        {
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("token"),
          },
        }
      );
      if (res.data.response === "ok") {
        setUserCollection(res.data.users);
      }
    };
    getUser();
  }, [toggleAccess]);

  // Filter users based on selected role
  // const filteredUsers =
  //   filter === "All" ? users : users.filter((user) => user.role === filter);

  const userFilter = async (word) => {
    const res = await axios.get(
      import.meta.env.VITE_SERVER_URL + "/user/filter",
      {
        params: { word },
        headers: {
          "content-type": "application/json",
          token: localStorage.getItem("token"),
        },
      }
    );

    if (res.data.response === "ok") {
      setUserCollection(res.data.users);
    }
  };

  const userSort = async (word) => {
    const res = await axios.get(
      import.meta.env.VITE_SERVER_URL + "/user/sort",
      {
        params: { word },
        headers: {
          "content-type": "application/json",
          token: localStorage.getItem("token"),
        },
      }
    );

    if (res.data.response === "ok") {
      setUserCollection(res.data.users);
    }
  };

  const accessOptions = [
    { label: "Admin", value: "admin" },
    { label: "Moderator", value: "moderator" },
    { label: "Marketing Guy", value: "marketingGuy" },
  ];

  // const handleEdit = (id) => {
  //   setIsEdit((prev_id) => (prev_id === id ? -1 : id));
  //   setExpandedRows(id);
  // };

  // const toggleRow = (id) => {
  //   setExpandedRows(id);
  //   setIsEdit(-1);
  // };

  // const handleSubmit = (evt) => {
  //   evt.preventDefault();
  // };

  // const addNewUser = () => {
  //   setAddUser(true);
  //   //make a request to the backend to new user
  // };

  // const handleUserInfo = (evt) => {
  //   const { name, value } = evt.target;
  //   setUserInfo((prev) => ({ ...prev, [name]: value }));
  // };

  const options = [
    { label: "All", value: "user" },
    { label: "Restaurant Owner", value: "restaurantOwner" },
    { label: "Kitchen Owner", value: "kitchenOwner" },
    { label: "Event Creator", value: "eventCreator" },
    { label: "Admin", value: "admin" },
    { label: "Moderator", value: "moderator" },
    { label: "Marketing Guy", value: "marketingGuy" },
  ];

  const sortOption = [
    { label: "Last login", value: "lastLogin" },
    { label: "Newest User", value: "newest" },
    { label: "Oldest User", value: "oldest" },
    { label: "Alphabetical", value: "alphabet" },
    { label: "Clear", value: "clear" },
  ];

  const handleCloseClick = () => {
    setAddUser(false);
  };

  const toggleUserBan = async (userId) => {
    // console.log(userId);
    const res = await axios.put(
      import.meta.env.VITE_SERVER_URL + `/user/ban-user/${userId}`,
      {},
      {
        headers: {
          "content-type": "application/json",
          token: localStorage.getItem("token"),
        },
      }
    );
    console.log(res.data);
    if (res.data.response === "ok") {
      alert(res.data.message);
      setToggleAccess((prev) => !prev);
    }
  };

  const handleUserSearch = async (e) => {
    // setSearchTerm(e.target.value);

    try {
      const res = await axios.get(
        import.meta.env.VITE_SERVER_URL + `/user/search?q=` + e.target.value,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      // setUsers(response.data);
      setUserCollection(res.data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const deleteUser = async (userId) => {
    const res = await axios.delete(
      import.meta.env.VITE_SERVER_URL + `/user/delete-user/${userId}`,
      {
        headers: {
          "content-type": "application/json",
          token: localStorage.getItem("token"),
        },
      }
    );

    if (res.data.response === "ok") {
      alert(res.data.message);
      setToggleAccess((prev) => !prev);
    }
  };

  // const deleteMany = async () => {
  //   try {
  //     const res = await axios.put(
  //       import.meta.env.VITE_SERVER_URL + `/user/banned-many`,
  //       { data: userlist },
  //       {
  //         headers: {
  //           token: localStorage.getItem("token"),
  //         },
  //       }
  //     );
  //     if (res.data.response === "ok") {
  //       alert(res.data.message);
  //       setToggleAccess((prev) => !prev);
  //       setUserList([]);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching users:", error);
  //   }
  // };

  const bannedMany = async (method, mode = "ban") => {
    try {
      const res = await axios[method](
        method === "put"
          ? import.meta.env.VITE_SERVER_URL + `/user/banned-many/?mode=${mode}`
          : import.meta.env.VITE_SERVER_URL + `/user/delete-many`,
        { data: userlist },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      if (res.data.response === "ok") {
        alert(res.data.message);
        setToggleAccess((prev) => !prev);
        setUserList([]);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const pushInUserList = (id) => {
    setUserList((prev) =>
      prev.includes(id) ? prev.filter((el) => el !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    const selectAllAction = () => {
      if (selectMany === true) {
        let userIds = [];
        userCollection.forEach((el) => {
          userIds.push(el._id);
        });
        setUserList(userIds);
      } else {
        setUserList([]);
      }
    };
    selectAllAction();
  }, [selectMany]);

  // const selectRoleFilter = (value) => {
  //   setFilterRoles((prev) =>
  //     prev.includes(value)
  //       ? prev.filter((el) => el !== value)
  //       : [...prev, value]
  //   );
  // };

  // console.log(userlist);

  const multiAccess = async (role) => {
    try {
      const res = await axios.put(
        import.meta.env.VITE_SERVER_URL + `/user/access-many`,
        { arrayIds: userlist, newRole: role },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      if (res.data.response === "ok") {
        alert(res.data.message);
        setToggleAccess((prev) => !prev);
        setUserList([]);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  return (
    <>
      {addUser && (
        <div className="w-full h-screen bg-[rgb(0,0,0,.3)]  fixed z-50">
          <div className="bg-white w-auto h-auto absolute top-40 left-[30%] ">
            <Signup handleCloseClick={handleCloseClick} />
          </div>
        </div>
      )}
      <div className="p-4 bg-gray-100 min-h-screen">
        <div className="flex justify-between mb-1">
          <div className="flex ">
            <input
              type="text"
              className="w-[230px] px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition me-2"
              id="search"
              placeholder="Search email or username"
              onChange={handleUserSearch}
            />
            <Tooltip text="user filter" position="bottom">
              <SelectMultiRole
                roles={[]}
                setToggleAccess={setToggleAccess}
                setUserCollection={setUserCollection}
              />
            </Tooltip>

            {/* Filter Badges */}
            {/* <div className="flex flex-wrap text-sm space-x-1">
              {options.map(({ label, value }) => (
                <button
                  key={value}
                  onClick={() => userFilter(value)}
                  className={`px-2 py-1 rounded-full text-[11px] ${
                    filter === value
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div> */}
          </div>

          <div className="flex">
            {userlist.length > 0 && (
              <>
                <button
                  className="border bg-red-100 text-red-800 rounded-xl px-3 py-1"
                  onClick={() => bannedMany("delete")}
                >
                  Delete Many
                </button>
                <button
                  className="border bg-blue-100 text-blue-800 rounded-xl px-3 py-1"
                  onClick={() => bannedMany("put", "ban")}
                >
                  Ban Many
                </button>
                <button
                  className="border bg-blue-100 text-blue-800 rounded-xl px-3 py-1"
                  onClick={() => bannedMany("put", "allow")}
                >
                  Allow Many
                </button>
              </>
            )}

            <Menu>
              <MenuButton className="border bg-yellow-100 text-yellow-800 rounded-xl px-3 py-1 flex items-center">
                Multi Access Control <FaCaretDown />
              </MenuButton>
              <MenuItems
                anchor="bottom"
                className="bg-white w-[160px] rounded flex flex-col border-2 "
              >
                {accessOptions.map(({ label, value }) => (
                  <MenuItem key={value} className="m-0">
                    <button
                      className={`hover:bg-gray-100 text-start py-1 my-0  ps-2 `}
                      onClick={() => multiAccess(value)}
                    >
                      {label}
                    </button>
                  </MenuItem>
                ))}
              </MenuItems>
            </Menu>

            <button
              className="border bg-green-100 text-green-800 rounded-xl px-3 py-1"
              onClick={() => setAddUser(true)}
            >
              Add User
            </button>
            <Tooltip text="Sorting" position="bottom">
              <Menu>
                <MenuButton className="bg-gray-300 rounded flex items-center px-1 mx-1 h-[30px]">
                  <span className="">
                    <MdSort className="" />
                  </span>
                </MenuButton>
                <MenuItems
                  anchor="bottom"
                  className="bg-white w-[120px] rounded flex flex-col border-2 "
                >
                  {sortOption.map(({ label, value }) => (
                    <MenuItem key={value} className="m-0">
                      <button
                        className={`${
                          value === "clear"
                            ? "text-white bg-black p-1 text-center"
                            : "hover:bg-gray-100 text-start"
                        } py-1 my-0  ps-2 `}
                        onClick={() => userSort(value)}
                      >
                        {label}
                      </button>
                    </MenuItem>
                  ))}
                </MenuItems>
              </Menu>
            </Tooltip>
          </div>
        </div>

        {/* Table */}
        <div
          className="overflow-x-auto bg-white rounded-lg shadow relative w-full flex "
          style={{ overflow: "visible" }}
        >
          <table className="w-full text-left border-collapse ">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4  ">
                  <input
                    type="checkbox"
                    onChange={() => setSelectMany((prev) => !prev)}
                    // value={selectMany}
                    checked={selectMany}
                  />
                </th>
                <th className="p-1 border-e  text-gray-600">User ID</th>
                <th className="p-1 border-e  text-gray-600 ">
                  Name{" "}
                  {/* <input
                    type="text"
                    className="rounded-none w-[100px]"
                    placeholder="named search"
                  /> */}
                </th>
                <th className="p-1 border-e  text-gray-600  ">
                  Email{" "}
                  {/* <input
                    type="text"
                    className="rounded-none w-[inherit]"
                    placeholder="email search"
                  /> */}
                </th>
                <th className="p-1 border-e  text-gray-600">Role</th>
                <th className="p-1 border-e  text-gray-600">Last Login</th>
                <th className="p-1 border-e  text-gray-600">Join Us</th>
                <th className="p-1  text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {userCollection?.map((user, idx) => (
                <tr
                  className=" border-b last:border-none cursor-pointer "
                  key={idx}
                >
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={userlist.includes(user._id)}
                      // value={userlist.includes(user._id)}
                      onChange={() => pushInUserList(user._id)}
                    />
                  </td>
                  <td className="p-1 text-[9px] border-e font-semibold">
                    {user._id}
                  </td>
                  <td className="p-1 border-e ">{user.username}</td>
                  <td className="p-1 w-[50px] border-e ">{user.email}</td>
                  <td className="p-1 flex flex-col border-e ">
                    {user.role.map((el, idx) => (
                      <span
                        key={idx}
                        className={`m-1 px-2 py-1 text-[9px] rounded ${
                          el === "eventCreator"
                            ? "bg-blue-100 text-blue-800"
                            : el === "user"
                            ? "bg-green-100 text-green-800"
                            : el === "restaurantOwner"
                            ? "bg-yellow-100 text-yellow-800"
                            : el === "moderator"
                            ? "bg-red-100 text-red-800"
                            : el === "kitchenOwner"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-purple-100 text-purple-800"
                        }`}
                      >
                        {el}
                      </span>
                    ))}
                  </td>
                  <td className="p-1 border-e">
                    {Math.floor(
                      (new Date() - new Date(user.lastLogin)) /
                        (1000 * 60 * 60 * 24)
                    ) === 0
                      ? "today"
                      : `${Math.floor(
                          (new Date() - new Date(user.lastLogin)) /
                            (1000 * 60 * 60 * 24)
                        )} days ago`}{" "}
                  </td>
                  <td className="p-1 border-e">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>

                  <td className="p-2 ">
                    <div className="flex overflow-visible box-border  gap-1">
                      {/* <button
                        className="text-[9px] font-semibold px-1 py-1 h-auto bg-gray-100 rounded hover:bg-gray-200"
                        onClick={() => handleEdit(user._id)}
                      >
                        Edit
                      </button> */}
                      <button
                        className="text-[9px] font-semibold px-1 py-1 h-auto bg-gray-100 rounded hover:bg-gray-200"
                        onClick={() => deleteUser(user._id)}
                      >
                        Delete
                      </button>

                      {user.isBanned ? (
                        <button
                          className="text-[9px] font-semibold px-1 py-1 h-auto bg-gray-100 rounded hover:bg-gray-200"
                          onClick={() => toggleUserBan(user._id)}
                        >
                          Allow
                        </button>
                      ) : (
                        <button
                          className="text-[9px] font-semibold px-1 py-1 h-auto bg-gray-100 rounded hover:bg-gray-200"
                          onClick={() => toggleUserBan(user._id)}
                        >
                          Ban
                        </button>
                      )}
                      <SelectMultiRole
                        userId={user._id}
                        roles={user.role}
                        setToggleAccess={setToggleAccess}
                      />

                      {/* <button
                        className="text-sm px-2 py-1 bg-gray-100 rounded hover:bg-gray-200"
                        onClick={() => toggleRow(user.id)}
                      >
                        View
                      </button> */}
                    </div>
                  </td>
                </tr>
              ))}
              {/* <tr className=" border-b last:border-none cursor-pointer  ">
              <td colSpan={8}>
                <div>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Facere consequatur ipsum iure numquam repellat ratione nulla,
                  reprehenderit eligendi illum ut sequi dolor error eveniet
                  deserunt eos aliquam, incidunt minima voluptatum.
                </div>

                <input
                  type="text"
                  name="username"
                  value={userInfo.username}
                  onChange={handleUserInfo}
                />
              </td>
            
            </tr> */}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default UserAccessControl;
