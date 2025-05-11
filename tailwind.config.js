module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // adjust path based on your structure
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extends: {
      keyframes: {
        "slide-in": {
          "0%": { transform: "translateX(100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        "slide-out": {
          "100%": { transform: "translateX(100%)", opacity: "0" },
          "0%": { transform: "translateX(0)", opacity: "1" },
        },
      },
      animation: {
        "slide-in": "slide-in 0.3s ease-out",
        "slide-out": "slide-out 0.3s ease-in",
      },
    },
  },
  plugins: [],
};
