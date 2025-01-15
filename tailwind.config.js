/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/.stories/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0, transform: "translateY(-10px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        fadeOut: {
          "0%": { opacity: 1, transform: "translateY(0)" },
          "100%": { opacity: 0, transform: "translateY(-10px)" },
        },
        slide: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.7s ease-in-out",
        fadeOut: "fadeOut 0.7s ease-in-out",
        slide: "slide 15s linear infinite",
      },
    },
    minHeight: {
      screen: "100svh",
    },
    height: {
      screen: "100svh",
    },
    colors: {
      primary: "#006F01",
      secondary: "#F0FCF1",
      tertiary: "#FF6D00",
      danger: "#FF0000",
      "light-orange": "#FFF1E6",
      "primary-dark": "#121212",
      "gray-text": "#656565",
      "gray-light": "#d9d9d9",
      gray: {
        100: "#E8E8E8",
      },
      white: "#fff",
      black: "#000",
    },
    fontFamily: {
      "inter-black": ["inter-black"],
      "inter-bold": ["inter-bold"],
      "inter-semibold": ["inter-semibold"],
      "inter-extrabold": ["inter-extrabold"],
      "inter-medium": ["inter-medium"],
      "inter-extralight": ["inter-extralight"],
      "inter-regular": ["inter-regular"],
      "inter-thin": ["inter-thin"],
    },
  },
  plugins: [],
};
