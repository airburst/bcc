/* eslint-disable global-require */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Prompt", "Helvetica", "Arial", "sans-serif"],
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
          info: "#bae6fd",
          success: "#15803d",
          "success-content": "#ffffff",
          warning: "#FBBD23",
          error: "#dc2626",
          "error-content": "#ffffff",
        },
      },
      "dark",
    ],
  },
  plugins: [require("@tailwindcss/forms"), require("daisyui")],
};
