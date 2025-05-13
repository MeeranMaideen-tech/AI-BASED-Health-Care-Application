/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/components/userportal/**/*.{js,jsx,ts,tsx}",
    "./src/components/medicalteam portal/**/*.{js,jsx,ts,tsx}",  // ✅ Add this line
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
