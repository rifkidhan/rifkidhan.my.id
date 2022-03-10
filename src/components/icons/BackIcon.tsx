import { m } from "framer-motion";
import { useState } from "react";

const svgVariants = {
  mouseEnter: {
    x: -5,
    transition: {
      type: "bounce",
      duration: 0.5,
    },
  },
  mouseLeave: {
    x: 0,
  },
};

export default function BackIcon() {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-14"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <m.path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M7 16l-4-4m0 0l4-4m-4 4h25"
          initial={false}
          animate={isHovered ? "mouseEnter" : "mouseLeave"}
          variants={svgVariants}
        />
      </svg>
    </div>
  );
}
