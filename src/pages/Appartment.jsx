import React, { useEffect, useState, memo, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";
import PropertyShowcase from "../components/sections/PropertyShowcase";
import Button from "../components/Button";
import { Contact } from "../assets/icons/Contact";
import PropertyMap from "../components/PropertyMap.jsx";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { formatNumber } from "../components/numberFormater.jsx";
import { YearIcon } from "../assets/icons/Year.jsx";
import { LivingAreaIcon } from "../assets/icons/LivingArea.jsx";
import { TotalAreaIcon } from "../assets/icons/TotalArea.jsx";
import { FloorIcon } from "../assets/icons/Floor.jsx";
import { motion } from "framer-motion";
import "react-lazy-load-image-component/src/effects/blur.css";

const Appartment = memo(() => {
  const { id } = useParams();
  const [apartmentData, setApartmentData] = useState(null);
  const [rating, setRating] = useState(4); // example rating state
  const currency = localStorage.getItem("currency") || "£";

  const currencies_to_dollar = {
    "€": 1.03,
    "£": 1.22,
    $: 1,
    "₺": 0.028,
  };

  useEffect(() => {
    const fetchApartmentData = async () => {
      try {
        const response = await fetch(
          `https://api.flatty.ai/api/v1/property/record/${id}`
        );
        const data = await response.json();
        setApartmentData(data);

        // Post "view" increment
        await fetch(`https://api.flatty.ai/api/v1/property/view/${id}`, {
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

  // Helper to render images if needed (not critical with PropertyShowcase):
  const renderImages = (images) =>
    images.map((image, index) => (
      <LazyLoadImage
        key={index}
        src={image.image_url}
        alt={`Apartment Image ${index}`}
        width="100%"
        effect="blur"
        placeholderSrc={image.image_url}
      />
    ));

  if (!apartmentData) return <div>Loading...</div>;

  // Example handling of phoneNumber from nested data
  let phoneNumber = "0000000000";
  try {
    phoneNumber =
      apartmentData.owner?.user?.phone?.replace(/\D/g, "") || "0000000000";
  } catch (error) {
    console.log("Error: ", error);
  }

  // "Floor" or "Floors" logic
  let floors;
  if (apartmentData?.info?.category === "Villa") {
    floors = {
      title: "Floors",
      value: `${apartmentData.info.floors || " "}`,
    };
  } else {
    floors = {
      title: "Floor",
      value: `${apartmentData.info.floor || " "}/${
        apartmentData.info.floors || " "
      }`,
    };
  }

  return (
    <div className="w-full py-3 mx-auto">
      <div className="flex flex-col lg:flex-row lg:justify-between">
        {/* Left Section */}
        <div className="lg:w-[65%]">
          {/* Breadcrumbs */}
          <Breadcrumbs title="Apartment" />

          {/* Image Slideshow */}
          <PropertyShowcase property={apartmentData} />

          {/* Icons row: total area, living area, year, floor */}
          <div className="flex flex-wrap justify-start items-center gap-8 mt-6">
            {/* Icon 1: total area */}
            <div className="flex flex-col items-center text-center">
              {/* <img
                src="../assets/icons/totalArea.svg"
                alt="Total area"
                className="w-8 h-8 mb-2"
              /> */}
              <TotalAreaIcon />
              <p className="text-sm font-medium">
                {apartmentData.info?.total_area || 0} m<sup>2</sup>
              </p>
              <span className="text-xs text-[#525C76]">Total area</span>
            </div>

            {/* Icon 2: living area */}
            <div className="flex flex-col items-center text-center">
              {/* <img
                src="../assets/icons/livingArea.svg"
                alt="Living area"
                className="w-8 h-8 mb-2"
              /> */}
              <LivingAreaIcon />
              <p className="text-sm font-medium">
                {apartmentData.info?.living_area || 0} m<sup>2</sup>
              </p>
              <span className="text-xs text-[#525C76]">Living area</span>
            </div>

            {/* Icon 3: year - example hard-coded or from data */}
            <div className="flex flex-col items-center text-center">
              {/* <img src="../assets/icons/year.svg" alt="Year" className="w-8 h-8 mb-2" /> */}
              <YearIcon />
              <p className="text-sm font-medium">{apartmentData.building?.year_built}</p>
              <span className="text-xs text-[#525C76]">Year</span>
            </div>

            {/* Icon 4: floor */}
            <div className="flex flex-col items-center text-center">
              {/* <img src="../assets/icons/floors.svg" alt="Floor" className="w-8 h-8 mb-2" />
               */}
              <FloorIcon />
              <p className="text-sm font-medium">
                {floors.value === " / " ? "1/4" : floors.value}
              </p>
              <span className="text-xs text-[#525C76]">Floor</span>
            </div>
          </div>

          {/* Description */}
          <div className="my-14">
            <h1 className="text-[#0F1D40] font-semibold text-[36px] leading-[54px] md:text-[24px] md:leading-[36px] mb-3">
              Description
            </h1>
            <p className="text-[#0F1D40] font-normal text-[18px] leading-[28.8px] md:text-[16px] md:leading-[24px]">
              {apartmentData.description}
            </p>
            {/* Example "Updated 3 days ago" */}
            {/* <p className="text-sm text-gray-500 mt-2">Updated 3 days ago</p> */}
            <hr className="my-8 border-t-2 border-[#EEEFF2]" />
          </div>

          {/* Apartment & Building Tables */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* APARTMENT table */}
            <div>
              <h2 className="text-xl font-semibold text-[#0F1D40] mb-4">
                Apartment
              </h2>
              <table className="w-full text-left border-collapse">
                <tbody>
                  <tr>
                    <td className="py-2 font-medium text-[#525C76]">Total area:</td>
                    <td className="py-2">{apartmentData.info.total_area} m²</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-medium text-[#525C76]">Living area:</td>
                    <td className="py-2">{apartmentData.info.living_area} m²</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-medium text-[#525C76]">Rooms:</td>
                    <td className="py-2">
                      {apartmentData.info.bedrooms + (apartmentData.info.living_rooms || 0)}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 font-medium text-[#525C76]">Bedroom:</td>
                    <td className="py-2">{apartmentData.info.bedrooms}</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-medium text-[#525C76]">Bathroom:</td>
                    <td className="py-2">{apartmentData.info.bathrooms}</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-medium text-[#525C76]">Balcony:</td>
                    <td className="py-2">{apartmentData.info.balcony}</td>
                  </tr>
                  {/* <tr>
                    <td className="py-2 font-medium text-[#525C76]">Condition:</td>
                    <td className="py-2">Move-in ready</td>
                  </tr> */}
                  <tr>
                    <td className="py-2 font-medium text-[#525C76]">Renovation:</td>
                    <td className="py-2">{apartmentData.info.renovation || "European style"}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* BUILDING table */}
            <div>
              <h2 className="text-xl font-semibold text-[#0F1D40] mb-4">
                Building
              </h2>
              <table className="w-full text-left border-collapse">
                <tbody>
                  <tr>
                    <td className="py-2 font-medium text-[#525C76]">
                      Year of Construction:
                    </td>
                    <td className="py-2">{apartmentData.building?.year_built}</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-medium text-[#525C76]">Installment:</td>
                    <td className="py-2">{apartmentData.building?.installment || "No"}</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-medium text-[#525C76]">Elevator:</td>
                    <td className="py-2">{apartmentData.building?.elevator || "Yes"}</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-medium text-[#525C76]">Parking:</td>
                    <td className="py-2">{apartmentData.building?.parking || "Yes"}</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-medium text-[#525C76]">Swimming pool:</td>
                    <td className="py-2">{apartmentData.building?.swimming_pool || "Yes"}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Map Section */}
          <div className="w-full my-8">
            <h2 className="text-[#0F1D40] font-semibold text-[36px] leading-[54px] md:text-[24px] md:leading-[36px] mb-3">
              Map
            </h2>
            <PropertyMap location={apartmentData.location} />
          </div>
        </div>

        {/* Right Section (sticky) */}
        <div className="lg:w-[33%] hidden md:block">
          <motion.div
            className="p-6 bg-white border rounded-md shadow-lg sticky top-16 mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            {/* Price */}
            <div className="flex items-center justify-start gap-2 mb-2 text-[28px] font-semibold text-[#525C76]">
              {formatNumber(
                apartmentData.price / currencies_to_dollar[currency]
              )}{" "}
              {currency}
            </div>

            {/* Basic Info */}
            <div className="flex justify-start items-center gap-2 mb-2 text-[#525C76] font-medium text-[12px]">
              <div>
                {apartmentData.info.bedrooms} Room{" "}
                {apartmentData.info.category}
              </div>
              <div>{apartmentData.info.total_area} m²</div>
            </div>
            <hr className="my-4 border-t-2 border-[#EEEFF2]" />

            {/* Agent Info */}
            <div className="flex items-center justify-start gap-4">
              <motion.img
                src="https://flattybucket.s3.us-east-1.amazonaws.com/uploads/user.jpg"
                alt="Agent"
                className="object-cover w-[47px] h-[47px] rounded-full"
              />
              <div>
                <Link to={"/agent"} className="font-semibold text-[#525C76] text-[16px]">
                  {apartmentData.owner?.user?.name || "Unknown Agent"}
                </Link>
                <div className="text-sm text-[#525C76] font-medium">
                  Real Estate Agent
                </div>
              </div>
            </div>

            {/* Contact */}
            <div
              className="flex flex-col gap-2 mt-3"
              onClick={() => {
                // Example: open WhatsApp link
                const whatsappUrl = `https://wa.me/${phoneNumber}`;
                window.location.href = whatsappUrl;
              }}
            >
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

export default Appartment;
