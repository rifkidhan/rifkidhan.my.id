import { useState, useEffect, FC } from "react";
import s from "./BackToTop.module.css";
import { animate, spring } from "motion";

const hoverStart = () => {
  animate(
    ".backToTopAnime path",
    { y: [2, -2] },
    { easing: spring(), repeat: Infinity, direction: "alternate" }
  );
};
const hoverEnd = () => {
  animate(".backToTopAnime path", { y: 0 }, { easing: spring() });
};

const BackToTop: FC = () => {
  const [isShow, setIsShow] = useState(false);
  const [scrollPosition, setScrollPostition] = useState(0);

  useEffect(() => {
    const backTopTopButtonShow = () => {
      const scrollPos = window.scrollY;
      setScrollPostition(scrollPos);

      setIsShow(scrollPosition > 500);
    };
    window.addEventListener("scroll", backTopTopButtonShow);
    return () => {
      window.removeEventListener("scroll", backTopTopButtonShow);
    };
  }, [isShow, scrollPosition]);

  const backToTopButton = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={`${s.root} ${isShow ? "visible" : "invisible"}`}>
      <button
        type="button"
        aria-label="Back To Top Button"
        onClick={backToTopButton}
        onMouseEnter={hoverStart}
        onMouseLeave={hoverEnd}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`${s.svg} backToTopAnime`}
        >
          <path d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </div>
  );
};

export default BackToTop;
