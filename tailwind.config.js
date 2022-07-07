/** @type {import('tailwindcss').Config} */

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
    },
  },
  plugins: [],
};
