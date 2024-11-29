import React from "react";
import SectionArea from "./SectionArea";

export const CardList = ({ children, sectionName }) => {
  return (
    <SectionArea sectionName={sectionName}>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {children} {/* Render the children dynamically */}
      </div>
    </SectionArea>
  );
};

export default CardList;
