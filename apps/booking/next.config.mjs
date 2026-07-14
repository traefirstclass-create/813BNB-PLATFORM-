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
  // Fixes the monorepo's relative-path resolution for Vercel's serverless
  // file tracer. Combined with generating the Prisma client into a plain
  // directory (packages/db/src/generated/prisma, see schema.prisma) instead
  // of leaving it in pnpm's nested virtual store, this ensures the native
  // query-engine binary actually ships with the deployed function — without
  // it, every DB-touching route 500s in production with "could not locate
  // the Query Engine for runtime ...". See CONTENT-TODO.md.
  experimental: {
    outputFileTracingRoot: monorepoRoot,
    outputFileTracingIncludes: {
      "/**": ["./packages/db/src/generated/prisma/**/*"],
    },
  },
};

export default nextConfig;
