import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const initialMessages = [
  {
    id: 1,
    sender: "CS_Agent",
    subject: "Re: New Customer : Moving from Fido to Public",
    content:
      "Dear Sagetoad, Thank you very much for contacting Public Mobile. My name is Jorge. I am sorry you are having issues with your port. It is my pleasure to assist you. So I can access your account, what is your Public Mobile phone number? What is your email? What is the phone number you ...",
  },
  {
    id: 2,
    sender: "CS_Agent",
    subject: "Re: New Customer : Moving from Fido to Public",
    content: "Hi Akhil, Just a follow-up! The part of message we are waiting for it. I am sorry you are having issues with your port. It is my pleasure to assist you. So I can access your account, what is your Public Mobile phone number? What is your email? What is the phone number you",
  },
  {
    id: 3,
    sender: "CS_Agent",
    subject: "Re: New Customer : Moving from Fido to Public",
    content: "Hi Akhil, Thank you for your response! ...",
  },
];

const MessageDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const message = initialMessages.find((msg) => msg.id === parseInt(id));

  if (!message) {
    return <p>Message not found</p>;
  }

  return (
    <div className="p-6">
      <button
        className="px-4 py-2 mb-4 text-white bg-gray-500 rounded-md hover:bg-gray-600"
        onClick={() => navigate(-1)}
      >
        Back
      </button>
      <h1 className="text-2xl font-bold text-gray-700">{message.subject}</h1>
      <p className="mt-4 text-gray-600">{message.content}</p>
    </div>
  );
};

export default MessageDetails;
