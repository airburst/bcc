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
    themes: true,
    base: true,
    themes: ["light", "dark", "emerald"],
  },
  plugins: [require("@tailwindcss/forms"), require("daisyui")],
};
