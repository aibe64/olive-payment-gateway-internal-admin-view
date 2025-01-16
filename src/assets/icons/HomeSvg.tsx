interface HomeSvgProps {
  color: string; // You can specify any other prop types here
}
const HomeSvg: React.FC<HomeSvgProps> = ({ color }) => {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 13 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.62813 0.584351L12.5906 6.02185L11.925 6.68748L10.9781 5.82873V11.9469L10.5094 12.4156H7.69688L7.22813 11.9469V8.6656H5.35313V11.9469L4.88438 12.4156H2.07188L1.60313 11.9469V5.83623L0.665625 6.68748L0 6.02185L5.95313 0.584351H6.62813ZM2.54063 4.98404V11.4781H4.41563V8.19685L4.88438 7.7281H7.69688L8.16563 8.19685V11.4781H10.0406V4.97841L6.29063 1.5781L2.54063 4.98404Z"
        fill={color}
      />
    </svg>
  );
};

export default HomeSvg;
