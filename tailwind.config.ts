import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "#050505",
        ink: "#0a0a0c",
        gold: "#d9a441",
        "gold-bright": "#f3cd7a",
        royal: "#5b2a86",
        "royal-deep": "#2a123f",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        luxe: "0.35em",
      },
    },
  },
  plugins: [],
};

export default config;
