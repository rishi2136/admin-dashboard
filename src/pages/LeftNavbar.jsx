import React, { useContext, useEffect, useState } from "react";

import {
  MdMail,
  MdSend,
  MdDrafts,
  MdDelete,
  MdStar,
  MdAdd,
  MdLabelImportant,
  MdExpandMore,
  MdExpandLess,
} from "react-icons/md";
import Zomato from "./../../public/pizza.png"
import { FaPen } from "react-icons/fa";
import { RiSpam2Line } from "react-icons/ri";
import { IoMdTime } from "react-icons/io";
import DisplayListMails from "./DisplayListMails";
import Compose from "./Compose";
import MailTopBar from "./MailTopBar";
import { EmailContent } from "../EmailContentProvider/EmmailDataInfo";
const LeftNavbar = () => {
  const EmailData=useContext(EmailContent)
  const [showMore, setShowMore] = useState(false);
  const [showtype, setShowtype] = useState("Inbox");
  const [openCompose,setOpenCompose]=useState(false);
  const [active,setActive]=useState("Inbox");
  const toggleMore = () => {
    setShowMore((prev) => !prev);
  };
  const handleOpenCompose=()=>{
    setOpenCompose((prev)=>!prev);
  }
  const [mailData, setMailData] = useState(EmailData);
  const handleEmail=()=>{
    setMailData(EmailData);
  }

  const handleSentMessage=(msg)=>{
    setMailData((prev)=>[...prev,msg])
    alert("addedd");
  }
  

  const handleList=(name)=>{
    setShowtype(name),setActive(name)
  }
  
  return (
    <div className="flex ">
      <div className="w-64 h-[87.5vh] bg-gray-100 shadow-md p-4 flex flex-col">
        {/* Compose Button */}
        <button
          className="mb-4 flex items-center justify-center gap-4 bg-blue-500 text-white rounded-3xl p-2 hover:bg-blue-600 h-[50px] text-base"
          onClick={handleOpenCompose}
        >
          <FaPen className="h-4 w-4"/> Compose

        </button>

        {/* Menu Items */}
        <ul className="space-y-3">
        {[
    { name: "Inbox", icon: <MdMail className="h-5 w-5" /> },
    { name: "Starred", icon: <MdStar className="h-5 w-5" /> },
    { name: "Sent", icon: <MdSend className="h-5 w-5" /> },
    { name: "Drafts", icon: <MdDrafts className="h-5 w-5" /> },
          ].map((item) => (
            
            <li
              key={item.name}
              
              className={`flex items-center gap-3 text-gray-700  p-2 rounded-lg cursor-pointer text-base
                ${active===item.name?"text-bold bg-blue-100":"hover:bg-gray-200"}`}
              onClick={() =>handleList(item.name)}
              
            >
              {item.icon} {item.name}{item.name==="Inbox"?<span className="ml-20 text-[14px]">{15}</span>:null}
            </li>
          ))}

          {/* More/Less Button */}
          <li
            onClick={toggleMore}
            className="flex items-center gap-3 text-gray-700 hover:bg-gray-200 p-2 rounded-lg cursor-pointer"
          >
            {showMore ? (
              <>
                <MdExpandLess className="h-5 w-5" /> Less
              </>
            ) : (
              <>
                <MdExpandMore className="h-5 w-5" /> More
              </>
            )}
          </li>
          {showMore && (
            <>
              {[
                
                { name: "Trash", icon: <MdDelete className="w-5 h-5"/> },
              ].map((item) => (
                <li
                  key={item.name}
                  className="flex items-center gap-3 text-gray-700 hover:bg-gray-200 p-2 rounded-lg cursor-pointer text-base"
                  onClick={() => setShowtype(item.name)}
                >
                  {item.icon} {item.name}
                </li>
              ))}
            </>
          )}
        </ul>
      </div>

      {/* Display Mail List */}
      <DisplayListMails title={showtype} mailData={mailData}/>
    
      
    
      

      {openCompose &&<div
          className="fixed top-50 right-[150px]   w-[350px] h-[450px] transition-all duration-300 rounded-md"
        >
          <Compose  close={handleOpenCompose} add={handleSentMessage}/>
        </div>}
    </div>

  );
};

export default LeftNavbar;
