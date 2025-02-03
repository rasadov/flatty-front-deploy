import React, { useState } from "react";
import { Share } from "../../assets/icons/Share";
import { Edit } from "../../assets/icons/Edit";
import { Download } from "../../assets/icons/Download";
import { Print } from "../../assets/icons/Print";
import { NoViews } from "../../assets/icons/NoViews";
import { Report } from "../../assets/icons/Report";
import { ShowOnMap } from "../../assets/icons/ShowOnMap";
import { PostView } from "../../assets/icons/PostView";
import CoverImage from "../../assets/images/noImage.jpeg";

const ImageGallery = ({ mainImage, thumbnails, length }) => {
  const [currentImage, setCurrentImage] = useState(mainImage);

  return (
    <div>
      {/* Main Image */}
      <div className="mb-3 rounded-md shadow-lg w-full h-[200px] md:h-[350px] lg:h-[500px] overflow-hidden">
        <img
          src={currentImage}
          alt="Property"
          className="object-cover w-full h-full"
          loading="lazy"
        />
      </div>

      {/* Thumbnail Gallery */}
      <div className="flex gap-2 overflow-x-auto">
        {thumbnails.slice(0, length).map((thumbnail, index) => (
          <div
            key={index}
            className={`flex-shrink-0 w-[70px] h-[70px] md:w-[95px] md:h-[95px] bg-gray-200 rounded-md shadow-sm cursor-pointer ${
              currentImage === thumbnail ? "ring-2 ring-[#8247E5]" : ""
            }`}
            onClick={() => setCurrentImage(thumbnail)}
            style={{
              margin: "8px",
            }}
          >
            <img
              src={thumbnail}
              alt={`Thumbnail ${index}`}
              className="object-cover rounded-md w-full h-full"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const PropertyShowcase = ({ length, property }) => {
  if (!property) {
    return (
      <div>
        <img
          src={CoverImage}
          alt="Thumbnail"
          className="object-cover rounded-md w-full h-full"
          loading="lazy"
          style={{
            width: "40%",
          }}
        />
      </div>
    );
  }

  const propertyImages = property.images.map((image) => image.image_url);

  const handleShowOnMapClick = () => {
    const { latitude, longitude } = property.location;
    const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
    window.open(googleMapsUrl, "_blank");
  };

  return (
    <div className="w-full mx-auto p-4 md:p-6 lg:py-8 lg:pr-8 lg:pl-0">
      {/* Property Details */}
      <div>
        <h1 className="mb-2 text-[24px] md:text-[28px] lg:text-[36px] font-semibold text-[#0F1D40] leading-[1.2]">
          {property.title}
        </h1>
        <div className="mb-4 text-[14px] md:text-[16px] text-[#8C93A3] font-normal flex items-center gap-2">
          <PostView size={20} color={"#8C93A3"} />
          <span>{property.views} views</span>
        </div>
        <div className="flex flex-wrap gap-2 items-center mb-5">
          <div className="text-[14px] md:text-[16px] text-[#525C76] font-normal">
            {property.location.address}
          </div>
          <button
            onClick={handleShowOnMapClick}
            className="text-[14px] md:text-[16px] text-[#8247E5] font-normal flex items-center gap-1"
          >
            <ShowOnMap />
            Show on map
          </button>
        </div>
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
