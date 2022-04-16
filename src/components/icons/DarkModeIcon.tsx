import { FC } from "react";
import { m } from "framer-motion";

const sunDraw = {
  nonactive: (i: number) => {
    const delay = 1 + i * 0.1;
    return {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay, type: "spring", duration: 1.5, bounce: 0 },
        opacity: { delay, duration: 0.01 },
      },
    };
  },
  active: {
    pathLength: 0,
    opacity: 0,
    transition: {
      pathLength: { type: "spring", duration: 1.5, bounce: 0 },
      opacity: { duration: 0.01 },
    },
  },
};

const moonDraw = {
  nonactive: {
    pathLength: 0,
    opacity: 0,
    transition: {
      pathLength: { type: "spring", duration: 1.5, bounce: 0 },
      opacity: { duration: 0.01 },
    },
  },
  active: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { delay: 0.5, type: "spring", duration: 1.5, bounce: 0 },
      opacity: { delay: 0.5, duration: 0.01 },
    },
  },
};

const DarkModeIcon: FC = ({ ...props }) => {
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
      <m.circle variants={sunDraw} custom={1} cx="12" cy="12" r="5" />
      <m.path variants={sunDraw} custom={2} d="M12 1v2" />
      <m.path variants={sunDraw} custom={3} d="M12 21v2" />
      <m.path variants={sunDraw} custom={4} d="M4.22 4.22l1.42 1.42" />
      <m.path variants={sunDraw} custom={5} d="M18.36 18.36l1.42 1.42" />
      <m.path variants={sunDraw} custom={6} d="M1 12h2" />
      <m.path variants={sunDraw} custom={7} d="M21 12h2" />
      <m.path variants={sunDraw} custom={8} d="M4.22 19.78l1.42-1.42" />
      <m.path variants={sunDraw} custom={9} d="M18.36 5.64l1.42-1.42" />
      <m.path
        variants={moonDraw}
        d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
      />
    </svg>
  );
};

export default DarkModeIcon;
