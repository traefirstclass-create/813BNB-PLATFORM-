import type { Config } from "tailwindcss";
import preset from "@813bnb/config/tailwind.preset";

export default {
  presets: [preset as Config],
  content: [
    "./src/**/*.{ts,tsx}",
    "../../packages/ui/src/**/*.{ts,tsx}",
  ],
} satisfies Config;
