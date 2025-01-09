import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet-fullscreen";
import { FaExpand } from "react-icons/fa";
import { AiOutlineZoomIn, AiOutlineZoomOut } from "react-icons/ai";
import locationIcon from "../../assets/images/location.png"; // Update with your actual icon path

// Define the custom icon
const customIcon = new L.Icon({
  iconUrl: locationIcon,
  iconSize: [47, 65], // Adjust the size according to your requirements
  iconAnchor: [12, 41], // Anchor point of the icon
  popupAnchor: [1, -34], // Point from which the popup should open
  shadowSize: [41, 41], // Size of the shadow
});

export const Map = ({ latitude, longitude }) => {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const mapRef = useRef();

  // Fake data for locations (mocking the backend response)
  const fakeLocations = [
    { id: 1, latitude: 45.19, longitude: 0.73 },
    { id: 2, latitude: 45.2, longitude: 0.74 },
    { id: 3, latitude: 45.21, longitude: 0.75 },
  ];

  useEffect(() => {
    setLocations(fakeLocations);
    if (mapRef.current) {
      const map = mapRef.current.leafletElement;
      map.addControl(new L.Control.Fullscreen());
    }
  }, []);

  const CustomZoomControls = () => {
    const map = useMap();
    const zoomIn = () => map.zoomIn();
    const zoomOut = () => map.zoomOut();

    return (
      <div className="absolute bottom-5 right-5 z-[1000] flex flex-row gap-4">
        <button
          className="flex items-center justify-center w-8 h-8 text-lg font-bold bg-white rounded-full shadow-md"
          onClick={zoomOut}
          aria-label="Zoom Out"
        >
          <AiOutlineZoomOut />
        </button>
        <button
          className="flex items-center justify-center w-8 h-8 text-lg font-bold bg-white rounded-full shadow-md"
          onClick={zoomIn}
          aria-label="Zoom In"
        >
          <AiOutlineZoomIn />
        </button>
      </div>
    );
  };

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

  if (!latitude || !longitude) {
    return <div>Location data not available</div>;
  }

  return (
    <div className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] rounded-lg shadow-lg overflow-hidden bg-gray-100">
      <div className="absolute top-2 right-2 z-[1000]">
        <button
          className="px-4 py-2 text-black bg-white rounded-lg shadow-md"
          onClick={toggleFullscreen}
          aria-label="Toggle Fullscreen"
        >
          <FaExpand />
        </button>
      </div>
      <div className="flex flex-col h-full">
        <MapContainer
          center={[latitude, longitude]}
          className="h-full"
          ref={mapRef}
          zoom={13}
          scrollWheelZoom={true}
          zoomControl={false}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[latitude, longitude]} icon={customIcon}></Marker>
          {locations.map((location) => (
            <Marker
              key={location.id}
              position={[location.latitude, location.longitude]}
              icon={customIcon}
              eventHandlers={{
                click: () => setSelectedLocation(location),
              }}
            >
              <Popup>
                <h3 className="font-semibold">Location {location.id}</h3>
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
