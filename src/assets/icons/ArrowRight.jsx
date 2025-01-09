import React from "react";

export const ArrowRight = ({
  size = "24",
  className = "",
  color = "black",
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g clipPath="url(#clip0_36163_1447)">
        <path
          d="M8.59 16.59L13.17 12L8.59 7.41L10 6L16 12L10 18L8.59 16.59Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_36163_1447">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
