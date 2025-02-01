import React, { useState } from "react";
import { IoIosStar } from "react-icons/io";
import { IoCheckmarkSharp } from "react-icons/io5";
import { IoCloseSharp } from "react-icons/io5";
import Sorting from "./Sorting";
import { FaUndo } from "react-icons/fa";
import { IoMdSwitch } from "react-icons/io";
import Popup from "../../utils/Popup";
import Tooltip from "../../utils/ToolTip";

const CommentList = ({ setViewComments, viewComments, restaurantReviews }) => {
  let [column, setColumn] = useState(1);
  let [reviews, setReviews] = useState(restaurantReviews);
  const [expandedComments, setExpandedComments] = useState({});

  const handleAccept = () => {};
  const handleReject = () => {};
  const list = ["Latest", "Oldest", "Worst", "Best"];
  const filters = ["Rating 3.0+", "Rating 4.0+", "Rating below 3.0"];

  const toggleExpandComment = (id) => {
    setExpandedComments((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="w-full bg-white">
      <h1 className="overview-heading  flex justify-between ps-4">
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
          <Tooltip text={"undo"} position="bottom">
            <button className="rounded-2xl border-0 gap-1 text-[14px] mb-2 px-2 py-1 bg-gray-100">
              <FaUndo />
            </button>
          </Tooltip>
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
        className={`grid m-2  gap-2 ${
          column === 1 ? "lg:grid-cols-1" : "lg:grid-cols-2"
        } grid-cols-1`}
      >
        {reviews.map((review) => (
          // comment card
          <div
            key={review.id}
            className="border border-gray-200 shadow-sm bg-white rounded-lg p-4 w-auto"
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
                <div className="text-[12px] border flex w-[50px] rounded-lg items-center justify-center">
                  <IoIosStar className="text-black" />
                  &nbsp; {review.rating}
                </div>
                <div className="text-[11px]">2 days before</div>
              </div>
              {/* action button */}
              <div className=" font-semibold flex gap-2 mt-2 flex-grow justify-end h-full">
                <button
                  title="accept"
                  className="border-0 bg-transparent items-start flex h-0 rounded"
                >
                  <IoCheckmarkSharp className="text-[32px] text-green-500 bg-gray-50 rounded p-1" />
                </button>
                <button
                  title="reject"
                  className="border-0 bg-transparent items-start flex h-0 rounded"
                >
                  <IoCloseSharp
                    className=" text-[32px] text-red-500 bg-gray-50 rounded p-1"
                    title="reject"
                  />
                </button>
              </div>
            </div>

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
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentList;
