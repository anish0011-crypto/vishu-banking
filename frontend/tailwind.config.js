/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
        mono: ['Space Grotesk', 'monospace'],
      },
      colors: {
        background: '#0a0a0a',
        foreground: '#ffffff',
        surface: '#171717',
        'surface-light': '#262626',
        primary: '#4f46e5', // Indigo 600
        'primary-hover': '#4338ca', 
        secondary: '#06b6d4', // Cyan 500
      },
      boxShadow: {
        'bento': '0 4px 24px -4px rgba(0, 0, 0, 0.5)',
        'glow': '0 0 30px rgba(79, 70, 229, 0.2)',
        'glow-strong': '0 0 40px rgba(79, 70, 229, 0.4)',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'slide-up': 'slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}