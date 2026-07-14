import type { Metadata } from "next";
import Link from "next/link";
import { LeadForm } from "@/components/LeadForm";

export const metadata: Metadata = {
  title: "Property Owners",
  description: "Lease your Tampa Bay property to Tampa Bay Lodging Corporation — guaranteed rent, long-term partnership, maintenance handled.",
};

const features = [
  { title: "Guaranteed rent options", body: "A fixed monthly rent regardless of occupancy, paid on schedule — you're insulated from vacancy risk." },
  { title: "Long-term partnership", body: "Multi-year master lease arrangements, not a one-off booking relationship." },
  { title: "Furnished-rental conversion", body: "We handle furnishing and setup to convert your property into a furnished-rental-ready unit." },
  { title: "Maintenance handled", body: "Day-to-day maintenance and upkeep managed by our team for the length of the lease." },
];

export default function PropertyOwnersPage() {
  return (
    <div>
      <section className="border-b border-charcoal-200 bg-teal-50 px-4 py-14 sm:px-6">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="font-display text-display-1 font-semibold text-charcoal-900">Property Owners</h1>
          <p className="mx-auto mt-4 max-w-2xl text-charcoal-600">
            Lease your property directly to us on a guaranteed-rent basis — different from our{" "}
            <Link href="/property-management" className="text-brand-teal hover:underline">
              property management
            </Link>{" "}
            service, where you keep operating the unit and we manage it on your behalf.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {features.map((f) => (
                <div key={f.title} className="rounded-l border border-charcoal-200 bg-white p-5 shadow-card">
                  <h3 className="font-semibold text-charcoal-900">{f.title}</h3>
                  <p className="mt-1 text-sm text-charcoal-600">{f.body}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="font-display text-lg font-semibold text-charcoal-900">Get a lease offer</h2>
            <p className="mt-1 text-sm text-charcoal-500">Share your property details and we&apos;ll follow up with terms.</p>
            <div className="mt-4">
              <LeadForm type="CONTACT" sourcePage="/property-owners" submitLabel="Request lease offer" showPropertyAddress />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
