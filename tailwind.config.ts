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
        obsidian: {
          DEFAULT: "#0F0F11",
          950: "#08080A",
          900: "#0F0F11",
          850: "#141518",
          800: "#1A1B20",
        },
        slate: {
          surface: "#1C1D21",
          card: "#222329",
          hover: "#292B33",
          border: "#2D2F36",
          lightBorder: "#3E424C",
        },
        bonewhite: {
          DEFAULT: "#F3F3F5",
          pure: "#FFFFFF",
          muted: "#9FA3B0",
          dim: "#6B7280",
        },
        rhinogold: {
          DEFAULT: "#C5A880",
          light: "#DFCAAB",
          dark: "#9E825D",
          glow: "rgba(197, 168, 128, 0.15)",
        },
        gunmetal: {
          DEFAULT: "#4A5568",
          dark: "#2D3748",
          light: "#718096",
        },
        matred: {
          DEFAULT: "#E53E3E",
          dark: "#C53030",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "-apple-system", "sans-serif"],
        display: ["var(--font-display)", "Impact", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      letterSpacing: {
        tactical: "0.2em",
        ultra: "0.3em",
      },
      backgroundImage: {
        "weave-pattern": "radial-gradient(rgba(197, 168, 128, 0.08) 1px, transparent 0)",
      },
    },
  },
  plugins: [],
};
export default config;
