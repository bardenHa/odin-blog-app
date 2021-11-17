const forms = require("@tailwindcss/forms");

module.exports = {
  darkMode: "class",
  mode: "jit",
  purge: ["./*.html", "./src/**/*.{css}"],
  plugins: [forms],
  theme: {
    extend: {
      colors: {
        "light-text": "#1D1D1D",
        "light-theme": "#FFFFFF",
        "dark-text": "#F3F3F3",
        "dark-theme": "#111827",
      },
    },
  },
};
