/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        beige: "#F5F5DC", // Màu Beige
        brown: "#8B4513", // Màu Brown
      },
    },
  },
  plugins: [],
};
