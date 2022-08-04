/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'v-red': 'rgb(var(--vision-red) / <alpha-value>)',
        'v-red-hover': 'rgb(var(--vision-red-hover) / <alpha-value>)',
        'v-rust': 'rgba(var(--vision-rust) / <alpha-value>)',
        'v-paint': 'rgba(var(--vision-paint) / <alpha-value>)',
        'v-gray': 'rgba(var(--vision-gray) / <alpha-value>)',
      },
      gridTemplateColumns: {
        16: 'repeat(16, minmax(0, 1fr))',
      },
    },
    screens: {
      phone: '320px',
      tablet: '640px',
      // => @media (min-width: 640px) { ... }

      laptop: '1024px',
      // => @media (min-width: 1024px) { ... }

      desktop: '1280px',
      // => @media (min-width: 1280px) { ... }
    },
    fontFamily: {
      'sans-serif': 'Lato',
    },
  },
  plugins: [],
};
