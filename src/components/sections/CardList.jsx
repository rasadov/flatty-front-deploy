import React from "react";
import SectionArea from "./SectionArea";

export const CardList = ({ children, sectionName, seeAll = true }) => {
  return (
    <SectionArea sectionName={sectionName} seeAll={seeAll}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mx-auto">
        {children}
      </div>
    </SectionArea>
  );
};

export default CardList;
