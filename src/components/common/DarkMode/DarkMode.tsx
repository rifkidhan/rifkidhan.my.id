import { useEffect, useRef, useState } from "react";
import useIsomorphicLayoutEffect from "@/libs/useIsomorphicLayoutEffect";
import { m, AnimatePresence } from "framer-motion";

const IconVariants = {
  initial: {
    y: "-100%",
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      x: { type: "spring", duration: 1.5, bounce: 0 },
      opacity: { duration: 0.01 },
    },
  },
  exit: {
    y: "100%",
    opacity: 0,
    transition: {
      x: { type: "spring", duration: 1.5, bounce: 0 },
      opacity: { duration: 0.01 },
    },
  },
};

const MoonIcon = ({ ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      {...props}
    >
      <m.path
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={IconVariants}
        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
      />
    </svg>
  );
};

const SunIcon = ({ ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      {...props}
    >
      <m.path
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={IconVariants}
        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </svg>
  );
};

function update() {
  if (
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}

const useTheme = () => {
  let [setting, setSetting] = useState<string>("system");
  let initial = useRef(true);

  useIsomorphicLayoutEffect(() => {
    let theme = localStorage.theme;
    if (theme === "light" || theme === "dark") {
      setSetting(theme);
    }
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (setting === "system") {
      localStorage.removeItem("theme");
    } else if (setting === "light" || setting === "dark") {
      localStorage.theme = setting;
    }
    if (initial.current) {
      initial.current = false;
    } else {
      update();
    }
  }, [setting]);

  useEffect(() => {
    let mediaQuery = window.matchMedia("(prefer-color-scheme: dark)");

    if (mediaQuery?.addEventListener) {
      mediaQuery.addEventListener("change", update);
    } else {
      mediaQuery.addListener(update);
    }

    function onStorage() {
      update();
      let theme = localStorage.theme;
      if (theme === "light" || theme === "dark") {
        setSetting(theme);
      } else {
        setSetting("system");
      }
    }

    window.addEventListener("storage", onStorage);

    return () => {
      if (mediaQuery?.removeEventListener) {
        mediaQuery.removeEventListener("change", update);
      } else {
        mediaQuery.removeListener(update);
      }
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  return [setting, setSetting] as const;
};

const DarkMode = ({ ...props }) => {
  let [setting, setSetting] = useTheme();
  let [active, setActive] = useState<boolean>(false);

  useEffect(() => {
    if (setting === "dark") {
      setActive(true);
    }
    if (setting === "light") {
      setActive(false);
    }
  }, [setting, active]);

  return (
    <AnimatePresence>
      <div className="relative">
        {active ? (
          <m.button
            onClick={() => setSetting("light")}
            key={"dark"}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <MoonIcon {...props} />
          </m.button>
        ) : (
          <m.button
            onClick={() => setSetting("dark")}
            key={"light"}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <SunIcon {...props} />
          </m.button>
        )}
      </div>
    </AnimatePresence>
  );
};

export default DarkMode;
