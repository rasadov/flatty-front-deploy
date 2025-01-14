import React, { useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  MarkerClusterer,
} from "@react-google-maps/api";
import { useNavigate, useLocation } from "react-router-dom";
import Loading from "./Loading";

// Mock data is now commented out as we're using dynamic data
// const mockProperties = [...]; // Your mock data here

export default function Map({ onMarkerClick, filteredItems }) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyCmyl8QRHQp6LHWfTDJrCX84NM1TJAC1fM",
  });
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  // State for managing map center
  const [center, setCenter] = useState({
    lat: parseFloat(searchParams.get("latitude")) || 35.3,
    lng: parseFloat(searchParams.get("longitude")) || 33.4,
  });

  if (loadError) return <div>Map cannot be loaded right now...</div>;
  if (!isLoaded) return <Loading />;

  const mapContainerStyle = { width: "100%", height: "100%" };
  const zoom = 13; // Increased zoom to focus on the selected property

  const handleMarkerClick = (property) => {
    setCenter({ lat: property.lat, lng: property.lng });
    navigate(`/search/map?latitude=${property.lat}&longitude=${property.lng}`);
    onMarkerClick?.(property);
  };

  // Function to render markers within clusterer for optimization
  // We're now using filteredItems instead of mockProperties
  const renderMarkers = (clusterer) =>
    (filteredItems && filteredItems.length > 0 ? filteredItems : []).map(
      (property) => (
        <Marker
          key={property.id}
          position={{ lat: property.lat, lng: property.lng }}
          clusterer={clusterer}
          onClick={() => handleMarkerClick(property)}
        />
      )
    );

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={center}
      zoom={zoom}
    >
      <MarkerClusterer
        averageCenter
        gridSize={60}
        calculator={(markers) => ({
          text: String(markers.length),
          index: 1,
          title: `Cluster of ${markers.length}`,
        })}
        styles={[
          {
            url: "https://flattybucket.s3.us-east-1.amazonaws.com/uploads/Ellipse+524.svg",
            width: 50,
            height: 50,
            textColor: "#FFFFFF",
            textSize: 16,
          },
        ]}
      >
        {(clusterer) => renderMarkers(clusterer)}
      </MarkerClusterer>
    </GoogleMap>
  );
}
