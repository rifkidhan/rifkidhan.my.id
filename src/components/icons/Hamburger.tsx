import { m } from "framer-motion";
import { useEffect, useState } from "react";
import useIsomorphicLayoutEffect from "@/libs/useIsomorphicLayoutEffect";

const draw = {
  open: (i: number) => {
    const delay = 1 + i * 0.5;
    return {
      pathLength: 0,
      opacity: 0,
      fill: "rgba(28, 25, 23, 0)",
      transition: {
        pathLength: { delay, type: "spring", duration: 1.5, bounce: 0 },
        fill: { delay, type: "spring", duration: 1.5, bounce: 0 },
        opacity: { delay, duration: 0.01 },
      },
    };
  },
  closed: (i: number) => {
    const delay = 1 + i * 0.5;
    return {
      pathLength: 1,
      opacity: 1,
      fill: "rgba(28, 25, 23, 1)",
      transition: {
        pathLength: { delay, type: "spring", duration: 1.5, bounce: 0 },
        fill: { delay, type: "spring", duration: 1.5, bounce: 0 },
        opacity: { delay, duration: 0.01 },
      },
    };
  },
};

const drawDark = {
  open: (i: number) => {
    const delay = 1 + i * 0.5;
    return {
      pathLength: 0,
      opacity: 0,
      fill: "rgba(250, 250, 249, 0)",
      transition: {
        pathLength: { delay, type: "spring", duration: 1.5, bounce: 0 },
        fill: { delay, type: "spring", duration: 1.5, bounce: 0 },
        opacity: { delay, duration: 0.01 },
      },
    };
  },
  closed: (i: number) => {
    const delay = 1 + i * 0.5;
    return {
      pathLength: 1,
      opacity: 1,
      fill: "rgba(250, 250, 249, 1)",
      transition: {
        pathLength: { delay, type: "spring", duration: 1.5, bounce: 0 },
        fill: { delay, type: "spring", duration: 1.5, bounce: 0 },
        opacity: { delay, duration: 0.01 },
      },
    };
  },
};

const Hamburger = ({ ...props }) => {
  return (
    <m.svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      fillRule="evenodd"
      clipRule="evenodd"
      xmlns="http://www.w3.org/2000/svg"
    >
      <m.path
        variants={draw}
        custom={2}
        d="M23 12.1613C23 11.5734 22.5234 11.0968 21.9355 11.0968H2.06452C1.4766 11.0968 1 11.5734 1 12.1613C1 12.7492 1.4766 13.2258 2.06452 13.2258H21.9355C22.5234 13.2258 23 12.7492 23 12.1613Z"
      />
      <m.path
        variants={draw}
        custom={1}
        d="M23 5.06452C23 4.4766 22.5234 4 21.9355 4H2.06452C1.4766 4 1 4.4766 1 5.06452C1 5.65243 1.4766 6.12903 2.06452 6.12903H21.9355C22.5234 6.12903 23 5.65243 23 5.06452Z"
      />
      <m.path
        variants={draw}
        custom={3}
        d="M23 19.2581C23 18.6701 22.5234 18.1935 21.9355 18.1935H2.06452C1.4766 18.1935 1 18.6701 1 19.2581C1 19.846 1.4766 20.3226 2.06452 20.3226H21.9355C22.5234 20.3226 23 19.846 23 19.2581Z"
      />
    </m.svg>
  );
};

const HamburgerDark = ({ ...props }) => {
  return (
    <m.svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      fillRule="evenodd"
      clipRule="evenodd"
      xmlns="http://www.w3.org/2000/svg"
    >
      <m.path
        variants={drawDark}
        custom={2}
        d="M23 12.1613C23 11.5734 22.5234 11.0968 21.9355 11.0968H2.06452C1.4766 11.0968 1 11.5734 1 12.1613C1 12.7492 1.4766 13.2258 2.06452 13.2258H21.9355C22.5234 13.2258 23 12.7492 23 12.1613Z"
      />
      <m.path
        variants={drawDark}
        custom={1}
        d="M23 5.06452C23 4.4766 22.5234 4 21.9355 4H2.06452C1.4766 4 1 4.4766 1 5.06452C1 5.65243 1.4766 6.12903 2.06452 6.12903H21.9355C22.5234 6.12903 23 5.65243 23 5.06452Z"
      />
      <m.path
        variants={drawDark}
        custom={3}
        d="M23 19.2581C23 18.6701 22.5234 18.1935 21.9355 18.1935H2.06452C1.4766 18.1935 1 18.6701 1 19.2581C1 19.846 1.4766 20.3226 2.06452 20.3226H21.9355C22.5234 20.3226 23 19.846 23 19.2581Z"
      />
    </m.svg>
  );
};

export { Hamburger, HamburgerDark };
