/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2BB5FF',
        secondsry: '@EF863E',
      }
    }
  },
  plugins: [],
}