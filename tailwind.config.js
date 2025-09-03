/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#c01d2e",
        inputBg: "#e8f2f6",
        textColor: "#748aa1",
        titleColor: "#122233",
      },
      fontFamily: {
        sans: ["FunnelDisplay", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
