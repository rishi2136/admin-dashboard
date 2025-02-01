import React, { useState } from "react";
import { FaSearch, FaTrash, FaCog, FaPen, FaEnvelope, FaUserCircle } from "react-icons/fa";

const initialMessages = [
  {
    id: 1,
    sender: "CS_Agent",
    subject: "Re: New Customer : Moving from Fido to Public",
    time: "a week ago",
    content:
      "Dear Sagetoad, Thank you very much for contacting Public Mobile. My name is Jorge. I am sorry you are having issues with your port. It is my pleasure to assist you. So I can access your account, what is your Public Mobile phone number? What is your email? What is the phone number you ...",
  },
  {
    id: 2,
    sender: "CS_Agent",
    subject: "Re: New Customer : Moving from Fido to Public",
    time: "a week ago",
    content: "Hi Akhil, Just a follow-up! The part of message we are waiting for it. I am sorry you are having issues with your port. It is my pleasure to assist you. So I can access your account, what is your Public Mobile phone number? What is your email? What is the phone number you",
  },
  {
    id: 3,
    sender: "CS_Agent",
    subject: "Re: New Customer : Moving from Fido to Public",
    time: "a week ago",
    content: "Hi Akhil, Thank you for your response! ...",
  },
];

const Support = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [activeMessage, setActiveMessage] = useState(messages[0]);
  const [showFullMessage, setShowFullMessage] = useState(false);
  const [reply, setReply] = useState("");
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [composeDetails, setComposeDetails] = useState({
    subject: "",
    recipient: "",
    message: "",
  });
  const [isConfirmDelete, setIsConfirmDelete] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState(null);

  const deleteMessage = () => {
    const remainingMessages = messages.filter(
      (message) => message.id !== messageToDelete.id
    );
    setMessages(remainingMessages);
    setActiveMessage(remainingMessages[0] || null);
    setIsConfirmDelete(false);
  };

  const cancelDelete = () => {
    setIsConfirmDelete(false);
  };

  const sendReply = () => {
    alert(`Reply sent: ${reply}`);
    setReply("");
  };

  const openCompose = () => {
    setIsComposeOpen(true);
    setComposeDetails({
      subject: "",
      recipient: "",
      message: "",
    });
  };

  const sendCompose = () => {
    alert(`Message sent to ${composeDetails.recipient}: ${composeDetails.message}`);
    setIsComposeOpen(false);
  };

  const openSettings = () => {
    alert("Settings functionality clicked!");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/3 bg-white border-r shadow-md">
        {/* Header */}
        <div className="flex items-center justify-between p-1 border-b">
          <h1 className="text-lg font-bold text-gray-700">Inbox</h1>
          <div className="flex space-x-4 items-center">
            <FaPen
              className="text-gray-500 cursor-pointer hover:text-gray-700"
              onClick={openCompose}
            />
            <FaCog
              className="text-gray-500 cursor-pointer hover:text-gray-700"
              onClick={openSettings}
            />
            <FaUserCircle
              className="text-gray-500 cursor-pointer hover:text-gray-700 text-2xl"
              title="User Profile"
            />
          </div>
        </div>

        {/* Search */}
        {/* <div className="flex items-center p-1 border-b">
          <input
            type="text"
            placeholder="Search"
            className="flex-grow p-1 border rounded-md focus:outline-none"
          />
          <FaSearch className="ml-2 text-gray-500" />
        </div> */}

        {/* Messages List */}
        <ul className="overflow-y-auto">
          {messages.map((message) => (
            <li
              key={message.id}
              onClick={() => setActiveMessage(message)}
              className={`p-4 cursor-pointer border-b hover:bg-gray-100 ${
                activeMessage.id === message.id ? "bg-gray-200" : ""
              }`}
            >
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  {message.sender[0]}
                </div>
                <div className="flex-grow">
                  <h4 className="font-semibold text-gray-700 truncate">
                    {message.subject}
                  </h4>
                  <p className="text-sm text-gray-500 truncate">
                    {message.content}
                  </p>
                </div>
                <span className="text-xs text-gray-400 ml-4">
                  {message.time}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-grow p-6">
        {isComposeOpen ? (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-700">Compose New Message</h2>
            <input
              type="text"
              className="w-full p-2 border rounded-md focus:outline-none"
              placeholder="Recipient"
              value={composeDetails.recipient}
              onChange={(e) =>
                setComposeDetails({ ...composeDetails, recipient: e.target.value })
              }
            />
            <input
              type="text"
              className="w-full p-1 border rounded-md focus:outline-none"
              placeholder="Subject"
              value={composeDetails.subject}
              onChange={(e) =>
                setComposeDetails({ ...composeDetails, subject: e.target.value })
              }
            />
            <textarea
              rows="6"
              className="w-full p-2 border rounded-md focus:outline-none"
              placeholder="Type your message here..."
              value={composeDetails.message}
              onChange={(e) =>
                setComposeDetails({ ...composeDetails, message: e.target.value })
              }
            ></textarea>
            <div className="flex space-x-4">
              <button
                className="px-4 py-2 text-white bg-blue-500 rounded-md"
                onClick={sendCompose}
              >
                Send
              </button>
              <button
                className="px-4 py-2 text-white bg-gray-500 rounded-md hover:bg-gray-600"
                onClick={() => setIsComposeOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : activeMessage ? (
          <>
            <div className="flex items-center justify-between border-b pb-4">
              <h1 className="text-lg font-semibold text-gray-700">
                {activeMessage.subject}
              </h1>
              <div className="flex items-center space-x-4">
                <FaTrash
                  className="text-gray-500 cursor-pointer hover:text-gray-700"
                  onClick={() => {
                    setIsConfirmDelete(true);
                    setMessageToDelete(activeMessage);
                  }}
                />
                <FaCog
                  className="text-gray-500 cursor-pointer hover:text-gray-700"
                  onClick={openSettings}
                />
              </div>
            </div>

            <div className="mt-6">
              <p className="text-gray-700 whitespace-pre-line">
                {showFullMessage
                  ? activeMessage.content
                  : `${activeMessage.content.substring(0, 100)}...`}
              </p>
              <button
                className="mt-4 text-500"
                onClick={() => setShowFullMessage(!showFullMessage)}
              >
                {showFullMessage ? "Collapse message" : "Expand full message"}
              </button>
            </div>

            <div className="mt-6 border-t pt-4">
              <h2 className="font-semibold text-gray-700">Reply</h2>
              <textarea
                rows="5"
                className="w-full p-2 mt-2 border rounded-md focus:outline-none"
                placeholder="Type your message here..."
                value={reply}
                onChange={(e) => setReply(e.target.value)}
              ></textarea>
              <button
                className="px-4 py-2 mt-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                onClick={sendReply}
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <p className="text-gray-500">No messages available</p>
        )}
      </div>

      {/* Confirmation Modal */}
      {isConfirmDelete && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h3 className="text-lg font-semibold text-gray-700">
              Are you sure you want to delete this message?
            </h3>
            <div className="mt-4 flex space-x-4">
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-md"
                onClick={deleteMessage}
              >
                Yes, delete
              </button>
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded-md"
                onClick={cancelDelete}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Support;
