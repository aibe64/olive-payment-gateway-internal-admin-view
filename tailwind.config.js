/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/.stories/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {},
    minHeight: {
      screen: "100svh",
    },
    height: {
      screen: "100svh",
    },
    colors: {
      primary: "#006F01",
      secondary: "#F0FCF1",
      tertiary: "#FF9D54",
      "light-orange": "#FFF1E6",
      "primary-dark": "#121212",
      "gray-text": "#656565",
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
