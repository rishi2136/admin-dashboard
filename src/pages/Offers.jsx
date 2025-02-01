import React, { useState } from "react";
import { Transition } from "@headlessui/react";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";

export default function Offers() {
  const [offers, setOffers] = useState([
    { id: 1, code: "WELCOME50", desc: "50% off on first order", active: true },
    { id: 2, code: "FREEDRINK", desc: "1 free beverage", active: false },
  ]);

  const [selectedOffer, setSelectedOffer] = useState(null);
  const [code, setCode] = useState("");
  const [desc, setDesc] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const addOrUpdateOffer = () => {
    if (!code.trim() || !desc.trim()) {
      alert("Both fields are required!");
      return;
    }
    if (isEditing) {
      setOffers(
        offers.map((offer) =>
          offer.id === editId ? { ...offer, code, desc } : offer
        )
      );
      setIsEditing(false);
      setEditId(null);
    } else {
      setOffers([
        ...offers,
        { id: Date.now(), code, desc, active: true },
      ]);
    }
    setCode("");
    setDesc("");
  };

  const deleteOffer = (id) => {
    setOffers(offers.filter((offer) => offer.id !== id));
  };

  const toggleOfferStatus = (id) => {
    setOffers(
      offers.map((offer) =>
        offer.id === id ? { ...offer, active: !offer.active } : offer
      )
    );
  };

  const handleEdit = (offer) => {
    setCode(offer.code);
    setDesc(offer.desc);
    setIsEditing(true);
    setEditId(offer.id);
  };

  return (
    <div className="p-2 space-y-6 bg-gray-100 min-h-screen">
      <div className="bg-white rounded shadow p-2">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Current Offers
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border">
            <thead className="bg-gray-50 border-b">
              <tr className="text-gray-500">
                <th className="py-3 px-4">Code</th>
                <th className="py-3 px-4">Description</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {offers.map((offer, i) => (
                <React.Fragment key={offer.id}>
                  <tr className="border-b last:border-0 hover:bg-gray-100 transition">
                    <td className="py-3 px-4">{offer.code}</td>
                    <td className="py-3 px-4">{offer.desc}</td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => toggleOfferStatus(offer.id)}
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          offer.active
                            ? "text-white bg-green-500 animate-pulse"
                            : "text-gray-600 bg-gray-200"
                        }`}
                      >
                        {offer.active ? "Active" : "Inactive"}
                      </button>
                    </td>
                    <td className="py-3 px-4 flex space-x-4 justify-center text-lg">
                      <button
                        onClick={() => handleEdit(offer)}
                        className="text-black hover:text-yellow-700 transition"
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => deleteOffer(offer.id)}
                        className="text-black hover:text-red-700 transition"
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                      <button
                        onClick={() =>
                          setSelectedOffer(selectedOffer === i ? null : i)
                        }
                        className="text-black hover:text-blue-700 transition"
                        title="View"
                      >
                        <FaEye />
                      </button>
                    </td>
                  </tr>

                  <Transition
                    show={selectedOffer === i}
                    enter="transition-all duration-300"
                    enterFrom="max-h-0 opacity-0"
                    enterTo="max-h-20 opacity-100"
                    leave="transition-all duration-300"
                    leaveFrom="max-h-20 opacity-100"
                    leaveTo="max-h-0 opacity-0"
                  >
                    <tr className="border-b last:border-0">
                      <td
                        colSpan={4}
                        className="py-3 px-4 bg-gray-50 text-sm text-gray-600"
                      >
                        <p>
                          Offer details: Usage limits, valid dates, or terms &
                          conditions can be displayed here.
                        </p>
                      </td>
                    </tr>
                  </Transition>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded shadow p-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          {isEditing ? "Edit Offer" : "Add New Offer"}
        </h2>
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="md:flex-1">
            <label className="block text-sm text-gray-600 mb-1">
              Offer Code
            </label>
            <input
              type="text"
              className="border rounded w-full px-3 py-2 focus:border-red-500 transition"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>
          <div className="md:flex-1">
            <label className="block text-sm text-gray-600 mb-1">
              Offer Description
            </label>
            <input
              type="text"
              className="border rounded w-full px-3 py-2 focus:border-red-500 transition"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={addOrUpdateOffer}
              className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
            >
              {isEditing ? "Update" : "Add"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
