/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        colorButton: "#0093FB",
        textcolor: "#1D52FA",
      },
    },
  },
  plugins: [],
};
