import React from "react";
import Button from "./Button";
import { SeeAll } from "../assets/icons";
const SectionArea = ({ children, sectionName }) => {
  return (
    <div
      className="w-full p-8 mx-auto my-20 bg-white rounded-2xl"
      style={{ boxShadow: "0px 2px 3px 0px #703ACA14" }}
    >
      <h1 className="text-[36px] my-6  font-semibold">{sectionName}</h1>
      {children}
      <div className="flex justify-end mt-8">
        <Button
          variant="cancel"
          className="flex items-center justify-center gap-1 bg-transparent hover:bg-transparent "
        >
          <p className="text-[#8247E5] "> See all</p>
          <SeeAll />
        </Button>
      </div>
    </div>
  );
};
export default SectionArea;
