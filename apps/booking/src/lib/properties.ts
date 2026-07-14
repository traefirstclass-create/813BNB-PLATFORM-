import { prisma } from "@813bnb/db";
import type { PropertyCardData } from "@813bnb/ui";

const propertyTypeLabels: Record<string, string> = {
  STUDIO: "Studio",
  ONE_BEDROOM: "1 Bedroom",
  TWO_BEDROOM: "2 Bedroom",
  THREE_BEDROOM: "3 Bedroom",
  HOUSE: "House",
};

export function propertyTypeLabel(type: string) {
  return propertyTypeLabels[type] ?? type;
}

export async function listPublishedProperties(filters?: {
  neighborhood?: string;
  propertyType?: string;
  waterfront?: boolean;
  petFriendly?: boolean;
  downtown?: boolean;
  luxury?: boolean;
}) {
  const properties = await prisma.property.findMany({
    where: {
      isPublished: true,
      ...(filters?.neighborhood ? { neighborhood: filters.neighborhood } : {}),
      ...(filters?.propertyType ? { propertyType: filters.propertyType as never } : {}),
      ...(filters?.waterfront ? { isWaterfront: true } : {}),
      ...(filters?.petFriendly ? { isPetFriendly: true } : {}),
      ...(filters?.downtown ? { isDowntown: true } : {}),
      ...(filters?.luxury ? { isLuxury: true } : {}),
    },
    include: {
      images: { orderBy: { sortOrder: "asc" }, take: 1 },
      units: { where: { isPublished: true }, orderBy: { nightlyRate: "asc" }, take: 1 },
    },
    orderBy: { createdAt: "desc" },
  });

  return properties
    .filter((p) => p.units.length > 0)
    .map((p): PropertyCardData => {
      const unit = p.units[0]!;
      const image = p.images[0];
      return {
        slug: p.slug,
        name: p.name,
        neighborhood: p.neighborhood,
        propertyType: propertyTypeLabel(p.propertyType),
        nightlyRate: Number(unit.nightlyRate),
        imageUrl: image?.url ?? "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
        imageAlt: image?.alt ?? `${p.name} sample photo`,
        isPlaceholderImage: image?.isPlaceholder ?? true,
        isSampleData: p.isSampleData,
        bedrooms: unit.bedrooms,
        bathrooms: Number(unit.bathrooms),
        maxGuests: unit.maxGuests,
      };
    });
}

export async function getPropertyBySlug(slug: string) {
  return prisma.property.findUnique({
    where: { slug },
    include: {
      images: { orderBy: { sortOrder: "asc" } },
      units: { where: { isPublished: true }, orderBy: { nightlyRate: "asc" } },
      reviews: { orderBy: { createdAt: "desc" }, take: 10 },
    },
  });
}
