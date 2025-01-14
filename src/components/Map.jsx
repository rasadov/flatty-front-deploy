// src/components/Map.jsx
import React from 'react';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  MarkerClusterer
} from '@react-google-maps/api';

export default function Map({ onMarkerClick }) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'GoogleAPI'
  });

  if (loadError) return <div>Map cannot be loaded right now...</div>;
  if (!isLoaded) return <div>Loading Map...</div>;

  const mockProperties = [
    {
      id: 1,
      lat: 35.19,
      lng: 33.38,
      title: 'Modern Villa in Kyrenia',
      price: '£250,000',
      description: '3-bedroom villa with sea view'
    },
    {
      id: 2,
      lat: 35.34,
      lng: 33.25,
      title: 'Seaside Penthouse',
      price: '£310,000',
      description: 'Luxury penthouse by the beach'
    },
    {
      id: 3,
      lat: 35.3,
      lng: 33.55,
      title: 'Cozy Apartment in Famagusta',
      price: '£120,000',
      description: '2-bedroom apartment near shops'
    },
    {
      id: 4,
      lat: 35.2875,
      lng: 33.3887,
      title: 'Bungalow in Rural Area',
      price: '£99,500',
      description: 'Charming 2-bedroom with big garden'
    }
  ];

  const center = { lat: 35.3, lng: 33.4 };
  const mapContainerStyle = { width: '100%', height: '100%' };

  const handleMarkerClick = (property) => {
    onMarkerClick?.(property);
  };

  const renderMarkers = (clusterer) =>
    mockProperties.map((property) => (
      <Marker
        key={property.id}
        position={{ lat: property.lat, lng: property.lng }}
        clusterer={clusterer}
        onClick={() => handleMarkerClick(property)}
      />
    ));

    return (
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={9}
      >
        <MarkerClusterer
          averageCenter
          // This gridSize sets how “close” markers have to be to cluster together.
          gridSize={60}
          // The calculator function is optional; it just helps shape how text is displayed.
          calculator={(markers) => {
            return {
              text: String(markers.length),
              index: 1, 
              title: `Cluster of ${markers.length}`
            };
          }}
          // The styles array lets you define a custom cluster icon. 
          styles={[
            {
              // You can replace this with a real image URL or data URI 
              // of your purple circle. Example is just a placeholder:
              url: 'https://flattybucket.s3.us-east-1.amazonaws.com/uploads/Ellipse+524.svg',
              width: 50,
              height: 50,
              textColor: '#FFFFFF',
              textSize: 16,
              // textColor and textSize control the text inside the cluster
            },
          ]}
        >
          {(clusterer) => <>{renderMarkers(clusterer)}</>}
        </MarkerClusterer>
      </GoogleMap>
    );
  }
