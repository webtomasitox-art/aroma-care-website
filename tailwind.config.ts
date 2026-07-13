import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        amber: {
          deep: "#3E2A1E",   // ענבר עמוק - טקסט ראשי, כפתור ראשי
          gold: "#B08D57",   // זהב עתיק - מסגרות, נגיעות
        },
        cream: "#F7F1E6",    // קרם רחצה - רקע
        olive: "#6B7457",    // שרביט זית - שימוש חסכני
        charcoal: "#2B2420", // פחם חם - טקסט
      },
      fontFamily: {
        heading: ["var(--font-heading)", "sans-serif"],
        accent: ["var(--font-accent)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
        label: ["'Inter'", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
