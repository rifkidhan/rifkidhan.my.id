import { FC } from "react";
import { Hamburger, HamburgerDark, Close } from "@/components/icons";
import s from "./Header.module.css";

interface MenuToggleType {
  toggle: any;
  isOpen: boolean;
  isOnTop: boolean;
  className?: string;
}

const OpenMenu = ({ ...props }) => {
  return (
    <div {...props}>
      <Hamburger className={s.menuToggleChange} />
      <HamburgerDark className={s.menuToggleChangeDark} />
    </div>
  );
};

const OpenMenuBlack = ({ ...props }) => {
  return (
    <div {...props}>
      <Hamburger className={s.menuToggleOpen} />
      <HamburgerDark className={s.menuToggleOpenDark} />
    </div>
  );
};

const ToggleMenu: FC<MenuToggleType> = ({
  toggle,
  isOpen,
  isOnTop,
  ...props
}) => {
  return (
    <button onClick={toggle} aria-label="Menu Button" {...props}>
      {isOnTop ? (
        <OpenMenuBlack className={isOpen ? "hidden" : "block"} />
      ) : (
        <OpenMenu className={isOpen ? "hidden" : "block"} />
      )}
      <Close
        className={`${isOpen ? "block" : "hidden"} ${s.menuToggleClose}`}
      />
    </button>
  );
};

export default ToggleMenu;
