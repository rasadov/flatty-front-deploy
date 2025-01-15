import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '100%',
  height: '400px',
};

const PropertyMap = (location) => {
  console.log("Location", location);
    const center = {
        lat: location.location.latitude,
        lng: location.location.longitude,
      };
    console.log("Center", center);
  return (
    <LoadScript googleMapsApiKey="AIzaSyCmyl8QRHQp6LHWfTDJrCX84NM1TJAC1fM">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={14}
      >
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
};

export default PropertyMap;