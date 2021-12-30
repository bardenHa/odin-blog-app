import styles from "./navbar.module.css";
import ThemeToggle from "components/atoms/theme-toggle";

const Header = () => {
  return (
    <header className={styles.header}>
      <div>header</div>
      <div>user</div>
      <div>logout</div>
      <ThemeToggle />
    </header>
  );
};

export default Header;
