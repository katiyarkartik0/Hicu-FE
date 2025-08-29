/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "grey-18": "rgb(24, 24, 24)",
        "grey-2c": "rgb(44, 45, 46)",
        "grey-91": "rgb(145, 146, 149)",
        "grey-ef": "rgb(239,240,242)",
        "blue-dd": "rgb(44, 67, 221)",
        "blue-cc": "rgb(204,255,238)",
        "blue-100": "rgb(44, 67, 221)",
        "blue-200": "rgb(26, 44, 162)",
        "blue-300": "rgb(204,255,238)",
        "blue-400": "rgb(30, 50, 184)",
        "grey-100": "rgb(24, 24, 24)",
        "grey-200": "rgb(44, 45, 46)",
      },
    },
  },
  plugins: [],
};
