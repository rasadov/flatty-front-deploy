import React from 'react';

export default function MapPropertyDetails({ property }) {
  if (!property) return null;

  return (
    <div style={{ margin: '1rem' }}>
      <h2>{property.title}</h2>
      <p><strong>ID:</strong> {property.id}</p>
      <p><strong>Price:</strong> {property.price}</p>
      <p><strong>Description:</strong> {property.description}</p>
    </div>
  );
}
