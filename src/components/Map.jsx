// src/components/Map.jsx
import React, { useState, useEffect, useRef } from "react";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import { MarkerClusterer } from "@googlemaps/markerclusterer";

export default function Map({ properties = [], onMarkerClick, onClusterClick }) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyCmyl8QRHQp6LHWfTDJrCX84NM1TJAC1fM",
  });

  const clustererRef = useRef(null);
  const [map, setMap] = useState(null);
  const [center, setCenter] = useState({ lat: 35.3, lng: 33.4 });
  const [zoomLevel, setZoomLevel] = useState(10);

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

  // Стили карты (например, чтобы скрыть POI)
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

    // Если кластер уже создан – очищаем его маркеры
    if (clustererRef.current) {
      clustererRef.current.clearMarkers();
    }

    // Создаём маркеры для каждого объекта
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

      // Сохраняем данные объекта в маркере – пригодится при клике по кластеру
      marker.propertyData = property;

      marker.addListener("click", () => {
        onMarkerClick?.(property);
      });

      return marker;
    });

    // Создаём кластеризатор с настраиваемым рендерером
    clustererRef.current = new MarkerClusterer({
      markers,
      map,
      renderer: {
        render: ({ count, markers, position }) => {
          const clusterMarker = new window.google.maps.Marker({
            position,
            icon: {
              path: window.google.maps.SymbolPath.CIRCLE,
              fillColor: "#7C3AED",
              fillOpacity: 1,
              strokeWeight: 1,
              scale: 24,
            },
            label: {
              text: String(count),
              color: "#FFFFFF",
              fontSize: "22px",
              fontWeight: "bold",
            },
          });
          clusterMarker.addListener("click", () => {
            // При клике по кластеру приближаем карту к границам кластера
            if (map) {
              const bounds = new window.google.maps.LatLngBounds();
              markers.forEach((m) => bounds.extend(m.getPosition()));
              map.fitBounds(bounds);
            }
            // Вызываем callback с массивом объектов из кластера
            const clusterProperties = markers.map((m) => m.propertyData);
            onClusterClick?.(clusterProperties);
          });
          return clusterMarker;
        },
      },
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
        zoomControl: false,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        styles: mapStyles,
      }}
    />
  );
}