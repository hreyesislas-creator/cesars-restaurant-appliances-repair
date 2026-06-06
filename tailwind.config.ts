import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Deep cinematic "black glass" base
        ink: {
          DEFAULT: "#0a0b0d",
          950: "#060708",
          900: "#0a0b0d",
          800: "#101216",
          700: "#171a1f",
          600: "#1f242b",
          500: "#2a3038",
        },
        charcoal: {
          DEFAULT: "#1a1d21",
          900: "#0f1113",
          800: "#1a1d21",
          700: "#262a30",
          600: "#33383f",
        },
        steel: {
          DEFAULT: "#6b7280",
          light: "#9ca3af",
          dark: "#4b5563",
        },
        silver: {
          DEFAULT: "#cbd5e1",
          light: "#e7ebf0",
          dark: "#8b95a5",
          muted: "#6b7480",
        },
        accent: {
          DEFAULT: "#e11d2a",
          dark: "#b3121d",
          light: "#ff3b4a",
          glow: "#ff2a39",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-sora)", "var(--font-inter)", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
      opacity: {
        "8": "0.08",
        "12": "0.12",
        "15": "0.15",
      },
      maxWidth: {
        "8xl": "88rem",
      },
      backgroundImage: {
        "steel-gradient":
          "linear-gradient(135deg, #060708 0%, #101216 45%, #1f242b 100%)",
        "metal-sheen":
          "linear-gradient(120deg, #2a3038 0%, #6b7280 38%, #e7ebf0 50%, #6b7280 62%, #2a3038 100%)",
        "glass-edge":
          "linear-gradient(180deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.02) 40%, rgba(255,255,255,0) 100%)",
        "red-radial":
          "radial-gradient(60% 60% at 50% 0%, rgba(225,29,42,0.35) 0%, rgba(225,29,42,0) 70%)",
        "grid-faint":
          "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
      },
      boxShadow: {
        "glow-red": "0 0 50px -10px rgba(225,29,42,0.55)",
        "glow-red-lg": "0 10px 70px -12px rgba(225,29,42,0.6)",
        glass:
          "inset 0 1px 0 0 rgba(255,255,255,0.08), 0 30px 60px -25px rgba(0,0,0,0.85)",
        "soft-lg": "0 24px 60px -20px rgba(0,0,0,0.55)",
        "card-hover": "0 30px 70px -25px rgba(0,0,0,0.7)",
      },
      animation: {
        "fade-up": "fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) both",
        "fade-in": "fadeIn 0.8s ease-out both",
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
