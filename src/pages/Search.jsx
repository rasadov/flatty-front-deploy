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
import MapView from "./MapView.jsx";
import { Footer } from "../layouts/Footer.jsx";
import Header from "../layouts/Header.jsx";

export const Search = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);

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
  const [filteredItems, setFilteredItems] = useState([]);
  const page = filters.page || 1;
  const elements = 50;

  const [responseData, setResponseData] = useState([]);
  useEffect(() => {
    const params = new URLSearchParams({
      page: page,
      elements: elements,
    })
    fetch(`https://api.flatty.ai/api/v1/property/?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("DATA", data);
        setTotalPages(data.results / elements + (data.results % elements ? 1 : 0));
        setResponseData(data);
        setFilteredItems(data.properties);
        
      });
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
  // const filteredItems = useMemo(() => {
  //   return searchResults.filter((item) => filterItem(item, filters));
  // }, [searchResults, filters, filterItem]);

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

  console.log("Filtered Items", filteredItems);

  console.log("Response Data", responseData);

  return (
    <div className="w-full mx-auto ">
      <Header key={isLoggedIn ? "logged-in" : "logged-out"} />

      {/* Searchbar and Filter Button */}
      <div className="flex items-center justify-center w-full gap-4 mt-36  px-16.26">
        <Searchbar
          onShowMap={handleShowMap}
          onSearch={() => dispatch(loadSearchResults(filters))}
          value={searchQuery}
          onChange={handleSearchQueryChange}
          API_URL="https://api.flatty.ai/api/v1/property"
          setData={setResponseData}
        />
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex justify-center items-center w-[54px] h-[54px] bg-white border border-[#A673EF] rounded-md"
        >
          <FilterButton />
        </button>
      </div>

      <div className=" px-16.26">
        <ResultView
          filteredItems={filteredItems}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          setFilter={(path, value) =>
            dispatch(updateFilters({ [path]: value }))
          }
        />
      </div>

      {/* Filter Modal */}
      <FilterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onApply={(newFilters) => {
          dispatch(updateFilters(newFilters));
          setIsModalOpen(false);
        }}
      />
      <div className="px-6  mx-auto  bg-[#ECE8FF]">
        <Footer />
      </div>
    </div>
  );
};

export default Search;

// MapView component

const getImages = ({images}) => {
  console.log ("WE ARE HERE ", images);
  if (!images) return [];
  return images.map((image) => image.image_url);
}

// ResultView component
const ResultView = ({
  filteredItems,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  console.log("Filtered3424 Items", filteredItems);
  return (
    <>
      {/* Filter Dropdowns */}

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
            console.log("ITEM", item),
            // <Link to={`/apartment/${item.id}`} key={item.id}>
              <HouseItem
                key={item.id}
                id={item.id}
                images={item.images}
                title={item.title}
                price={item.price}
                area={item.total_area}
                rooms={item.info.bedroom}
                location={item.location.address}
                currFloor={item.info.floor}
                building={item.info.floors}
              />
            // </Link>
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
