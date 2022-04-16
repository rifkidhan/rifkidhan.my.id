import { m } from "framer-motion";

const draw = {
  closed: (i: number) => {
    const delay = 1 + i * 0.25;
    return {
      pathLength: 0,
      opacity: 0,
      transition: {
        pathLength: { delay, type: "spring", duration: 1.5, bounce: 0 },
        opacity: { delay, duration: 0.01 },
      },
    };
  },
  open: (i: number) => {
    const delay = 1 + i * 0.25;
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

const Close = ({ ...props }) => {
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
      <m.path variants={draw} custom={1} d="M18 6L6 18" />
      <m.path variants={draw} custom={2} d="M6 6l12 12" />
    </m.svg>
  );
};

export default Close;
