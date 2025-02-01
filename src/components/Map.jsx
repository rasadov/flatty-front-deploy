import React, { useState, useEffect } from "react";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import { MarkerClusterer } from "@googlemaps/markerclusterer";

export default function Map({ properties = [], onMarkerClick }) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyCmyl8QRHQp6LHWfTDJrCX84NM1TJAC1fM",
  });

  const [map, setMap] = useState(null);
  const [center, setCenter] = useState({ lat: 35.3, lng: 33.4 });
  const [zoomLevel, setZoomLevel] = useState(13);

  useEffect(() => {
    if (map && properties.length > 0) {
      renderMarkersWithClustering();
    }
  }, [map, properties]);

  const handleZoomChanged = () => {
    if (map) {
      const newZoom = map.getZoom();
      setZoomLevel(newZoom);
    }
  };

  if (loadError) return <div>Map cannot be loaded right now...</div>;
  if (!isLoaded) return <div>Loading Map...</div>;

  const mapContainerStyle = { width: "100%", height: "100%" };

  // Custom map style to hide POI (Points of Interest)
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

  const renderMarkersWithClustering = () => {
    if (!window.google || !map) return;

    // Array to hold markers
    const markers = properties.map((property) => {
      const position = { lat: property.latitude, lng: property.longitude };
      const marker = new window.google.maps.Marker({
        position,
        title: property.name,
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          fillColor: "#7C3AED",
          fillOpacity: 1,
          strokeColor: "#7C3AED",
          strokeWeight: 1,
          scale: 10,
        },
      });

      marker.addListener("click", () => {
        onMarkerClick?.([property]); // When clicking on a single marker, show the associated property
      });

      return marker;
    });

    // Setup the MarkerClusterer
    const markerClusterer = new MarkerClusterer({
      markers,
      map,
      renderer: {
        render: ({ count, position }) => {
          const clusterElement = new window.google.maps.Marker({
            position,
            icon: {
              path: window.google.maps.SymbolPath.CIRCLE,
              fillColor: "#7C3AED", // Keep the fill color
              fillOpacity: 1,
              strokeColor: "#7C3AED", // Set the stroke color to transparent to remove the outline
              strokeWeight: 0, // Optionally set stroke weight to 0
              scale: 24,
            },
            label: {
              text: String(count),
              color: "#FFFFFF",
              fontSize: "22px",
              fontWeight: "bold",
            },
          });
          return clusterElement;
        },
      },
    });

    // Handle cluster clicks
    markerClusterer.addListener("clusterclick", (event) => {
      const clickedCluster = event.getCluster();
      const markersInCluster = clickedCluster.getMarkers(); // Get all markers in the clicked cluster
      const propertiesInCluster = markersInCluster.map((marker) => {
        const propertyTitle = marker.getTitle();
        return properties.find((property) => property.name === propertyTitle);
      });

      // Call onMarkerClick with all properties in the cluster
      onMarkerClick(propertiesInCluster);
    });
  };

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={center}
      zoom={zoomLevel}
      onLoad={(mapInstance) => {
        setMap(mapInstance);
        renderMarkersWithClustering();
      }}
      onZoomChanged={handleZoomChanged}
      options={{
        zoomControl: true,
        zoomControlOptions: {
          position: window.google.maps.ControlPosition.RIGHT_CENTER, // Adjust this to move the control higher
        },
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        styles: mapStyles,
      }}
    />
  );
}
