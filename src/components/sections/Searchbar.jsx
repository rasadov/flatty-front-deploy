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
    roomNumber: [],
    priceRange: { Min: "", Max: "" },
    location: value || "",
    city: null,
    area: null,
  });
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const navigate = useNavigate();
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

  
  useEffect(() => {
    setDropdownStates((prevState) => ({
      ...prevState,
      location: value || "",
    }));
  }, [value]);

  useEffect(() => {
   
    const currentParams = new URLSearchParams(location.search);
    const currentFilters = {};
    currentParams.forEach((value, key) => {
      currentFilters[key] = value;
    });

    const combinedFilters = {
      ...currentFilters, 
    };

    let queryString = new URLSearchParams(combinedFilters).toString();

    queryString = queryString.replace(/roomNumber=([^&]*)/g, (match, p1) => {
      return `roomNumber=${decodeURIComponent(p1)}`;
    });

    fetch(`${API_URL}?${queryString}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data search bar", data);
        setData(data);
      });
  }, [location.search, dropdownStates, API_URL, setData]);

  const handleSearch = (event) => {
    event.preventDefault();

    const currentParams = new URLSearchParams(window.location.search);

    
    const currentFilters = {};
    currentParams.forEach((value, key) => {
      currentFilters[key] = value;
    });

    const combinedFilters = {
      ...currentFilters, 
      ...dropdownStates, 
    };

    const queryParams = new URLSearchParams();
    queryParams.append("page", 1);
    queryParams.append("elements", 10);

    
    Object.entries(combinedFilters).forEach(([key, value]) => {
      if (
        value !== null &&
        value !== undefined &&
        value !== "" &&
        value !== 0
      ) {
        if (key === "roomNumber" && Array.isArray(value)) {
          
          queryParams.append(key, value.join(","));
        } else if (typeof value === "object" && !Array.isArray(value)) {
         
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
            queryParams.append(key, item);
          });
        } else {
          queryParams.append(key, value);
        }
      }
    });

    let queryString = queryParams.toString();

   
    queryString = queryString.replace(/roomNumber=([^&]*)/g, (match, p1) => {
      return `roomNumber=${decodeURIComponent(p1)}`;
    });

  
    navigate(`/search?${queryString}`);
  };

  const handleRoomSelect = (room) => {
    setDropdownStates((prevState) => {
      if (prevState.roomNumber.includes(room)) {
        return {
          ...prevState,
          roomNumber: prevState.roomNumber.filter((r) => r !== room),
        };
      } else {
        return {
          ...prevState,
          roomNumber: [...prevState.roomNumber, room],
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
              {["Studio", "1", "2", "3", "4", "5+"].map((room, index) => (
                <button
                  key={index}
                  onClick={() => handleRoomSelect(room)}
                  className={`flex items-center justify-center px-4 py-2 border rounded-md text-gray-700 focus:outline-none ${
                    dropdownStates.roomNumber.includes(room)
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
      className="max-w-full w-full mx-auto bg-white rounded-lg shadow-lg flex flex-wrap items-center gap-4 p-4 sm:p-6"
      style={{
        boxShadow: "0px 1px 1px 0px #703ACA14",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Category Dropdown */}
      <div className="relative flex-shrink-0 w-full sm:w-[200px]">
        <button
          onClick={() => handleDropdownToggle("category")}
          className="flex items-center justify-between w-full px-4 py-2 text-left bg-white"
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
            className="absolute left-0 right-0 z-10 mt-2 bg-white rounded-md shadow-lg"
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
      <div className="relative flex-shrink-0 w-full sm:w-[150px]">
        <button
          onClick={() => handleDropdownToggle("roomNumber")}
          className="flex items-center justify-between w-full px-4 py-2 bg-white"
        >
          <span className="text-[#525C76] text-sm font-semibold">
            Room Number
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
            className="absolute left-0 right-0 z-10 mt-2 bg-white rounded-md shadow-lg"
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
      <div className="relative flex-shrink-0 w-full sm:w-[170px]">
        <button
          onClick={() => handleDropdownToggle("price")}
          className="flex items-center justify-between w-full px-4 py-2 bg-white"
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
            className="absolute left-0 right-0 z-10 mt-2 bg-white rounded-md shadow-lg"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {renderDropdownContent("price")}
          </motion.div>
        )}
      </div>

      {/* Area Dropdown */}
      <div className="relative flex-shrink-0 w-full sm:w-[170px]">
        <button
          onClick={() => handleDropdownToggle("area")}
          className="flex items-center justify-between w-full px-4 py-2 text-left bg-white"
        >
          <span className="text-[#525C76] text-sm font-semibold">
            {dropdownStates.area || "Area"}
          </span>
          <motion.div
            animate={{ rotate: dropdownOpen === "area" ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ArrowDown />
          </motion.div>
        </button>
        {dropdownOpen === "area" && (
          <motion.div
            className="absolute left-0 right-0 z-10 mt-2 bg-white rounded-md shadow-lg"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {renderDropdownContent("area")}
          </motion.div>
        )}
      </div>

      {/* City Dropdown */}
      <div className="relative flex-shrink-0 w-full sm:w-[170px]">
        <button
          onClick={() => handleDropdownToggle("city")}
          className="flex items-center justify-between w-full px-4 py-2 text-left bg-white"
        >
          <span className="text-[#525C76] text-sm font-semibold">
            {dropdownStates.city || "City"}
          </span>
          <motion.div
            animate={{ rotate: dropdownOpen === "city" ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ArrowDown />
          </motion.div>
        </button>
        {dropdownOpen === "city" && (
          <motion.div
            className="absolute left-0 right-0 z-10 mt-2 bg-white rounded-md shadow-lg"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {renderDropdownContent("city")}
          </motion.div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mt-4 sm:mt-0">
        {/* Кнопка "Show on map" */}
        <button
          onClick={handleShowOnMap}
          className="flex items-center justify-center px-4 py-2 text-[#8247E5] bg-white h-[50px] w-full sm:w-auto font-semibold rounded-md shadow-md sm:shadow-none"
        >
          <ShowMap />
          <span className="ml-2 text-sm sm:text-base">Show on map</span>
        </button>

        {/* Кнопка "Search" */}
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

export default Searchbar;
