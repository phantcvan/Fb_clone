/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      "fb-blue": "#1A6ED8",
      "blue-100": "#E7F3FF",
      "blue-200": "#DBE7F2",
      "blue-300": "#21ADFB",
      "blue-400": "#1B74E4",
      "gray-100": "#F0F2F5",
      "fb-gray": "#E4E6E9",
      "fb-dark": "#DADDE1",
      "fb-dark-2": "#3C3C3C",
      "fb-gray-text": "#65676B",
      white: "#FFFFFF",
      red: "#E41E3F",
      green: "#42B72A",
      black: "#050505",
      "overlay-40": "rgba(252,252,253,0.4)",
    },
    extend: {},
  },
  plugins: [],
};
