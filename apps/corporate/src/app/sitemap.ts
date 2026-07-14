import type { MetadataRoute } from "next";

const staticPages = [
  "",
  "relocation-guide",
  "weekly-rentals",
  "corporate-housing",
  "insurance-housing",
  "airbnb-tips",
  "government-housing",
  "property-management",
  "investors",
  "property-owners",
  "sell-your-house",
  "reviews",
  "faq",
  "about",
  "contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3001";
  return staticPages.map((path) => ({
    url: `${siteUrl}/${path}`,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));
}
