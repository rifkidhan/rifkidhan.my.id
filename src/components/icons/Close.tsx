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
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      <m.path variants={draw} custom={1} d="M4.02944 20.9706L21 4" />
      <m.path variants={draw} custom={2} d="M3.32233 3.32233L21 21" />
    </m.svg>
  );
};

export default Close;
