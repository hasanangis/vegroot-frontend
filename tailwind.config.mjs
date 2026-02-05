/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)'],
        serif: ['var(--font-playfair)'],
      },
      colors: {
        vegroot: {
          dark: '#2D3A30',
          green: '#4A6741',
          cream: '#FDFBF7',
          gold: '#C5A065',
        }
      }
    },
  },
  plugins: [],
};