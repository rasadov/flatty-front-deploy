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


  const handleSearch = () => {
    // 1) Merge FilterModal filters (props.filters) + local dropdownStates
    //    - If you want the local dropdownStates to override
    //      any same-key from FilterModal, spread them last:

    const filters = JSON.parse(localStorage.getItem("filters"));
    const combinedFilters = {
      ...filters,        // from Redux/FilterModal
      ...dropdownStates, // from local dropdown
    };  
    // 2) Build query parameters from the merged object
    const queryParams = new URLSearchParams();
  
    Object.entries(combinedFilters).forEach(([key, value]) => {
      // Skip null, undefined, empty, or 0
      if (value !== null && value !== undefined && value !== "" && value !== 0) {
        // If it's a nested object like { rooms: { bathroom: 2, bedroom: 1 } }
        if (typeof value === "object" && !Array.isArray(value)) {
          Object.entries(value).forEach(([subKey, subValue]) => {
            if (
              subValue !== null &&
              subValue !== undefined &&
              subValue !== "" &&
              subValue !== 0
            ) {
              if (key === "priceRange") {
                queryParams.append(`${key}${subKey}`, subValue / currencies_to_dollar[selectedCurrency]);
              } else {
                queryParams.append(`${key}${subKey}`, subValue);
              }
            }
          });
        }
        // If it's an array (e.g., for renovation, furniture, etc.)
        else if (Array.isArray(value)) {
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
        }
        // Otherwise, just append it directly
        else {
          queryParams.append(key, value);
        }
      }
    });
    
    // 4) Navigate with all selected filters in the URL
    const queryString = queryParams.toString();

    response = fetch(`https://api.flatty.ai/api/v1/property/map?${queryString}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("DATA", data);
        setMockProperties(data);
      })
  };

  const handleMarkerClick = async (propertiesAtLocation) => {
      try {
        // propertiesAtLocation is an array of your minimal property objects (with property_id)
        const results = await Promise.all(
          propertiesAtLocation.map(async (p) => {
            const response = await fetch(
              `https://api.flatty.ai/api/v1/property/record/${p.property_id}`
            );
            return await response.json();
          })
        );
        // Store in state so side panel can display them
        setSelectedProperties(results);
      } catch (err) {
        console.error("Error fetching property details:", err);
      }
    };

  return (
    <main className="flex-grow bg-[#F4F2FF]">
      <Header key={isLoggedIn ? "logged-in" : "logged-out"} />
      <div className="flex items-center justify-center w-full gap-4 my-12  px-16.26">
        <Searchbar
          onShowMap={handleShowMap}
          onSearch={() => {}}
          value={searchQuery}
          onChange={handleSearchQueryChange}
          API_URL="https://api.flatty.ai/api/v1/property/map"
          setData={setMockProperties}
        />
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex justify-center items-center w-[54px] h-[54px] bg-white border border-[#A673EF] rounded-md"
        >
          <FilterButton />
        </button>
      </div>
      <div className="flex h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-500">
  {/* Left side: property details */}

  {selectedProperties.length > 0 ? (
    <div
      className="w-1/4 border-r border-gray-300 overflow-y-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-500"
    >
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