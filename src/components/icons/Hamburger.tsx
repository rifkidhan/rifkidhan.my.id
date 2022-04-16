import { m } from "framer-motion";

const draw = {
  open: (i: number) => {
    const delay = 1 + i * 0.5;
    return {
      pathLength: 0,
      opacity: 0,
      transition: {
        pathLength: { delay, type: "spring", duration: 1.5, bounce: 0 },
        opacity: { delay, duration: 0.01 },
      },
    };
  },
  closed: (i: number) => {
    const delay = 1 + i * 0.5;
    return {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay, type: "spring", duration: 1.5, bounce: 0 },
        opacity: { delay, duration: 0.01 },
      },
    };
  },
};

const Hamburger = ({ ...props }) => {
  return (
    <m.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      shapeRendering="geometricPrecision"
      {...props}
    >
      <m.path variants={draw} custom={2} d="M3 12h18" />
      <m.path variants={draw} custom={1} d="M3 6h18" />
      <m.path variants={draw} custom={3} d="M3 18h18" />
    </m.svg>
  );
};

export default Hamburger;
