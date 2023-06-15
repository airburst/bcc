/* eslint-disable import/no-extraneous-dependencies */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { fontFamily } = require("tailwindcss/defaultTheme");
// const bcc = require("./src/themes/bcc.cjs");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const club = require("./src/themes/shrewsbury.cjs");

/* eslint-disable global-require */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-outfit)", ...fontFamily.sans],
      },
    },
  },
  variants: {
    borderWidth: ["last"],
  },
  daisyui: {
    themes: [{ club }, "dark"],
  },
  plugins: [require("@tailwindcss/forms"), require("daisyui")],
};
