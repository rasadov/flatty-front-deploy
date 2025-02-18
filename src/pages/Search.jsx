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
import { FilterButton } from "../assets/icons";
import { Footer } from "../layouts/Footer.jsx";
import Header from "../layouts/Header.jsx";
import { useNavigate, useLocation } from "react-router-dom";

export const Search = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { results: searchResults, filters, loading, error } = useSelector(
    (state) => state.search
  );
  
  // Вызов useLocation сразу, чтобы потом использовать location.state
  const location = useLocation();
  const navigate = useNavigate();

  // Изначальное значение для модального окна фильтра – если передано через navigate
  const initialIsModalOpen = location.state?.filterOpen || false;
  const [isModalOpen, setIsModalOpen] = useState(initialIsModalOpen);

  const [showMap, setShowMap] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const [filteredItems, setFilteredItems] = useState([]);
  const query = new URLSearchParams(location.search);
  const page = query.get("page") || 1;
  const elements = 50;

  const [responseData, setResponseData] = useState([]);

  useEffect(() => {
    const params = new URLSearchParams({
      page: page,
      elements: elements,
    });
    console.log("PARAMS", params.toString());
    fetch(`https://api.flatty.ai/api/v1/property/?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("DATA", data);
        setTotalPages(data.results / elements + (data.results % elements ? 1 : 0));
        setResponseData(data);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, [dispatch, filters, page, elements]);

  const handleShowMap = useCallback(() => {
    setShowMap((prev) => !prev);
  }, []);

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
      dispatch(loadSearchResults({ ...filters, page }));
    },
    [dispatch, filters]
  );

  if (loading) return <div>Loading...</div>;

  console.log("Filtered Items", filteredItems);
  console.log("Response Data", responseData);

  return (
    <div className="w-full mx-auto ">
      <Header key={isLoggedIn ? "logged-in" : "logged-out"} />
      {/* Searchbar and Filter Button */}
      <div className="hidden sm:flex items-center justify-center gap-4 sm:mt-36 mt-20 px-16.26 custom-max-width">
        <Searchbar
          onShowMap={handleShowMap}
          onSearch={() => dispatch(loadSearchResults(filters))}
          value={searchQuery}
          onChange={handleSearchQueryChange}
          API_URL="https://api.flatty.ai/api/v1/property/"
          setData={setResponseData}
        />
        <button
          onClick={() => setIsModalOpen(true)}
          className="hidden sm:flex justify-center items-center w-[54px] h-[54px] bg-white border border-[#A673EF] rounded-md"
        >
          <FilterButton />
        </button>
      </div>
      <div className="px-10.26 sm:px-16.26 custom-max-width">
        <ResultView
          filteredItems={responseData.properties}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          setFilter={(path, value) => dispatch(updateFilters({ [path]: value }))}
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
      <div className="px-6 mx-auto bg-[#ECE8FF]">
        <Footer />
      </div>
    </div>
  );
};

export default Search;

// MapView component (в данном файле он не используется, но оставляем для справки)
const getImages = ({ images }) => {
  if (!images) return [];
  return images.map((image) => image.image_url);
};

// ResultView component
const ResultView = ({
  filteredItems,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <>
      {/* Filter Dropdowns */}
      {/* Filtered Results */}
      <div className="w-full p-6 sm:p-8 my-12 bg-white rounded-2xl">
        <div className="flex flex-wrap items-center justify-between my-4 gap-4">
          {/* <SelectedFilters /> */}
          <h1 className="font-semibold text-xl sm:text-2xl text-[#1b1313]">
            {filteredItems ? filteredItems.length : 0} results
          </h1>
        </div>
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
          {filteredItems
            ? filteredItems.map((item) => (
                <HouseItem
                  key={item.id}
                  id={item.id}
                  images={item.images}
                  title={item.title}
                  price={item.price}
                  area={item?.info?.total_area}
                  rooms={item?.info?.bedrooms}
                  location={item?.location?.address}
                  currFloor={item?.info?.floor}
                  building={item?.info?.floors}
                />
              ))
            : ""}
        </div>
        {/* Pagination */}
        <div className="flex justify-center mt-6">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </div>
      </div>
    </>
  );
};