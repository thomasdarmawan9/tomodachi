import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "var(--font-sans)", "system-ui", "sans-serif"]
      },
      colors: {
        brand: {
          50: "#f1f7ff",
          100: "#e0edff",
          200: "#c2d9ff",
          300: "#9cbfff",
          400: "#739aff",
          500: "#4b72f6",
          600: "#3156d4",
          700: "#2642aa",
          800: "#1f3688",
          900: "#1d306f"
        }
      },
      boxShadow: {
        card: "0 8px 24px rgba(21, 40, 82, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
