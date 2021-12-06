import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import * as ROUTES from "constants/routes";

import styles from "./app.module.css";

const Signin = lazy(() => import("./pages/sign-in"));
const Signup = lazy(() => import("./pages/sign-up"));
const Home = lazy(() => import("./pages/home"));

export default function App() {
  return (
    <main className={styles.main}>
      <Router>
        <Suspense fallback={<p>Loading...</p>}>
          <Routes>
            <Route path={ROUTES.SIGNIN} element={<Signin />} />
            <Route path={ROUTES.SIGNUP} element={<Signup />} />
            <Route path={ROUTES.HOMEPAGE} element={<Home />} />
          </Routes>
        </Suspense>
      </Router>
    </main>
  );
}
