import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          green: "#019147",
        },
        accent: {
          pink: "#FF3B6D",
          orange: "#FF9822",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      boxShadow: {
        'card': '0 8px 32px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 12px 48px rgba(0, 0, 0, 0.12)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
