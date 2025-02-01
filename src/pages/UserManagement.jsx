import React, { useState } from "react";

const UserManagement = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "A", email: "a@er.vb", contact: "1470258" },
    { id: 2, name: "Kkkk", email: "kkkkk@gmail.com", contact: "7896544564" },
    { id: 3, name: "Xyz Xyz", email: "xyz@gmail.com", contact: "3571594568" },
    { id: 4, name: "Rahul Dive", email: "rahul@gmail.com", contact: "2581171473" },
    { id: 5, name: "Viral Kacha", email: "viralkacha7.77@gmail.com", contact: "3698521479" },
    { id: 6, name: "K", email: "k@sk.com", contact: "7539514862" },
  ]);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({ id: null, name: "", email: "", contact: "" });

  const handleSearch = (e) => setSearch(e.target.value);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase()) ||
    user.contact.includes(search)
  );

  const handleAddEditUser = () => {
    if (currentUser.id) {
      setUsers((prev) =>
        prev.map((user) => (user.id === currentUser.id ? currentUser : user))
      );
    } else {
      setUsers((prev) => [
        ...prev,
        { ...currentUser, id: prev.length ? prev[prev.length - 1].id + 1 : 1 },
      ]);
    }
    setIsModalOpen(false);
    setCurrentUser({ id: null, name: "", email: "", contact: "" });
  };

  const handleEdit = (user) => {
    setCurrentUser(user);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
  };

  return (
    <div className="container mx-auto p-1">
      <h1 className="text-2xl font-bold mb-1 text-center">User List</h1>
      <div className="flex justify-between items-center mb-1">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white px-2 py-2 rounded shadow hover:bg-blue-600"
        >
          Add User
        </button>
        <input
          type="text"
          placeholder="Search users"
          value={search}
          onChange={handleSearch}
          className="border border-gray-300 rounded px-4 py-2"
        />
      </div>

      <table className="min-w-full bg-white border border-gray-200 shadow">
        <thead className="bg-gray-100 border-b">
          <tr>
            <th className="px-4 py-2 text-left">No</th>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2 text-left">Contact</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user, index) => (
              <tr
                key={user.id}
                className={`border-b ${index % 2 === 0 ? "bg-gray-50" : ""}`}
              >
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.contact}</td>
                <td className="px-4 py-2 flex gap-2">
                  <button
                    onClick={() => handleEdit(user)}
                    className="bg-blue-500 text-white px-2 py-1 rounded shadow hover:bg-blue-600"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded shadow hover:bg-red-600"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center py-2 text-gray-500">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-2 rounded shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-2">
              {currentUser.id ? "Edit User" : "Add User"}
            </h2>
            <input
              type="text"
              placeholder="Name"
              value={currentUser.name}
              onChange={(e) =>
                setCurrentUser((prev) => ({ ...prev, name: e.target.value }))
              }
              className="border border-gray-300 rounded px-2 py-2 mb-2 w-full"
            />
            <input
              type="email"
              placeholder="Email"
              value={currentUser.email}
              onChange={(e) =>
                setCurrentUser((prev) => ({ ...prev, email: e.target.value }))
              }
              className="border border-gray-300 rounded px-2 py-2 mb-2 w-full"
            />
            <input
              type="text"
              placeholder="Contact"
              value={currentUser.contact}
              onChange={(e) =>
                setCurrentUser((prev) => ({ ...prev, contact: e.target.value }))
              }
              className="border border-gray-300 rounded px-2 py-2 mb-2 w-full"
            />
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-300 text-black px-2 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleAddEditUser}
                className="bg-blue-500 text-white px-2 py-2 rounded hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
