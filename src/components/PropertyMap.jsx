import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '100%',
  height: '400px',
};

const PropertyMap = () => {
    const center = {
        lat: 40.748817,
        lng: -73.985428,
      };

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