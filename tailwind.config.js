/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gold: "#FFD700",
        dark: "#0B0B0B",
        glass: "rgba(255,255,255,0.05)",
      },
      fontFamily: {
        luxury: ['"Playfair Display"', "serif"],
        modern: ['"Poppins"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
