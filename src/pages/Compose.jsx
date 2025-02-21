import { useState } from "react";
import { CiTrash } from "react-icons/ci";
import { FaExpandAlt } from "react-icons/fa";
import { IoAddCircleSharp, IoCloseSharp } from "react-icons/io5";
import { CiImageOn } from "react-icons/ci";
import { useRef } from "react";
function Compose({close,move,mail,add }) {
  const emailTemplates = [
    {
      id: 1,
      mailID: "restaurant.owner@example.com",
      subject: "Add New Restaurant",
      body: "Dear User,\n\nWe are excited to invite you to add your restaurant to our platform. Please fill out the required details to join our growing community of restaurants.\n\nBest Regards,\nAdmin Team",
    },
    {
      id: 2,
      mailID: "event.client@example.com",
      subject: "Join Live Event Dinner",
      body: "Dear Client,\n\nYou are cordially invited to our exclusive live event dinner. Please RSVP to secure your spot at this special event.\n\nSincerely,\nAdmin Team",
    },
    {
      id: 3,
      mailID: "user.support@example.com",
      subject: "User Help Request",
      body: "Dear User,\n\nWe noticed you need assistance. Please reply to this email or reach out to our support team, and we will be happy to help.\n\nBest Wishes,\nSupport Team",
    },
    {
      id: 4,
      mailID: "client.partner@example.com",
      subject: "Client Collaboration",
      body: "Dear Client,\n\nWe are thrilled to collaborate with you. Let's discuss how we can grow together. Please reply to this email to schedule a meeting.\n\nKind Regards,\nAdmin Team",
    },
  ];

  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [mailid,setMailId]=useState("");
  const [subject,setSubject]=useState("");
  const [body,setBody]=useState("");
  const [isExpanded,setIsExpand]=useState(false);
  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [edit,setEdit]=useState(true);
  const handleTemplateChange = (e) => {
    const selectedId = parseInt(e.target.value);
    const template = emailTemplates.find((t) => t.id === selectedId);
    setSelectedTemplate(template || null);
    setMailId(template.mailID || " ")
    setSubject(template.subject || "");
    setBody(template.body || " ");
  };

  const handleExpand=()=>{
    setIsExpand(!isExpanded);
  }
  const handleSend=()=>{

  setSelectedTemplate({mailId:mailid,subject:subject,body:body});
  move(setSelectedTemplate);
  alert(mailid,subject,body);
  }

  const handleIconClick = () => {
    fileInputRef.current && fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
    
      const previewUrl = URL.createObjectURL(file);
      setSelectedImage(previewUrl);
    
      console.log("Selected file:", file);
    }
  };
  const handleEditClose=()=>{
    setEdit(!edit);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const _id = Date.now().toString();
  
    const emailId = `email${_id}`;
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  
    const preview = body.length > 80 ? body.slice(0, 80) + "..." : body;

    const newEmail = {
      _id,
      mailid,
      subject,
      subBody: subject, // or a short version of the body if needed
      body,
      preview,
      image:selectedImage, // you can add logic for image uploads as needed
      time,
      user: {
        username: mailid,
        emailAddress:mailid
      },
      isStarred: false,
      isTrashed: false,
      isDraft: false,
      isSent: true,
      read: false,
    };

    
    add(newEmail);
    
  
    setRecipient("");
    setSubject("");
    setBody("");
  };
  return (
    
    <div  className={`p-4 bg-white rounded-lg shadow-lg ${
      isExpanded ? "fixed top-12 left-40 w-[75%] h-[530px] z-50 shadow-black" : "w-[500px]  relative right-10 h-[516px]"
    }`}>
      {/* {mail  ? <>
        <h2 className="text-lg font-bold text-gray-800 bg-gray-100 rounded-t-md p-1 h-3">
        Edit Message
      </h2>
      <div>
          <label className="block text-gray-600 font-medium mb-1">To</label>
          <input
            type="email"
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Recipient email"
            value={mail.user.emailAddress || ""}
            
          />
        </div>
        <div>
          <label className="block text-gray-600 font-medium mb-1">Subject</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Subject"
            value={mail.subject || ""}
            
          />
        </div>
        <div>
          <label className="block text-gray-600 font-medium mb-1">Message</label>
          <textarea
            rows="6"
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Write your message here..."
            value={mail.body || ""}
          
          ></textarea>
        </div>
      
      <div className="flex justify-between items-center mt-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400" onClick={() => move(selectedTemplate)}>
          Send
        </button>
        <CiTrash
          className="text-black  cursor-pointer hover:text-red-500"
          size={24}
          onClick={handleEditClose}
        />
      </div>
      </>
      :<> 
      */
      }
      <div className="compose ">
      <div className="flex justify-between bg-gray-100 ">
        <h2 className="text-lg font-bold text-gray-800 rounded-t-md p-1">
          {mail ? <>Edit Message</>:<>New Message</>}
        </h2>
        <div className="icons-expand flex p-1 rounded-t-md m-2 justify-evenly">
          <FaExpandAlt className="mr-3 cursor-pointer" onClick={handleExpand} size={16}/>
          <IoCloseSharp className=" text-black cursor-pointer" onClick={close} size={18}/>
        </div>
      </div>
      
      <div className="space-y-3 mt-5">
        {!mail && 
        <div>
          <label className="block text-gray-600 font-medium mb-1">Choose Template</label>
          <select
            name="template"
            onChange={handleTemplateChange}
            className="w-full bg-gray-200 text-gray-700 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select Template</option>
            {emailTemplates.map((template) => (
              <option key={template.id} value={template.id}>
                {template.subject}
              </option>
            ))}
          </select>
        </div>
        }
        <div>
          <label className="block text-gray-600 font-medium mb-1">To</label>
          <input
            type="email"
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Recipient email"
            value={mailid}
            onChange={(e)=>setMailId(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-gray-600 font-medium mb-1">Subject</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Subject"
            value={subject}
            onChange={(e)=>setSubject(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-gray-600 font-medium mb-1">Message</label>
          <div className="mt-4">
            {selectedImage && <img src={selectedImage} alt="" className="w-[50px] h-[50px]"/>}
            
            <textarea
              placeholder="Write your reply here..."
              className="w-full h-[100px] p-4 text-sm  rounded-md shadow-sm resize-none focus:outline-none"

              value={body}
              onChange={(e) =>setBody(e.target.value)} // Update state on change
              required
            />
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center mt-1">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400" onClick={(e)=>handleSubmit(e)}>
          Send
        </button>
        <div>
      {/* Hidden file input */}
      <input
        type="file"
        name="image"
        id="image"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      
      <button type="button" onClick={handleIconClick}>
        <CiImageOn className="w-6 h-6" />
      </button>
    </div>
        <CiTrash
          className="text-black  cursor-pointer hover:text-red-500"
          size={24}
          onClick={close}
        />
      </div>
      </div>
    
    
    </div>
  );
}

export default Compose;
