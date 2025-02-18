import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadFeaturedProperties } from "../store/slices/featuredSlice";
import { loadAgents } from "../store/slices/agentSlice";
import { loadComplexDetails } from "../store/slices/complexSlice";
import { loadPopularProperties } from "../store/slices/popularSlice.js";
import { CardList } from "../components/sections/CardList";
import { AgentCardList } from "../components/sections/AgentCardList.jsx";
import AgentCard from "../components/AgentCard.jsx";
import ComplexCard from "../components/ComplexCard";
import Searchbar from "../components/sections/Searchbar";
import SearchbarMobile from "../components/sections/SearchbarMobile";
import HouseItem from "../components/HouseItem";
import WhyChooseUsSection from "../components/sections/ChooseUsSection";
import TestimonialSection from "../components/sections/TestimonialSection";
import header_bg from "../assets/images/header_bg.png";
import header_bg2 from "../assets/images/mainpage2.svg";
import key_img from "../assets/images/key_img.png";
import Header from "../layouts/Header";
import { Footer } from "../layouts/Footer";
import axios from "axios";

const Home = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [searchQuery, setSearchQuery] = useState("");
  const [complexes, setComplexes] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { properties: featuredProperties = [], loading: featuredLoading } =
    useSelector((state) => state.featured);
  const { properties: popularProperties = [], loading: popularLoading } =
    useSelector((state) => state.popular);
  const { properties: complexProperties = [], loading: complexLoading } =
    useSelector((state) => state.complex);
  const { agents = [], loading: agentsLoading } = useSelector(
    (state) => state.agent
  );
  console.log(agents);

  const getComplexData = async () => {
    const response = await axios.get(
      `https://api.flatty.ai/api/v1/listing/page`,
      {
        params: {
          page: 1,
          elements: 10,
        },
      }
    );

    setComplexes(response.data.listings);
  };

  useEffect(() => {
    dispatch(loadFeaturedProperties());
    dispatch(loadPopularProperties());
    dispatch(loadAgents());
    // dispatch(loadComplexDetails());
    getComplexData();
  }, [dispatch]);

  const handleSearchQueryChange = useCallback((query) => {
    setSearchQuery(query);
  }, []);

  const MobileHeader = () => (
    <div className="block px-4 pt-8 pb-4 text-center md:hidden">
      <h1 className="mb-3 px-8 mt-[80px]  text-3xl font-bold text-slate-900">
      Flatty – Secondary Real Estate at Real Prices

      </h1>
      <div className="mb-4">
        <SearchbarMobile
          value={searchQuery}
          onChange={handleSearchQueryChange}
          onSearch={() => {
            navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
          }}
        />
      </div>
    </div>
  );

  const DesktopHeader = () => (
    <div
      className="hidden md:block relative w-full  bg-no-repeat custom-width-for-header"
      style={{
        backgroundImage: `url(${
          window.innerWidth > 1600 ? header_bg2 : header_bg
        })`,
        backgroundSize: "cover",
        backgroundPosition: "center 20px",
        
      }}
    >
      <div className="px-4 sm:px-8 md:px-16 mx-auto">
        <h1
          className=" z-10 mb-10 mt-[100px] text-[36px] sm:text-[48px] md:text-[56px] font-bold text-slate-900  max-w-[50%]
      2xl:left-[10%]"
        >
          Flatty – Secondary Real Estate at Real Prices

        </h1>

        <div className=" z-20 ">
          <Searchbar
            value={searchQuery}
            onChange={handleSearchQueryChange}
            onShowMap={() => {
              navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
            }}
            onSearch={() => {
              navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
            }}
            filters={{}}
          />
        </div>

        
      </div>
    </div>
  );

  const elementCount = window.innerWidth >= 1536 ? 5 : 4;
  const items = [
    {
      serial_number: "1",
      experience: null,
      id: 15,
      user_id: 18,
      company: null,
      sales: null,
      user: {
        name: "Ilya Tarasov",
        bio: null,
        id: 18,
        email: "sarov1983@mail.ru",
        phone: null,
        created_at: "2025-01-23T18:34:20.532915",
        image: {
          image_url:
            "https://flattybucket.s3.us-east-1.amazonaws.com/uploads/users/18.jpeg",
          id: 7,
          user_id: 18,
        },
      },
    },
    {
      serial_number: "N/A",
      experience: null,
      id: 30,
      user_id: 34,
      company: null,
      sales: null,
      user: {
        name: "Mikhail Bogomolov",
        bio: null,
        id: 34,
        email: "lp98mtc@gmail.com",
        phone: "+905488520234",
        created_at: "2025-01-29T12:24:34.902469",
        image: {
          image_url:
            "https://flattybucket.s3.us-east-1.amazonaws.com/uploads/users/34.jpeg",
          id: 8,
          user_id: 34,
        },
      },
    },
    {
      serial_number: "N/A",
      experience: null,
      id: 31,
      user_id: 35,
      company: null,
      sales: null,
      user: {
        name: "Denis Avtomonov",
        bio: null,
        id: 35,
        email: "9979806@mail.ru",
        phone: "+905338344415",
        created_at: "2025-01-29T12:25:52.730547",
        image: {
          image_url:
            "https://flattybucket.s3.us-east-1.amazonaws.com/uploads/users/35.jpeg",
          id: 9,
          user_id: 35,
        },
      },
    },
    {
      serial_number: "N/A",
      experience: null,
      id: 33,
      user_id: 37,
      company: null,
      sales: null,
      user: {
        name: "Elena Tarasova",
        bio: null,
        id: 37,
        email: "bubnova_ev@shmotkann.ru",
        phone: "+905488752169",
        created_at: "2025-01-29T16:58:22.799771",
        image: {
          image_url:
            "https://flattybucket.s3.us-east-1.amazonaws.com/uploads/users/37.jpeg",
          id: 10,
          user_id: 37,
        },
      },
    },
    {
      serial_number: "N/A",
      experience: null,
      id: 34,
      user_id: 38,
      company: null,
      sales: null,
      user: {
        name: "Kirill Torbenkov",
        bio: null,
        id: 38,
        email: "ki.torbenkov@gmail.com",
        phone: "+905488729884",
        created_at: "2025-01-29T18:17:07.390067",
        image: {
          image_url:
            "https://flattybucket.s3.us-east-1.amazonaws.com/uploads/users/38.jpeg",
          id: 11,
          user_id: 38,
        },
      },
    },
    {
      serial_number: "N/A",
      experience: null,
      id: 35,
      user_id: 39,
      company: null,
      sales: null,
      user: {
        name: "Helena Torbenkov ",
        bio: null,
        id: 39,
        email: "torbenkovh@gmail.com",
        phone: "+905338589180",
        created_at: "2025-01-29T18:23:21.475830",
        image: {
          image_url:
            "https://flattybucket.s3.us-east-1.amazonaws.com/uploads/users/39.jpeg",
          id: 12,
          user_id: 39,
        },
      },
    },
  ];
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow bg-[#F4F2FF]">
        <Header key={isLoggedIn ? "logged-in" : "logged-out"} />
        <div>
          <MobileHeader />
          <DesktopHeader />
          <div className="px-4 sm:px-8 md:px-16 mx-auto mt-8">
            <div>
              <CardList sectionName="Best Offers" seeAll={true}>
                {featuredLoading ? (
                  <p>Loading...</p>
                ) : featuredProperties.properties?.length > 0 ? (
                  featuredProperties.properties
                    .slice(0, elementCount)
                    .map((item) => (
                      <HouseItem
                        key={item.id}
                        images={item.images}
                        price={item.price}
                        location={
                          item.location?.address ||
                          `${item.location?.latitude}, ${item.location?.longitude}`
                        }
                        rooms={item.info?.bedrooms}
                        area={item?.info?.total_area}
                        currFloor={item.info?.floor}
                        building={item.info?.floors}
                        id={item.id}
                      />
                    ))
                ) : (
                  <p>No featured properties found</p>
                )}
              </CardList>
            </div>

            <CardList sectionName="Popular" seeAll={true}>
              {popularLoading ? (
                <p>Loading...</p>
              ) : popularProperties.length > 0 ? (
                popularProperties
                  .slice(0, elementCount)
                  .map((item) => (
                    <HouseItem
                      key={item.id}
                      images={item.images}
                      price={item.price}
                      location={
                        item.location?.address ||
                        `${item.location?.latitude}, ${item.location?.longitude}`
                      }
                      rooms={item.info?.bedrooms}
                      area={item?.info?.total_area}
                      currFloor={item.info?.floor}
                      building={item.info?.apartment_stories}
                      id={item.id}
                    />
                  ))
              ) : (
                <p>No popular properties found</p>
              )}
            </CardList>

            <CardList sectionName="Complex" seeAll={true} coplexses={true}>
              {console.log("complexescomplexes >>>>", complexes)}

              {complexes.length > 0 ? (
                complexes.map((item) => {
                  return (
                    <ComplexCard
                      key={item.id}
                      img={item.images[0]?.image_url}
                      title={item.name}
                      roomCount={item.objects}
                      address={item.address}
                      id={item.id}
                    />
                  );
                })
              ) : (
                <p>No complex properties found</p>
              )}
            </CardList>

            <AgentCardList sectionName={"Agents"}>
              {items.map((item) => {
                return <AgentCard item={item} />;
              })}
            </AgentCardList>

            <WhyChooseUsSection />
            {/* <TestimonialSection sectionName="Testimonials" /> */}
          </div>
        </div>
        <div className="px-4 sm:px-12 mx-auto bg-[#ECE8FF]">
          <Footer />
        </div>
      </main>
    </div>
  );
};

export default Home;
