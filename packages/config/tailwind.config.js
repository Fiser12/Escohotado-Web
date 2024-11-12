const path = require("path");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "../../apps/server/**/*.{js,ts,jsx,tsx}",
    "../../packages/gaudi/**/*.{js,ts,jsx,tsx}",
    "!../../apps/server/node_modules/**",
    "!../../packages/gaudi/node_modules/**",
  ],
  theme: {
    extend: {
      screens: {},
      borderRadius: {
        generic: "3px",
      },
      fontFamily: {
        display: ["Yeseva One", "serif"],
        body: ["Montserrat", "sans-serif"],
        handwritten: ["Escohotado", "cursive"],
      },
      colors: {
        primary: {
          50: "#D4E4EA",
          100: "#B0CFDB",
          200: "#86B7C8",
          300: "#5D9DB3",
          400: "#3084A0",
          500: "#023350",
          900: "#001827",
        },
        gray: {
          light: "#F4F4F4",
          dark: "#939393",
          disabled: "#C2C2C2",
        },
        "bg-light": "#F9F9F9",
      },
      borderWidth: {
        DEFAULT: '1px',
        '0.5': '0.5px',
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
