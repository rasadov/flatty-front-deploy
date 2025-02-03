import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowDown, ShowMap } from "../../assets/icons";
import { useNavigate } from "react-router-dom";

const cities = [
  "Lefkoşa",
  "Girne",
  "Gazimağusa",
  "Güzelyurt",
  "İskele",
  "Lefke",
  "Lapta",
  "Koruçam",
  "Alsancak",
  "Değirmenlik",
  "Esentepe",
  "Dikmen",
  "Mehmetçik",
  "Karpaz",
  "Dipkarpaz",
  "Yeni Erenköy",
  "Geçitkale",
  "Beşparmak",
];

export const Searchbar = ({
  onShowMap,
  onSearch,
  value,
  onChange,
  filters,
  API_URL,
  setData,

  home,

  redirectPath = "/search",

}) => {
  const [dropdownStates, setDropdownStates] = useState({
    category: [],
    roomNumber: [],
    priceRange: { Min: "", Max: "" },
    location: value || "",
    city: null,
    area: { min: "", max: "" },
  });
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const navigate = useNavigate();

  // Use saved currency or default to "£"
  const [selectedCurrency] = useState(
    localStorage.getItem("currency") === null ? "£" : localStorage.getItem("currency")
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

  // Fetch data whenever the URL changes OR dropdown states change
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

    let categories = [];
    queryString = queryString.replace(/category=([^&]*)/g, (match, p1) => {
      categories.push(decodeURIComponent(p1)); // Collect all decoded category values
      return ""; // Remove the original category match
    });

    if (categories.length > 0) {
      queryString += `&category=${categories.join(",")}`;
    }

    const currentParams = new URLSearchParams(window.location.search);
    const queryString = currentParams.toString();


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
  }, [window.location.search, dropdownStates, API_URL, setData]);

  // Build a fresh set of query params from the current state (no merging with old)
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

    let categories = [];
    queryString = queryString.replace(/category=([^&]*)/g, (match, p1) => {
      categories.push(decodeURIComponent(p1)); // Collect all decoded category values
      return ""; // Remove the original category match
    });

    if (categories.length > 0) {
      queryString += `&category=${categories.join(",")}`;
    }

    navigate(`/search?${queryString}`);

    const queryParams = new URLSearchParams();
    queryParams.set("page", 1);
    queryParams.set("elements", 50);

    // 1) Category
    if (dropdownStates.category) {
      queryParams.set("category", dropdownStates.category);
    }

    // 2) Room Number
    if (dropdownStates.roomNumber.length > 0) {
      // Example: ["Studio","1+1"] => "0,1"
      // Now ignoring EVERYTHING after the plus sign:
      const mapped = dropdownStates.roomNumber.map((val) => {
        if (val.toLowerCase() === "studio") {
          return "0";
        }
        // If there's a plus sign, keep only the part before it
        const plusIndex = val.indexOf("+");
        if (plusIndex !== -1) {
          return val.substring(0, plusIndex); // "3+1" => "3"
        }
        return val; // no plus sign => use original
      });
      console.log("Mapped:", mapped);
      const joined = mapped.join(",");
      console.log("Joined:", joined);

      queryParams.set("roomNumber", mapped.join(","));
    }

    // 3) Price Range
    const { Min, Max } = dropdownStates.priceRange;
    if (Min) {
      queryParams.set(
        "priceRangeMin",
        Math.round(Min * currencies_to_dollar[selectedCurrency])
      );
    }
    if (Max) {
      queryParams.set(
        "priceRangeMax",
        Math.round(Max * currencies_to_dollar[selectedCurrency])
      );
    }

    // 4) Area
    const { min, max } = dropdownStates.area;
    if (min) {
      queryParams.set("areaFrom", min);
    }
    if (max) {
      queryParams.set("areaTo", max);
    }

    // 5) City
    if (dropdownStates.city) {
      queryParams.set("city", dropdownStates.city);
    }

    // 6) Location
    if (dropdownStates.location) {
      queryParams.set("location", dropdownStates.location);
    }

    navigate(`${redirectPath}?${queryParams.toString()}`);
    console.log("Final query:", queryParams.toString());

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

  const handleCheckboxChange = (option) => {
    setDropdownStates((prevState) => {
      const newCategories = prevState.category.includes(option)
        ? prevState.category.filter((cat) => cat !== option)
        : [...prevState.category, option];
      return {
        ...prevState,
        category: newCategories,
      };
    });
  };

  const handleShowOnMap = () => {
    // Show on map
    window.location = "/map";
  };

  const handleDropdownToggle = (type) => {
    setDropdownOpen((prev) => (prev === type ? null : type));
  };

  const handleSelectOption = (type, newValue) => {
    setDropdownStates((prevState) => ({
      ...prevState,
      [type]: newValue,
    }));
    if (type !== "location") setDropdownOpen(null);
  };

  const handlePriceChange = (e, type) => {
    const val = e.target.value;
    setDropdownStates((prevState) => ({
      ...prevState,
      priceRange: { ...prevState.priceRange, [type]: val },
    }));
  };

  const clearLocation = () => {
    setDropdownStates((prevState) => ({
      ...prevState,
      location: "",
    }));
    onChange?.(""); // Notify parent if needed
  };

  // Renders the content of each dropdown
  const renderDropdownContent = (type) => {
    switch (type) {
      case "city":
        return (
          <div className="p-4">
            {cities.map((cityItem, index) => (
              <p
                key={index}
                onClick={() => handleSelectOption("city", cityItem)}
                className="py-2 transition-colors hover:bg-gray-200 text-[#525C76] text-sm"
              >
                {cityItem}
              </p>
            ))}
          </div>
        );
      case "category":
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

          <div className="p-4">
            {["Appartment", "Villa", "Penthouse", "Cottages"].map((cat) => (
              <p
                key={cat}
                onClick={() => handleSelectOption("category", cat)}
                className="py-2 transition-colors hover:bg-gray-200 text-[#525C76] text-sm"
              >
                {cat}
              </p>
            ))}
          </div>
        );
        case "roomNumber":
          return (
            <div className="absolute mt-2 w-[260px] bg-white border rounded-md shadow-lg z-10">
              <div className="grid grid-cols-3 gap-2 p-4">
                {/* Each button sets e.g. "3+1" into state */}
                {["Studio", "1+1", "2+1", "3+1", "4+1", "5+1"].map((room) => (
                  <button
                    key={room}
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

                
               
                className="w-1/2 px-2 py-1 border-[1px]  focus:outline-none border-gray-300 focus:ring-2 focus:ring-[rgba(130,71,229,1)] rounded-md text-[#525C76] text-sm"

                value={dropdownStates.priceRange.Min}
                onChange={(e) => handlePriceChange(e, "Min")}
                
              />
              <input
                type="number"
                placeholder="Max"

                
                
                className="w-1/2 px-2 py-1 border border-gray-300 border-[1px]  focus:outline-none focus:ring-2 focus:ring-[rgba(130,71,229,1)] rounded-md text-[#525C76] text-sm"

                value={dropdownStates.priceRange.Max}
                onChange={(e) => handlePriceChange(e, "Max")}
                
              />
            </div>
          </div>
        );
      case "area":
        return (
          <div className="p-4">
            <div className="flex space-x-2">
              <input
                type="number"
                placeholder="Min area"
                value={dropdownStates.area.min}
                onChange={(e) =>
                  setDropdownStates((prev) => ({
                    ...prev,
                    area: { ...prev.area, min: e.target.value },
                  }))
                }
                className="w-1/2 px-2 py-1 border border-gray-300 rounded-md text-[#525C76] text-sm"
              />
              <input
                type="number"
                placeholder="Max area"
                value={dropdownStates.area.max}
                onChange={(e) =>
                  setDropdownStates((prev) => ({
                    ...prev,
                    area: { ...prev.area, max: e.target.value },
                  }))
                }
                className="w-1/2 px-2 py-1 border border-gray-300 rounded-md text-[#525C76] text-sm"
=
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

      className="max-w-full w-full mx-auto bg-white rounded-lg shadow-lg flex flex-wrap items-center gap-4 "
      style={{
        boxShadow: "0px 1px 1px 0px #703ACA14",
        padding: "5px",
      }}

      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Category Dropdown */}
      <div className="relative flex-shrink-0 w-full sm:w-[180px]">
        <button
          onClick={() => handleDropdownToggle("category")}
          className="flex items-center justify-between w-full px-4 py-2 text-left bg-white "
        >
          <span className="text-[#525C76] text-sm font-semibold">Category</span>
          <motion.div
            animate={{ rotate: dropdownOpen === "category" ? 180 : 0 }}
          >
            <ArrowDown />
          </motion.div>
        </button>
        {dropdownOpen === "category" && (
          <motion.div
            className="absolute left-0 right-0 z-10 mt-2 bg-white rounded-md shadow-lg p-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {["Apartment", "Villa", "Penthouse", "Cottages"].map((option) => (
              <label
                key={option}
                className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-md"
              >
                <input
                  type="checkbox"
                  checked={dropdownStates.category.includes(option)}
                  onChange={() => handleCheckboxChange(option)}
                  className="form-checkbox text-[rgba(130, 71, 229, 1)] focus:ring-[rgba(130, 71, 229, 1)] focus:ring-2 h-5 w-5 border-[rgba(130, 71, 229, 1)]"
                  style={{
                    accentColor: "rgba(130, 71, 229, 1)",
                    border: "none",
                    outline: "none",
                    boxShadow: "none",
                  }}
                />
                <span className="text-sm text-[#525C76]">{option}</span>
              </label>
            ))}
          </motion.div>
        )}
      </div>

      {/* Room Number Dropdown */}
      <div className="relative flex-shrink-0 w-full sm:w-[190px]">
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
      <div className="relative flex-shrink-0 w-full sm:w-[160px]">
        <button
          onClick={() => handleDropdownToggle("price")}
          className="flex items-center justify-between w-full px-4 py-2 bg-white"
        >
          <span className="text-[#525C76] text-sm font-semibold">
            {dropdownStates.priceRange.Min || dropdownStates.priceRange.Max
              ? `${selectedCurrency}${dropdownStates.priceRange.Min} - ${selectedCurrency}${dropdownStates.priceRange.Max}`
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
      <div className="relative flex-shrink-0 w-full sm:w-[160px]">
        <button
          onClick={() => handleDropdownToggle("area")}
          className="flex items-center justify-between w-full px-4 py-2 text-left bg-white"
        >
          <span className="text-[#525C76] text-sm font-semibold">
            {dropdownStates.area.min || dropdownStates.area.max
              ? `${dropdownStates.area.min} - ${dropdownStates.area.max} m²`
              : "Area"}
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
        {/* Show on map */}
        <button
          onClick={handleShowOnMap}
          className="flex items-center justify-center px-4 py-2 text-[#8247E5] bg-white h-[50px] w-full sm:w-auto font-semibold rounded-md shadow-md sm:shadow-none"
        >
          <ShowMap />
          <span className="ml-2 text-sm sm:text-base">
            {" "}
            {home ? "Show on map" : "Show on list"}{" "}
          </span>
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

export default Searchbar;
