import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.25rem",
        lg: "2rem",
      },
      screens: {
        "2xl": "1320px",
      },
    },
    extend: {
      colors: {
        brand: {
          red: "#e81d25",
          black: "#141414",
        },
        ink: {
          DEFAULT: "#141414",
          70: "#3D3D3D",
          50: "#6B6B6B",
          30: "#A3A3A3",
          10: "#E6E6E8",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          soft: "#F6F6F7",
          sunken: "#EFEFF1",
        },
        // legacy aliases kept so earlier components still compile
        cream: "#FFFFFF",
        ivory: "#FFFFFF",
        muted: {
          DEFAULT: "#6B6B6B",
          foreground: "#6B6B6B",
        },
        border: "#E6E6E8",
        gold: "#141414",
        // shadcn semantic aliases
        background: "#FFFFFF",
        foreground: "#141414",
        input: "#E6E6E8",
        ring: "#141414",
        primary: {
          DEFAULT: "#141414",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#F6F6F7",
          foreground: "#141414",
        },
        accent: {
          DEFAULT: "#e81d25",
          foreground: "#FFFFFF",
        },
        destructive: {
          DEFAULT: "#e81d25",
          foreground: "#FFFFFF",
        },
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#141414",
        },
        popover: {
          DEFAULT: "#FFFFFF",
          foreground: "#141414",
        },
      },
      fontFamily: {
        display: ["var(--font-inter)", "system-ui", "sans-serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-playfair)", "Georgia", "serif"],
      },
      borderRadius: {
        lg: "12px",
        md: "8px",
        sm: "4px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(10, 10, 10, 0.04)",
        "card-hover": "0 12px 28px -10px rgba(10, 10, 10, 0.15)",
      },
      letterSpacing: {
        tightest: "-0.03em",
        tighter: "-0.02em",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0", transform: "translateY(6px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-right": {
          from: { transform: "translateX(100%)" },
          to: { transform: "translateX(0)" },
        },
        "marquee": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.4s ease-out",
        "slide-in-right": "slide-in-right 0.3s ease-out",
        "marquee": "marquee 30s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
