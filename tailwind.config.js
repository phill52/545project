/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#FFEEDB",
        darkviolet: "#4C3B4D",
        lightgreen: "#61C9A8",
        lightorange: "#F5C08F",
        brightyellow: "#FFCD1E"
      }
    },
  },
  plugins: [],
};
