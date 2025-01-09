import React, { useState } from "react";
import Rating from "./Rating";
import apparment from "../assets/images/apparment.png";

export const TestimonialCard = ({ imageSrc, rating, text, name }) => {
  const [setRating] = useState(4);

  // Function to handle star rating click
  const handleRatingClick = (value) => {
    setRating(value);
  };

  return (
    <div className="p-4 transition-all bg-white border rounded-md border-borderGray hover:shadow-xl">
      {/* Rating Component */}
      <Rating rating={rating} onRatingClick={handleRatingClick} />
      {/* Testimonial Text */}
      <div className="my-3 text-sm text-[#525C76 font-medium leading-[22.4px]">
        <p>{text}</p>
      </div>
      <hr className="my-4 border-t-2 border-x-stone-950" />
      {/* User Info */}
      <div className="flex items-center gap-2">
        <img
          src={apparment || imageSrc}
          alt="Testimonial User"
          className="rounded-full w-[30px] h-[30px] object-cover"
        />
        <div>
          <span className="text-[16px] font-semibold text-[#525C76] leading-[25.6px]">
            {name}
          </span>
        </div>
      </div>
    </div>
  );
};
export default TestimonialCard;
