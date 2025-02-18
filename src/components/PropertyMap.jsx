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
  const mapStyles = [
    {
      featureType: "poi",
      elementType: "labels",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "poi.business",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "transit",
      stylers: [{ visibility: "off" }],
    },
  ];
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
          options={{
            zoomControl: false,
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: false,
            styles: mapStyles,
          }}
        >
          <Marker position={center} />
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default PropertyMap;
