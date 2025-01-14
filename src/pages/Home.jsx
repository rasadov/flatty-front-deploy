import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadFeaturedProperties } from "../store/slices/featuredSlice";
import { loadAgents } from "../store/slices/agentSlice";
import { loadComplexDetails } from "../store/slices/complexSlice";
import { loadPopularProperties } from "../store/slices/popularSlice.js";
import { CardList } from "../components/sections/CardList";
import Searchbar from "../components/sections/Searchbar";
import SearchbarMobile from "../components/sections/SearchbarMobile";
import AgentCard from "../components/AgentCard";
import HouseItem from "../components/HouseItem";
import ComplexCard from "../components/ComplexCard.jsx";
import WhyChooseUsSection from "../components/sections/ChooseUsSection";
import TestimonialSection from "../components/sections/TestimonialSection";
// Images
import header_bg from "../assets/images/header_bg.png";
import key_img from "../assets/images/key_img.png";
import Header from "../layouts/Header";
import { Footer } from "../layouts/Footer";

// CSS
import "../assets/css/home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.auth);

  // Fetching data from Redux store
  const {
    properties: featuredProperties = [],
    loading: featuredLoading,
    error: featuredError,
  } = useSelector((state) => state.featured);

  const {
    properties: popularProperties = [],
    loading: popularLoading,
    error: popularError,
  } = useSelector((state) => state.popular);

  const {
    agents = [],
    loading: agentsLoading,
    error: agentsError,
  } = useSelector((state) => state.agent);

  const {
    complexDetails = [],
    loading: complexLoading,
    error: complexError,
  } = useSelector((state) => state.complex);

  // Local state for managing search location
  const [locationValue, setLocationValue] = useState("");

  useEffect(() => {
    // Dispatch actions to load data when component mounts
    dispatch(loadFeaturedProperties());
    dispatch(loadPopularProperties());
    dispatch(loadAgents());
    dispatch(loadComplexDetails());
  }, [dispatch]);

  // Function to handle location change
  const handleLocationChange = (newValue) => {
    setLocationValue(newValue);
  };

  // Function to handle search action
  const handleSearch = () => {
    console.log("Search initiated with location:", locationValue);
  };

  // Function to handle showing properties on map
  const handleShowMap = () => {
    navigate("/search", { state: { showMap: true, location: locationValue } });
  };

  // —AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
  // MOBILE HEADER (shown on small screens)
  // —AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
  const MobileHeader = () => (
    <div className="block px-4 pt-8 pb-4 text-center md:hidden">
      {/* Heading */}
      <h1
        className="mb-3 text-3xl font-bold text-slate-900"
        style={{
          fontSize: "42px",
        }}
      >
        Unlocking Doors to Your Next Home
      </h1>

      {/* Searchbar for mobile view */}
      <div className="mb-4">
        <SearchbarMobile />
      </div>
    </div>
  );

  // —AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
  // DESKTOP HEADER (hidden on small screens)
  // —AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
  const DesktopHeader = () => (
    <div
      className="hidden md:block relative h-[700px] w-full overflow-hidden bg-no-repeat bg-cover"
      style={{
        backgroundImage: `url(${header_bg})`,
        backgroundSize: "100vw",
        backgroundPosition: "0% top",
      }}
    >
      <h1 className="absolute z-10 text-[36px] sm:text-[48px] md:text-[56px] font-bold text-slate-900 top-8 left-20 max-w-[50%]">
        Unlocking Doors to Your Next Home
      </h1>

      <div className="absolute z-20 bottom-[40%] left-[3%] w-[78%] px-4">
        <Searchbar
          onShowMap={handleShowMap}
          onSearch={handleSearch}
          value={locationValue}
          onChange={handleLocationChange}
          isHomePage={true}
        />
      </div>

      <img
        src={key_img}
        alt="Key"
        className="absolute z-20 top-[72%] left-[57%] transform -translate-x-1/2 opacity-90"
        style={{
          height: "auto",
          zIndex: 10,
        }}
      />
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow bg-[#F4F2FF]">
        <Header key={isLoggedIn ? "logged-in" : "logged-out"} />
        <div>
          <div>
            {/* Mobile header */}
            <MobileHeader />

            {/* Desktop header */}
            <DesktopHeader />

            <div className="home-content-wrapper">
              {/* “Featured” section */}
              <div className="relative z-10 md:-mt-40">
                <CardList sectionName="Featured" seeAll={true}>
                  {featuredProperties.properties &&
                    featuredProperties.properties
                      .slice(0, 4)
                      .map((item) => <HouseItem key={item.id} {...item} />)}
                </CardList>
              </div>

              {/* “Popular” section */}
              <CardList sectionName="Popular" seeAll={true}>
                {popularProperties.properties &&
                  popularProperties.properties
                    .slice(0, 4)
                    .map((item) => <HouseItem key={item.id} {...item} />)}
              </CardList>

              {/* “Complexes” section */}
              <CardList sectionName="Complexes" seeAll={true}>
                {complexDetails.listings &&
                  complexDetails.listings
                    .slice(0, 4)
                    .map((item) => (
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

              {/* Agents section - Uncomment if you want to show agents */}
              {/* 
              <CardList sectionName="Agents" seeAll={true}>
                {agents.slice(0, 4).map((agent) => (
                  <AgentCard key={agent.id} {...agent} />
                ))}
              </CardList>
              */}

              {/* Why Choose Us Section */}
              <WhyChooseUsSection />

              {/* Testimonials Section */}
              <TestimonialSection sectionName="Testimonials" />
            </div>
          </div>
        </div>
        <div className="px-6 mx-auto bg-[#ECE8FF]">
          <Footer />
        </div>
      </main>
    </div>
  );
};

export default Home;
