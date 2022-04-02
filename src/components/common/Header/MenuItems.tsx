import { FC } from "react";
import { m } from "framer-motion";
import useSWR from "swr";
import { fetcher } from "@/libs/api";
import { getMenu } from "@/libs/data/queries";
import Link from "next/link";
import s from "./Header.module.css";

interface MenuItemsType {
  changeToggle?: any;
}

const sidebar = {
  open: {
    x: "0%",
    transition: {
      ease: "easeInOut",
      duration: 0.5,
    },
    display: "grid",
  },
  closed: {
    x: "100%",
    transition: {
      delay: 0.8,
      ease: "easeInOut",
      duration: 0.5,
    },
    transitionEnd: {
      display: "none",
    },
  },
};
const navigation = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.3 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};
const menuItems = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

const MenuItems: FC<MenuItemsType> = ({ changeToggle }) => {
  const { data } = useSWR(getMenu, fetcher);

  return (
    <m.nav variants={sidebar} className={s.menu}>
      <div className="isContainer">
        <m.div variants={navigation} className={s.menuItem}>
          {data?.menu.map((menu: any) => (
            <m.div variants={menuItems} key={menu.id}>
              {menu.slug === "home" && (
                <Link href={`/`} passHref>
                  <a onClick={changeToggle}>{menu.title}</a>
                </Link>
              )}
              {menu.slug !== "home" && (
                <Link href={`/${menu.slug}`} passHref>
                  <a onClick={changeToggle}>{menu.title}</a>
                </Link>
              )}
            </m.div>
          ))}
        </m.div>
      </div>
    </m.nav>
  );
};

export default MenuItems;
