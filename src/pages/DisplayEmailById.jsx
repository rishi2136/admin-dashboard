import React from "react";
import { FaReply, FaTrashAlt, FaArchive, FaStar, FaUserCircle } from "react-icons/fa";
import { useState } from "react";
import Reply from "./Reply";
import Zomato from "./../../public/pizza.png";
import MailTopBar from "./MailTopBar";

const DisplayEmailById = ({ email, onBack, action, open }) => {
  const [reply, setReply] = useState(false);

  const handleReplay = () => {
    setReply((prev) => !prev);
  };

  const handleActionOpen = (emailId, take) => {
    open(false);
    action(emailId, take);
  };

  return (
    <div className="w-full overflow-y-scroll h-[450px] bg-white rounded-sm">  
      <MailTopBar email={email} onBack={onBack} action={handleActionOpen} open={handleReplay} />
      
      <div className="i p-2">
        {/* First lorem text made bold */}
        <div className="ml-12 m-1 font-bold">
          {email.preview}
        </div>
        <div className="user p-2 m-1 flex items-center">
          {/* Using FaUserCircle as dummy user icon */}
          <FaUserCircle className="w-[45px] h-[45px] text-gray-500" />
          <div className="info-user p-2 m-1 flex justify-between w-[90%] items-center">
          
            <h1 className="font-bold text-lg">{email.user.username} ( <span>{email.user.emailAddress} )</span></h1>
            <div className="flex items-center gap-2">
            
              <span className="font-bold text-base">8:24px (32 minutes ago)</span>
              <button className="p-2 text-gray-600 hover:text-yellow-500 transition">
                <FaStar title="Star" />
              </button>
              <button className="p-2 text-gray-600 hover:text-yellow-500 transition">
                <FaReply title="Reply" className="mt-1" />
              </button>
            </div>
          </div>
        </div>
        <div className="message flex flex-col items-center justify-center text-center">
          <img src={email.image} alt="" className="w-[250px] h-[250px]" />
          <p>{email.subBody}</p>
          <p>{email.body}</p>
        </div>
      </div>

      {/* Reply Section */}
      {!reply ? (
        <div className="footer-info flex gap-5 p-2 m-10">
          <button
            className="flex items-center justify-center space-x-2 w-[130px] text-black transition duration-300 border-2 border-black rounded-3xl h-[40px] px-5"
            onClick={handleReplay}
          >
            <FaReply className="w-4 h-4" />
            <span className="text-sm">Reply</span>
          </button>

          <button
            className="flex items-center justify-center space-x-2 w-[130px] text-black transition duration-300 border-2 border-black rounded-3xl h-[40px] px-5"
            onClick={() => alert("Forward functionality to be added!")}
          >
            <FaReply className="w-4 h-4 rotate-180" />
            <span className="text-sm">Forward</span>
          </button>
        </div>
      ) : (
        <div className="w-full">
          <Reply email={email.user.emailAddress} mail={email} Replay={handleReplay} />
        </div>
      )}
    </div>
  );
};

export default DisplayEmailById;
