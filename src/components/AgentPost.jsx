import React, { useCallback, useMemo, useRef } from "react";
import { Euro, MapPin, Trash, EditPencil } from "../assets/icons";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";

const PriceSection = React.memo(({ price }) => (
  <div className="flex items-center justify-start gap-2 mb-2 text-lg font-semibold text-[#525C76]">
    {price} <Euro size={20} />
  </div>
));

const RoomAreaFloorSection = React.memo(
  ({ room, area, currFloor, building }) => (
    <div className="flex flex-row justify-between gap-2 mb-2">
      <div className="text-sm text-[#525C76] font-medium">{room} Rooms</div>
      <div className="text-sm text-[#525C76] font-medium">{area} sq.m</div>
      <div className="text-sm text-[#525C76] font-medium">
        {currFloor} / {building} Floor
      </div>
    </div>
  )
);

const LocationSection = React.memo(({ location }) => (
  <div className="flex items-center gap-4 mt-3 text-[#525C76] font-medium">
    <div>
      <MapPin />
    </div>
    <motion.span
      className="text-sm font-bold text-[#525C76]"
      whileHover={{
        color: "#A673EF",
        scale: 1.05,
        transition: { duration: 0.2 },
      }}
    >
      {location}
    </motion.span>
  </div>
));

const handleDeletePost = (id) => {
  if (window.confirm("Are you sure you want to delete this property?")) {
    fetch(`https://flatty.abyssara.tech/api/v1/property/record/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      credentials: "include",
    });
    window.location.reload();
  }
};

export const AgentPost = React.memo(
  ({ id, img, price, location, rooms, area, currFloor, building }) => {
    return (
      <div
        className="block border rounded-[6px] border-[#EEEFF2] p-2 pb-2 relative sm:w-full outline-[#EEEFF2]"
        style={{
          boxShadow: "0px 1px 1px 0px #703ACA14",
        }}
      >
        {/* Image Section with Slider */}
        <div className="relative w-full h-[173px] rounded-[6px] overflow-hidden">
          <img
            src={img}
            alt={`Slide ${id}`}
            className="object-cover w-full h-[173px]"
          />
          {/* Trash and EditPencil Icons */}
          <div className="absolute flex gap-2 bottom-2 right-2">
            <div className="w-[33px] h-[33px] flex justify-center items-center bg-black bg-opacity-50 rounded-full cursor-pointer "
              onClick={() => handleDeletePost(id)}
            >
              <Trash color="black" size="20"/>
            </div>
            {/* <div className="w-[33px] h-[33px]  flex justify-center items-center bg-black bg-opacity-50 rounded-full cursor-pointer ">
              <EditPencil color="black" size="20" />
            </div> */}
          </div>
        </div>

        {/* Information Section */}
        <div className="py-2">
          <PriceSection price={price} />
          <RoomAreaFloorSection
            room={rooms}
            area={area}
            currFloor={currFloor}
            building={building}
          />
          <LocationSection location={location} />
        </div>
      </div>
    );
  }
);

export default AgentPost;
