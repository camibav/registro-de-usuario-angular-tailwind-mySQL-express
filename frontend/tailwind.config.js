/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto_condensed: ['Roboto Condensed', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
