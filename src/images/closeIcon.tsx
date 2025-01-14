import React from "react";

interface CloseIconProps {
  width: number;
  height: number;
  color: string;
}

const CloseIcon: React.FC<CloseIconProps> = ({ width, height, color }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.25714 12C0.93859 12 0.620043 11.8826 0.368559 11.6312C-0.117645 11.145 -0.117645 10.3402 0.368559 9.854L9.85791 0.364652C10.3441 -0.121551 11.1489 -0.121551 11.6351 0.364652C12.1213 0.850856 12.1213 1.65561 11.6351 2.14181L2.14571 11.6312C1.911 11.8826 1.57568 12 1.25714 12Z"
        fill={color}
      />
      <path
        d="M10.7465 12C10.4279 12 10.1094 11.8826 9.85791 11.6312L0.368559 2.14181C-0.117645 1.65561 -0.117645 0.850856 0.368559 0.364652C0.854762 -0.121551 1.65951 -0.121551 2.14571 0.364652L11.6351 9.854C12.1213 10.3402 12.1213 11.145 11.6351 11.6312C11.3836 11.8826 11.065 12 10.7465 12Z"
        fill={color}
      />
    </svg>
  );
};

export default CloseIcon;
