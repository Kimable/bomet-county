/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Add your custom colors here
        card: "#f3f4f6",
        textColor: "#111827",
        lightText: "#4b5563",
        themeColor: "#0070f3",
        greenColor: "#29CC6A",
        redColor: "#FC5555",
        yellowColor: "#F2C94C",
      },
    },
  },
  plugins: [],
};
