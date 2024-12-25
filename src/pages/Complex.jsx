import Breadcrumbs from "../components/Breadcrumbs";
import { data } from "../data.js";
import CardList from "../components/CardList";
import HouseItem from "../components/HouseItem";
import PropertyShowcase from "../components/PropertyShowcase.jsx";
import React from "react";
import Map from "../components/sections/Map.jsx";
import { Footer } from "../layouts/Footer.jsx";
import Header from "../layouts/Header.jsx";
import Pagination from "../components/Pagination.jsx";
import apparment from "../assets/images/apparment.png";

// data.js
export const complexData = {
  propertyDetails: {
    category: "Apartment",
    buildingArea: "3600 m²",
    livingArea: "2100 m²",
    objects: 126,
    installment: "Yes",
    completionYear: 2024,
    description:
      "This charming 2-room apartment offers a total area of 43.5 m², including a spacious 27.7 m² living area and a cozy 5.7 m² kitchen, perfect for culinary enthusiasts...",
    updated: "Updated 3 days ago",
  },
  images: [
    { img: apparment, title: "House 1" },
    { img: apparment, title: "House 2" },
    { img: apparment, title: "House 1" },
    { img: apparment, title: "House 2" },
    { img: apparment, title: "House 1" },
    { img: apparment, title: "House 2" },
    { img: apparment, title: "House 1" },
    { img: apparment, title: "House 2" },

    // ... more images
  ],
  location: {
    latitude: 40.7128,
    longitude: -74.006,
  },
};

export const Complex = () => {
  return (
    <div className="flex flex-col min-h-screen ">
      <main className="flex-grow  bg-[#F4F2FF] ">
        <Header />
        <div className="px-16 mx-auto max-w-[1440px] bg-white">
          <div className="w-full py-3 mx-auto bg-white">
            <div className="flex flex-col ">
              <div className="w-full">
                <Breadcrumbs title="Appartment" />
                <PropertyShowcase length={7} />
                {/* grid area */}
                <div className="grid grid-cols-6 my-12">
                  <div className="flex justify-around w-[148px] min-h-[50px]">
                    <div className="rounded-full bg-[#CACDD5] w-[50px] h-[50px]"></div>
                    <div>
                      <span className="text-[#525C76] font-medium text-[14px]  leading-[22.4px]">
                        Category
                      </span>
                      <p className="text-[#0F1D40] text-[14px] leading-[22.4px] font-medium">
                        Appartment
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-around  w-[148px] min-h-[50px]">
                    <div className="rounded-full bg-[#CACDD5] w-[50px] h-[50px]"></div>
                    <div>
                      <span className="text-[#525C76] font-medium text-[14px]  leading-[22.4px]">
                        Building area
                      </span>
                      <p className="text-[#0F1D40] text-[14px] leading-[22.4px] font-medium">
                        3600 m2
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-around w-[148px] min-h-[50px]">
                    <div className="rounded-full bg-[#CACDD5] w-[50px] h-[50px]"></div>
                    <div>
                      <span className="text-[#525C76] font-medium text-[14px]  leading-[22.4px]">
                        Living area
                      </span>
                      <p className="text-[#0F1D40] text-[14px] leading-[22.4px] font-medium">
                        2100 m2
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-around  w-[148px] min-h-[50px]">
                    <div className="rounded-full bg-[#CACDD5] w-[50px] h-[50px]"></div>
                    <div>
                      <span className="text-[#525C76] font-medium text-[14px]  leading-[22.4px]">
                        Objects
                      </span>
                      <p className="text-[#0F1D40] text-[14px] leading-[22.4px] font-medium">
                        126
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-around  w-[148px] min-h-[50px]">
                    <div className="rounded-full bg-[#CACDD5] w-[50px] h-[50px]"></div>
                    <div>
                      <span className="text-[#525C76] font-medium text-[14px]  leading-[22.4px]">
                        Installment
                      </span>
                      <p className="text-[#0F1D40] text-[14px] leading-[22.4px] font-medium">
                        Yes
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-around  w-[181px] min-h-[50px] gap-2">
                    <div className="rounded-full bg-[#CACDD5] w-[50px] h-[50px]"></div>
                    <div>
                      <span className="text-[#525C76] font-medium text-[14px]  leading-[22.4px]">
                        Completion area
                      </span>
                      <p className="text-[#0F1D40] text-[14px] leading-[22.4px] font-medium">
                        2024
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
                    This charming 2-room apartment offers a total area of 43.5
                    m², including a spacious 27.7 m² living area and a cozy 5.7
                    m² kitchen, perfect for culinary enthusiasts. Situated on
                    the 3rd floor of a 4-story building, it provides a
                    comfortable and quiet environment ideal for families or
                    couples. The property features a modern layout and is
                    located near key amenities, offering convenience and
                    accessibility for a vibrant lifestyle.
                  </p>
                  <span>Updated 3 days ago</span>
                  <hr className="my-8 border-t-2 border-[#EEEFF2]" />
                </div>
              </div>
            </div>
            <div className="w-[96%] mx-auto my-20">
              <div className="grid grid-cols-1 gap-6 mx-auto *: sm:grid-cols-2 lg:grid-cols-4">
                {data.map((item) => (
                  <HouseItem m key={item.img} {...item} />
                ))}
              </div>
              <Pagination />
            </div>
            {/* location */}
            <div className="w-full border-t-2 py-14">
              <h2 className="text-[#0F1D40]  font-semibold text-[36px] leading-[54px]">
                Map
              </h2>
              <Map />
            </div>
          </div>
        </div>
        <div className="px-6  mx-auto  bg-[#ECE8FF]">
          <Footer />
        </div>
      </main>
    </div>
  );
};
