import React from "react";
import Rating from "./Rating";
import apparment from "../assets/images/apparment.png";

const TestimonialCard = ({ imageSrc, rating, text, name }) => {
  return (
    <div className=" bg-white border border-borderGray rounded-md h-auto sm:h-auto lg:h-[190px] p-4 transition-all hover:shadow-xl">
      {/* Rating Component */}
      <Rating rating={rating} />
      {/* Testimonial Text */}
      <div className="my-3 text-sm text-[#525C76">
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
          <span className="text-sm font-semibold">{name}</span>
        </div>
      </div>
    </div>
  );
};
export default TestimonialCard;
