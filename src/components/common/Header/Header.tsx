import { FC, useEffect, useState } from "react";
import Link from "next/link";
import debounce from "@libs/debounce";
import dynamic from "next/dynamic";
import { Hamburger } from "@components/icons";
import { timeline, stagger, spring } from "motion";
import { useRouter } from "next/router";
import { DarkMode } from "@components/common";
import MenuItems from "./MenuItems";
import { useTheme } from "next-themes";
import s from "./Header.module.css";

const Menu = dynamic(() => import("@components/common/Header/MenuItems"));

const Header: FC = () => {
  const router = useRouter();
  const [visible, setVisible] = useState(true);
  const [isTop, setIsTop] = useState<boolean>(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [opened, setOpened] = useState<boolean>(false);
  const { theme } = useTheme();

  useEffect(() => {
    const scrollHandler = debounce(() => {
      const currentScrollPos = window.scrollY;

      setVisible(
        (prevScrollPos > currentScrollPos &&
          prevScrollPos - currentScrollPos > 70) ||
          currentScrollPos < 10
      );
      setIsTop(currentScrollPos < 100);

      setPrevScrollPos(currentScrollPos);
    }, 50);

    window.addEventListener("scroll", scrollHandler);
    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, [prevScrollPos, visible, isTop]);

  useEffect(() => {
    const bodyLock = document.querySelector("body") as HTMLElement;

    if (isOpen === true) {
      bodyLock.classList.add("scroll-lock");
    }
    return () => {
      bodyLock.classList.remove("scroll-lock");
    };
  });

  useEffect(() => {
    if (isOpen === true) {
      setOpened(true);
    }
  }, [isOpen, opened]);

  const drawPath = () => ({
    strokeDasharray: "1px 1px",

    visibility: "visible",
  });

  const deletePath = () => ({
    strokeDasharray: "0px 1px",

    visibility: "hidden",
  });

  useEffect(() => {
    const toggleOpen = () => {
      timeline([
        [
          ".hamburgerAnime path",
          deletePath(),
          { duration: 0.5, delay: stagger(0.3), easing: "ease-in-out" },
        ],
        [
          ".menuAnime",
          { x: ["100%", "0%"] },
          {
            easing: spring({
              velocity: 50,
              stiffness: 100,
              damping: 50,
              mass: 1,
            }),
            at: "-0.7",
          },
        ],
        [
          ".menuItemsAnime div",
          { y: 0, opacity: 1 },
          { duration: 0.3, delay: stagger(0.1), easing: "ease-in-out" },
        ],
        [
          ".closeAnime path",
          drawPath(),
          {
            duration: 0.5,
            delay: stagger(0.3),
            easing: "ease-in-out",
          },
        ],
      ]);
    };

    const toggleClose = () => {
      timeline([
        [
          ".closeAnime path",
          deletePath(),
          { duration: 0.5, delay: stagger(0.3), easing: "ease-in-out" },
        ],
        [
          ".menuItemsAnime div",
          { y: 10, opacity: 0 },
          {
            duration: 0.5,
            delay: stagger(0.2, { from: "last" }),
            easing: "ease-in-out",
            at: "-0.5",
          },
        ],
        [
          ".menuAnime",
          { x: ["0%", "100%"] },
          {
            easing: spring({
              velocity: 50,
              stiffness: 100,
              damping: 50,
              mass: 1,
            }),
          },
        ],

        [
          ".hamburgerAnime path",
          drawPath(),
          {
            duration: 0.8,
            delay: stagger(0.3),
            easing: "ease-in-out",
            at: "-0.5",
          },
        ],
      ]).finished.then(() => {
        setOpened(false);
      });
    };

    if (isOpen === true) {
      toggleOpen();
    } else {
      toggleClose();
    }
  }, [isOpen, opened]);

  useEffect(() => {
    const sunMode = () => {
      timeline([
        [
          ".sunAnime circle",
          drawPath(),
          { duration: 0.5, delay: 0.2, easing: "ease-in-out" },
        ],
        [
          ".sunAnime path",
          drawPath(),
          {
            duration: 0.3,
            delay: stagger(0.1),
            at: "-0.2",
            easing: "ease-in-out",
          },
        ],
        [
          ".moonAnime path",
          deletePath(),
          { duration: 0.5, at: "-0.3", easing: "ease-in-out" },
        ],
      ]);
    };

    const moonMode = () => {
      timeline([
        [
          ".moonAnime Path",
          drawPath(),
          { duration: 0.5, delay: 0.2, easing: "ease-in-out" },
        ],
        [
          ".sunAnime path",
          deletePath(),
          {
            duration: 0.3,
            delay: stagger(0.1),
            at: "-0.3",
            easing: "ease-in-out",
          },
        ],
        [
          ".sunAnime circle",
          deletePath(),
          { duration: 0.5, at: "-0.2", easing: "ease-in-out" },
        ],
      ]);
    };

    if (theme === "dark") {
      moonMode();
    }
    if (theme === "light") {
      sunMode();
    }
  }, [theme]);

  if (router.pathname === "/blog/[slug]")
    return (
      <>
        <header
          className={`${s.root} ${
            visible ? s.navbarActive : s.navbarInactive
          } ${isTop ? s.bgOnTopGlass : s.bgOnScroll} ${
            isTop ? s.borderWhite : s.borderBlack
          }`}
        >
          <div className={s.inner}>
            <Link href={"/"}>
              <a className={`${isTop ? s.logoTypeWhite : s.logoTypeBlack}`}>
                Rifkidhan
              </a>
            </Link>
            <div className={s.innerLeft}>
              <DarkMode isTop={isTop} />
              <button
                type="button"
                onClick={() => setIsOpen(true)}
                aria-label="Menu Button"
              >
                <Hamburger
                  className={`${s.menuHamburger} ${
                    isTop ? s.menuHamburgerTop : s.menuHamburgerNotTop
                  } hamburgerAnime`}
                />
              </button>
            </div>
          </div>
        </header>
        <Menu
          changeToggle={() => setIsOpen(false)}
          className={`${s.menu} menuAnime ${opened ? "block" : "hidden"}`}
        />
      </>
    );
  if (router.pathname !== "/")
    return (
      <>
        <header
          className={`${s.root} ${
            visible ? s.navbarActive : s.navbarInactive
          } ${isTop ? s.bgOnTop : s.bgOnScroll} ${
            isTop ? s.borderWhite : s.borderBlack
          }`}
        >
          <div className={s.inner}>
            <Link href={"/"}>
              <a className={`${isTop ? s.logoTypeWhite : s.logoTypeBlack}`}>
                Rifkidhan
              </a>
            </Link>
            <div className={s.innerLeft}>
              <DarkMode isTop={isTop} />
              <button
                type="button"
                onClick={() => setIsOpen(true)}
                aria-label="Open Menu Button"
              >
                <Hamburger
                  className={`${s.menuHamburger} ${
                    isTop ? s.menuHamburgerTop : s.menuHamburgerNotTop
                  } hamburgerAnime`}
                />
              </button>
            </div>
          </div>
        </header>
        <Menu
          changeToggle={() => setIsOpen(false)}
          className={`${s.menu} menuAnime ${opened ? "block" : "hidden"}`}
        />
      </>
    );
  return (
    <>
      <header
        className={`${s.root} ${visible ? s.navbarActive : s.navbarInactive} ${
          isTop ? s.bgOnTop : s.bgOnScroll
        } ${s.borderBlack}`}
      >
        <div className={s.inner}>
          <Link href={"/"}>
            <a className={s.logoTypeBlack}>Rifkidhan</a>
          </Link>
          <div className={s.innerLeft}>
            <DarkMode isTop={false} />
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              aria-label="Menu Button"
            >
              <Hamburger className={`${s.menuHamburger} hamburgerAnime`} />
            </button>
          </div>
        </div>
      </header>
      <Menu
        changeToggle={() => setIsOpen(false)}
        className={`${s.menu} menuAnime ${opened ? "block" : "hidden"}`}
      />
    </>
  );
};

export default Header;
