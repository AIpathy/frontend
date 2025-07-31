/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  safelist: [
    'bg-gradient-to-r',
    'from-[#265d5c]',
    'via-[#1c1c1e]',
    'to-[#265d5c]',
    'from-[#ececec]',
    'to-[#e0e7ef]',
    'from-indigo-900',
    'to-green-700',
    // Diğer gradient ve renk class'larınız varsa buraya ekleyin
  ],
  theme: {
    extend: {
      colors: {
        primary: '#265d5c',       // Logonun yeşili
        primaryDark: '#1f4d4c',   // Hover rengi
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
}