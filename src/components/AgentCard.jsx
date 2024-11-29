import React, { useState } from "react";
import { motion } from "framer-motion"; // Framer Motion importu
import Button from "./Button";
import { UserCircle } from "../assets/icons";
import { Link } from "react-router-dom";
import AgencyMiniCard from "./AgencyMiniCard";
import Rating from "./Rating";
import { ContactIcon } from "../assets/icons/ContactIcon";
import apparment from "../assets/images/apparment.png";

const AgentCard = () => {
  const [rating, setRating] = useState(4); // Example: set initial rating as 4 stars

  // Function to handle star rating click
  const handleRatingClick = (value) => {
    setRating(value);
  };

  return (
    <motion.div
      className="px-4 py-6 bg-white border rounded-md shadow-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      whileHover={{
        scale: 1.03,
        boxShadow: "0 8px 30px rgba(0, 0, 0, 0.15)",
        transition: { duration: 0.3 },
      }}
    >
      {/* Agent Image and Details */}
      <Link to={""} className="flex justify-start gap-2">
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
          <div className="font-semibold text-gray-900 ">Name Surname</div>
          <div className="text-sm text-gray-500">Senior Real Estate Agent </div>
          <Rating rating={rating} onRatingClick={handleRatingClick} />
        </div>
      </Link>

      <hr className="my-4 border-t-2 border-gray-200" />

      {/* Experience and Specializations */}
      <div>
        <p className="text-xs text-gray-500">
          Experience: <span className="text-sm text-slate-900 ">5+ Years</span>
        </p>
        <p className="text-xs text-gray-500">Specializations:</p>
        <ul>
          <li className="text-sm text-slate-900">- Property Management</li>
          <li className="text-sm text-slate-900">- Real Estate Development</li>
        </ul>
      </div>

      <hr className="my-4 border-t-2 border-gray-200" />

      {/* Agency Card */}
      <motion.div
        whileHover={{
          scale: 1.05,
          transition: { duration: 0.3 },
        }}
      >
        <AgencyMiniCard
          agencyName="Emtan Construction"
          agencyProfileLink="/agency-profile"
        />
      </motion.div>

      {/* Buttons */}
      <motion.div whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}>
        <Button
          className="w-full text-white py-[5px] px-3 mt-3 rounded-sm"
          variant="primary"
        >
          <UserCircle color="white" />
          View Profile
        </Button>
      </motion.div>
      <motion.div whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}>
        <Button
          className="w-full py-[5px] px-3 my-2 text-[#8247E5] rounded-sm"
          variant="cancel"
        >
          <ContactIcon />
          <p className="text-[#8247E5]">Contact</p>
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default AgentCard;
