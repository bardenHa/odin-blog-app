import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import * as ROUTES from "constants/routes";

const Signin = lazy(() => import("./pages/sign-in"));
const Signup = lazy(() => import("./pages/sign-up"));
const Home = lazy(() => import("./pages/home"));

export default function App() {
  return (
    <Router>
      <Suspense fallback={<p>Loading...</p>}>
        <Routes>
          <Route path={ROUTES.SIGNIN} element={<Signin />} />
          <Route path={ROUTES.SIGNUP} element={<Signup />} />
          <Route path={ROUTES.HOMEPAGE} element={<Home />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
