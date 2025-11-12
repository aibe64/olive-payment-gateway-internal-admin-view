const UsersSvg: React.FC<{ color: string }> = ({ color }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.3683 17.336L14.2926 19.4116C14.2106 19.4937 14.1343 19.6461 14.1168 19.7575L14.0054 20.549C13.9643 20.8363 14.1637 21.0357 14.451 20.9946L15.2425 20.8832C15.3539 20.8657 15.5122 20.7894 15.5884 20.7074L17.664 18.6318C18.0217 18.2741 18.1917 17.8578 17.664 17.3301C17.1422 16.8083 16.7259 16.9783 16.3683 17.336Z"
        stroke={color}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.0693 17.635C16.2452 18.2682 16.7377 18.7607 17.3709 18.9366"
        stroke={color}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.15 10.87C12.05 10.86 11.93 10.86 11.82 10.87C9.43999 10.79 7.54999 8.84 7.54999 6.44C7.54999 3.99 9.52999 2 11.99 2C14.44 2 16.43 3.99 16.43 6.44C16.42 8.84 14.53 10.79 12.15 10.87Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.99 21.81C10.17 21.81 8.36001 21.35 6.98001 20.43C4.56001 18.81 4.56001 16.17 6.98001 14.56C9.73001 12.72 14.24 12.72 16.99 14.56"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default UsersSvg;
