import type { Metadata } from "next";
import { LeadForm } from "@/components/LeadForm";

export const metadata: Metadata = {
  title: "Government & Agency Housing",
  description:
    "Turnkey furnished emergency and transitional housing for Housing Authorities, insurance companies, Red Cross, hospitals, nonprofits, cities, and counties across Tampa Bay.",
};

const agencies = [
  "Housing Authorities",
  "Insurance companies & TPAs",
  "American Red Cross & disaster relief",
  "Hospitals & healthcare systems",
  "Nonprofits & social services",
  "Cities & counties",
  "Emergency housing programs",
];

const features = [
  { title: "Turnkey furnished units", body: "Fully furnished from day one — no procurement lead time for furniture or setup." },
  { title: "Utilities included", body: "Power, water, and trash included in the rate — one line item, no separate utility accounts." },
  { title: "Wi-Fi included", body: "Every unit is internet-ready for remote work, telehealth, or case management calls." },
  { title: "Laundry", body: "In-unit or on-site laundry access at every property." },
  { title: "Flexible lease terms", body: "Stay durations built around your program's actual timeline, not a fixed 12-month lease." },
  { title: "Single point of contact", body: "One dedicated contact who knows your program — not a rotating call center." },
  { title: "Invoice billing", body: "Consolidated billing built for procurement and grant reporting requirements." },
  { title: "Fast placement", body: "Same-week placement in most cases for active emergency or transitional needs." },
];

export default function GovernmentHousingPage() {
  return (
    <div>
      <section className="border-b border-charcoal-200 bg-teal-50 px-4 py-14 sm:px-6">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="font-display text-display-1 font-semibold text-charcoal-900">Government & Agency Housing</h1>
          <p className="mx-auto mt-4 max-w-2xl text-charcoal-600">
            Turnkey furnished housing for emergency placement, transitional housing, and agency-coordinated
            programs across the Tampa Bay area.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <h2 className="font-display text-display-3 font-semibold text-charcoal-900">Who we work with</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {agencies.map((a) => (
            <span key={a} className="rounded-full bg-surface-2 px-4 py-2 text-sm font-medium text-charcoal-700">
              {a}
            </span>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="font-display text-display-3 font-semibold text-charcoal-900">What&apos;s included</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {features.map((f) => (
                <div key={f.title} className="rounded-l border border-charcoal-200 bg-white p-5 shadow-card">
                  <h3 className="font-semibold text-charcoal-900">{f.title}</h3>
                  <p className="mt-1 text-sm text-charcoal-600">{f.body}</p>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <h2 className="font-display text-lg font-semibold text-charcoal-900">Capability statement</h2>
              <p className="mt-1 text-sm text-charcoal-600">
                For procurement contacts who need a formal capability statement for government or agency contracting.
              </p>
              <a
                href="/api/capability-statement"
                className="mt-3 inline-block rounded-m border border-brand-teal px-4 py-2 text-sm font-semibold text-brand-teal hover:bg-teal-50"
              >
                Download capability statement (PDF)
              </a>
            </div>
          </div>
          <div>
            <h2 className="font-display text-lg font-semibold text-charcoal-900">Program inquiry</h2>
            <p className="mt-1 text-sm text-charcoal-500">Tell us about your agency&apos;s housing need and timeline.</p>
            <div className="mt-4">
              <LeadForm type="GOVERNMENT_HOUSING" sourcePage="/government-housing" submitLabel="Submit inquiry" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
