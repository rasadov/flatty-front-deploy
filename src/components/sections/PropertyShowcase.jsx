import React, { useState } from "react";
import { Share } from "../../assets/icons/Share";
import { Edit } from "../../assets/icons/Edit";
import { Download } from "../../assets/icons/Download";
import { Print } from "../../assets/icons/Print";
import { NoViews } from "../../assets/icons/NoViews";
import { Report } from "../../assets/icons/Report";
import { ShowOnMap } from "../../assets/icons/ShowOnMap";
import { PostView } from "../../assets/icons/PostView";
// Button Component
const ActionButton = ({ label, onClick }) => (
  <button onClick={onClick}>{label}</button>
);

const ImageGallery = ({ mainImage, thumbnails, length }) => {
  const [currentImage, setCurrentImage] = useState(mainImage);

  return (
    <div>
      {/* Main Image */}
      <img
        src={currentImage}
        alt="Property"
        className="mb-3 rounded-md shadow-lg w-full h-[538.99px]"
        loading="lazy"
      />

      {/* Thumbnail Gallery */}
      <div className="flex gap-[24px]">
        {thumbnails.slice(0, length).map((thumbnail, index) => (
          <div
            key={index}
            className={`w-full min-h-[95.76px] bg-gray-200 rounded-md shadow-sm opacity-90 cursor-pointer ${
              currentImage === thumbnail ? "ring-2 ring-blue-500" : ""
            }`}
            onClick={() => setCurrentImage(thumbnail)} // Update main image on click
          >
            <img
              src={thumbnail}
              alt={`Thumbnail ${index}`}
              className="object-cover rounded-md w-full h-[95.76px]"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

// Main PropertyShowcase Component
const PropertyShowcase = ({ length, property }) => {
  // State for property data

  if (!property) {
    return <div>No property found.</div>;
  }

  console.log(property);
  var propertyImages = property.images.map((image) => image.image_url);

  const handleShowOnMapClick = () => {
    const { latitude, longitude } = property.location;
    const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
    window.open(googleMapsUrl, '_blank');
  };

  return (
    <div className="w-full mx-auto min-w-5xl">
      {/* Property Details */}
      <div>
        <h1 className="mb-2 text-[36px] font-semibold  text-[#0F1D40] leading-[54px]">
          {property.title}
        </h1>
        <div className="mb-4 text-[16px] text-[#8C93A3] font-normal flex justify-start gap-1 items-center">
          <PostView size={20} color={"#8C93A3"} />
          <span>{property.views} views</span>
        </div>
        <div className="flex justify-start gap-4">
          <div className="mb-4 text-[16px] text-[#525C76] font-normal">
            {property.location.address}
          </div>
          <a href="/map">
          <div 
          className="mb-4 text-[16px] text-[#8247E5] font-normal flex "
          onClick={handleShowOnMapClick}>
            <ShowOnMap />
            Show on map
          </div>
          </a>
        </div>
      </div>
      {/* Button Group */}
      <div className="flex gap-2 mb-4">
        {/* {property.map((button, index) => (
          <ActionButton
            key={index}
            label={button.label}
            onClick={() => alert(`${button.label} clicked`)}
          />
        ))} */}
      </div>

      {/* Image Gallery */}
      <ImageGallery
        mainImage={property.images[0].image_url}
        thumbnails={propertyImages}
        length={property.images.length}
      />
    </div>
  );
};

export default PropertyShowcase;
