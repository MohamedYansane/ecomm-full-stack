import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        sans: ["ui-sans-serif", "system-ui"],
        serif: ["ui-serif", "Georgia"],
        mono: ["ui-monospace", "SFMono-Regular"],
        display: ["Oswald"],
        jetbrain: ["JetBrains Mono"],
        nunito: ["Nunito", "sans-serif"],
        opensans: ["Open Sans", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],

        corben: ["Corben"],
        "red-hat": ["Red Hat Display", "sans-serif"],
      },
      colors: {
        "doctor-blue": "#5073fb",
        primary: "#1565D8",
        dark: {
          hard: "#0D2436",
          soft: "#183B56",
        },
        ecomm: {
          "primary-color": "#ff6b6b",
          "light-text-color": "#7c899a",
          "light-bg-color": "#f2f3f5",
          "border-color": "#e5e8ec",
          "dark-color": "#0a021c",
          "second-color": "#794afa",
        },
        hero: {
          gray: "#5A7184",
          "search-input": "#959EAD",
          primary: "#1565D8",
        },
      },
      screens: {
        my: { min: "309px", max: "450px" },
        lgmy: { min: "1204px", max: "1500px" },
        ipad: { min: "768px", max: "912px" },
        fold: "280px",
        surfaceduo: "540px",
        // => @media (min-width: 640px) { ... }

        laptop: "1024px",
        // => @media (min-width: 1024px) { ... }

        desktop: "1280px",
        // => @media (min-width: 1280px) { ... }
      },
    },
  },
  plugins: [],
};

export default config;
