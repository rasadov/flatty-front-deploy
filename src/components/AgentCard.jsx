import React, { useState } from "react";
import { motion } from "framer-motion"; // Framer Motion importu
import Button from "./Button";
import { Link } from "react-router-dom";
import AgencyMiniCard from "./AgencyMiniCard";
import Rating from "./Rating";
import { ContactIcon } from "../assets/icons/ContactIcon";
import apparment from "../assets/images/apparment.png";
import { UserCircleFill } from "../assets/icons/UserCircleFill";

const AgentCard = () => {
  const [rating, setRating] = useState(4); // Example: set initial rating as 4 stars

  // Function to handle star rating click
  const handleRatingClick = (value) => {
    setRating(value);
  };

  return (
    <motion.div
      className="px-4 py-6 bg-white border rounded-md shadow-lg outline-[#EEEFF2]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      style={{
        boxShadow: "0px 1px 1px 0px #703ACA14",
      }}
    >
      {/* Agent Image and Details */}
      <Link to={"/agent"} className="flex justify-start gap-2">
        <motion.img
          src={apparment}
          alt="Agent's Picture"
          className="object-cover w-[78px] h-[78px] rounded-full"
          whileHover={{
            scale: 1.1,
            transition: { duration: 0.3 },
          }}
        />
        <div>
          <div className="font-semibold text-[#525C76] text-[16px] leading-[25.6px] ">
            Name Surname
          </div>
          <div className="text-sm text-[#525C76] font-medium">
            Senior Real Estate Agent{" "}
          </div>
          <Rating rating={rating} onRatingClick={handleRatingClick} />
        </div>
      </Link>

      <hr className="my-4 border-t-2 border-gray-200" />

      {/* Experience and Specializations */}
      <div>
        <p className="text-xs text-[#525C76]  leading-[19.2px] font-medium">
          Experience:{" "}
          <span className="text-sm text-[#525C76] font-semibold leading-[22.4px]">
            5+ Years
          </span>
        </p>
        <p className="text-xs text-[#525C76] mb-[2px] leading-[19.2px] font-medium">
          Specializations:
        </p>
        <ul>
          <li className="text-sm text-[#525C76] font-semibold leading-[22.4px]">
            - Property Management
          </li>
          <li className="text-sm text-[#525C76] font-semibold  leading-[22.4px]">
            - Real Estate Development
          </li>
        </ul>
      </div>

      <hr className="my-4 border-t-2 border-gray-200" />

      {/* Agency Card */}
      <motion.div>
        <AgencyMiniCard
          agencyName="Emtan Construction"
          agencyProfileLink="/complex"
        />
      </motion.div>

      {/* Buttons */}
      <Link to={"/agent"}>
        <Button
          className="w-full text-white py-[5px] px-3 mt-3 rounded-sm text-sm font-semibold leading-[22.4px]"
          variant="primary"
        >
          <UserCircleFill color="white" />
          View Profile
        </Button>
      </Link>
      <div>
        <Button
          className="w-full py-[5px] px-3 my-2 text-[#8247E5] rounded-sm"
          variant="cancel"
        >
          <ContactIcon />
          <p className="text-[#8247E5] text-sm font-semibold leading-[22.4px]">
            Contact
          </p>
        </Button>
      </div>
    </motion.div>
  );
};

export default AgentCard;
