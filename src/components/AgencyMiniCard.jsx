import React from "react";
import { Link } from "react-router-dom";
import apparment from "../assets/images/apparment.png";

const AgencyMiniCard = ({ agencyName, agencyProfileLink }) => {
  return (
    <Link to={agencyProfileLink} className="flex items-center gap-2">
      <img
        src={apparment}
        alt="Agency Logo"
        className="object-cover w-[20px] h-[20px] rounded-full"
      />
      <p className="text-xs font-medium text-[#525C76] leading-[19.2px]">
        {agencyName}
      </p>
    </Link>
  );
};

export default AgencyMiniCard;
