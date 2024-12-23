export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        accent: {
          100: "#5E5E5E",
          200: "FFFFFF",
        },
      },
      lineClamp: {
        2: "2",
      },
      fontFamily: {
        "youtube-sans": ["Youtube Sans", "sans serif"],
      },
    },
  },
  plugins: [],
};
