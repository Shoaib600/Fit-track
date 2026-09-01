import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0A0A0A",
        surface: "#141414",
        "surface-2": "#1C1C1C",
        border: "#2A2A2A",
        accent: "#22C55E",
        "accent-soft": "rgba(34, 197, 94, 0.15)",
        ink: "#0A0A0A",
        "text-primary": "#F5F5F5",
        "text-secondary": "#A3A3A3",
        "text-muted": "#737373",
      },
    },
  },
  plugins: [],
};
export default config;
