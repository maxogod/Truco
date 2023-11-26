/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary": "#6282A3",
        "secondary": "#302F2F",
        "background": "#152323",
        "text": "#F5F2F0",
      },
      boxShadow: {
        "card": "4px 4px 3px 3px rgba(0, 0, 0, 0.5)",
      },
    },
  },
  plugins: [],
};
