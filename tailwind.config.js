/** @type {import('tailwindcss').Config} */
/*eslint no-undef: "error"*/
/*eslint-env node*/
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
