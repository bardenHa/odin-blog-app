import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "app/app";
import { ThemeProvider } from "components/context/themeContext";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
