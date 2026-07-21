/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Outfit', 'sans-serif'],
      },
      colors: {
        corporate: {
          50: '#f4f6f8',
          100: '#e0e6ed',
          200: '#c0cadd',
          300: '#9fb3c8',
          400: '#829ab1',
          500: '#627d98',
          600: '#486581',
          700: '#334e68',
          800: '#243b53',
          900: '#0f172a', // Deep Blue/Slate
        },
        primary: '#0284c7', // Vibrant Azure
        'primary-light': '#0ea5e9',
        accent: '#f59e0b',
      },
      boxShadow: {
        'soft': '0 4px 20px 0 rgba(0,0,0,0.05)',
        'float': '0 20px 40px -10px rgba(0,0,0,0.1)',
      }
    },
  },
  plugins: [],
}