/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  safelist: [
    'bg-gradient-to-r',
    'from-[#3CB97F]',
    'via-[#1c1c1e]',
    'to-[#3CB97F]',
    'from-[#ececec]',
    'to-[#e0e7ef]',
    'from-indigo-900',
    'to-green-700',
    // Diğer gradient ve renk class'larınız varsa buraya ekleyin
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
}