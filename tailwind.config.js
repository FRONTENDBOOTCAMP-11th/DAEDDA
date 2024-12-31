/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        "screen-320": { max: "320px" },
        "screen-340": { max: "340px" },
        "screen-360": { max: "360px" },
        "screen-375": { max: "375px" },
        "screen-400": { max: "400px" },
        "screen-425": { max: "425px" },
        "screen-530": { max: "530px" },
      },
      fontFamily: {
        pre: ["Pretendard"],
      },
      boxShadow: {
        "custom-shadow":
          "-1px -1px 16px rgba(238, 238, 238, 1), 3px 3px 18px rgba(170, 170, 170, 0.5)",
      },
      colors: {
        white: "#FFFFFF",
        black: "#222222",
        red: "#FF0000",
        primary: "#8C6FEE",
        secondary: "#BCA6F4",
        "purple-50": "#F6EAFE",
        "purple-100": "#EBD5FE",
        "purple-900": "#6123FF",
        "beige-500": "#CDC3C3",
        "gray-200": "#D9D9D9",
        "gray-300": "#999999",
        "gray-500": "#555555",
        "yellow-100": "#FEE500",
      },
    },
  },
  plugins: [],
};
