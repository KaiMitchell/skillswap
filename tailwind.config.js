/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-green': '#2bfd92',
        'blue-grad': 'from-blue-400 via-blue-500 to-blue-600'
      },
      screens: {
        'xs': '400'
      },
      fontSize: {
        '2xs': '.50rem'
      }
    },
  },
  plugins: [],
}

