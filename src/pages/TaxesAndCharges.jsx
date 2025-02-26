import { useState } from "react";
import { FaEdit, FaPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const initialTaxes = [
  {
    id: 1,
    country: "Canada",
    type: "GST",
    rate: "5%",
    description: "Applied across all provinces on restaurant meals",
    status: "approved",
  },
  {
    id: 2,
    country: "Canada",
    type: "HST",
    rate: "13-15%",
    description: "Combines GST and PST; varies by province",
    status: "approved",
  },
  {
    id: 3,
    country: "Mexico",
    type: "VAT",
    rate: "16%",
    description: "Standard nationwide for dine-in, takeout, and delivery",
    status: "approved",
  },
  {
    id: 4,
    country: "United States",
    type: "State Sales Tax",
    rate: "2.9%-7.25%",
    description: "Varies by state; applies to prepared foods",
    status: "approved",
  },
];

const TaxesAndCharges = () => {
  const [taxes, setTaxes] = useState(initialTaxes);
  const [newTax, setNewTax] = useState({
    country: "",
    type: "",
    rate: "",
    description: "",
  });
  const [role, setRole] = useState("admin");
  const [notification, setNotification] = useState("");

  const handleInputChange = (e) => {
    setNewTax({ ...newTax, [e.target.name]: e.target.value });
  };

  const handleAddTax = () => {
    if (newTax.country && newTax.type && newTax.rate) {
      setTaxes([
        ...taxes,
        { id: taxes.length + 1, ...newTax, status: "approved" },
      ]);
      setNewTax({ country: "", type: "", rate: "", description: "" });
      setNotification("New tax added successfully!");
    } else {
      alert("Please fill in all fields.");
    }
  };

  const handleDeleteTax = (id) => {
    const updatedTaxes = taxes.filter((tax) => tax.id !== id);
    setTaxes(updatedTaxes);
    setNotification("Tax deleted successfully!");
  };

  const handleEditTax = (id) => {
    const taxToEdit = taxes.find((tax) => tax.id === id);
    setNewTax(taxToEdit);
    setTaxes(taxes.filter((tax) => tax.id !== id));
  };

  const handleSubmitProposal = () => {
    if (
      role === "restaurant-owner" &&
      newTax.country &&
      newTax.type &&
      newTax.rate
    ) {
      setTaxes([
        ...taxes,
        { id: taxes.length + 1, ...newTax, status: "pending" },
      ]);
      setNewTax({ country: "", type: "", rate: "", description: "" });
      setNotification("Tax proposal submitted for approval.");
    } else {
      alert("Only restaurant owners can submit proposals.");
    }
  };

  const handleApproveProposal = (id) => {
    const updatedTaxes = taxes.map((tax) =>
      tax.id === id ? { ...tax, status: "approved" } : tax
    );
    setTaxes(updatedTaxes);
    setNotification("Tax proposal approved.");
  };

  const handleRejectProposal = (id) => {
    const updatedTaxes = taxes.filter((tax) => tax.id !== id);
    setTaxes(updatedTaxes);
    setNotification("Tax proposal rejected.");
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      {/* Notification */}
      {notification && (
        <div className="mb-2 text-green-600">{notification}</div>
      )}

      {/* Add/Propose Tax Form */}
      <div className="bg-white p-4 rounded-md shadow-md mb-4">
        <h3 className="text-lg font-semibold mb-2">
          {role === "admin" ? "Add New Tax" : "Propose Tax Change"}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={newTax.country}
            onChange={handleInputChange}
            className="border p-2 rounded-md"
          />
          <input
            type="text"
            name="type"
            placeholder="Tax Type"
            value={newTax.type}
            onChange={handleInputChange}
            className="border p-2 rounded-md"
          />
          <input
            type="text"
            name="rate"
            placeholder="Rate"
            value={newTax.rate}
            onChange={handleInputChange}
            className="border p-2 rounded-md"
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={newTax.description}
            onChange={handleInputChange}
            className="border p-2 rounded-md"
          />
          <button
            onClick={role === "admin" ? handleAddTax : handleSubmitProposal}
            className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center justify-center"
          >
            <FaPlus className="mr-2" />
            {role === "admin" ? "Add Tax" : "Submit Proposal"}
          </button>
        </div>
      </div>

      {/* Tax List Table */}
      <div className="bg-white p-4 rounded-md shadow-md">
        <h3 className="text-lg font-semibold mb-4">Tax Rates</h3>
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-300 p-2 text-center">
                Country
              </th>
              <th className="border border-gray-300 p-2 text-center">
                Tax Type
              </th>
              <th className="border border-gray-300 p-2 text-center">Rate</th>
              <th className="border border-gray-300 p-2 text-center">
                Description
              </th>
              <th className="border border-gray-300 p-2 text-center">Status</th>
              <th className="border border-gray-300 p-2 text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {taxes.map((tax) => (
              <tr key={tax.id} className="text-center">
                <td className="border border-gray-300 p-2">{tax.country}</td>
                <td className="border border-gray-300 p-2">{tax.type}</td>
                <td className="border border-gray-300 p-2">{tax.rate}</td>
                <td className="border border-gray-300 p-2">
                  {tax.description}
                </td>
                <td className="border border-gray-300 p-2">{tax.status}</td>
                <td className="border border-gray-300 p-2 flex justify-center gap-2">
                  {role === "admin" && tax.status === "pending" && (
                    <>
                      <button
                        onClick={() => handleApproveProposal(tax.id)}
                        className="bg-green-500 text-white p-2 rounded-md"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleRejectProposal(tax.id)}
                        className="bg-red-500 text-white p-2 rounded-md"
                      >
                        Reject
                      </button>
                    </>
                  )}
                  {role === "admin" && (
                    <>
                      <button
                        onClick={() => handleEditTax(tax.id)}
                        className="bg-white text-black p-2 rounded-full"
                      >
                        <FaEdit className="text-black w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteTax(tax.id)}
                        className="bg-white text-black p-2 rounded-full"
                      >
                        <MdDelete className="text-black w-4 h-4" />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
            {taxes.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  No taxes available. Add new taxes or submit proposals.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Approval Notice */}

      {/* Dynamic Tax Card Grid */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {taxes.map((tax) => (
          <div
            key={tax.id}
            className="p-4 bg-white rounded-md shadow-md border"
          >
            <h4 className="font-semibold text-lg">{tax.country}</h4>
            <p className="text-gray-700">Type: {tax.type}</p>
            <p className="text-gray-700">Rate: {tax.rate}</p>
            <p className="text-gray-700">{tax.description}</p>
            <p
              className={`mt-2 text-sm font-semibold ${
                tax.status === "approved" ? "text-green-600" : "text-red-600"
              }`}
            >
              Status: {tax.status}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaxesAndCharges;
