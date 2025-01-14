import React from "react";

export const ToggleTrue = () => {
  return (
    <svg
      width="37"
      height="25"
      viewBox="0 0 37 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="36" height="20" rx="10" fill="#8247E5" />
      <g filter="url(#filter0_d_1204_13683)">
        <rect x="19" y="3" width="14" height="14" rx="7" fill="#F9F8FF" />
      </g>
      <defs>
        <filter
          id="filter0_d_1204_13683"
          x="15"
          y="3"
          width="22"
          height="22"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feMorphology
            radius="1"
            operator="erode"
            in="SourceAlpha"
            result="effect1_dropShadow_1204_13683"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2.5" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_1204_13683"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_1204_13683"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};
