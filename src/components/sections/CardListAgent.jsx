import React from "react";
import SectionArea from "./SectionArea";

export const CardListAgent = ({
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
      <div className="flex flex-wrap justify-start gap-4">{children}</div>
    </SectionArea>
  );
};

export default CardListAgent;
