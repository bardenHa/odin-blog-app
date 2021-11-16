const forms = require("@tailwindcss/forms");

module.exports = {
  darkMode: "class",
  mode: "jit",
  purge: ["./*.html", "./src/**/*.{css}"],
  plugins: [forms],
};
