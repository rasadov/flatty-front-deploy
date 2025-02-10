import React from "react";
import SectionArea from "./SectionArea";

export const CardList = ({
  children,
  sectionName,
  seeAll = true,
  coplexses,
}) => {
  return (
    <SectionArea
      sectionName={sectionName}
      seeAll={seeAll}
      coplexses={coplexses}
    >
      <div className=" grid text-center sm:text-left text-sm grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 gap-6 mx-auto">
        {children}
      </div>
    </SectionArea>
  );
};

export default CardList;
