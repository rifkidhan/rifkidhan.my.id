import { m } from "framer-motion";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const splash = {
  visible: {
    display: "flex",
    y: 0,
    opacity: 1,
  },
  hidden: {
    opacity: 0,
    y: "100%",
    transition: {
      type: "spring",
      bounce: 0.25,
      duration: 2,
    },
    transitionEnd: {
      display: "none",
    },
  },
};

const circleVariant = {
  loading: {
    y: [-100, 100],
    scaleX: [1, 1.2],
    rotate: [0, 270],
    borderRadius: ["0%", "100%"],
    transition: {
      y: {
        repeat: Infinity,
        repeatType: "reverse",
        ease: "anticipate",
        duration: 1,
      },
      scaleX: {
        repeat: Infinity,
        repeatType: "reverse",
        ease: "anticipate",
        duration: 1,
      },
      rotate: {
        repeat: Infinity,
        repeatType: "reverse",
        ease: "anticipate",
        duration: 1,
      },
      borderRadius: {
        repeat: Infinity,
        repeatType: "reverse",
        ease: "anticipate",
        duration: 1,
      },
    },
  },
  exit: {
    y: 0,
    width: "100%",
    height: "100vh",
    borderRadius: 0,
    transition: {
      width: {
        ease: "anticipate",
        duration: 1,
      },
      height: {
        ease: "anticipate",
        duration: 1,
      },
    },
  },
};
const textVariant = {
  initial: {
    transition: {},
  },
  animate: {
    transition: {
      delayChildren: 1.5,
      staggerChildren: 0.08,
    },
  },
};
const charVariant = {
  initial: {
    y: "100%",
    opacity: 0,
    rotate: 45,
    display: "none",
  },
  animate: {
    y: 0,
    opacity: 1,
    rotate: 0,
    display: "inline-block",
    transition: {
      y: { stiffness: 1000, velocity: -100 },
      rotate: { stiffness: 1000, velocity: -100 },
    },
  },
};
const Loader = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<number>(0);
  const [willHidden, setWillHidden] = useState<boolean>(false);

  useEffect(() => {
    const waiting = () => {
      setTimeout(() => {
        setLoading(100);
      }, 3000);
      if (loading > 100) {
        setTimeout(() => {
          setWillHidden(true);
        }, 1000);
      }
    };

    waiting();
    router.events.on("routeChangeStart", waiting);
    return () => {
      router.events.off("routeChangeStart", waiting);
    };
  }, [router, loading, willHidden]);

  const title = "Rifkidhan.";

  return (
    <m.div
      animate={willHidden ? "hidden" : "visible"}
      variants={splash}
      className="absolute top-0 z-100 min-h-screen w-full items-center justify-center bg-stone-50"
    >
      <m.div
        animate={loading === 0 ? "loading" : "exit"}
        variants={circleVariant}
        className="absolute h-28 w-28 bg-stone-900"
      />
      <m.h2
        initial="initial"
        animate={loading === 100 && "animate"}
        variants={textVariant}
        onAnimationComplete={() => setLoading(200)}
        className="absolute overflow-hidden font-sans text-stone-50"
      >
        {title.split("").map((char, i) => (
          <m.span key={i} variants={charVariant}>
            {char}
          </m.span>
        ))}
      </m.h2>
    </m.div>
  );
};

export default Loader;
