import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import * as ROUTES from "constants/routes";
import { AuthProvider } from "components/context/AuthContext";

import styles from "./app.module.css";
import Header from "components/organisms/navbar";
import SuspenseLoader from "components/organisms/suspense-loader";

const Signin = lazy(() => import("./pages/sign-in"));
const Signup = lazy(() => import("./pages/sign-up"));
const Home = lazy(() => import("./pages/home"));
const Profile = lazy(() => import("./pages/profile"));
const Article = lazy(() => import("./pages/article"));

export default function App() {
  return (
    <main className={styles.main}>
      <Router>
        <AuthProvider>
          <Header />
          <Suspense fallback={<SuspenseLoader />}>
            <Routes>
              <Route path={ROUTES.SIGNIN} element={<Signin />} />
              <Route path={ROUTES.SIGNUP} element={<Signup />} />
              <Route path={ROUTES.HOMEPAGE} element={<Home />} />
              <Route path={ROUTES.PROFILE} element={<Profile />} />
              <Route path={ROUTES.ARTICLE} element={<Article />} />
            </Routes>
          </Suspense>
        </AuthProvider>
      </Router>
    </main>
  );
}
