import Breadcrumbs from "../components/Breadcrumbs";
import { data } from "../data.js";
import CardList from "../components/CardList";
import HouseItem from "../components/HouseItem";
import PropertyShowcase from "../components/PropertyShowcase.jsx";
import React, { useState } from "react";
import { motion } from "framer-motion"; // Framer Motion importu
import Button from "../components/Button.jsx";
import { Link } from "react-router-dom";
import AgencyMiniCard from "../components/AgencyMiniCard";
import Rating from "../components/Rating";
// import { ContactIcon } from "../assets/icons/ContactIcon";
import apparment from "../assets/images/apparment.png";
// import { UserCircleFill } from "../assets/icons/UserCircleFill";
import { Euro } from "../assets/icons/Euro.jsx";
import { Chat } from "../assets/icons/Chat.jsx";
import { Contact } from "../assets/icons/Contact.jsx";
import Map from "../components/sections/Map.jsx";

const Appartment = () => {
  const [rating, setRating] = useState(4); // Example: set initial rating as 4 stars

  // Function to handle star rating click
  const handleRatingClick = (value) => {
    setRating(value);
  };
  return (
    <div className="w-full py-3 mx-auto">
      <div className="flex flex-col lg:flex-row lg:justify-between">
        {/* Left Section */}
        <div className="lg:w-[65%]">
          <Breadcrumbs title="Appartment" />
          <PropertyShowcase length={5} />
          {/* grid area */}
          <div className="grid grid-cols-5 my-12">
            <div className="flex justify-around w-[117px] h-[50px]">
              <div className="rounded-full bg-[#CACDD5] w-[50px] h-[50px]"></div>
              <div>
                <span className="text-[#525C76] font-medium text-[14px]  leading-[22.4px]">
                  Rooms
                </span>
                <p className="text-[#0F1D40] text-[14px] leading-[22.4px] font-medium">
                  3 Rooms
                </p>
              </div>
            </div>
            <div className="flex justify-around  min-w-[117px] min-h-[50px]">
              <div className="rounded-full bg-[#CACDD5] w-[50px] h-[50px]"></div>
              <div>
                <span className="text-[#525C76] font-medium text-[14px]  leading-[22.4px]">
                  Apartment area
                </span>
                <p className="text-[#0F1D40] text-[14px] leading-[22.4px] font-medium">
                  56,5 m2
                </p>
              </div>
            </div>
            <div className="flex justify-around  min-w-[117px] min-h-[50px]">
              <div className="rounded-full bg-[#CACDD5] w-[50px] h-[50px]"></div>
              <div>
                <span className="text-[#525C76] font-medium text-[14px]  leading-[22.4px]">
                  Living area
                </span>
                <p className="text-[#0F1D40] text-[14px] leading-[22.4px] font-medium">
                  90 m2
                </p>
              </div>
            </div>
            <div className="flex justify-around  min-w-[117px] min-h-[50px]">
              <div className="rounded-full bg-[#CACDD5] w-[50px] h-[50px]"></div>
              <div>
                <span className="text-[#525C76] font-medium text-[14px]  leading-[22.4px]">
                  Kitchen area
                </span>
                <p className="text-[#0F1D40] text-[14px] leading-[22.4px] font-medium">
                  90 m2
                </p>
              </div>
            </div>
            <div className="flex justify-around  min-w-[117px] min-h-[50px]">
              <div className="rounded-full bg-[#CACDD5] w-[50px] h-[50px]"></div>
              <div>
                <span className="text-[#525C76] font-medium text-[14px]  leading-[22.4px]">
                  Floor
                </span>
                <p className="text-[#0F1D40] text-[14px] leading-[22.4px] font-medium">
                  3/4
                </p>
              </div>
            </div>
          </div>
          {/* description */}
          <div className="my-14">
            <h1 className="text-[#0F1D40]  font-semibold text-[36px] leading-[54px]">
              Description
            </h1>
            <p className="text-[#0F1D40] font-normal text-[18px] leading-[28.8px]">
              This charming 2-room apartment offers a total area of 43.5 m²,
              including a spacious 27.7 m² living area and a cozy 5.7 m²
              kitchen, perfect for culinary enthusiasts. Situated on the 3rd
              floor of a 4-story building, it provides a comfortable and quiet
              environment ideal for families or couples. The property features a
              modern layout and is located near key amenities, offering
              convenience and accessibility for a vibrant lifestyle.
            </p>
            <span>Updated 3 days ago</span>
            <hr className="my-8 border-t-2 border-[#EEEFF2]" />
          </div>
          {/* details  */}
          <div className="flex justify-between ">
            <div className="w-[377px] h-[247px] space-y-3 ">
              <h2 className="text-[#0F1D40]  font-semibold text-[36px] leading-[54px]">
                Apparment
              </h2>
              <div className="flex justify-between">
                <span className="text-[#8C93A3] text-[16px] leading-[25.6px] font-medium text-left">
                  Total area
                </span>
                <p className="text-[#525C76] text-[18px] leading-[25.6px] font-medium text-right">
                  38 m2
                </p>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8C93A3] text-[16px] leading-[25.6px] font-medium text-left">
                  Kitchen area:
                </span>
                <p className="text-[#525C76] text-[18px] leading-[25.6px] font-medium  text-right">
                  9 m2
                </p>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8C93A3] text-[16px] leading-[25.6px] font-medium text-left">
                  Bathroom:
                </span>
                <p className="text-[#525C76] text-[18px] leading-[25.6px] font-medium  text-right">
                  {" "}
                  1 seperate
                </p>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8C93A3] text-[16px] leading-[25.6px] font-medium text-left">
                  Balcony/Loggia:
                </span>
                <p className="text-[#525C76] text-[18px] leading-[25.6px] font-medium  text-right">
                  Balcony
                </p>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8C93A3] text-[16px] leading-[25.6px] font-medium text-left">
                  View from windows:
                </span>
                <p className="text-[#525C76] text-[18px] leading-[25.6px] font-medium  text-right">
                  Street View
                </p>
              </div>
            </div>
            <div className="w-[377px] h-[247px] space-y-3 ">
              <h2 className="text-[#0F1D40]  font-semibold text-[36px] leading-[54px]">
                Building
              </h2>
              <div className="flex justify-between">
                <span className="text-[#8C93A3] text-[16px] leading-[25.6px] font-medium text-left">
                  Year of Construction:
                </span>
                <p className="text-[#525C76] text-[18px] leading-[25.6px] font-medium  text-right">
                  2015
                </p>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8C93A3] text-[16px] leading-[25.6px] font-medium text-left">
                  Number of elevators:
                </span>
                <p className="text-[#525C76] text-[18px] leading-[25.6px] font-medium  text-right">
                  2 Pessenger
                </p>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8C93A3] text-[16px] leading-[25.6px] font-medium text-left">
                  Building type
                </span>
                <p className="text-[#525C76] text-[18px] leading-[25.6px] font-medium  text-right">
                  Panel
                </p>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8C93A3] text-[16px] leading-[25.6px] font-medium text-left">
                  Flooring Type
                </span>
                <p className="text-[#525C76] text-[18px] leading-[25.6px] font-medium  text-right">
                  Reinforced concrete
                </p>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8C93A3] text-[16px] leading-[25.6px] font-medium text-left">
                  Parking
                </span>
                <p className="text-[#525C76] text-[18px] leading-[25.6px] font-medium  text-right">
                  Groun-level parking
                </p>
              </div>
            </div>
          </div>
          {/* location */}
          <div className="w-[866px] ">
            <h2 className="text-[#0F1D40]  font-semibold text-[36px] leading-[54px]">
              Map
            </h2>
            <Map />
          </div>
        </div>

        {/* Right Sectiopn */}
        <div
          className="lg:w-[33%] sticky h-[calc(100vh-.5rem)]  top-16 overflow-y-scroll overscroll-contain "
          style={{ height: "100%" }}
        >
          <div className="space-y-2  min-h-[402px]">
            <motion.div
              className="p-6 bg-white border rounded-md shadow-lg top-8"
              style={{
                maxHeight: "calc(100vh - 4rem)", // Ensure the height is calculated properly
                overflowY: "auto", // Allow scrolling inside the sticky element
                boxShadow: "0px 1px 1px 0px #703ACA14",
                zIndex: 10, // Ensure it stays above other content
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <motion.div
                className="flex items-center justify-start gap-2 mb-2 text-[28px] font-semibold text-[#525C76] leading-[42px]"
                whileHover={{
                  transition: { duration: 0.2 },
                }}
              >
                250 000 <Euro size={28} />
              </motion.div>
              <div className="flex justify-start items-center gap-2 mb-2 text-[#525C76] font-medium text-[12px] leading-[19.2px]">
                <div>Selling</div>
                <div>3 Room</div>
                <div>Appartment</div>
                <div>60 m2</div>
              </div>
              <hr className="my-4 border-t-2 border-[#EEEFF2]" />
              {/* Agent Image and Details */}
              <div className="flex items-center justify-start gap-4">
                <motion.img
                  src={apparment}
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
                    className="font-semibold text-[#525C76] text-[16px] leading-[25.6px] "
                  >
                    Name Surname
                  </Link>
                  <div className="text-sm text-[#525C76] font-medium">
                    Senior Real Estate Agent{" "}
                  </div>
                  <Rating rating={rating} onRatingClick={handleRatingClick} />
                </div>
              </div>

              <hr className="my-4 border-t-2 border-[#EEEFF2]" />

              {/* Agency Card */}
              <motion.div className="my-4">
                <AgencyMiniCard
                  agencyName="Emtan Construction"
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
                  className="w-full py-[5px] px-3 my-2 text-[#8247E5] h-[52px] rounded-sm  border  border-[#8247E5]"
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

      <CardList sectionName={"Familiar Requests"}>
        {data.slice(0, 4).map((item) => (
          <HouseItem m key={item.img} {...item} />
        ))}
      </CardList>
      <CardList sectionName={"Same Building Apartments"}>
        {data.slice(0, 4).map((item) => (
          <HouseItem key={item.img} {...item} />
        ))}
      </CardList>
    </div>
  );
};

export default Appartment;
