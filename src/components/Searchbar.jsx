import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Cancel, MapPin, ShowMap } from "../assets/icons";

const Searchbar = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [roomNumber, setRoomNumber] = useState(null);
  const [priceRange, setPriceRange] = useState(null);
  const [location, setLocation] = useState(null);

  const handleSearch = () => {
    console.log("Searching...");
  };

  const handleShowOnMap = () => {
    console.log("Showing location on map...");
  };

  return (
    <motion.div
      className="max-w-full w-full sm:w-[320px] md:w-[768px] xl:w-[1131px] h-[54px] mx-auto bg-white rounded-lg shadow-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div
        className="grid w-full h-full grid-cols-1 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-6"
        style={{ height: "54px" }}
      >
        <button
          onClick={() => setSelectedCategory("Category")}
          className="flex items-center justify-between px-4 text-left bg-white "
        >
          <span className="text-gray-700">Category</span>
          <ArrowDown />
        </button>

        <button
          onClick={() => setRoomNumber("Room Numbers")}
          className="flex items-center justify-between px-4 my-auto text-left align-middle bg-white border-l-2"
          style={{ height: "40px" }}
        >
          <span className="text-gray-700">Room Numbers</span>
          <ArrowDown />
        </button>

        <button
          onClick={() => setPriceRange("Price")}
          className="flex items-center justify-between px-4 my-auto text-left align-middle bg-white border-l-2"
          style={{ height: "40px" }}
        >
          <span className="text-gray-700">Price</span>
          <ArrowDown />
        </button>

        <button
          onClick={() => setLocation("Location")}
          className="flex items-center justify-between px-4 my-auto text-left align-middle bg-white border-l-2"
          style={{ height: "40px" }}
        >
          <span className="text-gray-700">Location</span>
          <MapPin />
          {location && <Cancel />}
        </button>

        <button
          onClick={handleShowOnMap}
          className="flex items-center justify-center px-4 py-2 text-[#8247E5] bg-white border-2 border-[#8247E5] "
        >
          <ShowMap />
          <span className="ml-2">Show on Map</span>
        </button>

        <motion.button
          onClick={handleSearch}
          className="bg-[#8247E5] hover:bg-[#A673EF] text-white font-bold col-span-2 sm:col-span-1 md:col-span-1 lg:col-span-1 transition-colors duration-300 h-full rounded-r-md"
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

export default Searchbar;
