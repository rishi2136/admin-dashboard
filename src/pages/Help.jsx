import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Support from "./Support";

export default function Help({ setCurrentPage }) {
  const [faqs, setFaqs] = useState([
    {
      q: "How to add a new category?",
      a: 'Go to Delivery Menu (or Dine-in Menu) and click "+ Add Menu Category."',
    },
    {
      q: "How to set up image uploads?",
      a: "Integrate your server with multer or any other library, then call POST /api/upload from the frontend.",
    },
    {
      q: "How to integrate with third-party delivery?",
      a: "Use the official APIs for platforms like Swiggy or Zomato, or refer to their developer docs.",
    },
    {
      q: "Payment and refund policies?",
      a: "See your local regulations for refunds. Integrate a payment gateway with an event for charge-backs.",
    },
  ]);

  const [editIndex, setEditIndex] = useState(null);
  const [editedAnswer, setEditedAnswer] = useState("");

  const handleEditClick = (index) => {
    setEditIndex(index);
    setEditedAnswer(faqs[index].a);
  };

  const handleInputChange = (e) => {
    setEditedAnswer(e.target.value);
  };

  const handleSaveClick = (index) => {
    const updatedFaqs = faqs.map((faq, i) =>
      i === index ? { ...faq, a: editedAnswer } : faq
    );
    setFaqs(updatedFaqs);
    setEditIndex(null);
  };

  const handleDeleteClick = (index) => {
    setFaqs(faqs.filter((_, i) => i !== index));
  };

  return (
    <div className="p-1 space-y-4">
       <div>
        <Support />
      </div>
      <div className="bg-white rounded shadow p-4 space-y-3">
        <p className="text-base font-medium text-gray-700">
          Frequently Asked Questions and support resources:
        </p>

        {faqs.map((item, i) => (
          <div key={i} className="border-b last:border-0 pb-3">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-gray-700">
                {i + 1}. {item.q}
              </span>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEditClick(i)}
                  className=" bg-white text-black"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDeleteClick(i)}
                  className=" bg-white text-black"
                >
                  <FaTrash />
                </button>
              </div>
            </div>

            {editIndex === i ? (
              <div className="mt-2">
                <input
                  type="text"
                  value={editedAnswer}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-2 py-1 text-gray-700"
                />
                <button
                  onClick={() => handleSaveClick(i)}
                  className="mt-2 bg-blue-500 text-white px-4 py-1 rounded"
                >
                  Save
                </button>
              </div>
            ) : (
              <p className="text-base text-gray-600 px-2 mt-1">{item.a}</p>
            )}
          </div>
        ))}

        <p className="text-base text-gray-700 mt-4">
          For direct assistance, email us at
          <span className="text-blue-500 underline cursor-pointer ml-1">
            support@zomato-style-app.com
          </span>
        </p>

        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Upload Video
          </h3>
          <div className="border-dashed border-2 border-gray-400 p-6 rounded-lg text-center">
            <p className="text-gray-500 text-sm">
              Drag and drop a video file here
            </p>
            <p className="text-gray-500 text-sm">or</p>
            <input type="file" accept="video/*" className="mt-2 text-gray-700" />
          </div>
        </div>
      </div>

     
    </div>
  );
}
