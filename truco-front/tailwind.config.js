/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary": "rgb(92 124 165)",
        "secondary": "rgb(12 21 41)",
        "background": "rgb(17 24 39)",
        "text": "#F5F2F0",
      },
      boxShadow: {
        "card": "4px 4px 3px 3px rgba(0, 0, 0, 0.5)",
      },
    },
  },
  plugins: [],
};
