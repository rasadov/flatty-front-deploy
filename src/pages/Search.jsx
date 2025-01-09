import React, { useState, useMemo, useEffect, useCallback } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loadSearchResults, updateFilters } from "../store/slices/searchSlice";
import {
  FilterModal,
  Searchbar,
  SelectedFilters,
} from "../components/sections/index.js";
import {
  Dropdown,
  HouseItem,
  Pagination,
  RangeInput,
} from "../components/index.js";
import {
  CheckboxFill,
  CheckboxSquare,
  DropdownUnder,
  FilterButton,
} from "../assets/icons";
import SearchbarDropdown from "../components/dropdowns/SearchbarDropdown.jsx";

export const Search = () => {
  const dispatch = useDispatch();
  const {
    results: searchResults,
    filters,
    loading,
    error,
  } = useSelector((state) => state.search);
  const [showMap, setShowMap] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState("");
  const [priceRange, setPriceRange] = useState({ from: "", to: "" });
  const [selectedCurrency, setSelectedCurrency] = useState("USD");

  const handlePriceRangeChange = useCallback((field, value) => {
    setPriceRange((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleCurrencyChange = useCallback((currency) => {
    setSelectedCurrency(currency);
  }, []);
  useEffect(() => {
    dispatch(loadSearchResults(filters));
  }, [dispatch, filters]);

  // Memoized filtering function
  const filterItem = useCallback(
    (item, filters) => {
      const matchesCategory =
        !filters.category || item.category === filters.category;
      const matchesComplex =
        !filters.complex || item.complex === filters.complex;
      const matchesArea =
        (!filters.area?.from ||
          (item.area && item.area >= Number(filters.area.from))) &&
        (!filters.area?.to ||
          (item.area && item.area <= Number(filters.area.to)));
      const matchesRenovation =
        filters.renovation?.length === 0 ||
        (item.renovation && filters.renovation.includes(item.renovation));
      const matchesFloor =
        (!filters.floor?.from ||
          (item.floor && item.floor >= Number(filters.floor.from))) &&
        (!filters.floor?.to ||
          (item.floor && item.floor <= Number(filters.floor.to)));
      const matchesCeilingHeight =
        !filters.ceilingHeight || item.ceilingHeight === filters.ceilingHeight;
      const matchesBathroom =
        filters.bathroom?.length === 0 ||
        (item.bathroom && filters.bathroom.includes(item.bathroom.type));
      const matchesFurniture =
        filters.furniture?.length === 0 ||
        (Array.isArray(item.furniture) &&
          filters.furniture.some((f) => item.furniture.includes(f)));
      const matchesRooms = Object.entries(filters.rooms || {}).every(
        ([key, value]) => value === 0 || item.rooms[key] === value
      );
      const matchesParkingSlot =
        !filters.parkingSlot || item.parkingSlot === filters.parkingSlot;
      const matchesSwimmingPool =
        !filters.swimmingPool || item.swimmingPool === filters.swimmingPool;

      return (
        matchesCategory &&
        matchesComplex &&
        matchesArea &&
        matchesRenovation &&
        matchesFloor &&
        matchesCeilingHeight &&
        matchesBathroom &&
        matchesFurniture &&
        matchesRooms &&
        matchesParkingSlot &&
        matchesSwimmingPool
      );
    },
    [filters]
  );

  // Memoized filtered items
  const filteredItems = useMemo(() => {
    return searchResults.filter((item) => filterItem(item, filters));
  }, [searchResults, filters, filterItem]);

  // Event handlers
  const handleShowMap = useCallback(() => setShowMap(!showMap), [showMap]);
  const handleSearchQueryChange = useCallback(
    (query) => {
      setSearchQuery(query);
      dispatch(updateFilters({ query }));
    },
    [dispatch]
  );

  const handlePageChange = useCallback(
    (page) => {
      setCurrentPage(page);
      dispatch(updateFilters({ page }));
    },
    [dispatch]
  );

  if (loading) return <div>Loading...</div>;

  return (
    <div className="w-full mx-auto">
      {/* Searchbar and Filter Button */}
      <div className="flex items-center justify-center w-full gap-4 mt-36">
        <Searchbar
          onShowMap={handleShowMap}
          onSearch={() => dispatch(loadSearchResults(filters))}
          value={searchQuery}
          onChange={handleSearchQueryChange}
        />
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex justify-center items-center w-[54px] h-[54px] bg-white border border-[#A673EF] rounded-md"
        >
          <FilterButton />
        </button>
      </div>

      {showMap ? (
        <MapView filteredItems={filteredItems} />
      ) : (
        <ResultView
          filteredItems={filteredItems}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          setFilter={(path, value) =>
            dispatch(updateFilters({ [path]: value }))
          }
          selectedTypes={selectedTypes}
          setSelectedTypes={setSelectedTypes}
          selectedRoom={selectedRoom}
          setSelectedRoom={setSelectedRoom}
          priceRange={priceRange}
          handlePriceRangeChange={handlePriceRangeChange}
          selectedCurrency={selectedCurrency}
          handleCurrencyChange={handleCurrencyChange}
        />
      )}

      {/* Filter Modal */}
      <FilterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onApply={(newFilters) => {
          dispatch(updateFilters(newFilters));
          setIsModalOpen(false);
        }}
      />
    </div>
  );
};

export default Search;

// MapView component
const MapView = ({ filteredItems }) => {
  const defaultCenter = [34.6809, 33.0382]; // Cyprus as default center

  return (
    <div className="w-full h-[821px] mt-6 flex">
      <div className="w-1/3 p-4 overflow-y-auto">
        {filteredItems.map((item) => (
          <Link to={`/apartment/${item.id}`} key={`${item.id}-${item.name}`}>
            <HouseItem {...item} />
          </Link>
        ))}
      </div>
      <div className="w-2/3 h-full">
        <MapContainer
          center={
            filteredItems[0]
              ? [filteredItems[0].lat, filteredItems[0].lng]
              : defaultCenter
          }
          zoom={filteredItems.length > 0 ? 14 : 13}
          style={{ width: "100%", height: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {filteredItems.map((item) => (
            <Marker key={item.id} position={[item.lat, item.lng]}>
              <Popup>
                <HouseItem {...item} />
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

// ResultView component
const ResultView = ({
  filteredItems,
  currentPage,
  totalPages,
  onPageChange,
  setFilter,
  selectedTypes,
  setSelectedTypes,
  selectedRoom,
  setSelectedRoom,
  priceRange,
  handlePriceRangeChange,
  selectedCurrency,
  handleCurrencyChange,
}) => {
  const types = ["Apartment", "House", "Villa", "Land", "Garage", "Commercial"];
  const roomNumbers = ["Studio", "1", "2", "3", "4", "5"];
  const currencies = ["USD", "EUR", "AZN"];

  // State management for filters (these should come from Redux if possible)
  const [dropdownState, setDropdownState] = useState({
    typeOpen: false,
    roomOpen: false,
    priceOpen: false,
  });

  const toggleDropdown = useCallback((dropdownKey) => {
    setDropdownState((prevState) => ({
      ...Object.fromEntries(
        Object.entries(prevState).map(([key]) => [key, false])
      ),
      [dropdownKey]: !prevState[dropdownKey],
    }));
  }, []);

  return (
    <>
      {/* Filter Dropdowns */}
      <div className="flex flex-wrap w-full gap-4 mt-6">
        {/* Type Filter Dropdown */}
        <div className="relative">
          <button
            onClick={() => toggleDropdown("typeOpen")}
            className="flex items-center justify-between gap-1 px-2 py-2 w-[133px] h-[32px] bg-white rounded-md shadow-sm focus:border-[#8247E5] focus:outline-none"
            style={{
              boxShadow: "0px 1px 1px 0px #703ACA14",
            }}
          >
            <span className="text-xs font-semibold text-[#525C76]">Type</span>
            <DropdownUnder />
          </button>
          {dropdownState.typeOpen && (
            <div className="absolute z-10 mt-2 w-[130px] h-[200px] bg-white mx-auto rounded-md shadow-lg overflow-y-auto">
              {types.map((type) => (
                <button
                  key={type}
                  onClick={() =>
                    setSelectedTypes((prev) =>
                      prev.includes(type)
                        ? prev.filter((item) => item !== type)
                        : [...prev, type]
                    )
                  }
                  className="flex items-center px-2 py-4 w-[114px] h-[24px] text-sm cursor-pointer gap-2 mx-auto"
                  style={{ fontSize: "12px" }}
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
            <div className="absolute z-10 mt-2 p-2 w-[242px] m-auto h-[94px] grid grid-cols-3 bg-white border mx-auto border-gray-300 rounded-md shadow-lg">
              {roomNumbers.map((room) => (
                <label
                  key={room}
                  className="flex items-center w-[70px] min-h-[35px] gap-2 py-4 mx-auto text-sm cursor-pointer"
                >
                  <button
                    onClick={() => setSelectedRoom(room)}
                    className="text-center text-sm text-[#0F1D40] border border-[#6433C4] rounded-[8px]"
                    style={{
                      fontSize: "12px",
                      width: "70px",
                      height: "35px",
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
            className="flex items-center justify-between gap-1 px-2 py-2 w-[133px] h-[32px] bg-white rounded-md shadow-sm focus:border-[#8247E5] focus:outline-none"
            style={{
              boxShadow: "0px 1px 1px 0px #703ACA14",
            }}
          >
            <span className="text-xs font-semibold text-[#525C76]">Price</span>
            <DropdownUnder />
          </button>
          {dropdownState.priceOpen && (
            <div className="absolute z-10 mt-2 w-[392px] h-[86px] bg-white border mx-auto border-gray-300 rounded-md shadow-lg overflow-y-auto flex justify-center items-center">
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
        <div className="flex items-center justify-between my-4">
          <SelectedFilters />
          <h1 className="font-semibold text-2xl text-[#1b1313]">
            {filteredItems.length} results
          </h1>
        </div>
        <div className="grid gap-4 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
          {filteredItems.map((item) => (
            <Link to={`/apartment/${item.id}`} key={item.id}>
              <HouseItem {...item} />
            </Link>
          ))}
        </div>
        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </>
  );
};
