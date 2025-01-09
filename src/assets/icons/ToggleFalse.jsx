import React from "react";

export const ToggleFalse = () => {
  return (
    <svg
      width="37"
      height="25"
      viewBox="0 0 37 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="1" width="36" height="20" rx="10" fill="#E2E4E8" />
      <g filter="url(#filter0_d_36820_20729)">
        <rect x="4" y="3" width="14" height="14" rx="7" fill="white" />
      </g>
      <defs>
        <filter
          id="filter0_d_36820_20729"
          x="0"
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
            result="effect1_dropShadow_36820_20729"
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
            result="effect1_dropShadow_36820_20729"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_36820_20729"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};
