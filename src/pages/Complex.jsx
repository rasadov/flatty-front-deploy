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

const Complex = () => {
  const dispatch = useDispatch();
  // Use either useRouterParams() or just parse from window.location if needed
  // const { id } = useRouterParams();
  const url = window.location.href;
  const id = url.split("/")[4];

  const [listing, setListing] = useState(null);

  useEffect(() => {
    fetch(`https://flatty.abyssara.tech/api/v1/listing/record/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setListing(data);
        console.log("DATA LISTING", data);
      })
      .catch((err) => {
        console.error("Error fetching listing:", err);
      });
  }, [id]);

  if (!listing) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow bg-[#F4F2FF]">
          <div className="p-10 text-center">Loading or no details available...</div>
        </main>
        <Footer />
      </div>
    );
  }

  // Build the “info” array to display in the grid
  const infoItems = [
    {
      label: "Category",
      value: listing.category,
    },
    {
      label: "Building Area",
      value: listing.building_area ? listing.building_area + " m²" : "—",
    },
    {
      label: "Living Area",
      value: listing.living_area ? listing.living_area + " m²" : "—",
    },
    {
      label: "Objects",
      value: listing.objects ?? "—",
    },
    {
      label: "Installment",
      value: listing.installment ? "Yes" : "No",
    },
    {
      label: "Completion Year",
      value: listing.year && listing.year > 0 ? listing.year : "—",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow bg-[#F4F2FF]">
        <Header />

        <div className="px-4 md:px-16 mx-auto max-w-[1440px] bg-white">
          {/* Breadcrumbs */}
          <div className="w-full py-3">
            <Breadcrumbs title={listing.name || `Complex #${listing.id}`} />
            {/* Category or other meta info here */}
            <h2 className="text-[#525C76] font-medium text-[14px] leading-[22.4px] capitalize">
              {listing.category}
            </h2>
          </div>

          {/* Images / Showcase */}
          <PropertyShowcase length={listing.images?.length || 0} images={listing.images || []} />

          {/* Info grid area */}
          <div className="grid grid-cols-1 gap-6 my-12 md:grid-cols-3 lg:grid-cols-6">
            {infoItems.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center w-full min-h-[50px] gap-2"
              >
                {/* Placeholder for icon */}
                <div className="rounded-full bg-[#CACDD5] w-[50px] h-[50px]" />
                {/* Label and value */}
                <div>
                  <span className="text-[#525C76] font-medium text-[14px] leading-[22.4px] capitalize">
                    {item.label}
                  </span>
                  <p className="text-[#0F1D40] text-[14px] leading-[22.4px] font-medium">
                    {item.value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Description */}
          <div className="my-14">
            <h1 className="text-[#0F1D40] font-semibold text-[36px] leading-[54px] mb-4">
              Description
            </h1>
            <p className="text-[#0F1D40] font-normal text-[18px] leading-[28.8px]">
              {listing.description}
            </p>
            <hr className="my-8 border-t-2 border-[#EEEFF2]" />
          </div>

          {/* Properties grid */}
          <div className="my-14">
            <h2 className="text-[#0F1D40] font-semibold text-[36px] leading-[54px] mb-6">
              Properties
            </h2>

            {listing.properties && listing.properties.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {listing.properties.map((item) => (
                  <HouseItem key={item.id} {...item} />
                ))}
              </div>
            ) : (
              <p className="text-center">No properties found in this complex.</p>
            )}

            {/* Example pagination if needed */}
            {/* <Pagination /> */}
          </div>

          {/* Location section */}
          <div className="w-full border-t-2 py-14">
            <h2 className="text-[#0F1D40] font-semibold text-[36px] leading-[54px] mb-4">
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

        {/* Footer */}
        <div className="px-6 mx-auto bg-[#ECE8FF] mt-10">
          <Footer />
        </div>
      </main>
    </div>
  );
};

export default Complex;
