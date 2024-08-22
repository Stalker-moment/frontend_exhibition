import React from "react";

export const SensorIcon = () => {
  return (
    <svg
      width="42"
      height="42"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-11 h-12"
    >
      <rect
        x="12"
        y="12"
        width="40"
        height="40"
        rx="8"
        fill="#e0e0e0"
        stroke="#b0b0b0"
        strokeWidth="2"
      />
      <circle
        cx="32"
        cy="32"
        r="12"
        fill="#b0b0b0"
      />
      <rect
        x="30"
        y="14"
        width="4"
        height="12"
        fill="#969696"
      />
      <rect
        x="28"
        y="42"
        width="8"
        height="10"
        fill="#b0b0b0"
      />
      <line
        x1="32"
        y1="56"
        x2="32"
        y2="64"
        stroke="#b0b0b0"
        strokeWidth="2"
      />
      <circle
        cx="32"
        cy="64"
        r="2"
        fill="#b0b0b0"
      />
      <text
        x="32"
        y="32"
        fill="#000"
        fontSize="8"
        textAnchor="middle"
        dy=".3em"
        fontFamily="Arial, sans-serif"
      >
        S
      </text>
    </svg>
  );
};