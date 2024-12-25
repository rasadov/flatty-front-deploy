import React from "react";
import Rating from "../components/Rating";
import AgencyMiniCard from "../components/AgencyMiniCard";
import CardList from "../components/CardList";
import { data } from "../data.js";
import TestimonialSection from "../components/TestimonialSection.jsx";
import HouseItem from "../components/HouseItem.jsx";
import Breadcrumbs from "../components/Breadcrumbs.jsx";
import Button from "../components/Button.jsx";
import { Contact } from "../assets/icons/Contact.jsx";
import { Chat } from "../assets/icons/Chat.jsx";
import apparment from "../assets/images/apparment.png";
import { Link } from "react-router-dom";

export const Agent = () => {
  return (
    <div className="w-full py-3 mx-auto mt-8">
      <Breadcrumbs title="Apartment" />
      <div className="flex flex-col items-start gap-6 mt-8 lg:flex-row">
        {/* Agent Info */}
        <div className=" p-6 bg-white rounded-lg w-[578px] h-[341px]">
          <div className="flex items-center gap-4 mb-6">
            <img
              src={apparment}
              className="rounded-full w-[120px] h-[120px] object-cover"
              alt="Agent"
            />
            <div className="space-y-2">
              <h2 className="text-lg font-semibold">Name Surname</h2>
              <div className="flex items-center gap-1 text-sm text-[#525C76]">
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
          {/* Buttons */}
          <div className="flex justify-center gap-4 mt-4">
            <Button
              className="w-full py-2 text-sm h-[45px] font-semibold text-white rounded-sm leading-[28px] text-[18px]"
              variant="primary"
            >
              <Contact />
              Contact
            </Button>
            <Button
              className="w-full py-2 h-[45px] text-[#8247E5] bg-transparent border  leading-[28px] border-[#8247E5] rounded-sm text-[18px] font-semibold"
              variant="cancel"
            >
              <Chat />
              Chat
            </Button>
          </div>
        </div>

        {/* Agent Image */}
        <div className="w-[683px] h-[345px] relative">
          <img
            src="https://via.placeholder.com/1920x1080"
            className="absolute w-full h-auto rounded-lg bottom-4"
            alt="Agent"
            loading="lazy"
          />
        </div>
      </div>

      {/* Active Posts Section */}
      <CardList sectionName="Active posts">
        {data.slice(0, 4).map((item) => (
          <HouseItem key={item.img} {...item} />
        ))}
      </CardList>

      {/* Reviews Section */}
      <TestimonialSection sectionName="Reviews" />
    </div>
  );
};
