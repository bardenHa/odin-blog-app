import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "app/app";
import { ThemeProvider } from "components/context/themeContext";
import { AuthProvider } from "components/context/AuthContext";
import ThemeToggle from "components/atoms/theme-toggle";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <ThemeToggle />
      <AuthProvider>
        <App />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
