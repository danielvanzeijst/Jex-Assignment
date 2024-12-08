/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,ts}',
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#EC6828",
        "secondary": "#CBC5E6",
        "background": "#F4F1F9"
      },
      fontFamily: {
        oswald: ["Oswald", "sans-serif"],
        quattrocento: ["Quattrocento", "serif"],
      }
    },
  },
  plugins: [],
}
