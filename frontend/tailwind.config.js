/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Outfit', 'sans-serif'],
      },
      colors: {
        primary: '#0ea5e9', // Vibrant Azure
        'primary-dark': '#0284c7',
        accent: '#f59e0b',
        dark: {
          bg: '#0f172a',
          surface: '#1e293b',
          border: '#334155'
        }
      },
      boxShadow: {
        'soft': '0 4px 20px 0 rgba(0,0,0,0.05)',
        'float': '0 10px 40px -10px rgba(0,0,0,0.1)',
        'float-dark': '0 10px 40px -10px rgba(0,0,0,0.5)',
      }
    },
  },
  plugins: [],
}