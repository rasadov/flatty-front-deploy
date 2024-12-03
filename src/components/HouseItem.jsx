import React, { useState } from "react";
import { HeartFull, MapPin } from "../assets/icons";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Euro } from "../assets/icons/Euro";
import { HeartEmpty } from "../assets/icons/HeartEmpty";

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

  return (
    <motion.div
      className="block transition-shadow duration-300 border shadow-md hover:shadow-lg rounded-[6px] border-[#EEEFF2] p-2 pb-2 relative w-[294px] h-[300px] "
      whileHover={{
        scale: 1.05,
        boxShadow: "0 6px 20px rgba(0, 0, 0, 0.1)",
        transition: { duration: 0.3 },
      }}
      whileTap={{
        scale: 0.98,
        transition: { duration: 0.1 },
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <Link to="/details" className="block">
        {/* Image Section with Motion */}
        <motion.div className="rounded-[6px] overflow-hidden w-full h-[173px] relative">
          <img src={img} alt="Room" className="object-cover w-full h-full" />

          {/* Heart Icon */}
          <motion.div
            className="absolute cursor-pointer bottom-2 right-2"
            whileHover={{ scale: 1.2 }}
            onClick={(e) => {
              e.preventDefault();
              setLiked(!liked);
            }}
          >
            {liked ? (
              <HeartFull className="w-6 h-6 text-[#A673EF]" />
            ) : (
              <HeartEmpty className="w-6 h-6 text-[#bbb]" />
            )}
          </motion.div>
        </motion.div>

        {/* Information Section */}
        <div className="py-2">
          {/* Price Section */}
          <motion.div
            className="flex items-center justify-start gap-2 mb-2 text-lg font-semibold text-[#525C76]"
            whileHover={{
              transition: { duration: 0.2 },
            }}
          >
            {price} <Euro />
          </motion.div>

          {/* Room, Area, and Floor Section */}
          <div className="flex flex-row justify-between gap-2 mb-2">
            <motion.div
              className="text-sm text-[#525C76]"
              whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
            >
              {room} Rooms
            </motion.div>
            <motion.div
              className="text-sm text-[#525C76]"
              whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
            >
              {area} sq.m
            </motion.div>
            <motion.div
              className="text-sm text-[#525C76]"
              whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
            >
              {currFloor} / {building} Floor
            </motion.div>
          </div>

          {/* Location Section */}
          <div className="flex items-center gap-4 text-[#525C76]">
            <motion.div
              whileHover={{
                scale: 1.4,
                rotate: 20,
                transition: { duration: 0.3 },
              }}
            >
              <MapPin />
            </motion.div>
            <motion.span
              className="text-sm"
              whileHover={{
                color: "#A673EF",
                transition: { duration: 0.2 },
              }}
            >
              {location}
            </motion.span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default HouseItem;
