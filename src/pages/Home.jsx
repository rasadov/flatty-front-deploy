import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadFeaturedProperties } from "../store/slices/featuredSlice";
import { loadAgents } from "../store/slices/agentSlice";
import { loadComplexDetails } from "../store/slices/complexSlice";
import { loadPopularProperties } from "../store/slices/popularSlice.js";
import { CardList } from "../components/sections/CardList";
import Searchbar from "../components/sections/Searchbar";
import AgentCard from "../components/AgentCard";
import HouseItem from "../components/HouseItem";
import ComplexCard from "../components/ComplexCard.jsx";
import WhyChooseUsSection from "../components/sections/ChooseUsSection";
import TestimonialSection from "../components/sections/TestimonialSection";
import header_bg from "../assets/images/header_bg.png";
import key_img from "../assets/images/key_img.png";

const Home = () => {
  const dispatch = useDispatch();
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
  const {
    agents,
    loading: agentsLoading,
    error: agentsError,
  } = useSelector((state) => state.agent);
  const {
    complexDetails,
    loading: complexLoading,
    error: complexError,
  } = useSelector((state) => state.complex);

  useEffect(() => {
    dispatch(loadFeaturedProperties());
    dispatch(loadPopularProperties());
    dispatch(loadAgents());
    dispatch(loadComplexDetails());
  }, [dispatch]);

  if (featuredLoading || agentsLoading || popularLoading)
    return <div>Loading...</div>;
  if (featuredError || agentsError || popularError)
    return <div>Error: {featuredError || agentsError || popularError}</div>;

  return (
    <div className="">
      <div
        className="relative h-[751px] sm:h-[600px] right-[4%]  w-[1440px] md:h-[700px] top-5 lg:h-[751px] overflow-hidden bg-no-repeat bg-cover bg-right "
        style={{
          backgroundImage: `url(${header_bg})`,
          backgroundSize: "contain",
          backgroundPosition: "center",
          maxWidth: "100vw",
        }}
      >
        <h1 className="absolute z-10 text-[36px] sm:text-[48px] md:text-[56px] font-bold w-full sm:w-[60%] md:w-[50%] lg:w-[40%] text-slate-900 top-8 left-4 sm:left-10">
          Unlocking Doors to Your Next Home
        </h1>

        <div className="absolute z-20 transform -translate-y-1/2 bottom-[42%] left-[3%] w-full max-w-[1131px] px-4 sm:px-0">
          <Searchbar />
        </div>

        <img
          src={key_img}
          alt="Overlay Image"
          className="absolute z-20 top-[72%] left-[50%] transform -translate-x-1/2 w-[150px] sm:w-[200px] opacity-90"
        />
      </div>

      <div className="relative z-10 -mt-40">
        <CardList sectionName="Featured" seeAll={true}>
          {featuredProperties.slice(0, 4).map((item) => (
            <HouseItem key={item.id} {...item} />
          ))}
        </CardList>
      </div>
      <CardList sectionName={"Popular"} seeAll={true}>
        {popularProperties.slice(0, 4).map((item) => (
          <HouseItem key={item.id} {...item} />
        ))}
      </CardList>
      <CardList sectionName={"Complexes"} seeAll={true}>
        {complexDetails.slice(0, 4).map((item) => (
          <ComplexCard
            key={item.id}
            id={item.id}
            img={item.images[0]}
            title={item.propertyDetails.category}
            roomCount={item.propertyDetails.objects}
            address={item.propertyDetails.address}
          />
        ))}
      </CardList>
      <CardList sectionName={"Agents"} seeAll={true}>
        {agents.slice(0, 4).map((agent) => (
          <AgentCard key={agent.id} {...agent} />
        ))}
      </CardList>

      <WhyChooseUsSection />
      <TestimonialSection sectionName={"Testimonials"} />
    </div>
  );
};

export default Home;
