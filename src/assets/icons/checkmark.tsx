import React from "react";

interface CheckmarkIconProps {
  width: number;
  height: number;
  color?: string;
}

const CheckmarkIcon: React.FC<CheckmarkIconProps> = ({
  width,
  height,
  color,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7 14C10.85 14 14 10.85 14 7C14 3.15 10.85 0 7 0C3.15 0 0 3.15 0 7C0 10.85 3.15 14 7 14Z"
        fill={color ? color : "#006F01"}
      />
      <path
        d="M4.02539 6.99995L6.00639 8.98095L9.97539 5.01895"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CheckmarkIcon;
