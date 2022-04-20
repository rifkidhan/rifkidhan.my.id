const MoonIcon = ({ ...props }) => {
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
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" pathLength={1} />
    </svg>
  );
};

export default MoonIcon;
