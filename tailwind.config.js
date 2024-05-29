/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customColor: {
          theme: '#20062e',
          blue: '#18b2de',
          white: '#fff',
          grey: '#d7d7d7',
          puple_grey: '#8f8297', 
        }
      },
    },
    fontFamily: {
      inter: ["Inter", "sans-serif"],
    }
  },
  plugins: [],
}

