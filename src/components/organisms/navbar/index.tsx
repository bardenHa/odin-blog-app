import { useContext } from "react";
import styles from "./navbar.module.css";
import ThemeToggle from "components/atoms/theme-toggle";
import Loader from "components/atoms/loader";
import AuthContext from "components/context/AuthContext";
import * as ROUTES from "constants/routes";

const Header = () => {
  const { user, loading } = useContext(AuthContext);

  return (
    <header className={styles.header}>
      <div className={styles.linkContainer}>
        {user ? (
          loggedInLinks(user)
        ) : loading ? (
          <div className={styles.loadingUser}>
            <span>Loading</span>
            <Loader />
          </div>
        ) : (
          <div>
            <a className={styles.home} href={ROUTES.HOMEPAGE}>
              Home
            </a>
            <a href={ROUTES.SIGNIN}>Sign In</a>
          </div>
        )}
      </div>
      <ThemeToggle />
    </header>
  );
};

const loggedInLinks = (user: object) => {
  return (
    <>
      <p>
        Welcome,{" "}
        <a className={styles.user} href="/">
          {user}
        </a>
      </p>
      <div>
        <a className={styles.home} href={ROUTES.HOMEPAGE}>
          Home
        </a>
        <button className={styles.signOut}>Sign Out</button>
      </div>
    </>
  );
};

export default Header;
