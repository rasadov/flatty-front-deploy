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
  console.log("ID", id);
  console.log("URL", url);
  const [listing, setListing] = useState();
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetch(`https://api.flatty.ai/api/v1/listing/record/${id}`)
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
    <div className="px-16 mx-auto max-w-[1440px] bg-white">
      <Breadcrumbs title={listing.name} />
      <PropertyShowcase length={listing.images.length} images={listing.images} />
  
      {/* Grid Area */}
      <div className="grid grid-cols-1 gap-6 my-12 md:grid-cols-4 lg:grid-cols-6">
        <div className="flex items-center gap-4">
          <div className="rounded-full bg-[#CACDD5] w-[50px] h-[50px]"></div>
          <div>
            <span className="text-[#525C76] font-medium text-[14px] leading-[22.4px] capitalize">Category</span>
            <p className="text-[#0F1D40] text-[14px] leading-[22.4px] font-medium">{listing.category || "N/A"}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="rounded-full bg-[#CACDD5] w-[50px] h-[50px]"></div>
          <div>
            <span className="text-[#525C76] font-medium text-[14px] leading-[22.4px] capitalize">Building Area</span>
            <p className="text-[#0F1D40] text-[14px] leading-[22.4px] font-medium">{listing.building_area || "0.0"} m²</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="rounded-full bg-[#CACDD5] w-[50px] h-[50px]"></div>
          <div>
            <span className="text-[#525C76] font-medium text-[14px] leading-[22.4px] capitalize">Living Area</span>
            <p className="text-[#0F1D40] text-[14px] leading-[22.4px] font-medium">{listing.living_area || "0.0"} m²</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="rounded-full bg-[#CACDD5] w-[50px] h-[50px]"></div>
          <div>
            <span className="text-[#525C76] font-medium text-[14px] leading-[22.4px] capitalize">Objects</span>
            <p className="text-[#0F1D40] text-[14px] leading-[22.4px] font-medium">{listing.objects || "N/A"}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="rounded-full bg-[#CACDD5] w-[50px] h-[50px]"></div>
          <div>
            <span className="text-[#525C76] font-medium text-[14px] leading-[22.4px] capitalize">Installment</span>
            <p className="text-[#0F1D40] text-[14px] leading-[22.4px] font-medium">{listing.installment ? "Yes" : "No"}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="rounded-full bg-[#CACDD5] w-[50px] h-[50px]"></div>
          <div>
            <span className="text-[#525C76] font-medium text-[14px] leading-[22.4px] capitalize">Completion Year</span>
            <p className="text-[#0F1D40] text-[14px] leading-[22.4px] font-medium">{listing.year || "N/A"}</p>
          </div>
        </div>
      </div>
  
      {/* Description */}
      <div className="my-14">
        <h1 className="text-[#0F1D40] font-semibold text-[36px] leading-[54px]">Description</h1>
        <p className="text-[#0F1D40] font-normal text-[18px] leading-[28.8px]">{listing.description}</p>
        <hr className="my-8 border-t-2 border-[#EEEFF2]" />
      </div>
  
      {/* Location */}
      <div className="w-full border-t-2 py-14">
        <h2 className="text-[#0F1D40] font-semibold text-[36px] leading-[54px]">Location</h2>
        <PropertyMap
          location={{
            latitude: listing.latitude,
            longitude: listing.longitude,
          }}
        />
      </div>
    </div>
  );  
};

export default Complex;