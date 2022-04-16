import { FC, useEffect, useState } from "react";
import { m } from "framer-motion";
import { DarkModeIcon } from "@components/icons";
import { useTheme } from "next-themes";

interface Props {
  className: string;
}

const DarkMode: FC<Props> = ({ ...props }) => {
  const [mounted, setMounted] = useState<boolean>(false);
  let { resolvedTheme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div>
      <m.button
        type="button"
        aria-label="Toggle Dark Mode"
        onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
        initial={false}
        animate={resolvedTheme === "dark" ? "active" : "nonactive"}
      >
        <DarkModeIcon {...props} />
      </m.button>
    </div>
  );
};

export default DarkMode;
