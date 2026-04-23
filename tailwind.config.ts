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
          "red-dark": "#b8141b",
          "red-soft": "#ff3d45",
          black: "#141414",
          "black-soft": "#1c1c1c",
        },
        ink: {
          DEFAULT: "#141414",
          90: "#1f1f1f",
          80: "#2a2a2a",
          70: "#3D3D3D",
          50: "#6B6B6B",
          30: "#A3A3A3",
          10: "#E6E6E8",
          5: "#F3F3F4",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          soft: "#F6F6F7",
          sunken: "#EFEFF1",
        },
        cream: "#FFFFFF",
        ivory: "#FFFFFF",
        muted: {
          DEFAULT: "#6B6B6B",
          foreground: "#6B6B6B",
        },
        border: "#E6E6E8",
        gold: "#e81d25",
        background: "#FFFFFF",
        foreground: "#141414",
        input: "#E6E6E8",
        ring: "#e81d25",
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
        display: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-playfair)", "Georgia", "serif"],
      },
      borderRadius: {
        lg: "12px",
        md: "8px",
        sm: "4px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(20, 20, 20, 0.04)",
        "card-hover": "0 20px 40px -12px rgba(20, 20, 20, 0.18)",
        "red-glow": "0 10px 40px -10px rgba(232, 29, 37, 0.55)",
        "red-glow-lg": "0 20px 60px -12px rgba(232, 29, 37, 0.45)",
        "deep": "0 30px 60px -20px rgba(20, 20, 20, 0.35)",
        "inset-line": "inset 0 -1px 0 0 rgba(232, 29, 37, 0.25)",
      },
      letterSpacing: {
        tightest: "-0.04em",
        tighter: "-0.02em",
      },
      backgroundImage: {
        "red-gradient": "linear-gradient(135deg, #e81d25 0%, #b8141b 100%)",
        "red-radial": "radial-gradient(ellipse at top, rgba(232, 29, 37, 0.25) 0%, transparent 60%)",
        "dark-gradient": "linear-gradient(180deg, #141414 0%, #1c1c1c 100%)",
        "dark-to-red": "linear-gradient(135deg, #141414 0%, #e81d25 100%)",
        "grid-pattern": "linear-gradient(rgba(232, 29, 37, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(232, 29, 37, 0.08) 1px, transparent 1px)",
        "noise": "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.25'/%3E%3C/svg%3E\")",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0", transform: "translateY(6px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(24px)" },
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
        "marquee-slow": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "pulse-red": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(232, 29, 37, 0.5)" },
          "50%": { boxShadow: "0 0 0 12px rgba(232, 29, 37, 0)" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.96)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.5s ease-out",
        "fade-up": "fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
        "slide-in-right": "slide-in-right 0.3s ease-out",
        "marquee": "marquee 30s linear infinite",
        "marquee-slow": "marquee-slow 60s linear infinite",
        "pulse-red": "pulse-red 2s infinite",
        "shimmer": "shimmer 2.5s linear infinite",
        "scale-in": "scale-in 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
        "float": "float 4s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
