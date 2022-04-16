import { FC } from "react";
import { Hamburger, Close } from "@components/icons";
import s from "./Header.module.css";

interface MenuToggleType {
  toggle: any;
  isOpen: boolean;
  isOnTop: boolean;
  className?: string;
}

const ToggleMenu: FC<MenuToggleType> = ({
  toggle,
  isOpen,
  isOnTop,
  ...props
}) => {
  return (
    <button onClick={toggle} aria-label="Menu Button" {...props}>
      <Hamburger
        className={`${s.menuHamburger} ${isOpen ? "hidden" : "block"} ${
          isOnTop ? s.menuHamburgerTop : s.menuHamburgerNotTop
        }`}
      />
      <Close className={`${isOpen ? "block" : "hidden"} ${s.menuClose}`} />
    </button>
  );
};

export default ToggleMenu;
