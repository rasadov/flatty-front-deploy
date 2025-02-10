import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin } from "../assets/icons";

const ComplexTitle = React.memo(({ title }) => (
  <div className="flex items-center justify-start gap-2 mb-2 text-lg font-semibold text-[#525C76] leading-tight">
    {title}
  </div>
));

const RoomAreaFloor = React.memo(({ roomCount }) => (
  <div className="flex flex-row justify-between gap-2 mb-2">
    <div className="text-sm text-[#525C76] font-medium">{roomCount} Units</div>
  </div>
));

const Location = React.memo(({ address }) => (
  <div className="flex items-center gap-2 text-[#525C76] font-medium">
    <div aria-hidden="true" className="shrink-0">
      <MapPin />
    </div>
    <motion.span
      className="text-sm font-medium text-[#525C76] truncate"
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
  ({ id, img, title, roomCount, address, complex }) => {
    return (
      <Link
        to={`/complex/${id}`}
        className="block border rounded-[6px] border-[#EEEFF2] p-2 pb-2 relative sm:w-full outline-[#EEEFF2] lg:h-[320px] flex flex-col custom-shadow"
        style={{ boxShadow: "0px 1px 1px 0px #703ACA14" }}
        aria-label={`View details for ${title}`}
      >
        {/* Image Section */}
        <div className="relative w-full rounded-[6px] overflow-hidden">
          {img && img.length > 0 ? (
            <motion.div
              className="rounded-[6px] overflow-hidden w-full h-[250px] relative flex-shrink-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
             <img
          src={img}
          alt={`Image of ${title}`}
          className="object-cover w-full h-full"
          loading="lazy"
        />
            </motion.div>
          ) : (
            <div className="w-full h-[250px] flex items-center justify-center">
              No images available
            </div>
          )}
        </div>

        {/* Information Section */}
        <div className="py-2 flex flex-col flex-grow">
          <ComplexTitle title={title} />
          <RoomAreaFloor roomCount={roomCount} />
          <div className="mt-auto">
            <Location address={address} />
          </div>
        </div>
      </Link>
    );
  }
);

export default ComplexCard;