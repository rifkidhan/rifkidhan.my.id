const SunIcon = ({ ...props }) => {
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
      <circle cx="12" cy="12" r="5" pathLength={1} />
      <path d="M12 1v2" pathLength={1} />
      <path d="M18.36 5.64l1.42-1.42" pathLength={1} />
      <path d="M21 12h2" pathLength={1} />
      <path d="M18.36 18.36l1.42 1.42" pathLength={1} />
      <path d="M12 21v2" pathLength={1} />
      <path d="M4.22 4.22l1.42 1.42" pathLength={1} />
      <path d="M1 12h2" pathLength={1} />
      <path d="M4.22 19.78l1.42-1.42" pathLength={1} />
    </svg>
  );
};

export default SunIcon;
