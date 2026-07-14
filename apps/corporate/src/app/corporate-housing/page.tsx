import type { Metadata } from "next";
import { LeadForm } from "@/components/LeadForm";

export const metadata: Metadata = {
  title: "Corporate Housing",
  description:
    "Turnkey furnished corporate housing programs for construction, healthcare, utility companies, traveling executives, and film crews in Tampa Bay.",
};

const targets = [
  "Construction & infrastructure crews",
  "Healthcare & travel medical staff",
  "Utility & storm-response companies",
  "Traveling executives & relocations",
  "Film & production crews",
];

const features = [
  { title: "Turnkey furnished housing", body: "Move-in ready units — furniture, kitchenware, linens, and Wi-Fi included." },
  { title: "Single point of contact", body: "One dedicated contact for your whole program, not a different rep per booking." },
  { title: "Invoice billing", body: "Consolidated invoicing for finance and procurement teams — no per-employee expense reports." },
  { title: "Flexible terms", body: "Stay for a week, a month, or a rolling program — scale up or down as your crew size changes." },
];

export default function CorporateHousingPage() {
  return (
    <div>
      <section className="border-b border-charcoal-200 bg-teal-50 px-4 py-14 sm:px-6">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="font-display text-display-1 font-semibold text-charcoal-900">Corporate Housing</h1>
          <p className="mx-auto mt-4 max-w-2xl text-charcoal-600">
            Furnished housing programs built for teams, not just individual travelers.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="font-display text-lg font-semibold text-charcoal-900">Who we work with</h2>
            <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {targets.map((t) => (
                <li key={t} className="rounded-s bg-surface-2 px-3 py-2 text-sm text-charcoal-700">
                  {t}
                </li>
              ))}
            </ul>

            <h2 className="mt-8 font-display text-lg font-semibold text-charcoal-900">How it works</h2>
            <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {features.map((f) => (
                <div key={f.title} className="rounded-l border border-charcoal-200 bg-white p-5 shadow-card">
                  <h3 className="font-semibold text-charcoal-900">{f.title}</h3>
                  <p className="mt-1 text-sm text-charcoal-600">{f.body}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="font-display text-lg font-semibold text-charcoal-900">Request a program quote</h2>
            <p className="mt-1 text-sm text-charcoal-500">Tell us your team size, timeline, and neighborhood preference.</p>
            <div className="mt-4">
              <LeadForm type="CORPORATE_HOUSING" sourcePage="/corporate-housing" submitLabel="Request a quote" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
