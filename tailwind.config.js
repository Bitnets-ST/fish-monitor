/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue"
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#00b8d4',
        'primary-dark': '#0a2222',
        'primary-light': '#00e0ff',
        'accent': '#ffc400',
        'accent-dark': '#c79400',
        'dark': '#051215',
        'dark-surface': '#0d232b'
      }
    },
  },
  plugins: [],
} 