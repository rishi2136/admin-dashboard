import React, { useState } from "react";

const ManageAdmin = () => {
  const [admins, setAdmins] = useState([
    { id: 1, name: "Tim Cook", mobile: "2016778844", userType: "Restaurant Admin", status: "Active" },
    { id: 2, name: "James Dean", mobile: "2013345677", userType: "Restaurant Admin", status: "Active" },
    { id: 3, name: "Martin King", mobile: "5885887251", userType: "Restaurant Admin", status: "Active" },
    { id: 4, name: "Nathan Brown", mobile: "4416414588", userType: "Restaurant Admin", status: "Active" },
    { id: 5, name: "Sean Cahill", mobile: "2245216868", userType: "Restaurant Admin", status: "Active" },
  ]);

  const [newAdmin, setNewAdmin] = useState({ name: "", mobile: "", userType: "Restaurant Admin", status: "Active" });
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [editAdmin, setEditAdmin] = useState(null);

  const addAdmin = () => {
    if (!newAdmin.name || !newAdmin.mobile) {
      alert("Please fill out all fields.");
      return;
    }
    setAdmins([...admins, { ...newAdmin, id: admins.length + 1 }]);
    setNewAdmin({ name: "", mobile: "", userType: "Restaurant Admin", status: "Active" });
  };

  const updateAdmin = () => {
    setAdmins(admins.map((admin) => (admin.id === editAdmin.id ? editAdmin : admin)));
    setEditAdmin(null);
  };

  const deleteAdmin = (id) => {
    setAdmins(admins.filter((admin) => admin.id !== id));
  };

  const filteredAdmins = admins.filter(
    (admin) =>
      admin.name.toLowerCase().includes(search.toLowerCase()) &&
      (filter === "All" || admin.status === filter)
  );

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h2 style={{ margin: 0, fontSize: "1.5rem" }}>Admin List</h2>
        <button
          onClick={addAdmin}
          style={{
            backgroundColor: "#000",
            color: "#fff",
            padding: "10px 20px",
            border: "none",
            cursor: "pointer",
            borderRadius: "5px",
          }}
        >
          + Add
        </button>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "10px",
            marginRight: "10px",
            border: "1px solid #ddd",
            borderRadius: "5px",
            width: "200px",
          }}
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{ padding: "10px", border: "1px solid #ddd", borderRadius: "5px" }}
        >
          <option value="All">All</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ddd", padding: "10px", backgroundColor: "#000", color: "#fff" }}>Sr. No.</th>
            <th style={{ border: "1px solid #ddd", padding: "10px", backgroundColor: "#000", color: "#fff" }}>Name</th>
            <th style={{ border: "1px solid #ddd", padding: "10px", backgroundColor: "#000", color: "#fff" }}>Mobile</th>
            <th style={{ border: "1px solid #ddd", padding: "10px", backgroundColor: "#000", color: "#fff" }}>User Type</th>
            <th style={{ border: "1px solid #ddd", padding: "10px", backgroundColor: "#000", color: "#fff" }}>Status</th>
            <th style={{ border: "1px solid #ddd", padding: "10px", backgroundColor: "#000", color: "#fff" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredAdmins.map((admin, index) => (
            <tr key={admin.id} style={{ backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#fff" }}>
              <td style={{ border: "1px solid #ddd", padding: "10px" }}>{index + 1}</td>
              <td style={{ border: "1px solid #ddd", padding: "10px" }}>{admin.name}</td>
              <td style={{ border: "1px solid #ddd", padding: "10px" }}>{admin.mobile}</td>
              <td style={{ border: "1px solid #ddd", padding: "10px" }}>{admin.userType}</td>
              <td style={{ border: "1px solid #ddd", padding: "10px" }}>{admin.status}</td>
              <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                <button
                  onClick={() => setEditAdmin(admin)}
                  style={{
                    backgroundColor: "white",
                    color: "black",
                    border: "1px solid black",
                    padding: "5px 10px",
                    marginRight: "5px",
                    borderRadius: "3px",
                  }}
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => deleteAdmin(admin.id)}
                  style={{
                    backgroundColor: "white",
                    color: "black",
                    border: "1px solid black",
                    padding: "5px 10px",
                    borderRadius: "3px",
                  }}
                >
                  🗑️ Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editAdmin && (
        <div style={{ marginTop: "20px" }}>
          <h3>Edit Admin</h3>
          <input
            type="text"
            value={editAdmin.name}
            onChange={(e) => setEditAdmin({ ...editAdmin, name: e.target.value })}
            placeholder="Name"
            style={{ padding: "10px", marginRight: "10px", border: "1px solid #ddd", borderRadius: "5px" }}
          />
          <input
            type="text"
            value={editAdmin.mobile}
            onChange={(e) => setEditAdmin({ ...editAdmin, mobile: e.target.value })}
            placeholder="Mobile"
            style={{ padding: "10px", marginRight: "10px", border: "1px solid #ddd", borderRadius: "5px" }}
          />
          <select
            value={editAdmin.userType}
            onChange={(e) => setEditAdmin({ ...editAdmin, userType: e.target.value })}
            style={{
              padding: "10px",
              marginRight: "10px",
              border: "1px solid #ddd",
              borderRadius: "5px",
            }}
          >
            <option value="Restaurant Admin">Restaurant Admin</option>
            <option value="Moderator">Moderator</option>
            <option value="Marketing">Marketing</option>
            <option value="Event">Event</option>
          </select>
          <button
            onClick={updateAdmin}
            style={{
              backgroundColor: "#000",
              color: "#fff",
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Save
          </button>
        </div>
      )}

      <div style={{ marginTop: "20px" }}>
        <h3>Add New Admin</h3>
        <input
          type="text"
          value={newAdmin.name}
          onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
          placeholder="Name"
          style={{ padding: "10px", marginRight: "10px", border: "1px solid #ddd", borderRadius: "5px" }}
        />
        <input
          type="text"
          value={newAdmin.mobile}
          onChange={(e) => setNewAdmin({ ...newAdmin, mobile: e.target.value })}
          placeholder="Mobile"
          style={{ padding: "10px", marginRight: "10px", border: "1px solid #ddd", borderRadius: "5px" }}
        />
        <select
          value={newAdmin.userType}
          onChange={(e) => setNewAdmin({ ...newAdmin, userType: e.target.value })}
          style={{ padding: "10px", marginRight: "10px", border: "1px solid #ddd", borderRadius: "5px" }}
        >
          <option value="Restaurant Admin">Restaurant Admin</option>
          <option value="Moderator">Moderator</option>
          <option value="Marketing">Marketing</option>
          <option value="Event">Event</option>
        </select>
        <button
          onClick={addAdmin}
          style={{
            backgroundColor: "#000",
            color: "#fff",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Add Admin
        </button>
      </div>
    </div>
  );
};

export default ManageAdmin;
