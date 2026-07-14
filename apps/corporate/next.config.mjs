import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const monorepoRoot = path.join(__dirname, "../..");

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@813bnb/ui", "@813bnb/db"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  // See apps/booking/next.config.mjs for why this is needed — same fix,
  // same pnpm-monorepo Prisma-engine-binary bundling issue.
  outputFileTracingRoot: monorepoRoot,
  experimental: {
    outputFileTracingIncludes: {
      "/**/*": [
        "./node_modules/.pnpm/**/node_modules/.prisma/client/**/*",
        "./node_modules/.prisma/client/**/*",
      ],
    },
  },
};

export default nextConfig;
