/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,ts}',
  ],
  theme: {
    extend: {
      colors: {
        "jex-primary": "#2F1E45",
        "jex-secondary": "#00FFF1",
        "jex-background": "#F4F1F9"
      },
      fontFamily: {
        oswald: ["Oswald", "sans-serif"],
        quattrocento: ["Quattrocento", "serif"],
      }
    },
  },
  plugins: [],
}
