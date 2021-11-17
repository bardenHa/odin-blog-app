import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "app/app";
import { ThemeProvider } from "components/context/themeContext";
import ThemeToggle from "components/atoms/theme-toggle";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <ThemeToggle />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
