/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sand: {
          50:  '#fdf8f2',
          100: '#faefd8',
          200: '#f5deb5',
          300: '#eec98a',
          400: '#e6b060',
          500: '#d9943a',
        },
        coral: {
          400: '#f87060',
          500: '#ea5a40',
          600: '#c2401c',
        },
        seafoam: {
          DEFAULT: '#2a9d8f',
          light:   '#52b2a6',
          dark:    '#1f7a6e',
        },
      },
      fontFamily: {
        sans:    ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease forwards',
        'spin-slow':  'spin 4s linear infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
