import React, { useState } from "react";
import { IoIosStar, IoIosStarHalf, IoIosStarOutline } from "react-icons/io";
import { IoMdSwitch } from "react-icons/io";
import { FaUndo } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import StarRating from "./StarRating";

const restaurantReviews = [
  {
    id: 1,
    imgSrc: "https://randomuser.me/api/portraits/men/10.jpg",
    altText: "Profile of Michael Scott",
    rating: 4.5,
    reviewer: "Michael Scott",
    reviewContent:
      "The ambiance was amazing, and the food was delicious! The staff was friendly, and the service was quick. I’ll definitely come back again.",
  },
  {
    id: 2,
    imgSrc: "https://randomuser.me/api/portraits/women/12.jpg",
    altText: "Profile of Pam Beesly",
    rating: 4.0,
    reviewer: "Pam Beesly",
    reviewContent:
      "Great experience overall. The pasta was perfectly cooked, but the dessert options could use some variety. Still, a solid choice for dinner.",
  },
  {
    id: 3,
    imgSrc: "https://randomuser.me/api/portraits/men/15.jpg",
    altText: "Profile of Jim Halpert",
    rating: 0,
    reviewer: "Jim Halpert",
    reviewContent:
      "Decent food but slightly overpriced for the portion sizes. The location is convenient, though, and the atmosphere is cozy.",
  },
  {
    id: 4,
    imgSrc: "https://randomuser.me/api/portraits/women/20.jpg",
    altText: "Profile of Angela Martin",
    rating: 5.0,
    reviewer: "Angela Martin",
    reviewContent:
      "Absolutely loved it! The chef's special was out of this world, and the attention to detail in every dish was impressive. Highly recommend!",
  },
];


const CommentList = ({ fullWidth = true, maxHeight = true }) => {
  const [column, setColumn] = useState(1);
  const [reviews, setReviews] = useState(restaurantReviews);
  const navigate = useNavigate();

  const sortReviewsByRating = () => [...reviews].sort((a, b) => b.rating - a.rating);

  const handleRatingSort = () => {
    const sorted = sortReviewsByRating();
    setReviews((prev) =>
      JSON.stringify(sorted) === JSON.stringify(prev) ? restaurantReviews : sorted
    );
  };

  const calculateAverageRating = () =>
    (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1);

  return (
    <div className={`${fullWidth ? "w-full" : "w-1/2"} ${maxHeight ? "" : "max-h-[70vh]"} overflow-auto`}>
      {/* Average Rating and Filters */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          {/* <span className="text-[16px] font-medium">Average Rating:</span> */}
          <div className="flex items-center text-lg text-gray-600">
            <StarRating rating={parseFloat(calculateAverageRating())} />
          </div>
          <span className="text-sm text-gray-600">(2.5K)</span>
        </div>
        <div className="flex gap-1">
          <button
            className="rounded-full border-0 gap-1 text-[14px] px-2 py-1 bg-gray-100"
            onClick={() => setColumn((prev) => (prev === 1 ? 2 : 1))}
          >
            <IoMdSwitch />
          </button>
          <button className="rounded-2xl border-0 gap-1 text-[14px] px-2 py-1 bg-gray-100">
            <FaUndo />
          </button>
          <button
            className="rounded-2xl border-0 gap-1 text-[14px] px-2 py-1 bg-gray-100"
            onClick={handleRatingSort}
          >
            Rating
          </button>
        </div>
      </div>

      {/* Reviews Grid */}
      <div className={`grid gap-2 ${column === 1 ? "lg:grid-cols-1" : "lg:grid-cols-2"} grid-cols-1`}>
        {reviews.map((review) => (
          <div key={review.id} className="border border-gray-200 shadow-sm bg-white rounded-lg p-2 w-auto">
            <div className="flex gap-2">
              {/* Image and Reviewer */}
              <div className="flex flex-col items-center justify-center">
                <img
                  src={review.imgSrc}
                  alt={review.altText}
                  className="w-[40px] h-[40px] rounded-full bg-gray-100"
                />
                <div className="text-center text-[10px]">{review.reviewer}</div>
              </div>
              {/* Rating */}
              <div className="flex flex-col">
                <div className="text-[12px] border flex w-[50px] rounded-lg items-center justify-center">
                  <IoIosStar className="text-black" />
                  &nbsp; {review.rating}
                </div>
                <div className="text-[11px]">2 days before</div>
              </div>
              {column === 1 && (
                <div>
                  <div className="text-[12px]">{review.reviewContent.slice(0, 120)}</div>
                </div>
              )}
            </div>
            {column === 2 && (
              <div>
                <div className="text-sm p-2">{review.reviewContent.slice(0, 120)}</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentList;
