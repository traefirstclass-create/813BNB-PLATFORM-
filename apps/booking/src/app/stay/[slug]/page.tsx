import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Badge } from "@813bnb/ui";
import { getPropertyBySlug, propertyTypeLabel } from "@/lib/properties";
import { BookingWidget } from "@/components/BookingWidget";

export const dynamic = "force-dynamic";

interface PropertyPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PropertyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);
  if (!property) return {};
  return {
    title: property.name,
    description: property.description,
  };
}

export default async function PropertyPage({ params }: PropertyPageProps) {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);
  if (!property || !property.isPublished) notFound();

  const unit = property.units[0];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: property.name,
    description: property.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: property.addressLine1,
      addressLocality: property.city,
      addressRegion: property.state,
      postalCode: property.zip,
    },
    ...(unit
      ? {
          priceRange: `$${unit.nightlyRate}`,
        }
      : {}),
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="flex flex-wrap items-center gap-2">
        <h1 className="font-display text-display-2 font-semibold text-charcoal-900">{property.name}</h1>
        {property.isSampleData && <Badge variant="orange">Demo Listing</Badge>}
      </div>
      <p className="mt-1 text-charcoal-500">
        {property.neighborhood}, {property.city}, {property.state}
      </p>

      <div className="mt-6 grid grid-cols-2 gap-2 overflow-hidden rounded-l sm:grid-cols-4">
        {property.images.length > 0 ? (
          property.images.map((img, i) => (
            <div key={img.id} className={`relative ${i === 0 ? "col-span-2 row-span-2 aspect-square sm:aspect-[4/3]" : "aspect-square"}`}>
              {}
              <img src={img.url} alt={img.alt} className="h-full w-full object-cover" />
              {img.isPlaceholder && (
                <span className="absolute left-2 top-2 rounded-full bg-charcoal-900/80 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">
                  Sample Photo
                </span>
              )}
            </div>
          ))
        ) : (
          <div className="col-span-2 aspect-video rounded-l bg-charcoal-100 sm:col-span-4" />
        )}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <p className="text-charcoal-700">{property.description}</p>

          {unit && (
            <div className="mt-6 flex flex-wrap gap-2">
              <Badge>{propertyTypeLabel(property.propertyType)}</Badge>
              <Badge>{unit.bedrooms === 0 ? "Studio" : `${unit.bedrooms} bedrooms`}</Badge>
              <Badge>{Number(unit.bathrooms)} bathrooms</Badge>
              <Badge>Sleeps {unit.maxGuests}</Badge>
            </div>
          )}

          <div className="mt-8">
            <h2 className="font-display text-lg font-semibold text-charcoal-900">Amenities</h2>
            <ul className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {property.amenities.map((a) => (
                <li key={a} className="rounded-s bg-surface-2 px-3 py-2 text-sm text-charcoal-700">
                  {a}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8">
            <h2 className="font-display text-lg font-semibold text-charcoal-900">Location</h2>
            <div className="mt-3 aspect-video w-full rounded-l bg-charcoal-100 flex items-center justify-center text-sm text-charcoal-400">
              Interactive map placeholder — connect Google Maps API key to enable.
            </div>
          </div>

          {property.reviews.length > 0 && (
            <div className="mt-8">
              <h2 className="font-display text-lg font-semibold text-charcoal-900">Reviews</h2>
              <div className="mt-3 space-y-4">
                {property.reviews.map((r) => (
                  <div key={r.id} className="rounded-m border border-charcoal-200 p-4">
                    <p className="text-sm font-semibold text-charcoal-900">
                      {r.authorName} · {"★".repeat(r.rating)}
                    </p>
                    <p className="mt-1 text-sm text-charcoal-600">{r.body}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8">
            <h2 className="font-display text-lg font-semibold text-charcoal-900">House rules</h2>
            <p className="mt-2 text-sm text-charcoal-600">
              Check-in after 4:00 PM, check-out by 11:00 AM. No smoking. No parties or events. Pets{" "}
              {property.isPetFriendly ? "welcome" : "not permitted"}.
            </p>
          </div>
        </div>

        <div>
          {unit ? (
            <BookingWidget
              unitId={unit.id}
              nightlyRate={Number(unit.nightlyRate)}
              weeklyRate={unit.weeklyRate ? Number(unit.weeklyRate) : null}
              monthlyRate={unit.monthlyRate ? Number(unit.monthlyRate) : null}
              cleaningFee={Number(unit.cleaningFee)}
              maxGuests={unit.maxGuests}
            />
          ) : (
            <div className="rounded-l border border-dashed border-charcoal-300 p-6 text-center text-sm text-charcoal-500">
              This property has no published unit yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
