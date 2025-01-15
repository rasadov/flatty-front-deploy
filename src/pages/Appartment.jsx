import React, { useEffect, useState, memo, useCallback } from "react";
import { useParams } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";
import CardList from "../components/sections/CardList";
import HouseItem from "../components/HouseItem";
import PropertyShowcase from "../components/sections/PropertyShowcase";
import { motion } from "framer-motion";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import AgencyMiniCard from "../components/AgencyMiniCard";
import Rating from "../components/Rating";
import { Euro } from "../assets/icons/Euro";
import { Chat } from "../assets/icons/Chat";
import { Contact } from "../assets/icons/Contact";
import PropertyMap from "../components/PropertyMap.jsx";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Appartment = memo(() => {
  const { id } = useParams();
  const [apartmentData, setApartmentData] = useState(null);
  const [rating, setRating] = useState(4);

  useEffect(() => {
    const fetchApartmentData = async () => {
      try {
        const response = await fetch(`http://localhost:5001/api/v1/property/record/${id}`);
        const data = await response.json();

        // Map the API data to the required format
        const mappedData = {
          id: data.id,
          price: data.price,
          currency: data.currency,
          description: data.description,
          updated: new Date(data.created_at).toLocaleDateString(),
          agentName: data?.owner?.user?.name,
          agentTitle: "Real Estate Agent",
          agentImage: data.images?.[0]?.image_url || "",
          area: data.info?.total_area,
          rooms: data.info?.bedrooms,
          currFloor: data.info?.floor,
          totalFloorsInBuilding: data.info?.floors,
          building: data.info?.apartment_stories,
          map: {
            latitude: data.location.latitude,
            longitude: data.location.longitude,
          },
          location: data.location.address,
          images: data.images.map((img) => ({
            src: img.image_url,
            alt: `Image for Apartment ${data.id}`,
          })),
        };

        setApartmentData(mappedData);
      } catch (error) {
        console.error("Error fetching apartment data:", error);
      }
    };

    fetchApartmentData();
  }, [id]);

  const handleRatingClick = useCallback((value) => {
    setRating(value);
  }, []);

  const renderImages = (images) =>
    images.map((image, index) => (
      <LazyLoadImage
        key={index}
        src={image.src}
        alt={image.alt || `Apartment Image ${index}`}
        width="100%"
        effect="blur"
        placeholderSrc={image.placeholder || image.src}
      />
    ));

  if (!apartmentData) return <div>Loading...</div>;

  return (
    <div className="w-full py-3 mx-auto">
      <div className="flex flex-col lg:flex-row lg:justify-between">
        {/* Left Section */}
        <div className="lg:w-[65%]">
          <Breadcrumbs title="Apartment" />
          <PropertyShowcase images={renderImages(apartmentData.images)} />

          <div className="my-12">
            <PropertyDetailsGrid
              details={[
                { title: "Rooms", value: `${apartmentData.rooms} Rooms` },
                { title: "Apartment area", value: `${apartmentData.area} m2` },
                { title: "Floor", value: `${apartmentData.currFloor || " "}${"/"+apartmentData.totalFloorsInBuilding || " "}` },
              ]}
            />
          </div>

          {/* Description */}
          <div className="my-14">
            <h1 className="text-[#0F1D40] font-semibold text-[36px] leading-[54px] md:text-[24px] md:leading-[36px]">
              Description
            </h1>
            <p className="text-[#0F1D40] font-normal text-[18px] leading-[28.8px] md:text-[16px] md:leading-[24px]">
              {apartmentData.description}
            </p>
            <span>Updated {apartmentData.updated}</span>
            <hr className="my-8 border-t-2 border-[#EEEFF2]" />
          </div>

          {/* Map */}
          <div className="w-full md:w-[866px] my-8">
            <h2 className="text-[#0F1D40] font-semibold text-[36px] leading-[54px] md:text-[24px] md:leading-[36px]">
              Map
            </h2>
            <PropertyMap latitude={apartmentData.map.latitude} longitude={apartmentData.map.longitude} />
          </div>
        </div>

        {/* Right Section */}
        <div className="lg:w-[33%] sticky h-[calc(100vh-.5rem)] top-16 overflow-y-auto hidden md:block">
          <motion.div
            className="p-6 bg-white border rounded-md shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-center justify-start gap-2 mb-2 text-[28px] font-semibold text-[#525C76]">
              {apartmentData.price} <Euro size={28} />
            </div>
            <div className="flex justify-start items-center gap-2 mb-2 text-[#525C76] font-medium text-[12px]">
              <div>{apartmentData.rooms} Room Apartment</div>
              <div>{apartmentData.area} m2</div>
            </div>
            <hr className="my-4 border-t-2 border-[#EEEFF2]" />
            <div className="flex items-center justify-start gap-4">
              <motion.img
                src={apartmentData.agentImage}
                alt="Agent"
                className="object-cover w-[47px] h-[47px] rounded-full"
              />
              <div>
                <Link
                  to={"/agent"}
                  className="font-semibold text-[#525C76] text-[16px]"
                >
                  {apartmentData.agentName}
                </Link>
                <div className="text-sm text-[#525C76] font-medium">
                  {apartmentData.agentTitle}
                </div>
                <Rating rating={rating} onRatingClick={handleRatingClick} />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
});

const PropertyDetailsGrid = ({ details }) => (
  <div className="grid grid-cols-5 gap-4 my-12">
    {details.map((detail, index) => (
      <div
        key={index}
        className="flex justify-around min-w-[117px] min-h-[50px]"
      >
        <div className="rounded-full bg-[#CACDD5] w-[50px] h-[50px]"></div>
        <div className="text-left">
          <span className="text-[#525C76] font-medium text-[14px] leading-[22.4px]">
            {detail.title}
          </span>
          <p className="text-[#0F1D40] text-[14px] font-medium">
            {detail.value}
          </p>
        </div>
      </div>
    ))}
  </div>
);

export default Appartment;
