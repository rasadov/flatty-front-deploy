import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams as useRouterParams } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";
import HouseItem from "../components/HouseItem";
import PropertyShowcase from "../components/sections/PropertyShowcase.jsx";
import PropertyMap from "../components/PropertyMap.jsx";
import { Footer } from "../layouts/Footer.jsx";
import Header from "../layouts/Header.jsx";
import Pagination from "../components/Pagination.jsx";
import { loadComplexById } from "../store/slices/complexSlice";
import { loadPopularProperties } from "../store/slices/popularSlice.js";

const Complex = () => {
  const dispatch = useDispatch();
  // const { id } = useRouterParams();
  const url = window.location.href;
  const id = url.split("/")[4];
  const [listing, setListing] = useState();
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetch(`https://flatty.abyssara.tech/api/v1/listing/record/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setListing(data);
        console.log("DATA LISTING", data);
        setProperties(data.properties);
      });
  }, [id]);
  console.log("LISTING", listing);
  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error}</div>;
  if (!listing) return <div>No complex details available</div>;
  console.log("PROPERTY DETAILS", properties);
  return (
    <div className="flex flex-col min-h-screen ">
      <main className="flex-grow bg-[#F4F2FF] ">
        <Header />
        {properties ? (
          <div className="px-16 mx-auto max-w-[1440px] bg-white">
            <div className="w-full py-3 mx-auto bg-white">
              <div className="flex flex-col ">
                <div className="w-full">
                  <Breadcrumbs title={listing.id} />
                  <h1 className="text-[#525C76] font-medium text-[14px] leading-[22.4px] capitalize">
                    {listing.category}
                  </h1>
                  <PropertyShowcase
                    length={listing.images.length}
                    images={listing.images}
                  />
                  {/* grid area */}
                  <div className="grid grid-cols-1 gap-6 my-12 md:grid-cols-4 lg:grid-cols-6">
                    {Object.entries(properties)
                      .filter(([key]) =>
                        [
                          "category",
                          "buildingArea",
                          "livingArea",
                          "objects",
                          "installment",
                          "completionYear",
                        ].includes(key)
                      )
                      .map(([key, value], index) => (
                        <div
                          key={index}
                          className="flex justify-start w-full min-h-[50px] gap-2"
                        >
                          <div className="rounded-full bg-[#CACDD5] w-[50px] h-[50px]"></div>
                          <div>
                            <span className="text-[#525C76] font-medium text-[14px] leading-[22.4px] capitalize">
                              {key.replace(/([A-Z])/g, " $1").trim()}
                            </span>
                            <p className="text-[#0F1D40] text-[14px] leading-[22.4px] font-medium">
                              {value}
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                  {/* description */}
                  <div className="my-14">
                    <h1 className="text-[#0F1D40] font-semibold text-[36px] leading-[54px]">
                      Description
                    </h1>
                    <p className="text-[#0F1D40] font-normal text-[18px] leading-[28.8px]">
                      {listing.description}
                    </p>
                    {/* <span>{properties.updated}</span> */}
                    <hr className="my-8 border-t-2 border-[#EEEFF2]" />
                  </div>
                </div>
              </div>
              <div className="w-[96%] mx-auto my-20">
                {/* {
                  console.log()
                } */}
                {/* {popularProperties ? (
                  <div className="grid grid-cols-1 gap-6 mx-auto sm:grid-cols-2 lg:grid-cols-4">
                    {popularProperties.map((item) => (
                      <HouseItem key={item.id} {...item} />
                    ))}
                  </div>
                ) : (
                  <p className="text-center">
                    No related properties available yet.
                  </p>
                )} */}
                <Pagination />
              </div>
              {/* location */}
              <div className="w-full border-t-2 py-14">
                <h2 className="text-[#0F1D40] font-semibold text-[36px] leading-[54px]">
                  Location
                </h2>
                <PropertyMap
                  location={{
                    latitude: listing.latitude,
                    longitude: listing.longitude,
                  }}
                />
              </div>
            </div>
          </div>
        ) : (
          "No complex details available"
        )}

        <div className="px-6 mx-auto bg-[#ECE8FF]">
          <Footer />
        </div>
      </main>
    </div>
  );
};

export default Complex;
