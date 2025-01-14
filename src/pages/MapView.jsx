import React, { useState, useEffect } from "react";
import Map from "../components/Map";
import HouseItem from "../components/HouseItem"; // Assuming this component exists in your project
import { useNavigate, useLocation } from "react-router-dom";
import { useLoadScript } from "@react-google-maps/api";
import Loading from "../components/Loading";
const filteredItems = [
  {
    id: 1,
    lat: 35.19,
    lng: 33.38,
    title: "Modern Villa in Kyrenia",
    price: "£250,000",
    description: "3-bedroom villa with sea view",
    images: ["villa1.jpg", "villa1_interior.jpg"],
    location: "Kyrenia, Cyprus",
    rooms: 3,
    area: 150,
    currFloor: 1,
    building: 1,
  },
  {
    id: 2,
    lat: 35.2,
    lng: 33.37,
    title: "Apartment in Nicosia",
    price: "£150,000",
    description: "2-bedroom apartment with city views",
    images: ["apartment_nicosia.jpg"],
    location: "Nicosia, Cyprus",
    rooms: 2,
    area: 80,
    currFloor: 3,
    building: 5,
  },
  {
    id: 3,
    lat: 35.17,
    lng: 33.39,
    title: "Luxury Condo in Famagusta",
    price: "£300,000",
    description: "4-bedroom luxury condo near the beach",
    images: ["luxury_condo1.jpg", "luxury_condo2.jpg", "luxury_condo3.jpg"],
    location: "Famagusta, Cyprus",
    rooms: 4,
    area: 200,
    currFloor: 2,
    building: 2,
  },
  // ... (previous properties)

  {
    id: 11,
    lat: 35.14,
    lng: 33.43,
    title: "Historic House in Kyrenia",
    price: "£320,000",
    description: "Restored 4-bedroom house in old town",
    images: ["historic_kyrenia1.jpg", "historic_kyrenia2.jpg"],
    location: "Kyrenia, Cyprus",
    rooms: 4,
    area: 180,
    currFloor: 1,
    building: 1,
  },
  {
    id: 12,
    lat: 35.25,
    lng: 33.32,
    title: "Luxury Penthouse in Nicosia",
    price: "£400,000",
    description: "Exclusive 3-bedroom penthouse with rooftop garden",
    images: ["penthouse_nicosia1.jpg", "penthouse_nicosia2.jpg"],
    location: "Nicosia, Cyprus",
    rooms: 3,
    area: 220,
    currFloor: 10,
    building: 10,
  },
  {
    id: 13,
    lat: 35.16,
    lng: 33.4,
    title: "Beach House in Famagusta",
    price: "£500,000",
    description: "5-bedroom modern beach house",
    images: ["beach_house1.jpg", "beach_house2.jpg", "beach_house3.jpg"],
    location: "Famagusta, Cyprus",
    rooms: 5,
    area: 250,
    currFloor: 1,
    building: 1,
  },
  {
    id: 14,
    lat: 35.18,
    lng: 33.38,
    title: "Townhouse in Kyrenia",
    price: "£230,000",
    description: "Newly built 3-story townhouse",
    images: ["townhouse_kyrenia1.jpg", "townhouse_kyrenia2.jpg"],
    location: "Kyrenia, Cyprus",
    rooms: 4,
    area: 190,
    currFloor: 1,
    building: 3,
  },
  {
    id: 15,
    lat: 35.21,
    lng: 33.36,
    title: "Family Home in Nicosia",
    price: "£170,000",
    description: "Spacious 3-bedroom family home",
    images: ["family_home_nicosia.jpg"],
    location: "Nicosia, Cyprus",
    rooms: 3,
    area: 120,
    currFloor: 1,
    building: 1,
  },
  {
    id: 16,
    lat: 35.15,
    lng: 33.42,
    title: "Countryside Estate in Famagusta",
    price: "£600,000",
    description: "Large estate with 6 bedrooms and pool",
    images: [
      "estate_famagusta1.jpg",
      "estate_famagusta2.jpg",
      "estate_famagusta3.jpg",
    ],
    location: "Famagusta, Cyprus",
    rooms: 6,
    area: 300,
    currFloor: 1,
    building: 1,
  },
  // Add more properties as needed
];
function MapView() {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyCmyl8QRHQp6LHWfTDJrCX84NM1TJAC1fM",
  });

  // State for managing map center
  const [center, setCenter] = useState({
    lat: parseFloat(searchParams.get("latitude")) || 35.3,
    lng: parseFloat(searchParams.get("longitude")) || 33.4,
  });

  useEffect(() => {
    // Update the map center when the URL parameters change
    setCenter({
      lat: parseFloat(searchParams.get("latitude")) || 35.3,
      lng: parseFloat(searchParams.get("longitude")) || 33.4,
    });
  }, [searchParams]);

  useEffect(() => {
    // Update the map center when the URL parameters change
    setCenter({
      lat: parseFloat(searchParams.get("latitude")) || 35.3,
      lng: parseFloat(searchParams.get("longitude")) || 33.4,
    });
  }, [searchParams]);

  const handleCloseDetails = () => {
    setSelectedProperty(null);
    // Clear the specific location from URL when closing details
    navigate("/search/map");
  };

  const handleMarkerClick = (property) => {
    setSelectedProperty(property);
    setCenter({ lat: property.lat, lng: property.lng });
    navigate(`/search/map?latitude=${property.lat}&longitude=${property.lng}`);
  };

  if (loadError) return <div>Map cannot be loaded right now...</div>;
  if (!isLoaded) return <Loading />;

  const mapContainerStyle = { width: "100%", height: "100vh" };
  const zoom = 13; // Increased zoom to focus on the selected property

  return (
    <main className="flex-grow bg-[#F4F2FF] mt-10">
      <div style={{ display: "flex", height: "100vh" }}>
        {/* Left side: property details */}
        {selectedProperty && (
          <div
            style={{
              width: "28%",
              borderRight: "1px solid #ccc",
              overflowY: "auto",
              position: "absolute",
              zIndex: 1,
              backgroundColor: "white",
              height: "100vh",
              padding: "30px 20px",
            }}
          >
            <button
              onClick={handleCloseDetails}
              style={{
                position: "absolute",
                top: "5px",
                right: "5px",
                backgroundColor: "transparent",
                color: "gray",
                border: "none",
                borderRadius: "50%",
                width: "30px",
                height: "30px",
                cursor: "pointer",
                fontSize: "20px",
              }}
            >
              ×
            </button>
            <HouseItem
              id={selectedProperty.id}
              images={selectedProperty.images}
              price={selectedProperty.price}
              location={selectedProperty.location}
              rooms={selectedProperty.rooms}
              area={selectedProperty.area}
              currFloor={selectedProperty.currFloor}
              building={selectedProperty.building}
            />
          </div>
        )}
        {/* Right side: Google Map */}
        <Map onMarkerClick={handleMarkerClick} filteredItems={filteredItems} />
      </div>
    </main>
  );
}

export default MapView;
