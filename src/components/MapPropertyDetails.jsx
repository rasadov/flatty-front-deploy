import React from 'react';
import HouseItem from "../components/HouseItem";

export default function MapPropertyDetails({ properties }) {
  // If no properties, just return null. 
  if (!properties || properties.length === 0) return null;
  for (let i = 0; i < properties.length; i++) {
    console.log(properties[i].images);
  }
  return (
    <div style={{ margin: '1rem' }}>
      {/* <h2>Selected Properties ({properties.length})</h2> */}
      <div className='pt-2'>
        {properties.map((property) => (
          <div className='my-2'>
          <HouseItem
            key={property?.id}
            id={property?.id}
            images={property?.images}
            price={property?.price}
            location={property?.location?.address}
            rooms={property?.info?.bedrooms}
            area={property?.info?.total_area}
            currFloor={property?.info?.floor}
            building={property?.info?.apartment_stories}
          />
          </div>
        ))}
      </div>
    </div>
  );
}