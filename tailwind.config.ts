import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: { "2xl": "1280px" },
    },
    extend: {
      colors: {
        // Direct palette tokens
        paper: "hsl(var(--paper))",
        "paper-deep": "hsl(var(--paper-deep))",
        "paper-light": "hsl(var(--paper-light))",
        ink: "hsl(var(--ink))",
        "ink-soft": "hsl(var(--ink-soft))",
        rule: "hsl(var(--rule))",
        terracotta: {
          DEFAULT: "hsl(var(--terracotta))",
          deep: "hsl(var(--terracotta-deep))",
        },
        mustard: "hsl(var(--mustard))",
        olive: "hsl(var(--olive))",
        plum: "hsl(var(--plum))",
        coral: "hsl(var(--coral))",
        ocean: "hsl(var(--ocean))",

        // Legacy shadcn aliases (kept for back-compat)
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        sans: ["var(--font-body)", "ui-sans-serif", "system-ui"],
        display: ["var(--font-display)", "ui-sans-serif", "system-ui"],
        hand: ["var(--font-hand)", "cursive"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 4px)",
        sm: "calc(var(--radius) - 6px)",
      },
      boxShadow: {
        stamp: "3px 3px 0 hsl(var(--ink))",
        "stamp-lg": "5px 5px 0 hsl(var(--ink))",
        "stamp-sm": "1px 1px 0 hsl(var(--ink))",
        paper:
          "0 1px 0 hsl(var(--rule) / 0.6), 0 2px 0 -1px hsl(var(--ink) / 0.05), 0 12px 24px -16px hsl(var(--ink) / 0.18)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "dialog-fade": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "dialog-pop": {
          "0%": { opacity: "0", transform: "translateY(10px) scale(0.96)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        wobble: {
          "0%, 100%": { transform: "rotate(-1deg)" },
          "50%": { transform: "rotate(1deg)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s cubic-bezier(0.22, 1, 0.36, 1) both",
        "dialog-fade": "dialog-fade 0.18s ease-out both",
        "dialog-pop": "dialog-pop 0.22s cubic-bezier(0.34, 1.56, 0.64, 1) both",
        wobble: "wobble 3s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
