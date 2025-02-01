import React, { useState } from "react";
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


export const Agent = (agent_id) => {
  const [agent, setAgent] = useState([]);
  const [properties, setAgentProperties] = useState([]);
  const [complexes, setComplexes] = useState([]);
  useEffect(() => {
    const fetchProfile = async () => {
      const response = await fetch(`https://api.flatty.ai/api/v1/user/agent/${agent_id}`, {
        headers: {
          "Accept": "application/json",
        },
      }).then((res) => res.json()).then((data) => {
        setAgent(data);
        setAgentProperties(data.properties);
        setComplexes(data.listings);
      });
    };
    fetchProfile();
  }, []);

  return (
    <div className="w-full py-3 mx-auto mt-8">
      <Breadcrumbs title="Apartment" />
      <div className="flex flex-col gap-6 mt-8 lg:flex-row">
        {/* Agent Info */}
        <div className="p-6 bg-white rounded-lg w-full lg:w-[578px] min-h-[272px]">
          <div className="flex flex-col items-center lg:flex-row lg:items-start gap-4 mb-6">
            <img
              src={
                user?.image_url
                  ? user.image_url
                  : "https://flattybucket.s3.us-east-1.amazonaws.com/uploads/user.jpg"
              }
              className="rounded-full w-[120px] h-[120px] object-cover"
              alt="Agent"
            />
            <div className="w-full">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">
                    {agent.user ? agent.user.name : ""}
                  </h2>
                </div>
                <div className="flex items-center justify-start gap-4">
                  <Rating rating="4" />
                  <p className="text-sm text-[#525C76]">
                    {agent.reviews ? agent.reviews.length + " Votes" : ""}
                  </p>
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
                      {index === 0 ? agent.experience ? agent.experience + " years" : "Unknown" :
                      index === 1 ? agent.sales ? agent.sales : "Unknown":
                      index === 2 ? properties.length ? properties.length : "Unknown" : ""}
                    </p>
                  </div>
                )
              )}
          </div>
        </div>

        {/* Agent Image */}
        <div className="w-full lg:w-[683px] h-[345px] relative">
          <img
            src={agent_back}
            className="absolute w-full h-auto rounded-lg bottom-10"
            alt="Agent"
            loading="lazy"
          />
        </div>
      </div>

      <CardList sectionName="Posts" seeAll={false}>
        {loading && <p>Loading...</p>}
        {Array.isArray(properties) && properties.length > 0 ? (
          properties.map((item) => (
            <a href={"/appartment/" + item.id} key={item.id}>
              <HouseItem
                key={item.id}
                id={item.id}
                images={item.images}
                title={item.title}
                price={item.price}
                area={item?.info?.total_area}
                rooms={item?.info?.bedrooms}
                location={item?.location?.address}
                currFloor={item?.info?.floor}
                building={item?.info?.floors}
              />
            </a>
          ))
        ) : (
          <p>No posts found</p>
        )}
      </CardList>

      <CardList sectionName="Complexes" seeAll={false}>
        {loading && <p>Loading...</p>}
        {Array.isArray(complexes) && complexes.length > 0 ? (
          complexes.map((item) => (
            agent.id === item.agent_id ? 
            <ComplexCard
              key={item.id}
              img={item.images[0]?.image_url}
              title={item.name}
              roomCount={item.objects}
              address={item.address}
              id={item.id}
            /> : ""
          ))
        ) : (
          <p>No posts found</p>
        )}
      </CardList>
    </div>
  );
};
