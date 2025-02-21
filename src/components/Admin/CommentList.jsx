import React, { useEffect, useState } from "react";
import { IoIosStar } from "react-icons/io";
import { IoCheckmarkSharp } from "react-icons/io5";
import { IoCloseSharp } from "react-icons/io5";
import Sorting from "./Sorting";
import { FaUndo } from "react-icons/fa";
import { IoMdSwitch } from "react-icons/io";
import Popup from "../../utils/Popup";
import Tooltip from "../../utils/Tooltip";
import axios from "axios";
import { useLocation } from "react-router-dom";

const CommentList = ({ setViewComments, viewComments, restaurantReviews }) => {
  let [column, setColumn] = useState(1);
  let [reviews, setReviews] = useState(restaurantReviews);
  let [isReply, setIsReply] = useState(-1);
  let [replyText, setReplyText] = useState("");
  let location = useLocation();

  useEffect(() => {
    if (location.pathname === "/restaurants/comments") setColumn(1);
  }, [location]);

  const [expandedComments, setExpandedComments] = useState({});

  const handleAccept = () => {};
  const handleReject = () => {};
  const list = ["Latest", "Oldest", "Worst", "Best"];
  const filters = ["Rating 3.0+", "Rating 4.0+", "Rating below 3.0"];

  const handleReply = (e, id) => {
    e.preventDefault();
    console.log(replyText);
    console.log(id);
    // axios.post("") //after request to the backend
    setIsReply(-1);
    setReplyText("");
  };

  const toggleExpandComment = (id) => {
    setExpandedComments((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  return (
    <div className="w-full box-border">
      <h1 className="overview-heading  flex justify-between">
        Comments{" "}
        <div className="flex justify-end gap-1 items-center">
          <Tooltip text={"switch view"} position="bottom">
            <button
              className="rounded-full border-0 gap-1 text-[14px] mb-2 px-2 py-1 bg-gray-100"
              onClick={() => setColumn((prev) => (prev === 1 ? 2 : 1))}
            >
              <IoMdSwitch />
            </button>
          </Tooltip>
<<<<<<< HEAD
          <Tooltip text={"undo"} position="bottom">
            <button className="rounded-2xl border-0 gap-1 text-[14px] mb-2 px-2 py-1 bg-gray-100">
              <FaUndo />
            </button>
          </Tooltip>
=======
          {/* <Tooltip text={"undo"} position="bottom">
            <button className="rounded-2xl border-0 gap-1 text-[14px] mb-2 px-2 py-1 bg-gray-100">
              <FaUndo />
            </button>
          </Tooltip> */}
>>>>>>> c7983b2717f06e0ff11610ca4a58703a0c141e69
          <div className="h-full flex pt-2 items-stretch">
            <Sorting list={filters} label="Filters" />
          </div>

          <div className="h-full flex pt-2 items-stretch">
            <Sorting list={list} />
          </div>

          <button
            className="rounded-md border-0 gap-1 text-[14px] mb-2 px-2 py-1 bg-gray-100"
            onClick={
              viewComments === null
                ? () => setViewComments("user")
                : () => setViewComments(null)
            }
          >
            {viewComments === null ? "Back" : "More"}
          </button>
        </div>
      </h1>

      <div
        className={`grid p-2 w-full justify-center box-border gap-2 ${
          column === 1 ? "lg:grid-cols-1" : "lg:grid-cols-2"
        } grid-cols-1`}
      >
        {reviews.map((review) => (
          // comment card
          <div
            key={review.id}
            className="border border-gray-200 shadow-sm bg-white rounded-lg p-4 w-auto box-border"
          >
            <div className="flex gap-2 ">
              {/* image group */}
              <div className="flex flex-col items-center justify-center">
                <img
                  src={review.imgSrc}
                  alt=""
                  className="w-[40px] h-[40px] rounded-full bg-gray-100"
                />
                <div className={`text-center ${"text-[10px]"}`}>
                  {review.reviewer}
                </div>
              </div>
              {/* rating */}
              <div className="flex flex-col">
                <div className="text-[12px] border flex w-[50px] rounded-lg items-center justify-center box-border">
                  <IoIosStar className="text-black" />
                  &nbsp; {review.rating}
                </div>
                <div className="text-[11px]">2 days before</div>
              </div>
              {/* {column === 1 && (
                <div>
                  <div className="mt-2 text-sm">
                    {expandedComments[review.id]
                      ? review.reviewContent
                      : `${review.reviewContent.slice(0, 150)}`}
                    {review.reviewContent.length > 150 && (
                      <button
                        onClick={() => toggleExpandComment(review.id)}
                        className="text-blue-500 text-xs ml-2"
                      >
                        {expandedComments[review.id]
                          ? "Show Less"
                          : "Show More"}
                      </button>
                    )}
                  </div>
                </div>
              )} */}

              {/* action button */}
              <div className=" font-semibold flex gap-2 mt-2 flex-grow justify-end items-center h-full">
                <Tooltip text={"Accept"} position="left">
                  <button
                    title="accept"
                    className="border-0 bg-transparent items-start flex h-0 rounded"
                  >
                    <IoCheckmarkSharp className="text-[32px] text-green-500 bg-gray-50 rounded p-1" />
                  </button>
                </Tooltip>
                <Tooltip text={"Reject"} position="left">
                  <button
                    title="reject"
                    className="border-0 bg-transparent items-start flex h-0 rounded"
                  >
                    <IoCloseSharp
                      className=" text-[32px] text-red-500 bg-gray-50 rounded p-1"
                      title="reject"
                    />
                  </button>
                </Tooltip>
                <button
                  title="reply"
                  className="border-0 bg-transparent items-start flex h-0 rounded focus:outline-none"
                  onClick={() =>
                    setIsReply((prev) => (prev === review.id ? -1 : review.id))
                  }
                >
                  <div className=" bg-gray-50 rounded p-2">Reply</div>
                </button>
              </div>
            </div>
            {column && (
              <div>
                <div className="mt-2 text-sm">
                  {expandedComments[review.id]
                    ? review.reviewContent
                    : `${review.reviewContent.slice(0, 120)}...`}
                  {review.reviewContent.length > 120 && (
                    <button
                      onClick={() => toggleExpandComment(review.id)}
                      className="text-blue-500 text-xs ml-2"
                    >
                      {expandedComments[review.id] ? "Show Less" : "Show More"}
                    </button>
                  )}
                </div>
              </div>
            )}

            {isReply === review.id && (
              <div className="flex gap-2">
                <textarea
                  name="reply"
                  className="border border-black  focus:outline-none flex-grow"
                  value={replyText}
                  onChange={(evt) => setReplyText(evt.target.value)}
                />
                <button
                  onClick={(e) => handleReply(e, review.id)}
                  className="border-0  items-start flex focus:outline-none h-auto bg-blue-700 text-white rounded p-2"
                >
                  Send
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentList;
