// src/components/Map.jsx

import React, { useState } from 'react';
import {
  GoogleMap,
  useLoadScript,
  Marker
} from '@react-google-maps/api';

export default function Map({ properties = [], onMarkerClick }) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyCmyl8QRHQp6LHWfTDJrCX84NM1TJAC1fM'
  });

  // Track the map instance & current zoom level
  const [map, setMap] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(9);
  const [center, setCenter] = useState({ lat: 35.3, lng: 33.4 });

  if (loadError) return <div>Map cannot be loaded right now...</div>;
  if (!isLoaded) return <div>Loading Map...</div>;

  // Helper: group properties by lat/lng
  const groupPropertiesByLocation = (props) => {
    console.log(props);
    // if (!Array.isArray(props) || props.length === 0) return [];
    console.log(props);
    const grouped = {};
    props.forEach((property) => {
      const lat = property.latitude;
      const lng = property.longitude;
      const key = `${lat}-${lng}`;
      if (!grouped[key]) {
        grouped[key] = { lat, lng, properties: [] };
      }
      grouped[key].properties.push(property);
    });
    return Object.values(grouped); // => array of { lat, lng, properties: [...] }
  };

  // Pre-group all properties
  const groupedLocations = groupPropertiesByLocation(properties);

  // Default map center & container style
  const mapContainerStyle = { width: '100%', height: '100%' };

  // On marker click, pass array of properties at that location
  const handleMarkerClick = (propertiesAtLocation) => {
    // const newCenter = { lat: propertiesAtLocation[0].lat, lng: propertiesAtLocation[0].lng };
    // setCenter(newCenter);

    // map.panTo(center);
    onMarkerClick?.(propertiesAtLocation);
  };

  // Decide how to render markers based on zoom level
  const renderMarkers = () => {
    // If user is too zoomed out, show one big marker
    if (zoomLevel < 6) {
      return (
        <Marker
          position={center}  // e.g. { lat: 55, lng: 37 }
          icon={{
            // White or any color circle
            path: window.google.maps.SymbolPath.CIRCLE,
            fillColor: '#FFFFFF',
            fillOpacity: 0.8,
            strokeColor: '#CCCCCC',
            strokeWeight: 1,
            scale: 20
          }}
          label={{
            text: 'View all',
            color: '#000000',
            fontWeight: 'bold'
          }}
          onClick={() => {
            // When clicked, zoom to reveal more markers
            map.setZoom(9);
            map.panTo({ lat: 55, lng: 37 }); // or wherever you want
          }}
        />
      );
    }

    // Otherwise, show normal grouped markers
    return groupedLocations.map((locationGroup, index) => {
      const count = locationGroup.properties.length;
      if (count === 1) {
        // Single property -> smaller purple circle
        return (
          <Marker
            key={index}
            position={{ lat: locationGroup.lat, lng: locationGroup.lng }}
            icon={{
              path: window.google.maps.SymbolPath.CIRCLE,
              fillColor: '#7C3AED',
              fillOpacity: 1,
              strokeColor: '#7C3AED',
              strokeWeight: 1,
              scale: 10
            }}
            // If you want a "1" label, uncomment below:
            // label={{ text: '1', color: '#FFFFFF', fontWeight: 'bold' }}
            onClick={() => handleMarkerClick(locationGroup.properties)}
          />
        );
      } else {
        // Multiple properties -> larger circle with bold text
        return (
          <Marker
            key={index}
            position={{ lat: locationGroup.lat, lng: locationGroup.lng }}
            icon={{
              path: window.google.maps.SymbolPath.CIRCLE,
              fillColor: '#7C3AED',
              fillOpacity: 1,
              strokeColor: '#7C3AED',
              strokeWeight: 1,
              scale: 16,
              labelOrigin: new window.google.maps.Point(0, 0)
            }}
            label={{
              text: String(count),
              color: '#FFFFFF',
              fontWeight: 'bold',
              fontSize: '14px'
            }}
            onClick={() => handleMarkerClick(locationGroup.properties)}
          />
        );
      }
    });
  };

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={center}
      zoom={13}
      onLoad={(mapInstance) => {
        setMap(mapInstance);
        // Listen for zoom changes
        mapInstance.addListener('zoom_changed', () => {
          setZoomLevel(mapInstance.getZoom());
        });
      }}
    >
      {renderMarkers()}
    </GoogleMap>
  );
}
