import React, { useState } from "react";
import { motion } from "framer-motion";
import { ShowMap, SearchIcon } from "../../assets/icons";
import { useNavigate } from "react-router-dom";

export const SearchbarMobile = () => {
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate("/search", { state: { filterOpen: true } });
  };

  const handleShowOnMap = () => {
    navigate("/map");
  };

  return (
    <motion.div
      className="max-w-full w-full mx-auto  rounded-md shadow-lg flex items-center"
      style={{
        boxShadow: "0px 1px 1px 0px #703ACA14",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto  sm:mt-0">
              {/* Show on Map */}
              <button
                onClick={handleShowOnMap}
                className="flex items-center justify-center px-4 py-2 text-[#8247E5] bg-white h-[50px] w-full sm:w-auto font-semibold rounded-md shadow-md sm:shadow-none"
              >
                <ShowMap />
                <span className="ml-2 text-sm sm:text-base">Show on map</span>
              </button>
              {/* Search */}
              <motion.button
                onClick={handleSearch}
                className="bg-[#8247E5] hover:bg-[#A673EF] text-white px-6 py-3 w-full sm:w-auto h-[50px] sm:h-auto rounded-md font-semibold shadow-md sm:shadow-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Search
              </motion.button>
            </div>

      
    </motion.div>
  );
};

export default SearchbarMobile;