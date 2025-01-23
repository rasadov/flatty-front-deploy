import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowDown, MapPin, ShowMap } from "../../assets/icons";
import { useNavigate } from "react-router-dom";
import { LocationCancel } from "../../assets/icons/LocationCancel";
import { useDispatch } from "react-redux";
import { loadSearchResults } from "../../store/slices/searchSlice";

export const Searchbar = ({
  onShowMap,
  onSearch,
  value,
  onChange,
  filters,
  API_URL,
  setData,
}) => {
  const [dropdownStates, setDropdownStates] = useState({
    category: null,
    roomNumbers: [],
    priceRange: { min: "", max: "" },
    location: value || "",
  });
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedCurrency, setSelectedCurrency] = useState(
    localStorage.getItem("currency") === null
      ? "£"
      : localStorage.getItem("currency")
  );
  const currencies_to_dollar = {
    "€": 1.03,
    "£": 1.22,
    $: 1,
    "₺": 0.028,
  };

  // Sync the location with the prop 'value'
  useEffect(() => {
    setDropdownStates((prevState) => ({
      ...prevState,
      location: value || "",
    }));
  }, [value]);

  const handleSearch = () => {
    let filters;
    try {
      filters = JSON.parse(localStorage.getItem("filters"));
      if (!filters) {
        filters = {}; // Set a default value if filters is null
      }
    } catch (error) {
      console.error("Error parsing filters from localStorage:", error);
      filters = {}; // Set a default value if parsing fails
    }

    const combinedFilters = {
      ...filters, // from Redux/FilterModal
      ...dropdownStates, // from local dropdown
    };

    // Build query parameters from the merged object
    const queryParams = new URLSearchParams();

    Object.entries(combinedFilters).forEach(([key, value]) => {
      if (
        value !== null &&
        value !== undefined &&
        value !== "" &&
        value !== 0
      ) {
        if (typeof value === "object" && !Array.isArray(value)) {
          Object.entries(value).forEach(([subKey, subValue]) => {
            if (
              subValue !== null &&
              subValue !== undefined &&
              subValue !== "" &&
              subValue !== 0
            ) {
              if (key === "priceRange") {
                queryParams.append(
                  `${key}${subKey}`,
                  Math.round(subValue * currencies_to_dollar[selectedCurrency])
                );
              } else {
                queryParams.append(`${key}${subKey}`, subValue);
              }
            }
          });
        } else if (Array.isArray(value)) {
          value.forEach((item) => {
            if (
              item !== null &&
              item !== undefined &&
              item !== "" &&
              item !== 0
            ) {
              queryParams.append(key, item);
            }
          });
        } else {
          queryParams.append(key, value);
        }
      }
    });

    // Run your Redux logic, e.g. loadSearchResults with merged filters
    onSearch(() => dispatch(loadSearchResults(combinedFilters)));

    // Navigate with all selected filters in the URL
    const queryString = queryParams.toString();

    fetch(`${API_URL}?${queryString}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  };

  const handleRoomSelect = (room) => {
    setDropdownStates((prevState) => {
      if (prevState.roomNumbers.includes(room)) {
        return {
          ...prevState,
          roomNumbers: prevState.roomNumbers.filter((r) => r !== room),
        };
      } else {
        return {
          ...prevState,
          roomNumbers: [...prevState.roomNumbers, room],
        };
      }
    });
  };

  const handleShowOnMap = () => {
    // Redirect to map page when Show on Map is clicked
    window.location = "/map";
  };

  const handleDropdownToggle = (type) => {
    setDropdownOpen((prev) => (prev === type ? null : type));
  };

  const handleSelectOption = (type, value) => {
    setDropdownStates((prevState) => ({
      ...prevState,
      [type]: value,
    }));
    if (type !== "location") setDropdownOpen(null);
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

  const handleLocationChange = (e) => {
    const value = e.target.value;
    setDropdownStates((prevState) => ({
      ...prevState,
      location: value,
    }));
  };

  const clearLocation = () => {
    setDropdownStates((prevState) => ({
      ...prevState,
      location: "",
    }));
    onChange(""); // Notify parent that location is cleared
  };

  const renderDropdownContent = (type) => {
    switch (type) {
      case "category":
        return (
          <div className="p-4">
            <p
              onClick={() => handleSelectOption(type, "Appartment")}
              className="py-2 transition-colors hover:bg-gray-200 text-[#525C76] text-sm"
            >
              Appartment
            </p>
            <p
              onClick={() => handleSelectOption(type, "Villa")}
              className="py-2 transition-colors hover:bg-gray-200 text-[#525C76] text-sm"
            >
              Villa
            </p>
            <p
              onClick={() => handleSelectOption(type, "Penthouse")}
              className="py-2 transition-colors hover:bg-gray-200 text-[#525C76] text-sm"
            >
              Penthouse
            </p>
            <p
              onClick={() => handleSelectOption(type, "Cottages")}
              className="py-2 transition-colors hover:bg-gray-200 text-[#525C76] text-sm"
            >
              Cottages
            </p>
          </div>
        );
      case "roomNumber":
        return (
          <div className="absolute mt-2 w-[260px] bg-white border rounded-md shadow-lg z-10">
            <div className="grid grid-cols-3 gap-2 p-4">
              {["Studio", "2", "3", "4", "5", "6+"].map((room, index) => (
                <button
                  key={index}
                  onClick={() => handleRoomSelect(room)}
                  className={`flex items-center justify-center px-4 py-2 border rounded-md text-gray-700 focus:outline-none ${
                    dropdownStates.roomNumbers.includes(room)
                      ? "border-purple-500 bg-white text-black"
                      : "bg-gray-200"
                  }`}
                >
                  {room}
                </button>
              ))}
            </div>
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
                className="w-1/2 px-2 py-1 border border-gray-300 rounded-md text-[#525C76] text-sm"
              />
              <input
                type="number"
                placeholder="Max"
                value={dropdownStates.priceRange.max}
                onChange={(e) => handlePriceChange(e, "max")}
                className="w-1/2 px-2 py-1 border border-gray-300 rounded-md text-[#525C76] text-sm"
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      className="max-w-full w-full mx-auto bg-white rounded-l-sm rounded-r-sm shadow-lg flex flex-col sm:flex-row"
      style={{
        boxShadow: "0px 1px 1px 0px #703ACA14",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div
        className="grid items-center w-full h-full grid-cols-1 sm:grid-cols-4 lg:grid-cols-4"
        style={{ height: "54px" }}
      >
        {/* Category Dropdown */}
        <div className="relative">
          <button
            onClick={() => handleDropdownToggle("category")}
            className="flex items-center justify-between w-full px-4 py-2 ml-1 text-left bg-white"
          >
            <span className="text-[#525C76] text-sm font-semibold">
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
            className="flex items-center justify-between w-full px-4 py-2 bg-white border-l-2"
          >
            <span className="text-[#525C76] text-sm font-semibold">
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
              className="absolute left-0 right-0 z-10 mt-2 w-[211px] bg-white rounded-md shadow-lg"
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
            className="flex items-center justify-between w-full px-4 py-2 bg-white border-l-2"
          >
            <span className="text-[#525C76] text-sm font-semibold">
              {dropdownStates.priceRange.min || dropdownStates.priceRange.max
                ? `${selectedCurrency}${dropdownStates.priceRange.min} - ${selectedCurrency}${dropdownStates.priceRange.max}`
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
              className="absolute left-0 right-0 z-10 mt-2 w-[211px] bg-white border border-gray-300 rounded-md shadow-lg"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {renderDropdownContent("price")}
            </motion.div>
          )}
        </div>

        {/* Location Input */}
        <div className="relative">
          <div className="flex items-center justify-between w-full px-4 bg-white border-l-2 h-[20px]">
            <div className="relative flex items-center gap-[8px] w-full ">
              <MapPin />
              <input
                type="text"
                placeholder="Location"
                value={dropdownStates.location}
                onChange={handleLocationChange}
                className="w-full border-none pl-1 py-2 text-[#525C76] text-sm font-semibold bg-transparent pr-10 focus:outline-none focus:border-2 focus:border-[#8247E5]"
                style={{ height: "36px", lineHeight: "36px" }}
              />
              <motion.button
                onClick={clearLocation}
                className="absolute right-2 top-[9px] cursor-pointer z-10"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {dropdownStates.location ? (
                  <LocationCancel />
                ) : (
                  <LocationCancel className="opacity-50" />
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center">
        <button
          onClick={handleShowOnMap}
          className="flex items-center justify-center px-4 py-4 text-xl w-[188px] text-[#8247E5] bg-white border-2 border-[#8247E5] h-[54px] font-semibold"
        >
          <ShowMap />
          <span className="ml-1 text-[18px] w-[127px] h-[32px]">
            Show on Map
          </span>
        </button>

        <motion.button
          onClick={handleSearch}
          className="bg-[#8247E5] hover:bg-[#A673EF] text-xl w-[100px] text-white col-span-2 sm:col-span-1 md:col-span-1 lg:col-span-1 transition-colors duration-300 h-full rounded-r-md font-semibold"
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
