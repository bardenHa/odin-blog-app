import { forwardRef, ComponentProps, useContext } from "react";
import styles from "./theme-toggle.module.css";
import { ThemeContext } from "components/context/themeContext";
import { SunIcon, MoonIcon } from "@heroicons/react/outline";

const ThemeToggle = forwardRef<
  HTMLButtonElement,
  Omit<ComponentProps<"div">, "className">
>(() => {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <div className={styles.toggleIconContainer}>
      {theme === "dark" ? (
        <SunIcon
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className={styles.toggleIcon}
        />
      ) : (
        <MoonIcon
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className={styles.toggleIcon}
        />
      )}
    </div>
  );
});

export default ThemeToggle;
