import React, { useState } from "react";
import { motion } from "framer-motion";
import { ShowMap, SearchIcon } from "../../assets/icons";
import { useNavigate } from "react-router-dom";

export const SearchbarMobile = () => {
  const [dropdownStates, setDropdownStates] = useState({
    category: null,
    roomNumber: null,
    priceRange: { min: "", max: "" },
    location: null,
  });
  const navigate = useNavigate();
  const handleSearch = () => {
    const { min, max } = dropdownStates.priceRange;
    console.log(`Searching with price range: $${min} - $${max}`);
    navigate("/search");
  };

  const handleShowOnMap = () => {
    console.log("Showing location on map...");
  };

  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    console.log(`Search input changed to: ${value}`);
  };

  return (
    <motion.div
      className="max-w-full w-full mx-auto bg-white rounded-md shadow-lg flex items-center"
      style={{
        boxShadow: "0px 1px 1px 0px #703ACA14",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative flex-grow">
        <input
          type="text"
          onChange={handleSearchInputChange}
          placeholder="Search..."
          className="w-full px-4 py-2 text-left rounded-l-md focus:outline-none"
          style={{
            // backgroundColor: "rgba(108, 114, 127, 1)",
            color: "rgba(108, 114, 127, 1)",
          }}
        />
      </div>

      <button
        onClick={handleShowOnMap}
        className="flex items-center justify-center mx-1 text-xl text-[#8247E5] bg-white font-semibold rounded-md"
        style={{
          width: "44px",
          height: "44px",
          borderRadius: "3px",
          border: "1px solid #8247E5",
        }}
      >
        <ShowMap />
      </button>

      <motion.button
        onClick={handleSearch}
        className="flex items-center justify-center text-xl text-white bg-[#8247E5] hover:bg-[#A673EF] transition-colors duration-300 font-semibold rounded-md mx-1"
        style={{
          width: "44px",
          height: "44px",
          borderRadius: "3px",
          border: "1px solid #8247E5",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <SearchIcon />
      </motion.button>
    </motion.div>
  );
};

export default SearchbarMobile;
