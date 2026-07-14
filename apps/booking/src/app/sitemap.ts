import type { MetadataRoute } from "next";
import { prisma } from "@813bnb/db";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const properties = await prisma.property.findMany({ where: { isPublished: true }, select: { slug: true } });

  return [
    { url: siteUrl, changeFrequency: "daily", priority: 1 },
    { url: `${siteUrl}/stay`, changeFrequency: "daily", priority: 0.9 },
    { url: `${siteUrl}/weekly-rentals`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${siteUrl}/monthly-housing`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${siteUrl}/about`, changeFrequency: "monthly", priority: 0.4 },
    { url: `${siteUrl}/contact`, changeFrequency: "monthly", priority: 0.4 },
    ...properties.map((p) => ({
      url: `${siteUrl}/stay/${p.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
