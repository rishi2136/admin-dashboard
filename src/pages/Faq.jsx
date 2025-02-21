import React, { useRef, useState } from "react";
import { FaEdit, FaTrash} from "react-icons/fa";
function Faq(){
    const videoSrc = "https://drive.google.com/uc?id=17Vau8vWsJUU-8eZ0mBBeKrvwntY2V817";
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
      const [type,setType]=useState("");
      const [videos, setVideos] = useState([]);
      const [editVideoName,setEditVideoName]=useState(null);
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
      const handleSaveType=(indexedit)=>{
        const updateVideos=videos.map((video,index)=>index===indexedit?{...video,type:type}:video);
        setVideos(updateVideos);
        setEditVideoName(null);
      }
    
      const handleDeleteClick = (index) => {
        setFaqs(faqs.filter((_, i) => i !== index));
      };
      const handleSelectClick=(e)=>{
        console.log(e.target.value);
        setType(e.target.value);

      }
      const handleVideoSubmit = (event) => {
        const video = event.target.files[0];
        if (video) {
          const videoUrl = URL.createObjectURL(video);
          setVideos((prevVideos) => [...prevVideos, { type: type, video: videoUrl }]);
        }
      };
      const videoRef=useRef();
      const handleVideoPlay=()=>{
        if(videoRef.current){
            if(videoRef.current.paused){
                videoRef.current.play();
            }
            else{
                videoRef.current.pause();
            }
        }
      }
      const handleVideoDeleteClick=(indexToDelete)=>{
        const remainVideos=videos.filter((_,index)=>index!==indexToDelete);
        setVideos(remainVideos);
      }
      const handleVideoEditClick=(editIndex)=>{
        setEditVideoName(editIndex);
        setType(videos[editIndex].type);
      }
    return(
        <>
            <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
            <p className="text-lg font-bold text-center text-gray-800">
                Frequently Asked Questions and support resources:
            </p>
            
                {faqs.map((item, i) => (
                    <div key={i} className="border-b last:border-0 pb-4">
                    <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold text-gray-800">
                        {i + 1}. {item.q}
                        </span>
                        <div className="flex space-x-3">
                        <button
                            onClick={() => handleEditClick(i)}
                            className="p-2 bg-blue-100 rounded-full hover:bg-blue-200"
                        >
                            <FaEdit className="text-blue-600" />
                        </button>
                        <button
                            onClick={() => handleDeleteClick(i)}
                            className="p-2 bg-red-100 rounded-full hover:bg-red-200"
                        >
                            <FaTrash className="text-red-600" />
                        </button>
                        </div>
                    </div>
            
                    {editIndex === i ? (
                        <div className="mt-3">
                        <input
                            type="text"
                            value={editedAnswer}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <button
                            onClick={() => handleSaveClick(i)}
                            className="mt-3 bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600"
                        >
                            Save
                        </button>
                        </div>
                    ) : (
                        <p className="text-base text-gray-600 px-3 mt-2">{item.a}</p>
                    )}
                    </div>
                ))}
            
                <p className="text-base text-gray-700 mt-6">
                    For direct assistance, email us at
                    <span className="text-blue-500 underline cursor-pointer ml-1 hover:text-blue-700">
                    support@zomato-style-app.com
                    </span>
                </p>
            
                {/* <div className="mt-8">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Upload Video
                    </h3>
                    <div className="border-dashed border-2 border-gray-300 p-8 rounded-lg text-center hover:bg-gray-50">
                    <p className="text-gray-500 text-sm">
                        Drag and drop a video file here
                    </p>
                    <p className="text-gray-500 text-sm">or</p>
                    <input
                        type="file"
                        accept="video/*"
                        className="mt-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    </div>
                </div> */}
                <div className="video-section flex flex-col md:flex-row items-start gap-6 p-4 m-2">
                    <div className="section-left max-w-xs rounded-lg bg-white">
                        <select
                        name="video"
                        id="video"
                        className="block w-full p-2 text-sm font-semibold border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        onChange={(e)=>handleSelectClick(e)}
                        >
                        <option value="choose where to upload">Choose to display</option>
                        <option value="Tiffin">Tiffin</option>
                        <option value="Event">Live Events</option>
                        <option value="Dining">Dining</option>
                        <option value="Orders">Orders</option>
                        </select>
                    </div>
                    <div className="section-right flex-1">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">
                        Upload Video
                        </h3>
                        <div className="border-dashed border-2 border-gray-300 p-8 rounded-lg text-center hover:bg-gray-100 transition duration-300">
                        <p className="text-gray-500 text-sm">Drag and drop a video file here</p>
                        <p className="text-gray-500 text-sm">or</p>
                        <input
                            type="file"
                            accept="video/*"
                            className="mt-6 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm  file:text-blue-700 hover:file:bg-blue-200"
                            onChange={handleVideoSubmit}
                        />
                        </div>
                    </div>
                </div>
                {/* {videos.length > 0 && (
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                    {videos.map((video, index) => (
                        <div key={index} className="video-item bg-gray-100 w-64 p-3 m-1 rounded-md shadow-lg">
                            <div className="video-info flex items-center justify-center p-1 m-1 gap-8">
                                {editVideoName===index?(
                                
                                <div className="mt-3">
                                    <input
                                        type="text"
                                        value={type}
                                        onChange={(e)=>setType(e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    />
                                    <button
                                        onClick={() => handleSaveType(index)}
                                        className="mt-3 bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600"
                                    >
                                        Save
                                    </button>
                                </div>):
                                (<div className="flex items-start">
                                    <h4 className="text-sm font-bold text-gray-950 mb-2 text-center m-2">
                                    {video.type || "Uncategorized"} Video
                                    </h4>
                                <div className="flex gap-4 m-1">
                                <button
                                    onClick={() => handleVideoEditClick(index)}
                                    className="p-2 bg-blue-100 rounded-full hover:bg-blue-200"
                                >
                                    <FaEdit className="text-blue-600" />
                                </button>
                                <button
                                    onClick={() => handleVideoDeleteClick(index)}
                                    className="p-2 bg-red-100 rounded-full hover:bg-red-200"
                                >
                                    <FaTrash className="text-red-600" />
                                </button>
                                </div>
                                </div>)}
                                
                                
                            </div>
                            
                            <video
                                src={video.video}
                                onClick={handleVideoPlay}
                                ref={videoRef}
                                className="w-full rounded-lg shadow-lg cursor-pointer"
                            />
                        </div>
                    ))}
                    </div>
                )} */}
                    <div className="flex justify-center">
                        <div className="relative w-[250px] h-[250px] overflow-hidden">
                            <iframe
                            src="https://drive.google.com/file/d/1S6L_gonTUU4VjCYGRJiCJ_4centAMr0J/preview"
                            allow="encrypted-media"
                            allowFullScreen
                            title="Google Drive Video"
                            className="absolute top-0 left-0 w-full h-full border-none"
                            ></iframe>
                        </div>
                    </div>
            </div>
            
        </>
    )
}
export default Faq;