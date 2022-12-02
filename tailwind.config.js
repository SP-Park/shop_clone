/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{jsx,js}"],
  theme: {
    extend: {
      colors: {
        brand: '#4682B4'
      },
      backgroundImage: {
        banner: `url('../public/image/banner.jpg')`
      }
    },
  },
  plugins: [],
}
