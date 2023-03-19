/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      colors: {
        obr: {
          violet: {
            100: "#5c4a80",
            200: "#725d9e",
            300: "#8970be",
            400: "#a184de",
            500: "#ba99ff",
            600: "#c0a4ff",
            700: "#c7aeff",
            800: "#ceb8ff",
            900: "#d4c3ff",
            DEFAULT: "#ba99ff",
          },
        },
      },
    },
  },
  plugins: [],
};
