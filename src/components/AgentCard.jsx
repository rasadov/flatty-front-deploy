import React, { useState } from "react";
import { motion } from "framer-motion"; // Framer Motion importu
import Button from "./Button";
import { Link } from "react-router-dom";
import AgencyMiniCard from "./AgencyMiniCard";
import Rating from "./Rating";
import { ContactIcon } from "../assets/icons/ContactIcon";
import apparment from "../assets/images/apparment.png";
import { UserCircleFill } from "../assets/icons/UserCircleFill";

export const AgentCard = (props) => {
  const [rating, setRating] = useState(0);

  const handleRatingClick = (value) => {
    // setRating(value);
  };
  console.log(props);

  return (
    <motion.div
      className="px-4 py-6 bg-white border rounded-md shadow-lg outline-[#EEEFF2] flex flex-col justify-between min-h-[320px] custom-shadow"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      style={{
        boxShadow: "0px 1px 1px 0px #703ACA14",
      }}
    >
      {/* <Link to={"/agent"} className="flex justify-start gap-2"> */}
        <motion.img
          src={props.image.image_url}
          alt="Agent's Picture"
          className="object-cover w-[78px] h-[78px] rounded-full mb-4"
        />
        <div>
          <div className="font-semibold text-[#525C76] text-[16px] leading-[25.6px]">
            {props.name}
          </div>
          <div className="text-sm text-[#525C76] font-medium">
            Flatty Real Estate Agent
          </div>
          <Rating rating={5} onRatingClick={handleRatingClick} initialRating={5} />
        </div>
      {/* </Link> */}

      <hr className="my-4 border-t-2 border-gray-200" />

      <div className="flex-grow">
        <p className="text-xs text-[#525C76] leading-[19.2px] font-medium">
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
          <li className="text-sm text-[#525C76] font-semibold leading-[22.4px]">
            - Real Estate Development
          </li>
        </ul>
      </div>

      <hr className="my-4 border-t-2 border-gray-200" />

      {/* <motion.div>
        <AgencyMiniCard
          agencyName="Emtan Construction"
          agencyProfileLink="/complex"
        />
      </motion.div> */}

      <div className="mt-auto">
        <Button
          className="w-full py-[5px] px-3 my-2 text-white rounded-sm"
          variant="primary"
        >
          <UserCircleFill />
          <p className="text-white text-sm font-semibold leading-[22.4px]">
            <Link to={`/agent/${props.id}`}>View Profile</Link>
          </p>
        </Button>
        <Button
          className="w-full py-[5px] px-3 my-2 text-[#8247E5] rounded-sm"
          variant="cancel"
        >
          <ContactIcon />
          <p className="text-[#8247E5] text-sm font-semibold leading-[22.4px]">
            <a
              target="_blank"
              href={`https://api.whatsapp.com/send?phone=${props.phone}`}
            >
              Contact
            </a>
          </p>
        </Button>
      </div>
    </motion.div>
  );
};

export default AgentCard;
