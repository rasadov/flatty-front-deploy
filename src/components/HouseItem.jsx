import React, { useState, useCallback } from "react";
import { HeartFull, MapPin } from "../assets/icons";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Euro } from "../assets/icons/Euro";
import { HeartEmpty } from "../assets/icons/HeartEmpty";

// Heart Button Component
const HeartButton = ({ liked, onClick }) => (
  <motion.div
    className="absolute cursor-pointer bottom-2 right-2"
    whileHover={{ scale: 1.2 }}
    onClick={onClick}
  >
    {liked ? (
      <HeartFull className="w-6 h-6 text-[#A673EF]" />
    ) : (
      <HeartEmpty className="w-6 h-6 text-[#bbb]" />
    )}
  </motion.div>
);

// Price Section Component
const PriceSection = ({ price }) => (
  <motion.div
    className="flex items-center justify-start gap-2 mb-2 text-lg font-semibold text-[#525C76]"
    whileHover={{
      transition: { duration: 0.2 },
    }}
  >
    {price} <Euro size={20} />
  </motion.div>
);

// Room, Area, and Floor Section Component
const RoomAreaFloorSection = ({ room, area, currFloor, building }) => (
  <div className="flex flex-row justify-between gap-2 mb-2">
    <div className="text-sm text-[#525C76] font-medium">{room} Rooms</div>
    <div className="text-sm text-[#525C76] font-medium">{area} sq.m</div>
    <div className="text-sm text-[#525C76] font-medium">
      {currFloor} / {building} Floor
    </div>
  </div>
);

// Location Section Component
const LocationSection = ({ location }) => (
  <div className="flex items-center gap-4 mt-3 text-[#525C76] font-medium">
    <div>
      <MapPin />
    </div>
    <motion.span
      className="text-sm font-medium text-[#525C76]"
      whileHover={{
        color: "#A673EF",
        transition: { duration: 0.2 },
      }}
    >
      {location}
    </motion.span>
  </div>
);

export const HouseItem = ({
  img,
  price,
  room,
  area,
  currFloor,
  building,
  location,
}) => {
  const [liked, setLiked] = useState(false);

  const handleLikeClick = useCallback((e) => {
    e.preventDefault();
    setLiked((prev) => !prev);
  }, []);

  return (
    <div
      className="block border rounded-[6px] border-[#EEEFF2] p-2 pb-2 relative sm:w-full outline-[#EEEFF2]"
      style={{
        boxShadow: "0px 1px 1px 0px #703ACA14",
      }}
    >
      {/* Image Section with Motion */}
      <motion.div className="rounded-[6px] overflow-hidden w-full h-[173px] relative">
        <img src={img} alt="Room" className="object-cover w-full h-full" />
        <HeartButton liked={liked} onClick={handleLikeClick} />
      </motion.div>

      {/* Information Section */}
      <div className="py-2">
        <PriceSection price={price} />
        <RoomAreaFloorSection
          room={room}
          area={area}
          currFloor={currFloor}
          building={building}
        />
        <LocationSection location={location} />
      </div>
    </div>
  );
};

export default HouseItem;
