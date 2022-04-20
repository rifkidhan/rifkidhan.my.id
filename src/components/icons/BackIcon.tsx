import { FC } from "react";
import { animate } from "motion";

const hoverStart = () => {
  animate(".backAnime path", { x: -5 }, { duration: 0.5, easing: "ease-in" });
};
const hoverEnd = () => {
  animate(".backAnime path", { x: 0 }, { duration: 0.5, easing: "ease-out" });
};

const BackIcon: FC = () => {
  return (
    <div onMouseEnter={hoverStart} onMouseLeave={hoverEnd}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="backAnime h-10 w-14"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M7 16l-4-4m0 0l4-4m-4 4h25"
        />
      </svg>
    </div>
  );
};

export default BackIcon;
