/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      "fb-blue": "#1A6ED8",
      "fb-gray-light": "#F0F2F5",
      "fb-gray": "#E4E6E9",
      "fb-gray-dark": "#DADDE1",
      "fb-gray-text": "#65676B",
      "white": "#FFFFFF",
      "red": "#E41E3F",
      "green": "#42B72A",
      "black": "#050505",
      "overlay-40": "rgba(252,252,253,0.4)",
    },
    extend: {},
  },
  plugins: [],
}
