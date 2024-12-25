import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet-fullscreen";
import { FaExpand } from "react-icons/fa"; // FontAwesome icon
import { AiOutlineZoomIn, AiOutlineZoomOut } from "react-icons/ai";

// Custom SVG marker icon with color update
const createCustomIcon = (color) => {
  return new L.Icon({
    iconUrl: `data:image/svg+xml;base64,${btoa(`
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
        <circle cx="20" cy="20" r="15" fill="${color}" stroke="white" stroke-width="2"/>
      </svg>`)}`,
    iconSize: [40, 40], // Adjust the size for better visibility
    iconAnchor: [20, 40], // Ensure the icon is anchored correctly
    popupAnchor: [0, -40], // Position the popup properly
    className: "custom-icon",
  });
};

const Map = () => {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const mapRef = useRef();

  // Fake data for locations (mocking the backend response)
  const fakeLocations = [
    {
      id: 1,
      latitude: 45.19,
      longitude: 0.73,
      name: "House Location",
      description: "This is the house location.",
    },
    {
      id: 2,
      latitude: 45.2,
      longitude: 0.74,
      name: "Office Location",
      description: "This is the office location.",
    },
    {
      id: 3,
      latitude: 45.21,
      longitude: 0.75,
      name: "Park Location",
      description: "This is the park location.",
    },
  ];

  useEffect(() => {
    setLocations(fakeLocations);
  }, []);

  // Custom Zoom Controls
  const CustomZoomControls = () => {
    const map = useMap();
    const zoomIn = () => map.zoomIn();
    const zoomOut = () => map.zoomOut();

    return (
      <div className="absolute bottom-5 right-5 z-[1000] flex flex-row gap-4">
        <button
          className="flex items-center justify-center w-8 h-8 text-lg font-bold bg-white rounded-full shadow-md"
          onClick={zoomOut}
        >
          <AiOutlineZoomOut />
        </button>
        <button
          className="flex items-center justify-center w-8 h-8 text-lg font-bold bg-white rounded-full shadow-md"
          onClick={zoomIn}
        >
          <AiOutlineZoomIn />
        </button>
      </div>
    );
  };

  // Fullscreen Control
  const toggleFullscreen = () => {
    const mapElement = mapRef.current?.container;
    if (mapElement) {
      if (mapElement.requestFullscreen) {
        mapElement.requestFullscreen();
      } else if (mapElement.webkitRequestFullscreen) {
        mapElement.webkitRequestFullscreen();
      } else if (mapElement.mozRequestFullScreen) {
        mapElement.mozRequestFullScreen();
      } else if (mapElement.msRequestFullscreen) {
        mapElement.msRequestFullscreen();
      }
    }
  };

  return (
    <div className="relative w-full h-[500px] rounded-lg shadow-lg overflow-hidden bg-gray-100">
      <div className="absolute top-2 right-2 z-[1000]">
        <button
          className="px-4 py-2 text-black bg-white rounded-lg shadow-md"
          onClick={toggleFullscreen}
        >
          <FaExpand /> {/* Full Screen Icon */}
        </button>
      </div>
      <div className="flex flex-col h-full">
        <MapContainer
          center={[45.1848, 0.7214]} // Default center
          className="h-full"
          ref={mapRef}
          zoom={5} // Set initial zoom level
          scrollWheelZoom={true} // Enable zoom by scrolling
          zoomControl={false} // Disable the default zoom controls
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {locations.map((location) => (
            <Marker
              key={location.id}
              position={[location.latitude, location.longitude]}
              icon={createCustomIcon(
                selectedLocation?.id === location.id ? "#220D6D" : "#00A3E0"
              )} // Dynamic color change
              eventHandlers={{
                click: () => setSelectedLocation(location),
              }}
            >
              <Popup>
                <h3 className="font-semibold">{location.name}</h3>
                {location.description && <p>{location.description}</p>}
              </Popup>
            </Marker>
          ))}

          <CustomZoomControls />
        </MapContainer>
      </div>
    </div>
  );
};

export default Map;
