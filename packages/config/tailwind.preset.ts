import type { Config } from "tailwindcss";

/**
 * Brand hex values below were pixel-sampled directly from the source logo
 * file (813BNBLOGO.png — see packages/ui/assets/logo.png) by averaging the
 * solid-fill pixels of the pin/roof and the "BNB" wordmark, excluding
 * background and outline pixels. teal-600 (#177189) and orange-500
 * (#E48727) are the exact sampled anchors; the rest of each ramp is
 * generated from those anchors at fixed HSL lightness steps.
 */
const brand = {
  teal: {
    50: "#E9F8FB",
    100: "#CBEDF6",
    200: "#96DBED",
    300: "#5DC8E4",
    400: "#24B0D6",
    500: "#1C89A6",
    600: "#177189", // primary brand teal (exact pixel sample)
    700: "#125A6D",
    800: "#0E4453",
    900: "#0A2F39",
  },
  orange: {
    50: "#FCF0E4",
    100: "#F6D7B6",
    200: "#EDB172",
    300: "#E79541",
    400: "#E48625",
    500: "#E48727", // primary brand orange (exact pixel sample)
    600: "#C77219",
    700: "#9F5A14",
    800: "#7A460F",
    900: "#522E0A",
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
