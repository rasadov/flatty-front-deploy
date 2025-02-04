// src/pages/MapView.jsx
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import Map from '../components/Map';
import MapPropertyDetails from '../components/MapPropertyDetails';
import Header from "../layouts/Header";
import { Footer } from "../layouts/Footer";
import {
  FilterModal,
  Searchbar,
  SelectedFilters,
} from "../components/sections/index.js";
import { FilterButton } from "../assets/icons";

export default function MapView() {
  // Instead of a single selected property, we use an array
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [selectedProperties, setSelectedProperties] = useState([]);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [resProperties, setMockProperties] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
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
  const dispatch = useDispatch();


  // Fetch mock properties from the server
  useEffect(() => {
    fetch("https://api.flatty.ai/api/v1/property/map")
      .then((res) => res.json())
      .then((data) => {
        console.log("DATA", data);
        setMockProperties(data);
      });
  }, []);

  console.log("MOCK", resProperties); 

  const handleCloseDetails = () => {
    setSelectedProperties([]);
  };

  const handleShowMap = () => {
    setSelectedProperties([]);
  }

  const handleSearchQueryChange = (query) => {
    setSearchQuery(query);
  };

  const handleMarkerClick = async (propertiesAtLocation) => {
      try {
        var results = [];
        const response = await fetch(
          `https://api.flatty.ai/api/v1/property/record/${propertiesAtLocation.property_id}`
        );
        results.push(await response.json());
        setSelectedProperties(results);
      } catch (err) {
        console.error("Error fetching property details:", err);
      }
    };

  return (
    <main className="flex-grow bg-[#F4F2FF]">
      <Header key={isLoggedIn ? "logged-in" : "logged-out"} />
      <div className="max-w-[78%] px-4 2xl:max-w-[1440px] flex items-center justify-center w-full gap-4 my-12 px-4 md:px-16">
        <Searchbar
          onShowMap={handleShowMap}
          onSearch={() => {}}
          value={searchQuery}
          onChange={handleSearchQueryChange}
          API_URL="https://api.flatty.ai/api/v1/property/map"
          setData={setMockProperties}
          redirectPath="/map"
        />
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex justify-center items-center w-[54px] h-[54px] bg-white border border-[#A673EF] rounded-md"
        >
          <FilterButton />
        </button>
      </div>
      <div className="flex flex-col lg:flex-row h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-500">
  {/* Left side: property details */}

  {selectedProperties.length > 0 ? (
          <div className="w-full lg:w-[300px] border-r border-gray-300 overflow-y-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-500">
            {/* Pass the array of properties to the details component */}
            <MapPropertyDetails properties={selectedProperties} />
          </div>
        ) : null}

        {/* Filter Modal */}
        <FilterModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onApply={(newFilters) => {
            dispatch(updateFilters(newFilters));
            setIsModalOpen(false);
          }}
        />

  {/* Right side: Google Map */}
  <div className="flex-1">
    {/* Map now calls onMarkerClick with an array of properties */}
    <Map properties={resProperties} onMarkerClick={handleMarkerClick} />
  </div>
</div>
      <div className="px-6 mx-auto bg-[#ECE8FF]">
        <Footer />
      </div>
    </main>
  );
}