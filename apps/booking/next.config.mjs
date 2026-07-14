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
  // Without these, Vercel's serverless bundler doesn't discover Prisma's
  // native query-engine binary in a pnpm monorepo (it's loaded dynamically
  // at runtime, not via a static import the file tracer can follow), and
  // every DB-touching route 500s in production with "could not locate the
  // Query Engine for runtime ...". outputFileTracingRoot fixes the tracer's
  // relative-path resolution across the workspace; outputFileTracingIncludes
  // force-includes the engine binary regardless. See CONTENT-TODO.md.
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
