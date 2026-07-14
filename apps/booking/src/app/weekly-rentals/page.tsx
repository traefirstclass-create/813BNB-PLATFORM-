import Link from "next/link";
import type { Metadata } from "next";
import { PropertyCard } from "@813bnb/ui";
import { listPublishedProperties } from "@/lib/properties";
import { LeadForm } from "@/components/LeadForm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Weekly Rentals",
  description:
    "Furnished weekly rentals in Tampa Bay for traveling workers, families in transition, insurance-claim housing, and relocations.",
};

export default async function WeeklyRentalsPage() {
  const properties = await listPublishedProperties();

  return (
    <div>
      <section className="border-b border-charcoal-200 bg-teal-50 px-4 py-14 sm:px-6">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="font-display text-display-1 font-semibold text-charcoal-900">Weekly Rentals</h1>
          <p className="mx-auto mt-4 max-w-2xl text-charcoal-600">
            Fully furnished stays by the week — built for traveling workers, families between homes, insurance-claim
            housing, and relocations across Tampa Bay.
          </p>
          <p className="mt-4 inline-block rounded-full bg-white px-4 py-2 text-sm font-semibold text-brand-teal shadow-card">
            Weekly stays starting at {"{{WEEKLY_RATE_STARTING_AT}}"}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="font-display text-display-3 font-semibold text-charcoal-900">Available for weekly stays</h2>
            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
              {properties.map((property) => (
                <PropertyCard key={property.slug} property={property} LinkComponent={Link} />
              ))}
            </div>
          </div>
          <div>
            <h2 className="font-display text-lg font-semibold text-charcoal-900">Not sure which unit fits?</h2>
            <p className="mt-1 text-sm text-charcoal-500">Tell us your dates and needs and we&apos;ll follow up.</p>
            <div className="mt-4">
              <LeadForm sourcePage="/weekly-rentals" submitLabel="Request weekly rate" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
