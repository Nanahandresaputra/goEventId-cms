import React from "react";

const LineLongIcon = ({ width = "93", height = "2" }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 93 2"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width={width} height={height} fill="url(#paint0_linear_2001_70)" />
      <defs>
        <linearGradient
          id="paint0_linear_2001_70"
          x1="0"
          y1="1"
          x2="93"
          y2="1"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#323232" />
          <stop offset="1" stop-color="white" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default LineLongIcon;
