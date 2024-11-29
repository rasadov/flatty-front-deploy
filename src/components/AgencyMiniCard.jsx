import React from "react";
import { Link } from "react-router-dom";

const AgencyMiniCard = ({ agencyName, agencyProfileLink }) => {
  return (
    <Link to={agencyProfileLink} className="flex items-center gap-2">
      <img
        src="https://via.placeholder.com/20x20"
        alt="Agency Logo"
        className="object-cover w-[20px] h-[20px] rounded-full"
      />
      <p className="text-xs font-semibold text-slate-900 "> {agencyName}</p>
    </Link>
  );
};

export default AgencyMiniCard;
