import { FaReply, FaTrashAlt, FaArchive, FaStar } from "react-icons/fa";
import { IoArrowBackSharp } from "react-icons/io5";
function MailTopBar({ email, onBack, action, open }){
    return(
        <>
            <div className="sticky top-0 bg-white  z-50 flex justify-between items-center p-3 rounded mb-2 position-fixed">
                    <div className="flex space-x-4">
                      <button
                        className="p-2 text-gray-600 hover:text-blue-500 transition text-2xl"
                        onClick={onBack}

                      >
                        <IoArrowBackSharp/>
                      </button>
                      <button className="p-2 text-gray-600 hover:text-blue-500 transition text-xl">
                        <FaArchive
                          title="Archive"
                          onClick={() => handleActionOpen(email.id, "Drafts")}
                        />
                      </button>
                      <button className="p-2 text-gray-600 hover:text-blue-500 transition text-xl">
                        <FaTrashAlt
                          title="Trash"
                          onClick={() => action(email.id, "Trash")}
                        />
                      </button>
                      <button
                        className="p-2 text-gray-600 hover:text-blue-500 transition text-xl"
                        onClick={open}
                      >
                        <FaReply title="Reply" />
                      </button>
                    </div>
                    <button className="p-2 text-gray-600 hover:text-yellow-500 transition">
                      <FaStar title="Star" />
                    </button>
                  </div>
        </>
    )
}
export default MailTopBar