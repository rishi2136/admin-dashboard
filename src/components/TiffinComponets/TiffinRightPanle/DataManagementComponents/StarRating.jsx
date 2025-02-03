import React from 'react'
import {
    IoIosStar, IoIosStarHalf, IoIosStarOutline
} from "react-icons/io";

const StarRating = ({ rating }) => {
    const renderStars = () => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const decimalPart = rating % 1;

        // Add filled stars
        for (let i = 0; i < fullStars; i++) {
            stars.push(
                <IoIosStar
                    size={15}
                    key={`full-${i}`}
                    className="text-yellow-400"
                />
            );
        }

        // Add partial star if decimal part exists
        if (decimalPart > 0) {
            // For decimal parts between 0.3 and 0.7, show half star
            if (decimalPart >= 0.3 && decimalPart <= 0.7) {
                stars.push(
                    <IoIosStarHalf
                        size={15}
                        key="half"
                        className="text-yellow-400"
                    />
                );
            }
            // For decimal parts > 0.7, show full star
            else if (decimalPart > 0.7) {
                stars.push(
                    <IoIosStar
                        size={15}
                        key="almost-full"
                        className="text-yellow-400"
                    />
                );
            }
            // For decimal parts < 0.3, show empty star
            else {
                stars.push(
                    <IoIosStarOutline
                        size={15}
                        key="almost-empty"
                        className="text-yellow-400"
                    />
                );
            }
        }

        const remainingStars = 5 - Math.ceil(rating);
        for (let i = 0; i < remainingStars; i++) {
            stars.push(
                <IoIosStarOutline
                    size={15}
                    key={`empty-${i}`}
                    className="text-gray-300"
                />
            );
        }

        return stars;
    };
    return (
        <div>
            <div className="flex items-center gap-1">
                <span className="ml-1 text-sm">
                    {rating.toFixed(1)}
                </span>
                {renderStars()}
            </div>
        </div>
    )
}

export default StarRating
