/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#050505',
        surface: '#121212',
        primary: {
          DEFAULT: '#8B5CF6',
          hover: '#7C3AED',
          glow: 'rgba(139, 92, 246, 0.25)',
        },
        text: {
          main: '#F9FAFB',
          muted: '#9CA3AF',
        }
      },
      boxShadow: {
        'glass': '0 4px 30px rgba(0, 0, 0, 0.6)',
        'glow': '0 0 25px rgba(139, 92, 246, 0.3)',
      }
    },
  },
  plugins: [],
}
