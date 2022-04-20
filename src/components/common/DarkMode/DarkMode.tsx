import { FC, useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "@components/icons";
import { useTheme } from "next-themes";
import s from "./DarkMode.module.css";

interface Props {
  isTop: boolean;
}

const DarkMode: FC<Props> = ({ isTop }) => {
  const [mounted, setMounted] = useState<boolean>(false);
  let { resolvedTheme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  return (
    <>
      <button
        type="button"
        aria-label="Dark Mode Button"
        onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
        className="relative"
      >
        {mounted && (
          <>
            <MoonIcon
              className={`${isTop ? s.invert : s.root} ${
                resolvedTheme === "dark" ? "block" : "hidden"
              } moonAnime`}
            />

            <SunIcon
              className={`${isTop ? s.invert : s.root} ${
                resolvedTheme === "dark" ? "hidden" : "block"
              } sunAnime`}
            />
          </>
        )}
      </button>
    </>
  );
};

export default DarkMode;
