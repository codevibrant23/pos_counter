/** @type {import('tailwindcss').Config} */
import { divider, nextui } from "@nextui-org/react";

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    defaultTheme: "light", // default theme from the themes object
    defaultExtendTheme: "light",
    extend: {
      boxShadow: {
        primary: "0px 4px 4px 0px rgba(255, 102, 0, 0.4)", // or '0px 4px 4px 0px theme("colors.primary.100")'
        "inset-custom": "inset 0px 4px 4px rgba(0, 0, 0, 0.25)", // Adjust opacity as needed
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        default: "#000000",
        divider: "#000000",
        primary: {
          DEFAULT: "#FF6600", // Default primary color
          50: "rgba(255, 102, 0, 0.1)", // lightest rgba
          100: "rgba(255, 102, 0, 0.4)", // medium rgba
          200: "rgba(255, 102, 0, 0.5)", // slightly darker rgba
          300: "#FAAE62", // FA color
          400: "#FF6600", // solid orange
          500: "rgba(255, 102, 0, 1)", // full opacity rgba
          600: "#AD3113", // dark orange
          700: "#C8151C", // deeper red-orange
          800: "rgba(191, 79, 4, 0.8)", // dark rgba
          900: "#BF4F04", // even darker
        },
        secondary: {
          DEFAULT: "#FAAE62",
        },
        accent: {
          DEFAULT: "#FF6600", // Default accent color
        },
        focus: {
          DEFAULT: "#FF6600", // Default accent color
        },
        lightGreen: {
          DEFAULT: "rgba(76, 217, 100, 0.5)",
        },
        green: {
          DEFAULT: "rgba(43, 163, 55, 1)",
        },
        yellow: {
          DEFAULT: "rgba(255, 246, 201, 1)", // Soft yellow/cream color
        },
      },
    },
  },
  // darkMode: "class",
  plugins: [nextui()],
};
