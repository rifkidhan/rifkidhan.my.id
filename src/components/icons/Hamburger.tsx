const Hamburger = ({ ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      shapeRendering="geometricPrecision"
      {...props}
    >
      <path d="M3 6h18" pathLength={1} />
      <path d="M3 12h18" pathLength={1} />
      <path d="M3 18h18" pathLength={1} />
    </svg>
  );
};

export default Hamburger;
