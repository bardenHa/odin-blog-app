const forms = require("@tailwindcss/forms");
const lineClamp = require("@tailwindcss/line-clamp");
const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  darkMode: "class",
  mode: "jit",
  purge: ["./*.html", "./src/**/*.{css}"],
  plugins: [forms, lineClamp],
  theme: {
    extend: {
      colors: {
        "light-text": "#1D1D1D",
        "light-theme": "#FFFFFF",
        "dark-text": "#F3F3F3",
        "dark-theme": "#111827",
        primary: "#3b81f5",
      },
      fontFamily: {
        ...fontFamily,
        sans: ["Inter", "system-ui"],
      },
    },
  },
};
