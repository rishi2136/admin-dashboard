import React, { useEffect, useRef, useState } from "react";
import { FaToggleOff, FaToggleOn } from "react-icons/fa";
import { CiCircleInfo } from "react-icons/ci";
import JoditEditor from "jodit-react";
import EventSelector from "./EventSelector";
import TypeSelector from "./TypeSelector";


const TempleteEdit = ({ template, onChange, isEditMode }) => {
  const editorRef = useRef(null);
  const [emailSubject, setEmailSubject] = useState(template.emailSubject || "");
  const [emailBody, setEmailBody] = useState(template.emailBody || "Hi [Name],");
  const [description, setDescription] = useState(template.description || "");

  const [status, setStatus] = useState(template.status || "Inactive");
  const [isActive, setIsActive] = useState(template.status === "Active");

  const [type, setType] = useState(template.type || 'Select Reciever');
  const [event, setEvent] = useState(template.event || 'Select Event');

  useEffect(() => {
    setEmailBody(template.emailBody || "Hi [Name],");
    setEmailSubject(template.emailSubject || "");
    setIsActive(template.status === "Active");
    setDescription(template.description || "");

    setStatus(template.status || "Inactive");
    setType(template.type || "Select Reciever")
    setEvent(template.event || 'Select Event')
  }, [template]);

  const handleSubjectChange = (e) => {
    const newValue = e.target.value;
    setEmailSubject(newValue);
    if (onChange) onChange("emailSubject", newValue);
  };

  const handleBlur = (newContent) => {
    setEmailBody(newContent);
    if (onChange) {
      onChange("emailBody", newContent);
    }
  };

  const handleDescriptionChange = (e) => {
    const newValue = e.target.value;
    setDescription(newValue)
    if (onChange) onChange("description", newValue)
  }

  const handleEvent = (event) => {
    setEvent(event)
    if (onChange) onChange("event", event)
  }

  const handleType = (type) => {
    setType(type)
    if (onChange) onChange("type", type)
  }


  const Status = () => {
    setIsActive((prev) => {
      const newStatus = !prev;
      setStatus(newStatus ? "Active" : "Inactive");
      if (onChange) onChange("status", newStatus ? "Active" : "Inactive");
      return newStatus;
    });
  };

  const editorConfig = {
    readonly: !isEditMode,
    toolbarSticky: false,
    buttons: [
      "bold",
      "italic",
      "underline",
      "link",
      "|",
      "align",
      "undo",
      "redo",
      "font",
      "fontsize",
      "brush",
      "|",
      "image",
      "file",
      "table",
      "hr",
      "superscript",
      "subscript",
    ],
    uploader: { insertImageAsBase64URI: true },
    filebrowser: {
      ajax: { url: "/files" },
      uploader: { url: "/upload" },
    },
    showCharsCounter: false,
    showWordsCounter: false,
    showXPathInStatusbar: false,
    askBeforePasteHTML: false,
    askBeforePasteFromWord: false,
  };

  const InfoTooltip = ({ text }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <div
        className="relative inline-block"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CiCircleInfo className="text-gray-500 cursor-pointer" />
        {isHovered && (
          <div
            className="absolute left-3 w-40 p-2 bottom-4 z-10 bg-black text-white text-sm rounded-md shadow-lg transition-opacity pointer-events-none"
          >
            {text}
          </div>
        )}
      </div>
    );
  };
  // absolute left-0 w-40 p-2 bg-black text-white text-sm rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity
  return (
    <div className="bg-white flex flex-col gap-6 mt-4 p-4">
      <div className="flex gap-12">
        <div className="">
          <div className="flex items-center mb-2 gap-2">
            <label className="text-gray-700 text-sm font-bold">Reciever</label>
            <InfoTooltip text="Select the reciever of template (e.g., User or Restaurant)." />
          </div>

          <TypeSelector type={type} onChange={handleType} isEditMode={isEditMode} />
        </div>

        <div className="">

          <div className="flex items-center mb-2 gap-2">
            <label className="block text-gray-700 text-sm font-bold" htmlFor="event">
              Event
            </label>
            <InfoTooltip text="Select the event on which this template will trigger" />
          </div>

          <div>

          </div>

          <EventSelector isEditMode={isEditMode} event={event} onChange={handleEvent} />

        </div>

        <div>

          <div className="flex items-center gap-2">
            <label className="block text-gray-700 text-sm font-bold " htmlFor="status">
              Status
            </label>
            <InfoTooltip text="Toggle the status between Active and Inactive." />
          </div>

          <div className="flex gap-4 items-center mt-3">
            <button
              id="status"
              className={`${isActive ? "text-green-500" : "text-gray-500"}`}
              onClick={Status}
              disabled={!isEditMode}
            >
              {isActive ? <FaToggleOn size={30} /> : <FaToggleOff size={30} />}
            </button>
            <p className={`${status === "Active" ? "text-green-500" : "text-red-500"}`}>{status}</p>
          </div>
        </div>
      </div>

      <div className="">

        <div className="flex items-center mb-2 gap-2">
          <label className="block text-gray-700 text-sm font-bold " htmlFor="description">
            Description
          </label>
          <InfoTooltip text="Provide a brief description of this email template." />
        </div>

        <textarea
          id="description"
          value={description}
          disabled={!isEditMode}
          onChange={handleDescriptionChange}
          placeholder="Description goes here..."
          className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="">

        <div className="flex items-center mb-2 gap-2">
          <label className="block text-gray-700 text-sm font-bold" htmlFor="emailSubject">
            Subject
          </label>
          <InfoTooltip text="Enter the subject of the email." />
        </div>

        <input
          id="emailSubject"
          type="text"
          value={emailSubject}
          disabled={!isEditMode}
          onChange={handleSubjectChange}
          placeholder="Welcome"
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="">

        <div className="flex items-center mb-2 gap-2">
          <label className="block text-gray-700 text-sm font-bold" htmlFor="emailBody">
            Body
          </label>
          <InfoTooltip text="Compose the body of the email using the editor." />
        </div>

        <JoditEditor
          ref={editorRef}
          value={emailBody}
          config={editorConfig}
          tabIndex={1}
          onBlur={handleBlur}
        />
      </div>


    </div>
  );
};

export default TempleteEdit;
