/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#202C39",
        secondary: "#EBEBEB",
        accent: "#4CAF50",
      },
      fontFamily: {
        Koulen: "Koulen",
        NotoSans: "NotoSans",
      },
    },
  },
  plugins: [],
};
