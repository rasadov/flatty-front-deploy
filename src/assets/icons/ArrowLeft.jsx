import React from "react";

export const ArrowLeft = ({ color = "black", size = "24", className = "" }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className=""
    >
      <g clipPath="url(#clip0_36163_3734)">
        <path
          d="M15.41 16.59L10.83 12L15.41 7.41L14 6L8 12L14 18L15.41 16.59Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_36163_3734">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
