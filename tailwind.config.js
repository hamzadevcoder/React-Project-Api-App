/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        facebook: {
          blue: '#1877F2',
          green: '#42B72A',
        },
        instagram: {
          pink: '#E4405F',
        },
        dark: {
          bg: '#18191A',
          card: '#242526',
          border: '#3A3B3C',
        },
        light: {
          bg: '#F0F2F5',
          card: '#FFFFFF',
          border: '#E4E6EB',
        }
      }
    },
  },
  plugins: [],
}
