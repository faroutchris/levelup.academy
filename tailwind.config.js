const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', ...defaultTheme.fontFamily.sans],
        serif: ['DM Serif Display', ...defaultTheme.fontFamily.serif],
      },
      backgroundImage: {
        hero: "url('/hero-bg.png')",
        'hero-img': "url('/documentation.png')",
      },
      colors: {
        subtle: '#f7f7fc',
        sapphire: {
          50: '#f3f8fc',
          100: '#ebf4f9',
          200: '#d3e7f3',
          300: '#abd0e7',
          400: '#7cb6da',
          500: '#4497ca',
          600: '#2f79a7',
          700: '#255f85',
          800: '#1e4e6b',
          900: '#1c4863',
        },
        sienna: {
          50: '#fbf4f5',
          100: '#f9f1f2',
          200: '#f2dee2',
          300: '#e4bec4',
          400: '#d79da7',
          500: '#c57280',
          600: '#b54a5c',
          700: '#8d3a48',
          800: '#742f3b',
          900: '#6d2c37',
        },
        cardinal: {
          50: '#fdf7f8',
          100: '#fceef0',
          200: '#f8dde1',
          300: '#f1bbc3',
          400: '#e995a2',
          500: '#df6275',
          600: '#d42b45',
          700: '#c5283d',
          800: '#871c2c',
          900: '#7f1a29',
        },
        burn: {
          50: '#fdf1ed',
          100: '#fcede8',
          200: '#f9dbd2',
          300: '#f4baa9',
          400: '#ef967b',
          500: '#e66037',
          600: '#e9724c',
          700: '#c84219',
          800: '#9a3313',
          900: '#7f2a10',
        },
        yellah: {
          50: '#fff5e0',
          100: '#fff0d1',
          200: '#ffdd99',
          300: '#ffbd38',
          400: '#ffc857',
          500: '#eb9c00',
          600: '#bd7e00',
          700: '#996600',
          800: '#754e00',
          900: '#614100',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
