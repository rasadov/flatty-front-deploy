import React, { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight } from "../assets/icons";

export const Breadcrumbs = () => {
  const location = useLocation();

  // Memoize pathnames calculation to improve performance
  const pathnames = useMemo(() => {
    return location.pathname
      .split("/")
      .filter((x) => x)
      .map((path) => path.charAt(0).toUpperCase() + path.slice(1)); // Capitalize first letter
  }, [location.pathname]);

  // Do not render if there are no pathnames
  if (pathnames.length === 0) {
    return null;
  }

  return (
    <nav
      aria-label="Breadcrumb"
      className="text-[#8C93A3]  font-normal text-xs  leading-[19.2px] h-[19px] w-[169px]"
    >
      <ul className="flex items-center ">
        <li className="flex items-center justify-between">
          <Link to="/" aria-label="Go to Home">
            Home
          </Link>
          {pathnames.length > 0 && (
            <ArrowRight className=" text-[#667085]" size={16} />
          )}
        </li>
        {pathnames.map((value, index) => {
          const path = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;
          return (
            <li key={index} className="flex items-center justify-between">
              {!isLast ? (
                <>
                  <Link to={path} aria-label={`Go to ${value}`}>
                    {value}
                  </Link>
                  <ArrowRight className=" text-[#667085]" size={16} />
                </>
              ) : (
                <span aria-current="page">{value}</span>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Breadcrumbs;
