/* eslint-disable global-require */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        darkblue: "#00157b",
        maroon: "#8c1a19",
      },
      fontFamily: {
        sans: ["Prompt", "Helvetica", "Arial", "sans-serif"],
      },
    },
  },
  variants: {
    borderWidth: ["last"],
  },
  daisyui: {
    styled: true,
    base: true,
    themes: [
      "light",
      "dark",
      // {
      //   bcc: {
      //     primary: "#1e40af",
      //     secondary: "#831843",
      //     accent: "#374151",
      //     neutral: "#f3f4f6",
      //     "base-100": "#FFFFFF",
      //     info: "#bae6fd",
      //     success: "#15803d",
      //     warning: "#FBBD23",
      //     error: "#dc2626",
      //   },
      // },
    ],
  },
  plugins: [require("@tailwindcss/forms"), require("daisyui")],
};
