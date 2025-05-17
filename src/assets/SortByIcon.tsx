import * as React from "react";

const SortByIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={16}
    height={17}
    viewBox="0 0 16 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M2 5.1665H14"
      stroke="#656565"
      strokeWidth={1.5}
      strokeLinecap="round"
    />
    <path
      d="M4 8.5H12"
      stroke="#656565"
      strokeWidth={1.5}
      strokeLinecap="round"
    />
    <path
      d="M6.66669 11.8335H9.33335"
      stroke="#656565"
      strokeWidth={1.5}
      strokeLinecap="round"
    />
  </svg>
);

export default SortByIcon;
