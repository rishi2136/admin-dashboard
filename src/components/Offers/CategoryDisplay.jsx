// src/components/Offers/CategoryDisplay.jsx

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import ItemCard from "./ItemCard";

/**
 * props:
 *  - data: array of categories (each has name, subcategories, etc.)
 *  - offers: array of current offers
 *  - title: string heading
 */
function CategoryDisplay({ data, offers, title }) {
  // Slick slider settings
  const settings = {
    dots: true, // show indicator dots below
    infinite: false, // disable infinite scrolling if you'd like
    speed: 500,
    slidesToShow: 3, // how many cards to show at once
    slidesToScroll: 1, // how many cards to scroll at a time
    arrows: true, // show left/right arrows
    adaptiveHeight: true, // adjusts the height to fit slides
    // you can tweak more options here: https://react-slick.neostack.com/docs/api
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-2 text-gray-800">{title}</h2>

      {data.length === 0 ? (
        <p className="text-gray-500">No items currently have offers here.</p>
      ) : (
        data.map((cat) => (
          <div key={cat.name} className="mb-4">
            <h3 className="text-lg font-semibold text-gray-700">{cat.name}</h3>
            {cat.subcategories.map((sub) => (
              <div key={sub.name} className="ml-4 mt-2">
                <h4 className="text-md font-medium text-gray-600">
                  {sub.name}
                </h4>

                {/* Instead of grid or map, we wrap sub.items in a Slider */}
                <Slider {...settings} className="mt-3">
                  {sub.items.map((itm) => (
                    <div key={itm.id} className="px-2">
                      {/* px-2 for spacing around each slide/card */}
                      <ItemCard item={itm} allOffers={offers} />
                    </div>
                  ))}
                </Slider>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
}

export default CategoryDisplay;
