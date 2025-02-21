import React, { useEffect, useState } from "react";
import { CiTrash } from "react-icons/ci";
import { FaRegStar } from "react-icons/fa";
import { MdOutlineMarkEmailUnread, MdArchive } from "react-icons/md";
import EmailTopBar from "./EmailTopBar";
import DisplayEmailById from "./DisplayEmailById";

const MailList = ({ title, mail: initialMails = [], move, mailData }) => {
  const [mails, setMails] = useState(mailData);
  const [open, setOpen] = useState(false);
  const [selectedMail, setSelectedMail] = useState(null);
  const [page, setPage] = useState(1);
  const [filteredMails, setFilteredMails] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filter, setFilter] = useState("");

  // Refilter mails whenever mails, title, or searchText changes.
  useEffect(() => {
    handleTypeOfMail();
  }, [mails, title, searchText, filter]);

  const handleTypeOfMail = () => {
    let filtered = [];
    switch (title.toLowerCase()) {
      case "starred":
        filtered = mails.filter((m) => m.isStarred);
        break;
      case "trash":
        filtered = mails.filter((m) => m.isTrashed);
        break;
      case "drafts":
        filtered = mails.filter((m) => m.isDraft);
        break;
      case "sent":
        filtered = mails.filter((m) => m.isSent);
        break;
      default:
        filtered = mails.filter(
          (m) => !m.isTrashed && !m.isDraft && m.isSent && !m.isStarred
        );
        break;
    }
    
    if (searchText.trim() !== "") {
      filtered = filtered.filter(
        (m) =>
          (m.subject || "").toLowerCase().includes(searchText.toLowerCase()) ||
          (m.preview || "").toLowerCase().includes(searchText.toLowerCase()) ||
          (m.user.username || "").toLowerCase().includes(searchText.toLowerCase()) ||
          (m.user.emailAddress || "").toLowerCase().includes(searchText.toLowerCase())
      );
    } else if (filter.trim() !== "") {
      switch (filter.toLowerCase()) {
        case "read":
          filtered = filtered.filter((m) => m.read);
          break;
        case "unread":
          filtered = filtered.filter((m) => !m.read);
          break;
        default:
          break;
      }
    }
    setFilteredMails(filtered);
  };

  const updateMailProperty = (emailId, prop, value) => {
    const updatedMails = mails.map((mail) =>
      mail._id === emailId ? { ...mail, [prop]: value } : mail
    );
    setMails(updatedMails);
  };

  const handleMailClick = (mail) => {
    setSelectedMail(mail);
    setOpen(true);
  };

  const handleBack = () => {
    setSelectedMail(null);
    setOpen(false);
  };

  const handleAction = (emailId, actionType) => {
    switch (actionType.toLowerCase()) {
      case "starred":
        updateMailProperty(emailId, "isStarred", true);
        break;
      case "trash":
        updateMailProperty(emailId, "isTrashed", true);
        break;
      case "drafts":
        updateMailProperty(emailId, "isDraft", true);
        break;
      default:
        break;
    }
    move(emailId, title, actionType);
  };

  const handleRead = (emailId) => {
    const updatedMails = mails.map((m) =>
      m._id === emailId ? { ...m, read: true } : m
    );
    setMails(updatedMails);
  };

  const handleSearch = (text) => {
    setSearchText(text);
  };

  const handleFilter = (value) => {
    if (value) {
      setFilter(value);
    }
  };

  return (
    <div className="p-2 w-3/4 mx-auto rounded-lg shadow">
      <EmailTopBar
        count={mails.length}
        countFirst={page * 10}
        setPage={setPage}
        onSearch={handleSearch}
        filter={handleFilter}
      />
      {open && selectedMail ? (
        <DisplayEmailById
          email={selectedMail}
          onBack={handleBack}
          title={title}
          action={handleAction}
          open={setOpen}
        />
      ) : (
        <div className="mt-6 h-[386px] overflow-y-auto">
          <ul className="space-y-3">
            {filteredMails && filteredMails.length > 0 ? (
              filteredMails.map((m, index) => (
                <li
                  key={index}
                  className={`p-3 ${m.read ? "bg-slate-300" : "bg-slate-50"} rounded-lg shadow hover:bg-gray-200 flex justify-between items-center group cursor-pointer`}
                >
                  {/* Left Section: Checkbox and Star */}
                  <div className="flex items-center space-x-2 mr-4">
                    <input
                      type="checkbox"
                      className="h-4 w-4 cursor-pointer focus:ring-blue-500"
                    />
                    <button
                      className="text-gray-500 hover:text-yellow-500 transition duration-200"
                      title="Star"
                      onClick={() => handleAction(m._id, "Starred")}
                    >
                      <FaRegStar className="h-5 w-5" />
                    </button>
                  </div>
                  {/* Middle Section: Name and Subject */}
                  <div className="w-4/5 flex" onClick={() => handleMailClick(m)}>
                    <h2 className="font-bold text-[14px] text-gray-900 truncate w-[100px]">
                      {m.user.username}
                    </h2>
                    <p className="text-sm text-gray-700 truncate ml-10">
                      {m.preview.slice(0, 80)}
                    </p>
                  </div>
                  {/* Right Section: Time and Action Buttons */}
                  <div className="flex items-center space-x-4">
                    <p className="text-xs text-gray-400 group-hover:hidden">{m.time}</p>
                    <div className="hidden group-hover:flex space-x-2">
                      <button
                        className="p-1 text-gray-500 hover:text-blue-500 transition duration-200"
                        title="Mark as Read"
                        onClick={() => handleRead(m._id)}
                      >
                        <MdOutlineMarkEmailUnread className="h-5 w-5" />
                      </button>
                      <button
                        className="p-1 text-gray-500 hover:text-green-500 transition duration-200"
                        title="Archive"
                        onClick={() => handleAction(m._id, "Drafts")}
                      >
                        <MdArchive className="h-5 w-5" />
                      </button>
                      <button
                        className="p-1 text-gray-500 hover:text-red-500 transition duration-200"
                        title="Delete"
                        onClick={() => handleAction(m._id, "Trash")}
                      >
                        <CiTrash className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No mails to display.</p>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MailList;
