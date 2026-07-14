import type { Config } from "tailwindcss";

/**
 * Brand hex values below were extracted by eye from the 813BNB logo image
 * shared in chat (house-pin icon + "813" roundel + "BNB" wordmark), not
 * pixel-sampled from the source file. Treat as provisional until confirmed
 * with a color picker against the original logo asset — see CONTENT-TODO.md.
 */
const brand = {
  teal: {
    50: "#EEF5F6",
    100: "#D6E7E9",
    200: "#AECED2",
    300: "#82B2B8",
    400: "#569399",
    500: "#387680",
    600: "#2C6E7F", // primary brand teal
    700: "#255B69",
    800: "#1E4750",
    900: "#173539",
  },
  orange: {
    50: "#FDF3E9",
    100: "#FAE1C3",
    200: "#F4C68C",
    300: "#EEAA5C",
    400: "#E5983F",
    500: "#E08A3C", // primary brand orange
    600: "#C4762F",
    700: "#9C5D24",
    800: "#74451B",
    900: "#4C2E12",
  },
};

export const brandColors = brand;

const preset: Partial<Config> = {
  darkMode: ["selector", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        teal: brand.teal,
        orange: brand.orange,
        brand: {
          teal: brand.teal[600],
          "teal-dark": brand.teal[800],
          orange: brand.orange[500],
          "orange-dark": brand.orange[700],
        },
        charcoal: {
          50: "#F7F6F4",
          100: "#EDEBE7",
          200: "#D9D5CE",
          300: "#B8B2A7",
          400: "#8C8478",
          500: "#645D53",
          600: "#4A443C",
          700: "#38332D",
          800: "#282520",
          900: "#1B1815",
        },
        warmwhite: "#FAF8F5",
        page: "var(--color-page-bg)",
        surface: "var(--color-surface)",
        "surface-2": "var(--color-surface-2)",
      },
      fontFamily: {
        display: ['"Fraunces"', "ui-serif", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
      },
      borderRadius: {
        s: "8px",
        m: "14px",
        l: "22px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(27, 24, 21, 0.06), 0 4px 16px rgba(27, 24, 21, 0.06)",
        "card-lg": "0 8px 24px rgba(27, 24, 21, 0.10), 0 2px 6px rgba(27, 24, 21, 0.06)",
      },
      container: {
        center: true,
        padding: "1.5rem",
      },
    },
  },
  plugins: [],
};

export default preset;
