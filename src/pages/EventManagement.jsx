import React, { useState } from "react";
import { FaEdit, FaPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const initialEvents = [
  {
    id: 1,
    name: "Food Festival 2024",
    date: "2024-03-15",
    location: "New York City, NY",
    description: "A celebration of culinary delights with top chefs.",
    status: "approved",
  },
  {
    id: 2,
    name: "Wine Tasting Night",
    date: "2024-04-10",
    location: "San Francisco, CA",
    description: "Exclusive wine tasting with renowned sommeliers.",
    status: "pending",
  },
];

const EventManagement = () => {
  const [events, setEvents] = useState(initialEvents);
  const [newEvent, setNewEvent] = useState({
    name: "",
    date: "",
    location: "",
    description: "",
  });
  const [editingEvent, setEditingEvent] = useState(null);
  const [notification, setNotification] = useState("");

  const handleInputChange = (e) => {
    setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
  };

  const handleAddEvent = () => {
    if (newEvent.name && newEvent.date && newEvent.location) {
      if (editingEvent) {
        setEvents(
          events.map((event) =>
            event.id === editingEvent.id
              ? { ...newEvent, id: event.id, status: event.status }
              : event
          )
        );
        setNotification("Event updated successfully!");
      } else {
        setEvents([
          ...events,
          { id: events.length + 1, ...newEvent, status: "pending" },
        ]);
        setNotification("New event added for approval!");
      }
      setNewEvent({ name: "", date: "", location: "", description: "" });
      setEditingEvent(null);
    } else {
      alert("Please fill in all required fields.");
    }
  };

  const handleEditEvent = (id) => {
    const eventToEdit = events.find((event) => event.id === id);
    setNewEvent(eventToEdit);
    setEditingEvent(eventToEdit);
  };

  const handleDeleteEvent = (id) => {
    setEvents(events.filter((event) => event.id !== id));
    setNotification("Event deleted successfully!");
  };

  const handleApproveEvent = (id) => {
    setEvents(
      events.map((event) =>
        event.id === id ? { ...event, status: "approved" } : event
      )
    );
    setNotification("Event approved successfully!");
  };

  const handleRejectEvent = (id) => {
    setEvents(events.filter((event) => event.id !== id));
    setNotification("Event rejected successfully!");
  };

  return (
    <div className="p-2 bg-gray-100 min-h-screen">
      {/* Notification */}
      {notification && (
        <div className="mb-2 p-3 bg-green-100 text-green-800 rounded-md">
          {notification}
        </div>
      )}

      {/* Add/Edit Event Form */}
      <div className="bg-white p-6 rounded-md shadow-md mb-6">
        <h3 className="text-xl font-bold mb-4">
          {editingEvent ? "Edit Event" : "Add New Event"}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Event Name"
            value={newEvent.name}
            onChange={handleInputChange}
            className="border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-gray-400"
          />
          <input
            type="date"
            name="date"
            value={newEvent.date}
            onChange={handleInputChange}
            className="border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-gray-400"
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={newEvent.location}
            onChange={handleInputChange}
            className="border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-gray-400"
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={newEvent.description}
            onChange={handleInputChange}
            className="border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-gray-400"
          />
          <button
            onClick={handleAddEvent}
            className="bg-white text-black border border-gray-400 px-4 py-2 rounded-md flex items-center justify-center shadow-md hover:bg-gray-200"
          >
            <FaPlus className="mr-2" />
            {editingEvent ? "Update Event" : "Add Event"}
          </button>
        </div>
      </div>

      {/* Event List Table */}
      <div className="bg-white p-6 rounded-md shadow-md">
        <h3 className="text-xl font-bold mb-4">Event List</h3>
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-200 text-black">
            <tr>
              <th className="border border-gray-300 p-3">Event Name</th>
              <th className="border border-gray-300 p-3">Date</th>
              <th className="border border-gray-300 p-3">Location</th>
              <th className="border border-gray-300 p-3">Description</th>
              <th className="border border-gray-300 p-3">Status</th>
              <th className="border border-gray-300 p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id} className="text-center">
                <td className="border border-gray-300 p-3">{event.name}</td>
                <td className="border border-gray-300 p-3">{event.date}</td>
                <td className="border border-gray-300 p-3">{event.location}</td>
                <td className="border border-gray-300 p-3">{event.description}</td>
                <td
                  className={`border border-gray-300 p-3 ${
                    event.status === "approved"
                      ? "text-green-600"
                      : "text-yellow-600"
                  }`}
                >
                  {event.status}
                </td>
                <td className="border border-gray-300 p-3 flex justify-center gap-3">
                  {event.status === "pending" && (
                    <>
                      <button
                        onClick={() => handleApproveEvent(event.id)}
                        className="bg-white text-black border border-gray-400 p-2 rounded-md shadow-md hover:bg-gray-200"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleRejectEvent(event.id)}
                        className="bg-white text-black border border-gray-400 p-2 rounded-md shadow-md hover:bg-gray-200"
                      >
                        Reject
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => handleEditEvent(event.id)}
                    className="bg-white text-black p-2 rounded-full shadow-md hover:bg-gray-200"
                  >
                    <FaEdit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteEvent(event.id)}
                    className="bg-white text-black p-2 rounded-full shadow-md hover:bg-gray-200"
                  >
                    <MdDelete className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EventManagement;