import React, { useEffect, useCallback, useState, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchApartmentDetails } from "../store/slices/appartmentSlice";
import { useParams } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";
import CardList from "../components/sections/CardList";
import HouseItem from "../components/HouseItem";
import PropertyShowcase from "../components/sections/PropertyShowcase.jsx";
import { motion } from "framer-motion";
import Button from "../components/Button.jsx";
import { Link } from "react-router-dom";
import AgencyMiniCard from "../components/AgencyMiniCard";
import Rating from "../components/Rating";
import { Euro } from "../assets/icons/Euro.jsx";
import { Chat } from "../assets/icons/Chat.jsx";
import { Contact } from "../assets/icons/Contact.jsx";
import Map from "../components/sections/Map.jsx";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { loadFeaturedProperties } from "../store/slices/featuredSlice";
import { loadPopularProperties } from "../store/slices/popularSlice.js";

const Appartment = memo(() => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const apartmentData = useSelector((state) => state.apartment);
  const [rating, setRating] = useState(4);
  const {
    properties: featuredProperties,
    loading: featuredLoading,
    error: featuredError,
  } = useSelector((state) => state.featured);
  const {
    properties: popularProperties,
    loading: popularLoading,
    error: popularError,
  } = useSelector((state) => state.popular);
  useEffect(() => {
    dispatch(fetchApartmentDetails(id));
    dispatch(loadFeaturedProperties());
    dispatch(loadPopularProperties());
  }, [dispatch, id]);

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

  if (apartmentData.loading) return <div>Loading...</div>;

  return (
    <div className="w-full py-3 mx-auto">
      <div className="flex flex-col lg:flex-row lg:justify-between">
        {/* Left Section */}
        <div className="lg:w-[65%]">
          <Breadcrumbs title="Apartment" />
          <PropertyShowcase
            images={
              apartmentData.images ? renderImages(apartmentData.images) : []
            }
          />

          <div className="my-12">
            <PropertyDetailsGrid
              details={[
                { title: "Rooms", value: `${apartmentData.rooms} Rooms` },
                { title: "Apartment area", value: `${apartmentData.area} m2` },
                { title: "Living area", value: "90 m2" },
                { title: "Kitchen area", value: "90 m2" },
                {
                  title: "Floor",
                  value: `${apartmentData.currFloor || "N/A"}/${
                    apartmentData.building || "N/A"
                  }`,
                },
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

          {/* Details */}
          <div className="flex flex-wrap justify-between sm:flex-nowrap">
            {/* Apartment Details */}
            <div className="w-full sm:w-[377px] h-[247px] space-y-3 mb-4 sm:mb-0">
              <h2 className="text-[#0F1D40] font-semibold text-[36px] leading-[54px] md:text-[24px] md:leading-[36px]">
                Apartment
              </h2>
              <div className="flex justify-between">
                <span className="text-[#8C93A3] text-[16px] leading-[25.6px] font-medium text-left">
                  Total area:
                </span>
                <p className="text-[#525C76] text-[18px] leading-[25.6px] font-medium text-right">
                  {apartmentData.area} m2
                </p>
              </div>
              {/* Add more details here */}
            </div>

            {/* Building Details */}
            <div className="w-full sm:w-[377px] h-[247px] space-y-3">
              <h2 className="text-[#0F1D40] font-semibold text-[36px] leading-[54px] md:text-[24px] md:leading-[36px]">
                Building
              </h2>
              <div className="flex justify-between">
                <span className="text-[#8C93A3] text-[16px] leading-[25.6px] font-medium text-left">
                  Year of Construction:
                </span>
                <p className="text-[#525C76] text-[18px] leading-[25.6px] font-medium text-right">
                  2015
                </p>
              </div>
              {/* Add more building details */}
            </div>
          </div>

          {/* Map */}
          <div className="w-full md:w-[866px] my-8">
            <h2 className="text-[#0F1D40] font-semibold text-[36px] leading-[54px] md:text-[24px] md:leading-[36px]">
              Map
            </h2>
            <Map
              latitude={apartmentData.map?.latitude}
              longitude={apartmentData.map?.longitude}
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="lg:w-[33%] sticky h-[calc(100vh-.5rem)] top-16 overflow-y-auto hidden md:block">
          <div className="space-y-2 min-h-[402px]">
            <motion.div
              className="p-6 bg-white border rounded-md shadow-lg"
              style={{
                maxHeight: "calc(100vh - 4rem)",
                overflowY: "auto",
                boxShadow: "0px 1px 1px 0px #703ACA14",
                zIndex: 10,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <motion.div className="flex items-center justify-start gap-2 mb-2 text-[28px] font-semibold text-[#525C76] leading-[42px] md:text-[20px] md:leading-[30px]">
                {apartmentData.price} <Euro size={28} />
              </motion.div>
              <div className="flex justify-start items-center gap-2 mb-2 text-[#525C76] font-medium text-[12px] leading-[19.2px]">
                <div>Selling</div>
                <div>{apartmentData.rooms} Room</div>
                <div>Apartment</div>
                <div>{apartmentData.area} m2</div>
              </div>
              <hr className="my-4 border-t-2 border-[#EEEFF2]" />
              {/* Agent Image and Details */}
              <div className="flex items-center justify-start gap-4">
                <motion.img
                  src={apartmentData.agentImage || ""}
                  alt="Agent's Picture"
                  className="object-cover w-[47px] h-[47px] rounded-full"
                  whileHover={{
                    scale: 1.1,
                    transition: { duration: 0.3 },
                  }}
                />
                <div>
                  <Link
                    to={"/agent"}
                    className="font-semibold text-[#525C76] text-[16px] leading-[25.6px]"
                  >
                    {apartmentData.agentName || "Agent Name"}
                  </Link>
                  <div className="text-sm text-[#525C76] font-medium">
                    {apartmentData.agentTitle || "Senior Real Estate Agent"}
                  </div>
                  <Rating rating={rating} onRatingClick={handleRatingClick} />
                </div>
              </div>

              <hr className="my-4 border-t-2 border-[#EEEFF2]" />

              {/* Agency Card */}
              <motion.div className="my-4">
                <AgencyMiniCard
                  agencyName={apartmentData.agencyName || "Emtan Construction"}
                  agencyProfileLink="/complex"
                />
              </motion.div>

              {/* Buttons */}
              <div className="flex flex-col gap-2">
                <Button
                  className="w-full text-white py-[5px] px-3 mt-3 h-[52px] rounded-sm text-[20px] font-semibold leading-[22.4px]"
                  variant="primary"
                >
                  <Contact />
                  Contact
                </Button>

                <Button
                  className="w-full py-[5px] px-3 my-2 text-[#8247E5] h-[52px] rounded-sm border border-[#8247E5]"
                  variant="cancel"
                >
                  <Chat />
                  <p className="text-[#8247E5] text-[20px] font-semibold leading-[22.4px]">
                    Chat
                  </p>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Card Lists */}
      <CardList sectionName={"Familiar Requests"}>
        {popularProperties.slice(0, 4).map((item) => (
          <HouseItem key={item.id} {...item} />
        ))}
      </CardList>
      <CardList sectionName={"Same Building Apartments"}>
        {featuredProperties.slice(0, 4).map((item) => (
          <HouseItem key={item.id} {...item} />
        ))}
      </CardList>
    </div>
  );
});
const PropertyDetailsGrid = ({ details }) => {
  return (
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
            <p className="text-[#0F1D40] text-[14px] leading-[22.4px] font-medium">
              {detail.value}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
export default Appartment;
