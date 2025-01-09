import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Custom icon for markers
const houseIcon = new L.Icon({
  iconUrl: "path/to/house-icon.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

// Component to fit map to markers
const FitToMarkers = ({ markers }) => {
  const map = useMap();

  useEffect(() => {
    if (markers.length > 0) {
      const bounds = L.latLngBounds(markers.map((marker) => marker.position));
      map.fitBounds(bounds);
    }
  }, [map, markers]);

  return null;
};

const MapComponent = ({ houses, selectedHouse }) => {
  return (
    <div className="h-[400px] w-full rounded-lg overflow-hidden shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105">
      <MapContainer
        center={[34.6809, 33.0382]}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <FitToMarkers markers={houses} />
        {houses.map((house, index) => (
          <Marker
            key={index}
            position={house.position}
            icon={houseIcon}
            eventHandlers={{
              click: () => {
                // Here you could update state or show more details
                console.log("Clicked on:", house.title);
              },
            }}
          >
            <Popup>
              <div className="text-center">
                <h2 className="text-xl font-bold">{house.title}</h2>
                <p className="text-gray-600">Price: {house.price}</p>
                <p className="text-gray-600">Rooms: {house.rooms}</p>
                <p className="text-gray-600">Area: {house.area} sq.m.</p>
                <p className="text-gray-600">Floor: {house.floor}</p>
                <button className="px-4 py-2 mt-2 text-white bg-blue-500 rounded">
                  View Details
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
        {selectedHouse && (
          <div className="absolute top-0 right-0 p-4 m-4 bg-white border border-gray-300 rounded shadow-lg">
            <h3 className="text-lg font-bold">{selectedHouse.title}</h3>
            <p>Price: {selectedHouse.price}</p>
            <p>Rooms: {selectedHouse.rooms}</p>
            <p>Area: {selectedHouse.area} sq.m.</p>
            <p>Floor: {selectedHouse.floor}</p>
            <button
              onClick={() => setSelectedHouse(null)}
              className="px-4 py-2 mt-2 text-white bg-red-500 rounded"
            >
              Close
            </button>
          </div>
        )}
      </MapContainer>
    </div>
  );
};

const HouseCard = ({ house, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(house)}
      className="p-4 mb-4 transition duration-300 ease-in-out transform bg-white border rounded-lg cursor-pointer hover:-translate-y-1 hover:shadow-xl"
    >
      <img
        src="path/to/your/image.jpg"
        alt={house.title}
        className="object-cover w-full h-40 mb-2 rounded"
      />
      <h3 className="text-lg font-semibold">{house.title}</h3>
      <p className="text-gray-600">Price: {house.price}</p>
      <p className="text-gray-600">Rooms: {house.rooms}</p>
      <p className="text-gray-600">Area: {house.area} sq.m.</p>
      <p className="text-gray-600">Floor: {house.floor}</p>
    </div>
  );
};

const PropertyCards = ({ houses, onSelect, filter, sortBy }) => {
  const filteredHouses = houses.filter(
    (house) =>
      house.title.toLowerCase().includes(filter.toLowerCase()) ||
      house.price.includes(filter)
  );

  const sortedHouses = [...filteredHouses].sort((a, b) => {
    if (sortBy === "price")
      return (
        parseFloat(a.price.replace(/[^0-9.-]+/g, "")) -
        parseFloat(b.price.replace(/[^0-9.-]+/g, ""))
      );
    if (sortBy === "rooms") return a.rooms - b.rooms;
    return 0;
  });

  return (
    <div className="w-1/3 p-4 bg-gray-100 rounded-lg shadow-lg">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Filter by title or price"
          value={filter}
          onChange={onSelect}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={sortBy}
          onChange={onSelect}
          className="w-full p-2 mt-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="price">Sort by Price</option>
          <option value="rooms">Sort by Rooms</option>
        </select>
      </div>
      <div className="overflow-y-auto h-[350px]">
        {sortedHouses.map((house, index) => (
          <HouseCard
            key={index}
            house={house}
            onSelect={() => onSelect(house)}
          />
        ))}
      </div>
    </div>
  );
};

const ListingsPage = () => {
  const [showMap, setShowMap] = useState(false);
  const [houses, setHouses] = useState([
    {
      title: "House 1",
      price: "250,000 £",
      rooms: 3,
      area: 150,
      floor: "1/4",
      position: [34.681, 33.038],
    },
    {
      title: "House 2",
      price: "260,000 £",
      rooms: 4,
      area: 160,
      floor: "2/4",
      position: [34.6812, 33.0382],
    },
    {
      title: "House 3",
      price: "270,000 £",
      rooms: 3,
      area: 155,
      floor: "3/4",
      position: [34.6808, 33.0384],
    },
    {
      title: "House 4",
      price: "280,000 £",
      rooms: 5,
      area: 170,
      floor: "4/4",
      position: [34.6806, 33.0386],
    },
  ]);
  const [filter, setFilter] = useState("");
  const [sortBy, setSortBy] = useState("price");
  const [selectedHouse, setSelectedHouse] = useState(null);

  const toggleMap = () => setShowMap(!showMap);

  // Handling filter and sort changes
  const handleFilterChange = (e) => setFilter(e.target.value);
  const handleSortChange = (e) => setSortBy(e.target.value);

  // Handling house selection
  const handleHouseSelect = (house) => {
    setSelectedHouse(house);
    // Optionally, you might want to show the map when a house is selected
    if (!showMap) setShowMap(true);
  };

  return (
    <div className="container p-4 mx-auto">
      <div className="flex flex-col md:flex-row">
        <PropertyCards
          houses={houses}
          onSelect={handleHouseSelect}
          filter={filter}
          sortBy={sortBy}
          onFilterChange={handleFilterChange}
          onSortChange={handleSortChange}
        />
        <div className="w-full p-4 md:w-2/3">
          <button
            onClick={toggleMap}
            className="px-4 py-2 mb-4 text-white transition duration-300 bg-blue-500 rounded hover:bg-blue-600"
          >
            {showMap ? "Hide Map" : "Show on Map"}
          </button>
          {showMap && (
            <MapComponent houses={houses} selectedHouse={selectedHouse} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ListingsPage;
