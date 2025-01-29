import React, { useCallback, useMemo, useRef } from "react";
import { Euro, MapPin, Trash, EditPencil } from "../assets/icons";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { formatNumber } from './numberFormater'; 


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
  <div className="flex items-center gap-2 mt-3 text-[#525C76] font-medium flex-wrap w-full">
    <div aria-hidden="true" className="shrink-0">
      <MapPin />
    </div>
    <motion.span
      className="text-sm font-medium text-[#525C76] w-full min-w-0 truncate"
      whileHover={{
        color: "#A673EF",
        transition: { duration: 0.2 },
      }}
    >
      {address}
    </motion.span>
  </div>
));

const handleDeleteComplex = (id) => {
  if (window.confirm("Are you sure you want to delete this property?")) {
    fetch(`https://api.flatty.ai/api/v1/listing/record/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      credentials: "include",
    });
    window.location.href = "/profile";
  }
};

export const AgentComplex = React.memo(
    ({ id, img, title, roomCount, address }) => {

    return (
        <>
        <Link
        to={`/complex/${id}`}
        className="block border rounded-[6px] border-[#EEEFF2] p-2 pb-2 relative sm:w-full outline-[#EEEFF2] lg:h-[299px]"
        style={{ boxShadow: "0px 1px 1px 0px #703ACA14" }}
        aria-label={`View details for ${title}`}
        >
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
            loading="lazy"
            />
            {/* Trash and EditPencil Icons */}
          <div className="absolute flex gap-2 bottom-2 right-2">
            <div className="w-[33px] h-[33px] flex justify-center items-center bg-black bg-opacity-50 rounded-full cursor-pointer "
              onClick={() => handleDeleteComplex(id)}
              >
              <Trash color="black" size="20"/>
            </div>
            {/* <div className="w-[33px] h-[33px]  flex justify-center items-center bg-black bg-opacity-50 rounded-full cursor-pointer ">
              <EditPencil color="black" size="20" />
              </div> */}
          </div>
        </motion.div>
  
        <div className="py-2 flex flex-col">
          <ComplexTitle title={title} />
          <RoomAreaFloor roomCount={roomCount} />
          <Location address={address} />
        </div>
      </Link>
    </>
    );
  }
);

export default AgentComplex;
