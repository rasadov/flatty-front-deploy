import React, { useEffect, useState } from "react";
import { Share } from "../../assets/icons/Share";
import { Edit } from "../../assets/icons/Edit";
import { Download } from "../../assets/icons/Download";
import { Print } from "../../assets/icons/Print";
import { NoViews } from "../../assets/icons/NoViews";
import { Report } from "../../assets/icons/Report";
import { ShowOnMap } from "../../assets/icons/ShowOnMap";
import { PostView } from "../../assets/icons/PostView";
import apparment1 from "../../assets/images/apparment1.png";
import apartment2 from "../../assets/images/apparment2.png";
import apartment3 from "../../assets/images/apparment3.png";
import apartment4 from "../../assets/images/apparment4.png";
// Button Component
const ActionButton = ({ label, onClick }) => (
  <button onClick={onClick}>{label}</button>
);

// Image Gallery Component
const ImageGallery = ({ mainImage, thumbnails, length }) => (
  <div>
    <img
      src={mainImage}
      alt="Property"
      className=" mb-3 rounded-md shadow-lg w-full h-[538.99px]"
      loading="lazy"
    />
    <div className="flex gap-[24px]">
      {thumbnails.slice(0, length).map((thumbnail, index) => (
        <div
          key={index}
          className="w-full min-h-[95.76px] bg-gray-200 rounded-md shadow-sm opacity-90  "
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

// Main PropertyShowcase Component
const PropertyShowcase = ({ length }) => {
  // State for property data
  const [property, setProperty] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch property data dynamically (mocked API call)
  useEffect(() => {
    const fetchPropertyData = async () => {
      try {
        setIsLoading(true);
        // Mocked API data for testing
        const data = {
          title: "Selling 3 Room Apartment",
          views: { total: 1500, today: 35 },
          address: "3 Zinonos Kitieos, Flat 18 2064 Strovolos",
          mainImage: apparment1,
          thumbnails: [
            apartment2,
            apartment4,
            apparment1,
            apartment4,
            apartment3,
            apartment4,
            apartment4,
          ],
          buttons: [
            { label: <Share />, onClick: () => alert("Share clicked") },
            { label: <Edit />, onClick: () => alert("Edit clicked") },
            { label: <Download />, onClick: () => alert("Edit clicked") },
            { label: <Print />, onClick: () => alert("Edit clicked") },
            { label: <NoViews />, onClick: () => alert("Edit clicked") },
            { label: <Report />, onClick: () => alert("Edit clicked") },
          ],
        };
        setProperty(data);
      } catch (error) {
        setError("Failed to load property data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPropertyData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!property) {
    return <div>No property found.</div>;
  }

  return (
    <div className="w-full mx-auto min-w-5xl">
      {/* Property Details */}
      <div>
        <h1 className="mb-2 text-[36px] font-semibold  text-[#0F1D40] leading-[54px]">
          {property.title}
        </h1>
        <div className="mb-4 text-[16px] text-[#8C93A3] font-normal flex justify-start gap-1 items-center">
          <PostView size={20} color={"#8C93A3"} />
          <span>{property.views.total} views</span>,{" "}
          <span>{property.views.today} today</span>
        </div>
        <div className="flex justify-start gap-4">
          <div className="mb-4 text-[16px] text-[#525C76] font-normal">
            {property.address}
          </div>
          <div className="mb-4 text-[16px] text-[#8247E5] font-normal flex ">
            <ShowOnMap />
            Show on map
          </div>
        </div>
      </div>
      {/* Button Group */}
      <div className="flex gap-2 mb-4">
        {property.buttons.map((button, index) => (
          <ActionButton
            key={index}
            label={button.label}
            onClick={() => alert(`${button.label} clicked`)}
          />
        ))}
      </div>

      {/* Image Gallery */}
      <ImageGallery
        mainImage={property.mainImage}
        thumbnails={property.thumbnails}
        length={length}
      />
    </div>
  );
};

export default PropertyShowcase;
