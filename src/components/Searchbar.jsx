import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Cancel, MapPin, ShowMap } from "../assets/icons";

const Searchbar = () => {
  const [dropdownStates, setDropdownStates] = useState({
    category: null,
    roomNumber: null,
    priceRange: { min: "", max: "" },
    location: null,
  });
  const [dropdownOpen, setDropdownOpen] = useState(null);

  const handleSearch = () => {
    const { min, max } = dropdownStates.priceRange;
    console.log(`Searching with price range: $${min} - $${max}`);
    // You can implement the logic to filter/search based on the price range here
  };

  const handleShowOnMap = () => {
    console.log("Showing location on map...");
  };

  const handleDropdownToggle = (type) => {
    setDropdownOpen((prev) => (prev === type ? null : type));
  };

  const handleSelectOption = (type, value) => {
    setDropdownStates((prevState) => ({
      ...prevState,
      [type]: value,
    }));
    setDropdownOpen(null); // Close the dropdown after selecting
  };

  const handlePriceChange = (e, type) => {
    const value = e.target.value;
    setDropdownStates((prevState) => ({
      ...prevState,
      priceRange: {
        ...prevState.priceRange,
        [type]: value,
      },
    }));
  };

  const renderDropdownContent = (type) => {
    switch (type) {
      case "category":
        return (
          <div className="p-4">
            <p
              onClick={() => handleSelectOption(type, "Option 1")}
              className="py-2 transition-colors hover:bg-gray-200 text-[#525C76]  text-sm"
            >
              Option 1
            </p>
            <p
              onClick={() => handleSelectOption(type, "Option 2")}
              className="py-2 transition-colors hover:bg-gray-200 text-[#525C76]  text-sm"
            >
              Option 2
            </p>
            <p
              onClick={() => handleSelectOption(type, "Option 3")}
              className="py-2 transition-colors hover:bg-gray-200 text-[#525C76]  text-sm"
            >
              Option 3
            </p>
          </div>
        );
      case "roomNumber":
        return (
          <div className="p-4">
            <p
              onClick={() => handleSelectOption(type, "1 Room")}
              className="p-2 transition-colors hover:bg-gray-200 text-[#525C76]  text-sm"
            >
              1 Room
            </p>
            <p
              onClick={() => handleSelectOption(type, "2 Rooms")}
              className="p-2 transition-colors hover:bg-gray-200 text-[#525C76]  text-sm"
            >
              2 Rooms
            </p>
            <p
              onClick={() => handleSelectOption(type, "3 Rooms")}
              className="p-2 transition-colors hover:bg-gray-200 text-[#525C76]  text-sm"
            >
              3 Rooms
            </p>
          </div>
        );
      case "price":
        return (
          <div className="p-4">
            <div className="flex space-x-2">
              <input
                type="number"
                placeholder="Min"
                value={dropdownStates.priceRange.min}
                onChange={(e) => handlePriceChange(e, "min")}
                className="w-1/2 px-2 py-1 border border-gray-300 rounded-md text-[#525C76]  text-sm"
              />
              <input
                type="number"
                placeholder="Max"
                value={dropdownStates.priceRange.max}
                onChange={(e) => handlePriceChange(e, "max")}
                className="w-1/2 px-2 py-1 border border-gray-300 rounded-md text-[#525C76]  text-sm"
              />
            </div>
          </div>
        );
      case "location":
        return (
          <div className="p-4">
            <p
              onClick={() => handleSelectOption(type, "Location 1")}
              className="p-2 transition-colors hover:bg-gray-200 text-[#525C76]  text-sm "
            >
              Location 1
            </p>
            <p
              onClick={() => handleSelectOption(type, "Location 2")}
              className="p-2 transition-colors hover:bg-gray-200 text-[#525C76]  text-sm"
            >
              Location 2
            </p>
            <p
              onClick={() => handleSelectOption(type, "Location 3")}
              className="p-2 transition-colors hover:bg-gray-200 text-[#525C76]  text-sm"
            >
              Location 3
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      className="max-w-full w-full sm:w-[320px] md:w-[768px] xl:w-[1131px] h-[54px] mx-auto bg-white rounded-lg shadow-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div
        className="grid items-center w-full h-full grid-cols-1 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-6"
        style={{ height: "54px" }}
      >
        {/* Category Dropdown */}
        <div className="relative">
          <button
            onClick={() => handleDropdownToggle("category")}
            className="flex items-center justify-between w-full px-4 py-2 text-left bg-white"
          >
            <span className="text-[#525C76]  text-sm font-semibold">
              {dropdownStates.category || "Category"}
            </span>
            <motion.div
              animate={{ rotate: dropdownOpen === "category" ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ArrowDown />
            </motion.div>
          </button>
          {dropdownOpen === "category" && (
            <motion.div
              className="absolute left-0 right-0 z-10 mt-2 bg-white border border-gray-300 rounded-md shadow-lg"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {renderDropdownContent("category")}
            </motion.div>
          )}
        </div>

        {/* Room Number Dropdown */}
        <div className="relative">
          <button
            onClick={() => handleDropdownToggle("roomNumber")}
            className="flex items-center justify-between w-full px-4 bg-white border-l-2"
          >
            <span className="text-[#525C76]  text-sm font-semibold">
              {dropdownStates.roomNumber || "Room Numbers"}
            </span>
            <motion.div
              animate={{ rotate: dropdownOpen === "roomNumber" ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ArrowDown />
            </motion.div>
          </button>
          {dropdownOpen === "roomNumber" && (
            <motion.div
              className="absolute left-0 right-0 z-10 mt-2 bg-white border border-gray-300 rounded-md shadow-lg"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {renderDropdownContent("roomNumber")}
            </motion.div>
          )}
        </div>

        {/* Price Range Dropdown */}
        <div className="relative">
          <button
            onClick={() => handleDropdownToggle("price")}
            className="flex items-center justify-between w-full px-4 bg-white border-l-2"
          >
            <span className="text-[#525C76]  text-sm font-semibold">
              {dropdownStates.priceRange.min || dropdownStates.priceRange.max
                ? `$${dropdownStates.priceRange.min} - $${dropdownStates.priceRange.max}`
                : "Price"}
            </span>
            <motion.div
              animate={{ rotate: dropdownOpen === "price" ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ArrowDown />
            </motion.div>
          </button>
          {dropdownOpen === "price" && (
            <motion.div
              className="absolute left-0 right-0 z-10 mt-2 bg-white border border-gray-300 rounded-md shadow-lg"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {renderDropdownContent("price")}
            </motion.div>
          )}
        </div>

        {/* Location Dropdown */}
        <div className="relative">
          <button
            onClick={() => handleDropdownToggle("location")}
            className="flex items-center justify-between w-full px-4 bg-white border-l-2"
          >
            <MapPin />
            <span className="text-[#525C76]  text-sm font-semibold">
              {dropdownStates.location || "Location"}
            </span>
            <motion.div
              animate={{ rotate: dropdownOpen === "location" ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <Cancel />
            </motion.div>
          </button>
          {dropdownOpen === "location" && (
            <motion.div
              className="absolute left-0 right-0 z-10 mt-2 bg-white border border-gray-300 rounded-md shadow-lg"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {renderDropdownContent("location")}
            </motion.div>
          )}
        </div>

        <button
          onClick={handleShowOnMap}
          className="flex items-center justify-center px-4 py-4 text-xl text-[#8247E5] bg-white border-2 border-[#8247E5] h-[54px] font-semibold"
        >
          <ShowMap />
          <span className="ml-2">Show on Map</span>
        </button>

        <motion.button
          onClick={handleSearch}
          className="bg-[#8247E5] hover:bg-[#A673EF] text-xl text-white col-span-2 sm:col-span-1 md:col-span-1 lg:col-span-1 transition-colors duration-300 h-full rounded-r-md font-semibold"
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
