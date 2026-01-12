/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: "#FCF1DE",
          text: "#E14C4A",
          accent: "#BD3125",
          white: "#FFFFFF",
        }
      },
      fontFamily: {
        brand: ["Poppins", "sans-serif"],
        logo: ["Pacifico", "cursive"],
      }
    },
  },
  plugins: [],
}
