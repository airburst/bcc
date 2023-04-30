/* eslint-disable import/no-extraneous-dependencies */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { fontFamily } = require("tailwindcss/defaultTheme");

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
    themes: [
      {
        bcc: {
          primary: "#1e40af",
          "primary-content": "#ffffff",
          secondary: "#831843",
          "secondary-content": "#ffffff",
          accent: "#374151",
          "accent-content": "#ffffff",
          neutral: "#e5e7eb",
          "base-100": "#FFFFFF",
          info: "#3b82f6",
          "info-content": "#ffffff",
          success: "#15803d",
          "success-content": "#ffffff",
          warning: "#FBBD23",
          error: "#b91c1c",
          "error-content": "#ffffff",
        },
      },
      "dark",
    ],
  },
  plugins: [require("@tailwindcss/forms"), require("daisyui")],
};
