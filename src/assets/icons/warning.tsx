import React from "react";

interface WarningIconProps {
  width: number;
  height: number;
  color: string;
}

const WarningIcon: React.FC<WarningIconProps> = ({ width, height, color }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="transparent"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 5.2V8.7M7.99615 10.8H8.00244M8 15C11.85 15 15 11.85 15 8C15 4.15 11.85 1 8 1C4.15 1 1 4.15 1 8C1 11.85 4.15 15 8 15Z"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default WarningIcon;
