import Link from "next/link";
import { PropertyCard } from "@813bnb/ui";
import { HomeSearch } from "@/components/HomeSearch";
import { listPublishedProperties } from "@/lib/properties";

// Listing inventory and availability change constantly — always render fresh.
export const dynamic = "force-dynamic";

const neighborhoods = [
  "South Tampa",
  "Downtown",
  "Ybor City",
  "Hyde Park",
  "Davis Islands",
  "Channelside",
  "Seminole Heights",
];

const trustPoints = [
  { title: "Verified listings", body: "Every property is reviewed by our team before it goes live." },
  { title: "Secure payments", body: "Card, Apple Pay, and Google Pay processed securely through Stripe." },
  { title: "24/7 local support", body: "Real people in Tampa Bay, not an offshore call center." },
];

export default async function HomePage() {
  const properties = await listPublishedProperties();
  const featured = properties.slice(0, 8);

  return (
    <div>
      <section className="border-b border-charcoal-200 bg-gradient-to-b from-teal-50 to-white px-4 py-14 sm:px-6">
        <div className="mx-auto max-w-5xl text-center">
          <h1 className="font-display text-display-1 font-semibold text-charcoal-900">
            Boutique furnished stays across Tampa Bay
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-charcoal-600">
            Nightly, weekly, and monthly rentals in South Tampa, Downtown, Ybor City, Hyde Park, Davis Islands,
            Channelside, and Seminole Heights — booked directly, no middleman markup.
          </p>
        </div>
        <div className="mx-auto mt-8 max-w-4xl">
          <HomeSearch />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="flex items-end justify-between">
          <h2 className="font-display text-display-3 font-semibold text-charcoal-900">Top-rated stays</h2>
          <Link href="/stay" className="text-sm font-medium text-brand-teal hover:underline">
            View all stays
          </Link>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((property) => (
            <PropertyCard key={property.slug} property={property} LinkComponent={Link} />
          ))}
        </div>
        {featured.length === 0 && (
          <p className="mt-6 text-charcoal-500">
            No published listings yet — run <code>pnpm db:seed</code> to load Old West Studio Lofts and demo
            inventory.
          </p>
        )}
      </section>

      <section className="border-y border-charcoal-200 bg-surface-2 px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-display text-display-3 font-semibold text-charcoal-900">Explore neighborhoods</h2>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {neighborhoods.map((n) => (
              <Link
                key={n}
                href={`/stay?destination=${encodeURIComponent(n)}`}
                className="rounded-m border border-charcoal-200 bg-white px-4 py-6 text-center font-medium text-charcoal-800 shadow-card hover:border-brand-teal hover:text-brand-teal"
              >
                {n}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {trustPoints.map((point) => (
            <div key={point.title} className="rounded-l border border-charcoal-200 bg-white p-6 shadow-card">
              <h3 className="font-display text-lg font-semibold text-charcoal-900">{point.title}</h3>
              <p className="mt-2 text-sm text-charcoal-600">{point.body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
