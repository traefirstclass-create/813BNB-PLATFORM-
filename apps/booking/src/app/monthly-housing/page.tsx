import Link from "next/link";
import type { Metadata } from "next";
import { PropertyCard } from "@813bnb/ui";
import { listPublishedProperties } from "@/lib/properties";
import { LeadForm } from "@/components/LeadForm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Monthly Housing",
  description:
    "Furnished monthly housing in Tampa Bay for traveling nurses, corporate travelers, students, medical stays, military, and construction crews.",
};

const audiences = [
  "Traveling nurses & healthcare workers",
  "Corporate travelers & relocations",
  "Students & interns",
  "Medical stays & family caregivers",
  "Military (PCS & TDY)",
  "Construction & project crews",
];

export default async function MonthlyHousingPage() {
  const properties = await listPublishedProperties();

  return (
    <div>
      <section className="border-b border-charcoal-200 bg-teal-50 px-4 py-14 sm:px-6">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="font-display text-display-1 font-semibold text-charcoal-900">Monthly Housing</h1>
          <p className="mx-auto mt-4 max-w-2xl text-charcoal-600">
            Flexible, fully furnished monthly stays across Tampa Bay — no long-term lease required.
          </p>
        </div>
        <div className="mx-auto mt-8 grid max-w-3xl grid-cols-2 gap-2 sm:grid-cols-3">
          {audiences.map((a) => (
            <div key={a} className="rounded-m bg-white px-3 py-3 text-center text-sm font-medium text-charcoal-700 shadow-card">
              {a}
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="font-display text-display-3 font-semibold text-charcoal-900">Available for monthly stays</h2>
            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
              {properties.map((property) => (
                <PropertyCard key={property.slug} property={property} LinkComponent={Link} />
              ))}
            </div>
          </div>
          <div>
            <h2 className="font-display text-lg font-semibold text-charcoal-900">Request a monthly quote</h2>
            <p className="mt-1 text-sm text-charcoal-500">Share your move-in date and length of stay.</p>
            <div className="mt-4">
              <LeadForm sourcePage="/monthly-housing" submitLabel="Request monthly quote" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
