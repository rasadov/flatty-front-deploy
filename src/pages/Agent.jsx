import React from "react";
import Rating from "../components/Rating";
import AgencyMiniCard from "../components/AgencyMiniCard";
import CardList from "../components/sections/CardList";
import { data } from "../data.js";
import TestimonialSection from "../components/sections/TestimonialSection.jsx";
import HouseItem from "../components/HouseItem.jsx";
import Breadcrumbs from "../components/Breadcrumbs.jsx";
import apparment from "../assets/images/apparment.png";
import agent_back from "../assets/images/agent_back.png";
import ComplexCard from "../components/ComplexCard.jsx";
import { Certified } from "../assets/icons/Certified.jsx";
import { FaEllipsisH } from "react-icons/fa";
const complexData = [
  {
    id: 1,
    img: "https://via.placeholder.com/300x173?text=Apartment+1",
    title: "Modern Apartment",
    roomCount: 3,
    location: "Baku, Azerbaijan",
  },
  {
    id: 2,
    img: "https://via.placeholder.com/300x173?text=Apartment+2",
    title: "Luxury Penthouse with Sea View",
    roomCount: 5,
    location: "Istanbul, Turkey",
  },
  {
    id: 3,
    img: "https://via.placeholder.com/300x173?text=Apartment+3",
    title: "Cozy Flat Near Park",
    roomCount: 2,
    location: "Tbilisi, Georgia",
  },
  {
    id: 4,
    img: "https://via.placeholder.com/300x173?text=Apartment+4",
    title: "Spacious Villa with Pool",
    roomCount: 6,
    location: "Antalya, Turkey",
  },
];

export const Agent = () => {
  return (
    <div className="w-full py-3 mx-auto mt-8">
      <Breadcrumbs title="Apartment" />
      <div className="flex flex-col items-start gap-6 mt-8 lg:flex-row">
        {/* Agent Info */}
        <div className=" p-6 bg-white rounded-lg w-[578px] min-h-[272px]">
          <div className="flex items-center justify-start gap-4 mb-6">
            <img
              src={apparment}
              className="rounded-full w-[120px] h-[120px] object-cover"
              alt="Agent"
            />
            <div className="inline-block w-full">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Name Surname</h2>
                  <FaEllipsisH />
                </div>

                <div className="flex items-center gap-1 text-sm text-[#525C76]">
                  <Certified />
                  <span>Certified</span>
                </div>
                <AgencyMiniCard
                  agencyName="Emtan Construction"
                  agencyProfileLink="/complex"
                />
                <div className="flex items-center justify-start gap-4">
                  <Rating rating="4" />
                  <p className="text-sm text-[#525C76]">133 Votes</p>
                </div>
              </div>
            </div>
          </div>
          {/* Experience, Sales, Active Posts */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-[#EEEFF2] p-4 rounded-md">
            {["Experience", "Successful sales", "Active posts"].map(
              (label, index) => (
                <div key={index} className="text-center">
                  <span className="block text-sm text-gray-500">{label}</span>
                  <p className="font-medium text-lg text-[#0F1D40]">
                    {index === 0 ? "2 years" : index === 1 ? "135" : "36"}
                  </p>
                </div>
              )
            )}
          </div>
        </div>

        {/* Agent Image */}
        <div className="w-[683px] h-[345px] relative">
          <img
            src={agent_back}
            className="absolute w-full h-auto rounded-lg bottom-10"
            alt="Agent"
            loading="lazy"
          />
        </div>
      </div>
      {/* Active Posts Section */}
      <CardList sectionName="Active posts" seeAll={false}>
        {data.slice(0, 4).map((item) => (
          <HouseItem key={item.img} {...item} />
        ))}
      </CardList>
      <CardList sectionName={"Complexes"}>
        {complexData.slice(0, 4).map((item, index) => (
          // <Link to={`/agent/${item.id}`} key={index}>
          //   <ComplexCard {...item} />
          // </Link>
          <ComplexCard key={index} {...item} />
        ))}
      </CardList>
      {/* Reviews Section */}
      <TestimonialSection sectionName="Reviews" />
    </div>
  );
};
