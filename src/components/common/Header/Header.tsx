import { FC, useEffect, useState } from "react";
import Link from "next/link";
import debounce from "@libs/debounce";
import { m } from "framer-motion";
import { useRouter } from "next/router";
import { DarkMode } from "@components/common";
import MenuItems from "./MenuItems";
import ToggleMenu from "./ToggleMenu";
import s from "./Header.module.css";

const Menu: FC = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOnTop, setIsOnTop] = useState<boolean>(false);

  useEffect(() => {
    const scrollHandler = debounce(() => {
      const currentScrollPos = window.scrollY;
      setIsOnTop(currentScrollPos < 100);
    }, 50);

    window.addEventListener("scroll", scrollHandler);

    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, [isOnTop]);

  useEffect(() => {
    const bodyLock = document.querySelector("body") as HTMLElement;

    if (isOpen === true) {
      bodyLock.classList.add("scroll-lock");
    }
    return () => {
      bodyLock.classList.remove("scroll-lock");
    };
  });

  if (router.pathname === "/")
    return (
      <m.div initial={false} animate={isOpen ? "open" : "closed"}>
        <ToggleMenu
          toggle={() => setIsOpen(!isOpen)}
          className={s.menuToggle}
          isOpen={isOpen}
          isOnTop={false}
        />
        <MenuItems changeToggle={() => setIsOpen(false)} />
      </m.div>
    );

  return (
    <m.div initial={false} animate={isOpen ? "open" : "closed"}>
      <ToggleMenu
        toggle={() => setIsOpen(!isOpen)}
        className={s.menuToggle}
        isOpen={isOpen}
        isOnTop={isOnTop}
      />
      <MenuItems changeToggle={() => setIsOpen(false)} />
    </m.div>
  );
};

// header section

const Header: FC = () => {
  const router = useRouter();
  const [visible, setVisible] = useState(true);
  const [isTop, setIsTop] = useState<boolean>(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

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

  if (router.pathname === "/")
    return (
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
            <DarkMode className={s.darkMode} />
            <Menu />
          </div>
        </div>
      </header>
    );
  if (router.pathname === "/blog/[slug]")
    return (
      <header
        className={`${s.root} ${visible ? s.navbarActive : s.navbarInactive} ${
          isTop ? s.bgOnTopGlass : s.bgOnScroll
        } ${isTop ? s.borderWhite : s.borderBlack}`}
      >
        <div className={s.inner}>
          <Link href={"/"}>
            <a className={`${isTop ? s.logoTypeWhite : s.logoTypeBlack}`}>
              Rifkidhan
            </a>
          </Link>
          <div className={s.innerLeft}>
            <DarkMode className={isTop ? s.darkModeInvert : s.darkMode} />
            <Menu />
          </div>
        </div>
      </header>
    );
  return (
    <header
      className={`${s.root} ${visible ? s.navbarActive : s.navbarInactive} ${
        isTop ? s.bgOnTop : s.bgOnScroll
      } ${isTop ? s.borderWhite : s.borderBlack}`}
    >
      <div className={s.inner}>
        <Link href={"/"}>
          <a className={`${isTop ? s.logoTypeWhite : s.logoTypeBlack}`}>
            Rifkidhan
          </a>
        </Link>
        <div className={s.innerLeft}>
          <DarkMode className={isTop ? s.darkModeInvert : s.darkMode} />
          <Menu />
        </div>
      </div>
    </header>
  );
};

export default Header;
