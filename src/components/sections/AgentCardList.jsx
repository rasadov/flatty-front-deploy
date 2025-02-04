import React from "react";
import SectionArea from "./SectionArea";

export const AgentCardList = ({
  children,
  sectionName,
  seeAll = false,
  coplexses,
}) => {
  return (
    <SectionArea
      sectionName={sectionName}
      coplexses={coplexses}
      seeAll={seeAll}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-6 mx-auto">
        {children}
      </div>
    </SectionArea>
  );
};