import { FC } from "react";

const ApprovalIcon: FC<{ color: string }> = ({ color }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9L2 15C2 20 4 22 9 22H15C20 22 22 20 22 15Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.97 14.4L11.46 16.89C11.75 17.18 12.24 17.18 12.53 16.89L15.02 14.4"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.97 9.59998L11.46 7.10998C11.75 6.81998 12.24 6.81998 12.53 7.10998L15.02 9.59998"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
export default ApprovalIcon;
