/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/*.{html,ts}",
    "./src/app/*.{html, ts}",
    "./src/app/**/**/*.{html, ts}"
  ],
  theme: {
    extend: {
      screens:{
        xs: '400px'
      }
    },
  },
  plugins: [],
}
