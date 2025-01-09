import React from "react";
import { Link } from "react-router-dom";
import { MapPin } from "../assets/icons";
import { motion } from "framer-motion";

const ComplexTitle = React.memo(({ title }) => (
  <div className="flex items-center justify-start gap-2 mb-2 text-lg font-semibold text-[#525C76]">
    {title}
  </div>
));

// Room, Area, and Floor Section Component
const RoomAreaFloor = React.memo(({ roomCount }) => (
  <div className="flex flex-row justify-between gap-2 mb-2">
    <div className="text-sm text-[#525C76] font-medium">{roomCount} Units</div>
  </div>
));

// Location Section Component
const Location = React.memo(({ address }) => (
  <div className="flex items-center gap-4 mt-3 text-[#525C76] font-medium">
    <div aria-hidden="true">
      <MapPin />
    </div>
    <motion.span
      className="text-sm font-medium text-[#525C76]"
      whileHover={{
        color: "#A673EF",
        transition: { duration: 0.2 },
      }}
    >
      {address}
    </motion.span>
  </div>
));

export const ComplexCard = React.memo(
  ({ id, img, title, roomCount, address }) => {
    return (
      <Link
        to={`/complex/${id}`}
        className="block border rounded-[6px] border-[#EEEFF2] p-2 pb-2 relative sm:w-full outline-[#EEEFF2] lg:h-[299px]"
        style={{
          boxShadow: "0px 1px 1px 0px #703ACA14",
        }}
        aria-label={`View details for ${title}`}
      >
        {/* Image Section with Motion */}
        <motion.div
          className="rounded-[6px] overflow-hidden w-full h-[173px] relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src={img}
            alt={`Image of ${title}`}
            className="object-cover w-full h-full"
            loading="lazy" // For lazy loading
          />
        </motion.div>

        {/* Information Section */}
        <div className="py-2">
          <ComplexTitle title={title} />
          <RoomAreaFloor roomCount={roomCount} />
          <Location address={address} />
        </div>
      </Link>
    );
  }
);

export default ComplexCard;
