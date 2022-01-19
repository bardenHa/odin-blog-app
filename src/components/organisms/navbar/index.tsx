import { useContext } from "react";
import styles from "./navbar.module.css";
import ThemeToggle from "components/atoms/theme-toggle";
import Loader from "components/atoms/loader";
import AuthContext from "components/context/AuthContext";
import * as ROUTES from "constants/routes";
import { Link } from "react-router-dom";
interface user {
  email: string;
  first_name: string;
  last_name: string;
  username: string;
  token: string;
}

const Header = () => {
  const { user, refreshing, logoutUser } = useContext(AuthContext);

  const handleLogout: () => void = async () => {
    await logoutUser();
  };

  return (
    <header className={styles.header}>
      <div className={styles.linkContainer}>
        {user ? (
          loggedInLinks(user, handleLogout)
        ) : refreshing ? (
          <div className={styles.loadingUser}>
            <span>Loading</span>
            <Loader />
          </div>
        ) : (
          loggedOutLinks()
        )}
      </div>
      <ThemeToggle />
    </header>
  );
};

const loggedInLinks = (user: user, handleLogout: () => void) => {
  return (
    <>
      <div className={styles.userContainer}>
        <p className={styles.welcome}>
          Welcome,{" "}
          <Link to={`user/${user.username}`} className={styles.user}>
            {user.username}
          </Link>
        </p>
        <Link to={`user/${user.username}`}>
          <UserIcon />
        </Link>
      </div>
      <div>
        <a className={styles.home} href={ROUTES.HOMEPAGE}>
          Home
        </a>
        <button className={styles.signOut} onClick={handleLogout}>
          Sign Out
        </button>
      </div>
    </>
  );
};

const loggedOutLinks = () => {
  return (
    <div>
      <a className={styles.home} href={ROUTES.HOMEPAGE}>
        Home
      </a>
      <a href={ROUTES.SIGNIN}>Sign In</a>
    </div>
  );
};

export default Header;

const UserIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={styles.userIcon}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
};
