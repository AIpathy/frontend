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
      // Tailwind 4.1 optimizations
      colors: {
        // Custom color palette optimized for 4.1
        primary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
      },
      // Enhanced spacing for better responsive design
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      // Improved animation utilities
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'bounce-gentle': 'bounceGentle 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
    },
  },
  plugins: [],
  // Tailwind 4.1 performance optimizations
  future: {
    hoverOnlyWhenSupported: true,
  },
} 