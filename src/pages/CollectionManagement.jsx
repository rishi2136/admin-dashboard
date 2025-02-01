import React, { useState } from "react";

const CollectionManagement = () => {
  // Sample collection data
  const [collections, setCollections] = useState([
    { id: 1, name: "Summer Collection", description: "Latest summer arrivals" },
    { id: 2, name: "Winter Collection", description: "Exclusive winter wear" },
    { id: 3, name: "Spring Collection", description: "Fresh spring styles" },
    { id: 4, name: "Autumn Collection", description: "Cozy autumn fashion" },
  ]);

  const [newCollection, setNewCollection] = useState({ name: "", description: "" });
  const [editMode, setEditMode] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCollection({ ...newCollection, [name]: value });
  };

  // Add new collection
  const handleAddCollection = () => {
    if (!newCollection.name.trim() || !newCollection.description.trim()) {
      alert("Please fill in all fields.");
      return;
    }
    setCollections([
      ...collections,
      { id: collections.length + 1, ...newCollection },
    ]);
    setNewCollection({ name: "", description: "" });
  };

  // Edit collection
  const handleEditCollection = (id) => {
    const collectionToEdit = collections.find((col) => col.id === id);
    setNewCollection(collectionToEdit);
    setEditMode(id);
  };

  // Update collection
  const handleUpdateCollection = () => {
    setCollections(
      collections.map((col) =>
        col.id === editMode ? { ...col, ...newCollection } : col
      )
    );
    setNewCollection({ name: "", description: "" });
    setEditMode(null);
  };

  // Delete collection
  const handleDeleteCollection = (id) => {
    if (window.confirm("Are you sure you want to delete this collection?")) {
      setCollections(collections.filter((col) => col.id !== id));
    }
  };

  // Search filtering
  const filteredCollections = collections.filter((col) =>
    col.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCollections = filteredCollections.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="min-h-screen bg-gray-100 p-2">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-2">


        {/* Search and Form Section */}
        <div className="grid md:grid-cols-2 gap-6 mb-8 border-b pb-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">
              {editMode ? "Edit Collection" : "Add New Collection"}
            </h2>
            <input
              type="text"
              name="name"
              value={newCollection.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md mb-4 focus:ring-2 focus:ring-blue-500"
              placeholder="Collection Name"
            />
            <input
              type="text"
              name="description"
              value={newCollection.description}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md mb-4 focus:ring-2 focus:ring-blue-500"
              placeholder="Collection Description"
            />
            <button
              onClick={editMode ? handleUpdateCollection : handleAddCollection}
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-all"
            >
              {editMode ? "Update Collection" : "Add Collection"}
            </button>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Search Collections</h2>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500"
              placeholder="Search by name..."
            />
          </div>
        </div>

        {/* Collection List */}
        <h2 className="text-xl font-semibold mb-4">Existing Collections</h2>

        {filteredCollections.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {currentCollections.map((collection) => (
              <div
                key={collection.id}
                className="p-5 bg-gray-50 border rounded-lg hover:shadow-md transition-all cursor-pointer"
              >
                <h3 className="text-lg font-bold text-gray-800">{collection.name}</h3>
                <p className="text-gray-600">{collection.description}</p>
                <div className="flex mt-4 space-x-2">
                  <button
                    onClick={() => handleEditCollection(collection.id)}
                    className="bg-yellow-500 text-white px-4 py-1 rounded-md hover:bg-yellow-600 transition-all"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteCollection(collection.id)}
                    className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600 transition-all"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center">No collections found. Add a new one above.</p>
        )}

        {/* Pagination Controls */}
        {filteredCollections.length > itemsPerPage && (
          <div className="mt-6 flex justify-center items-center space-x-4">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className={`px-4 py-2 border rounded-md ${
                currentPage === 1 ? "bg-gray-300" : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              Previous
            </button>
            <span className="text-gray-700">Page {currentPage}</span>
            <button
              disabled={indexOfLastItem >= filteredCollections.length}
              onClick={() => setCurrentPage(currentPage + 1)}
              className={`px-4 py-2 border rounded-md ${
                indexOfLastItem >= filteredCollections.length
                  ? "bg-gray-300"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CollectionManagement;
