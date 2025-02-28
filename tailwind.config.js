/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width: {
        card: "48rem",
        mdcard: "18rem",
        logo:"3rem",
      },
      colors: {
        primary: "#15262d",
        secondary: "#c69546",
      },
      fontFamily: {
        poppins: ["Poppins", 'sans-serif'],
        block:['Sigmar','sans-serif'],
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
    },
  },
  plugins: [],
}

