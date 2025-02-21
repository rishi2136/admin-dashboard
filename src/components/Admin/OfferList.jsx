import React, { useState } from "react";
import Slider from "react-slick";
import { offers } from "../../data/info";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "gray",
        borderRadius: "50%",
        color: "black",
      }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "gray",
        borderRadius: "50%",
        color: "black",
      }}
      onClick={onClick}
    />
  );
}

function OfferList() {
  const settings = {
    dots: true, // show indicator dots below
    infinite: false, // disable infinite scrolling if you'd like
    speed: 500,
    slidesToShow: 3, // how many cards to show at once
    slidesToScroll: 1, // how many cards to scroll at a time
    arrows: true, // show left/right arrows
    adaptiveHeight: true, // adjusts the height to fit slides
    className: "w-[700px] m-auto h-[150px] scrollOffer",
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    // you can tweak more options here: https://react-slick.neostack.com/docs/api
  };

  return (
    <div className="slider-container my-4">
      <h1 className="overview-heading">Running Offers</h1>
      <Slider {...settings}>
        {offers.map((el, idx) => (
          <div key={idx} className="bg-transparent p-2">
            <div className="p-4 h-[160px] rounded-lg border border-gray-300 bg-white shadow-sm hover:shadow-md  ">
              <div className="flex justify-end gap-x-2 -mt-2">
                <button className="text-blue-400">Edit</button>
                <button
                  className="text-red-400"
                  onClick={() => {
                    handleDelete();
                  }}
                >
                  Delete
                </button>
              </div>

              <h2 className="font-semibold text-gray-800 text-sm lg:text-[15px] mb-2 ">
                {el.title}
              </h2>

              <p className="text-gray-600 text-[12px] lg:text-sm">
                {el.description.slice(0, 80)}
              </p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default OfferList;
