// src/pages/MapView.jsx
import { useState } from 'react';
import { useSelector } from "react-redux";
import Map from '../components/Map';
import MapPropertyDetails from '../components/MapPropertyDetails';
import Header from "../layouts/Header";
import { Footer } from "../layouts/Footer";

export default function MapView() {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const { isLoggedIn } = useSelector((state) => state.auth);

  const handleCloseDetails = () => {
    setSelectedProperty(null);
  };

  return (
    <main className="flex-grow  bg-[#F4F2FF] ">
        <Header key={isLoggedIn ? "logged-in" : "logged-out"} />
        <div>
            <div style={{ display: 'flex', height: '100vh' }}>
                {/* Left side: property details */}
                {selectedProperty ? (
                    <div
                    style={{
                        width: '20%',
                        borderRight: '1px solid #ccc',
                        overflowY: 'auto',
                        position: 'absolute',
                        zIndex: 1,
                        backgroundColor: 'white',
                        height: '100vh'
                    }}
                    >
                    <button
                        onClick={handleCloseDetails}
                        style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        backgroundColor: 'transparent',
                        color: 'gray',
                        border: 'none',
                        borderRadius: '50%',
                        width: '30px',
                        height: '30px',
                        cursor: 'pointer',
                        fontSize: '20px'
                        }}
                    >
                        &times;
                    </button>
                    <MapPropertyDetails property={selectedProperty} />
                    </div>
                ) : (
                    ""
                )}
                {/* Right side: Google Map */}
                <div style={{ flex: 1 }}>
                    <Map onMarkerClick={setSelectedProperty} />
                </div>
            </div>
        </div>
        <div className="px-6  mx-auto  bg-[#ECE8FF]">
            <Footer />
        </div>
    </main>

  );
}
