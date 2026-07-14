import type { Metadata } from "next";
import { LeadForm } from "@/components/LeadForm";

export const metadata: Metadata = {
  title: "Property Management",
  description:
    "Full-service Airbnb and furnished-rental management in Tampa Bay: revenue optimization, guest communication, cleaning, maintenance, photography, and pricing.",
};

const services = [
  { title: "Revenue optimization", body: "Dynamic pricing tuned to seasonality, local events, and comp-set performance." },
  { title: "Guest communication", body: "24/7 messaging, check-in coordination, and issue resolution." },
  { title: "Cleaning & turnover", body: "Professional cleaning and inspection between every stay." },
  { title: "Maintenance coordination", body: "A vetted vendor network for repairs, with owner visibility into every request." },
  { title: "Photography & listing setup", body: "Professional photography and optimized listing copy across booking channels." },
  { title: "Marketing & distribution", body: "Listed across 813BNB and, where it makes sense, other major booking channels." },
];

export default function PropertyManagementPage() {
  return (
    <div>
      <section className="border-b border-charcoal-200 bg-teal-50 px-4 py-14 sm:px-6">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="font-display text-display-1 font-semibold text-charcoal-900">Property Management</h1>
          <p className="mx-auto mt-4 max-w-2xl text-charcoal-600">
            Full-service Airbnb and furnished-rental management — we handle the operations, you keep the asset.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="font-display text-display-3 font-semibold text-charcoal-900">What we handle</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {services.map((s) => (
                <div key={s.title} className="rounded-l border border-charcoal-200 bg-white p-5 shadow-card">
                  <h3 className="font-semibold text-charcoal-900">{s.title}</h3>
                  <p className="mt-1 text-sm text-charcoal-600">{s.body}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="font-display text-lg font-semibold text-charcoal-900">Get a Free Rental Income Estimate</h2>
            <p className="mt-1 text-sm text-charcoal-500">
              Tell us about your property and we&apos;ll send a projected revenue range.
            </p>
            <div className="mt-4">
              <LeadForm
                type="PROPERTY_MANAGEMENT"
                sourcePage="/property-management"
                submitLabel="Get my free estimate"
                showPropertyAddress
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
