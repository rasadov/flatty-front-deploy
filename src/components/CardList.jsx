import React from "react";
import SectionArea from "./SectionArea";

export const CardList = ({ children, sectionName }) => {
  return (
    <SectionArea sectionName={sectionName}>
      <div className="grid grid-cols-1 gap-6 mx-auto *: sm:grid-cols-2 lg:grid-cols-4">
        {children}
      </div>
    </SectionArea>
  );
};

export default CardList;
