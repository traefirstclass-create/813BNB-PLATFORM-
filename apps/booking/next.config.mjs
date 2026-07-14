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
  // Vercel's serverless file tracer doesn't discover Prisma's native
  // query-engine binary on its own in this pnpm monorepo, so every
  // DB-touching route 500s in production with "could not locate the Query
  // Engine for runtime rhel-openssl-3.0.x". Fix verified locally by
  // inspecting the actual .next/server/**/*.nft.json trace output — a
  // recursive "**" glob into node_modules/.pnpm crashes the build with an
  // OOM (it tries to enumerate the entire store), so this uses a single
  // non-recursive wildcard at just the version-hash path segment instead,
  // which stays resilient to Prisma version bumps without the blow-up.
  // outputFileTracingRoot must stay under `experimental` for this Next
  // version — moving it top-level silently no-ops with a config warning.
  // See CONTENT-TODO.md.
  experimental: {
    outputFileTracingRoot: monorepoRoot,
    outputFileTracingIncludes: {
      "/**": [
        "../../node_modules/.pnpm/@prisma+client@*/node_modules/.prisma/client/*",
      ],
    },
  },
};

export default nextConfig;
