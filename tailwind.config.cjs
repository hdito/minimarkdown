/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'open-sans': ['open-sans', 'sans-serif'],
        'open-sans-italic': ['open-sans-italic', 'sans-serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
  darkMode: 'class',
};
