/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@813bnb/ui", "@813bnb/db"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
