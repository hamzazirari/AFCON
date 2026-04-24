/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#006233',
        secondary: '#C1121C',
        gold: '#FFD700',
        dark: '#0f0f1a',
        card: '#1a1a2e',
      },
      fontFamily: {
        sans: ['Poppins', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
