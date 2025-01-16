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
  const currency = localStorage.getItem("currency") || "$";

  useEffect(() => {
    const fetchApartmentData = async () => {
      try {
        const response = await fetch(`https://flatty.abyssara.tech/api/v1/property/record/${id}`);
        const data = await response.json();

        setApartmentData(data);

        await fetch(`https://flatty.abyssara.tech/api/v1/property/view/${id}`, {
          method: "POST",
        });
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

  console.log("Apartment Data:", apartmentData);
  // console.log("Number: ", apartmentData.owner?.user?.phone.slice(1))
  var phoneNumber
  try {

    phoneNumber = apartmentData.owner?.user?.phone.slice(1);
  } catch (error) {
    console.log("Error: ", error)
    phoneNumber = "0000000000"
  }

  var floors

  if (apartmentData.category === "Villa") {
    floors = { title: "Floors", value: `${apartmentData.info.floors || " "}` }
  } else {
    floors = { title: "Floor", value: `${apartmentData.info.floor || " "}${"/"+apartmentData.info.floors || " "}` }
  }

  return (
    <div className="w-full py-3 mx-auto">
      <div className="flex flex-col lg:flex-row lg:justify-between">
        {/* Left Section */}
        <div className="lg:w-[65%]">
          <Breadcrumbs title="Apartment" />
          <PropertyShowcase property={apartmentData} />

          <div className="my-12">
            <PropertyDetailsGrid
              details={[
                { title: "Rooms", value: `${apartmentData.info.bedrooms} Rooms` },
                { title: "Apartment area", value: `${apartmentData.info.total_area } m2` },
                floors,
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
            <hr className="my-8 border-t-2 border-[#EEEFF2]" />
          </div>

          {/* Map */}
          <div className="w-full md:w-[866px] my-8">
            <h2 className="text-[#0F1D40] font-semibold text-[36px] leading-[54px] md:text-[24px] md:leading-[36px]">
              Map
            </h2>
            <PropertyMap
              location={apartmentData.location} />
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
              <div>{apartmentData.info.bedrooms} Room {apartmentData.info.category}</div>
              <div>{apartmentData.info.total_area} m2</div>
            </div>
            <hr className="my-4 border-t-2 border-[#EEEFF2]" />
            <div className="flex items-center justify-start gap-4">
              <motion.img
                src="https://flattybucket.s3.us-east-1.amazonaws.com/uploads/user.jpg"
                alt="Agent"
                className="object-cover w-[47px] h-[47px] rounded-full"
              />
              <div>
                <Link
                  to={"/agent"}
                  className="font-semibold text-[#525C76] text-[16px]"
                >
                  {apartmentData.owner?.user?.name}
                </Link>
                <div className="text-sm text-[#525C76] font-medium">
                  {/* {apartmentData.agentTitle} */}
                  Real Estate Agent
                </div>
                {/* <Rating rating={rating} onRatingClick={handleRatingClick} /> */}
              </div>
            </div>
              <div className="flex flex-col gap-2 mt-3"
              onClick={() => {
                const phoneNumber = phoneNumber;
                const whatsappUrl = `https://wa.me/${phoneNumber}`;
                window.location.href = whatsappUrl;
              }}>
              <Button
                className="w-full text-white py-[5px] px-3 mt-3 h-[52px] rounded-sm text-[20px] font-semibold leading-[22.4px]"
                variant="primary"
              >
                <Contact />
                Contact
              </Button>
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
