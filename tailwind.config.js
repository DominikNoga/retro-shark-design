/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'ocean-deep': '#0a1929',
        'ocean-dark': '#0d2840',
        'ocean-mid': '#134e6f',
        'ocean-light': '#1a6b94',
        'ocean-surface': '#e6f0fa',
        'ocean-foam': '#f0f8ff',
      },
      fontFamily: {
        display: ['Quicksand', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
