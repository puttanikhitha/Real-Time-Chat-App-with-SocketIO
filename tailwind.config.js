/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        Blue: '#86b6f7',     // soft blue #dbeafe
        Purple: '#d3b6f2',   // soft purple #e9d5ff
        softPink: '#f2b9ae',      // soft peach-pink #fcd5ce
      },
    },
  },
  plugins: [],
}
