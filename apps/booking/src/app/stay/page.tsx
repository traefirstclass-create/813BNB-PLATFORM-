import Link from "next/link";
import type { Metadata } from "next";
import { PropertyCard } from "@813bnb/ui";
import { listPublishedProperties } from "@/lib/properties";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Search Stays",
  description: "Browse furnished stays across the Tampa Bay area, filterable by neighborhood, dates, and amenities.",
};

const filterFlags: Record<string, { waterfront?: boolean; petFriendly?: boolean; downtown?: boolean; luxury?: boolean }> = {
  waterfront: { waterfront: true },
  petFriendly: { petFriendly: true },
  downtown: { downtown: true },
  luxury: { luxury: true },
};

const propertyTypes = ["STUDIO", "ONE_BEDROOM", "TWO_BEDROOM", "THREE_BEDROOM", "HOUSE"];

interface StayPageProps {
  searchParams: Promise<{
    destination?: string;
    checkIn?: string;
    checkOut?: string;
    guests?: string;
    filter?: string | string[];
  }>;
}

export default async function StayPage({ searchParams }: StayPageProps) {
  const params = await searchParams;
  const filters = Array.isArray(params.filter) ? params.filter : params.filter ? [params.filter] : [];

  const propertyType = filters.find((f) => propertyTypes.includes(f));
  const flagFilters = filters.reduce(
    (acc, f) => ({ ...acc, ...(filterFlags[f] ?? {}) }),
    {} as Record<string, boolean>,
  );

  let properties = await listPublishedProperties({
    propertyType,
    ...flagFilters,
  });

  if (params.destination) {
    const q = params.destination.toLowerCase();
    properties = properties.filter(
      (p) => p.neighborhood.toLowerCase().includes(q) || p.name.toLowerCase().includes(q),
    );
  }

  const guests = params.guests ? Number(params.guests) : undefined;
  if (guests) {
    properties = properties.filter((p) => p.maxGuests >= guests);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-display-2 font-semibold text-charcoal-900">
        {params.destination ? `Stays near ${params.destination}` : "All stays"}
      </h1>
      <p className="mt-1 text-sm text-charcoal-500">
        {properties.length} {properties.length === 1 ? "property" : "properties"} found
        {params.checkIn && params.checkOut ? ` for ${params.checkIn} – ${params.checkOut}` : ""}
      </p>

      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {properties.map((property) => (
          <PropertyCard key={property.slug} property={property} LinkComponent={Link} />
        ))}
      </div>

      {properties.length === 0 && (
        <div className="mt-10 rounded-l border border-dashed border-charcoal-300 p-10 text-center text-charcoal-500">
          No stays match those filters yet. Try clearing a filter or search a different neighborhood.
        </div>
      )}
    </div>
  );
}
