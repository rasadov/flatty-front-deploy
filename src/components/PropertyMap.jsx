import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const PropertyMap = ({ location }) => {
  const center = {
    lat: location.latitude,
    lng: location.longitude,
  };

  const mapContainerStyle = {
    width: "100%",
    height: "300px",
  };

  return (
    <div className="w-full">
      <LoadScript googleMapsApiKey="AIzaSyCmyl8QRHQp6LHWfTDJrCX84NM1TJAC1fM">
        <GoogleMap
          mapContainerStyle={{
            ...mapContainerStyle,
            height: "50vh",
          }}
          center={center}
          zoom={14}
        >
          <Marker position={center} />
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default PropertyMap;
