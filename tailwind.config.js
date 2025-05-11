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
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'primary': '#00b8d4',
        'primary-dark': '#0a2222',
        'primary-light': '#00e0ff',
        'accent': '#ffc400',
        'accent-dark': '#c79400',
        'dark': '#051215',
        'dark-surface': '#0d232b',
        'warm': {
          50: '#f9f5f0',
          100: '#f3ebe1',
          200: '#e9dbcb',
          300: '#d9c2a9',
          400: '#c6a687',
          500: '#b58b67'
        }
      },
      backgroundColor: {
        skin: {
          base: 'var(--color-background, #f9f5f0)'
        }
      }
    },
  },
  plugins: [],
} 