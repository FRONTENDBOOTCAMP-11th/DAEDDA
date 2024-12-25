/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{html}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pre: ["Pretendard-Regular"],
      },
      colors: {
        white: "#FFFFFF",
        black: "#222222",
        red: "#FF0000",
        primary: "#8C6FEE",
        secondary: "#BCA6F4",
        "purple-100": "#EBD5FE",
        "purple-900": "#6123FF",
        "beige-500": "#CDC3C3",
        "gray-200": "#D9D9D9",
        "gray-500": "#555555",
      },
    },
  },
  plugins: [],
};
