import React from "react";
import Button from "../Button";
import { SeeAllUnder, SeeAllRight } from "../../assets/icons";
import { useLocation } from "react-router-dom";

export const SectionArea = ({
  children,
  sectionName,
  seeAll = true,
  coplexses,
}) => {
  const location = useLocation();
  const isProfileRoute = location.pathname === "/profile";

  return (
    <div
      className={`w-full p-4 mx-auto my-2 bg-white rounded-2xl ${
        !isProfileRoute ? "custom-max-width" : ""
      }`}
      style={{ boxShadow: "0px 2px 3px 0px #703ACA14" }}
    >
      <h1 className="text-[36px] my-2  font-semibold">{sectionName}</h1>
      {children}
      {seeAll && (
        <div className="flex justify-end mt-8">
          <a href={coplexses ? "/complexes" : "/search"}>
            <Button
              variant="cancel"
              className="flex items-center justify-center gap-1 bg-transparent hover:bg-transparent"
            >
              <p className="text-purple-600"> See all</p>
              <SeeAllRight />
            </Button>
          </a>
        </div>
      )}
    </div>
  );
};
export default SectionArea;
