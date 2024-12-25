import React, { useState, useMemo, useEffect, useCallback } from "react";
import Searchbar from "../components/Searchbar";
import RangeInput from "../components/RangeInput";
import HouseItem from "../components/HouseItem";
import Pagination from "../components/Pagination";
import {
  DropdownUnder,
  FilterButton,
  CheckboxFill,
  CheckboxSquare,
} from "../assets/icons";
import { data } from "../data.js";

import FilterModal from "../components/FilterModal";
import { Link } from "react-router-dom";
import SelectedFilters from "../components/SelectedFilters.jsx";

// Filter options
const types = ["Apartment", "House", "Villa", "Land", "Garage", "Commercial"];
const roomNumbers = ["Studio", "2", "3", "4", "5", "6"];
const currencies = ["USD", "EUR", "AZN"];

const Search = () => {
  // State management
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState([]);
  const [priceRange, setPriceRange] = useState({ from: "", to: "" });
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchResults, setSearchResults] = useState([]);
  const [totalPages, setTotalPages] = useState(10);

  // Fetch results (simulating an API call)
  const fetchResults = async (page) => {
    const fakeData = Array.from({ length: 10 }, (_, i) => ({
      id: i + 1 + (page - 1) * 10,
      name: `Item ${(page - 1) * 10 + (i + 1)}`,
    }));
    setSearchResults(fakeData);
    setTotalPages(99);
  };

  useEffect(() => {
    fetchResults(currentPage);
  }, [currentPage]);

  // Memoized Filter Logic
  const filteredItems = useMemo(() => {
    return data.filter((item) => {
      const matchesType = selectedTypes.length
        ? selectedTypes.includes(item.type)
        : true;
      const matchesRoom = selectedRoom.length
        ? selectedRoom.includes(item.room.toString()) // Ensure room is a string to compare correctly
        : true;
      const matchesPrice =
        (!priceRange.from || item.price >= Number(priceRange.from)) &&
        (!priceRange.to || item.price <= Number(priceRange.to));
      const matchesSearchQuery = item.location
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesType && matchesRoom && matchesPrice && matchesSearchQuery;
    });
  }, [selectedTypes, selectedRoom, priceRange, searchQuery]);

  // Event Handlers (with useCallback)
  const handleTypeChange = useCallback((type) => {
    setSelectedTypes((prevSelected) =>
      prevSelected.includes(type)
        ? prevSelected.filter((item) => item !== type)
        : [...prevSelected, type]
    );
  }, []);
  const handleRoomChange = useCallback(
    (selected) => setSelectedRoom(selected),
    []
  );
  const handleCurrencyChange = useCallback(
    (e) => setSelectedCurrency(e.target.value),
    []
  );
  const handleSearchQueryChange = useCallback(
    (query) => setSearchQuery(query),
    []
  );
  const handlePriceRangeChange = useCallback(
    (field, value) => setPriceRange((prev) => ({ ...prev, [field]: value })),
    []
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Dropdown Toggles (Ensuring only one dropdown is open at a time)
  const [dropdownState, setDropdownState] = useState({
    typeOpen: false,
    roomOpen: false,
    priceOpen: false,
  });

  // Toggle Dropdown State
  const toggleDropdown = (dropdown) => {
    setDropdownState((prevState) => {
      return {
        ...prevState,
        typeOpen: dropdown === "typeOpen" ? !prevState.typeOpen : false,
        roomOpen: dropdown === "roomOpen" ? !prevState.roomOpen : false,
        priceOpen: dropdown === "priceOpen" ? !prevState.priceOpen : false,
      };
    });
  };

  return (
    <div className="w-full mx-auto">
      {/* Searchbar and Filter Button */}
      <div className="flex items-center justify-center w-full gap-4 mt-36">
        <Searchbar value={searchQuery} onChange={handleSearchQueryChange} />
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex justify-center items-center w-[54px] h-[54px] bg-white border border-[#A673EF] rounded-md"
        >
          <FilterButton />
        </button>
      </div>

      {/* Filter Dropdowns */}
      <div className="flex flex-wrap w-full gap-4 mt-6">
        {/* Type Filter Dropdown */}
        <div className="relative">
          <button
            onClick={() => toggleDropdown("typeOpen")}
            className="flex items-center justify-between gap-1 px-2 py-2 w-[133px] h-[32px] bg-white  rounded-md shadow-sm focus:border-[#8247E5] focus:outline-none"
            style={{
              boxShadow: "0px 1px 1px 0px #703ACA14",
            }}
          >
            <span className="text-xs font-semibold text-[#525C76]">Type</span>
            <DropdownUnder />
          </button>
          {dropdownState.typeOpen && (
            <div className="absolute z-10 mt-2 w-[130px] h-[200px] bg-white  mx-auto rounded-md shadow-lg overflow-y-auto">
              {types.map((type) => (
                <button
                  key={type} // Unikal "key" atributu button elementində olmalıdır
                  onClick={() => handleTypeChange(type)} // Toggle selected type
                  className="flex items-center px-2 py-4 w-[114px] h-[24px] text-sm cursor-pointer gap-2 mx-auto"
                  style={{
                    fontSize: "12px", // 12px yazı ölçüsü
                  }}
                >
                  <div className="flex items-center gap-2">
                    {/* Checkbox Icon Switch with Animation */}
                    {selectedTypes.includes(type) ? (
                      <CheckboxFill />
                    ) : (
                      <CheckboxSquare />
                    )}
                    <span className="text-[#8C93A3]">{type}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Room Number Filter Dropdown */}
        <div className="relative">
          <button
            onClick={() => toggleDropdown("roomOpen")}
            className="flex items-center justify-between gap-1 px-2 py-2 w-[133px] h-[32px] bg-white rounded-md shadow-sm focus:border-[#8247E5] focus:outline-none"
            style={{
              boxShadow: "0px 1px 1px 0px #703ACA14",
            }}
          >
            <span className="text-xs font-semibold text-[#525C76]">
              Room Number
            </span>
            <DropdownUnder />
          </button>
          {dropdownState.roomOpen && (
            <div className="absolute z-10 mt-2 p-2 w-[242px] m-auto h-[94px] grid grid-cols-3  bg-white border mx-auto border-gray-300 rounded-md shadow-lg ">
              {roomNumbers.map((room) => (
                <label
                  key={room}
                  className="flex items-center w-[70px] h-[35px] gap-2 py-4 mx-auto text-sm cursor-pointer"
                >
                  <button
                    onClick={() => handleRoomChange([room])} // Seçimlər əlavə etmək və ya silmək
                    className=" text-center text-sm text-[#0F1D40]  border border-[#6433C4] rounded-[8px] "
                    style={{
                      fontSize: "12px", // 12px yazı ölçüsü
                      width: "70px ",
                      height: "35px ", // 35px ədəd ölçüsü
                    }}
                  >
                    {room}
                  </button>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Price Range Filter Dropdown */}
        <div className="relative">
          <button
            onClick={() => toggleDropdown("priceOpen")}
            className="flex items-center justify-between gap-1 px-2 py-2 w-[133px] h-[32px] bg-white rounded-md shadow-sm focus:border-[#8247E5] focus:outline-none "
            style={{
              boxShadow: "0px 1px 1px 0px #703ACA14",
            }}
          >
            <span className="text-xs font-semibold text-[#525C76]">Price</span>
            <DropdownUnder />
          </button>
          {dropdownState.priceOpen && (
            <div className="absolute z-10 mt-2 w-[392px] h-[86px] bg-white border mx-auto border-gray-300 rounded-md shadow-lg overflow-y-auto flex justify-center  items-center">
              <RangeInput
                label="Price Range"
                from={priceRange.from}
                to={priceRange.to}
                onFromChange={(value) => handlePriceRangeChange("from", value)}
                onToChange={(value) => handlePriceRangeChange("to", value)}
                selectedCurrency={selectedCurrency}
                onCurrencyChange={handleCurrencyChange}
                currencies={currencies}
              />
            </div>
          )}
        </div>
      </div>

      {/* Filtered Results */}
      <div className="w-full p-8 my-6 bg-white rounded-2xl">
        <div className="flex items-center justify-end my-4">
          <SelectedFilters />
          <h1 className="font-semibold text-2xl text-[#1b1313]">
            {filteredItems.length} results
          </h1>
        </div>
        <div className="grid gap-4 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
          {filteredItems.map((item, idx) => (
            <Link to={`/appartment`} key={item.id}>
              <HouseItem {...item} />
            </Link>
          ))}
        </div>
        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>

      {/* Filter Modal */}
      <FilterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onApply={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Search;
