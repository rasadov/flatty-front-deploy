// src/pages/MapView.jsx
import { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import Map from '../components/Map';
import MapPropertyDetails from '../components/MapPropertyDetails';
import Header from "../layouts/Header";
import { Footer } from "../layouts/Footer";

export default function MapView() {
  // Instead of a single selected property, we use an array
  const [selectedProperties, setSelectedProperties] = useState([]);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [mockProperties, setMockProperties] = useState([]);
  // Fetch mock properties from the server
  useEffect(() => {
    fetch("http://localhost:5001/api/v1/property/map")
      .then((res) => res.json())
      .then((data) => {
        console.log("DATA", data);
        setMockProperties(data);
      });
  }, []);

  console.log("MOCK", mockProperties);

  const handleCloseDetails = () => {
    setSelectedProperties([]);
  };

  const handleMarkerClick = async (propertiesAtLocation) => {
      try {
        // propertiesAtLocation is an array of your minimal property objects (with property_id)
        const results = await Promise.all(
          propertiesAtLocation.map(async (p) => {
            const response = await fetch(
              `http://localhost:5001/api/v1/property/record/${p.property_id}`
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

  {/* Right side: Google Map */}
  <div className="flex-1">
    {/* Map now calls onMarkerClick with an array of properties */}
    <Map properties={mockProperties} onMarkerClick={handleMarkerClick} />
  </div>
</div>
      <div className="px-6 mx-auto bg-[#ECE8FF]">
        <Footer />
      </div>
    </main>
  );
}