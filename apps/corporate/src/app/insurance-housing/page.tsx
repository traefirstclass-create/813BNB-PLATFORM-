import type { Metadata } from "next";
import { LeadForm } from "@/components/LeadForm";

export const metadata: Metadata = {
  title: "Insurance Housing",
  description: "Furnished displaced-tenant and claims housing for insurance carriers and adjusters in Tampa Bay.",
};

const steps = [
  { title: "Adjuster reaches out", body: "Call or submit the form with the claim details, family size, and expected duration." },
  { title: "We match a unit same-day", body: "Furnished, utilities-included housing near the client's original home when possible." },
  { title: "Direct carrier billing", body: "We invoice the carrier or TPA directly — no reimbursement paperwork for the policyholder." },
  { title: "Flexible extensions", body: "Repairs run long? We extend the stay without a new lease process." },
];

export default function InsuranceHousingPage() {
  return (
    <div>
      <section className="border-b border-charcoal-200 bg-teal-50 px-4 py-14 sm:px-6">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="font-display text-display-1 font-semibold text-charcoal-900">Insurance Housing</h1>
          <p className="mx-auto mt-4 max-w-2xl text-charcoal-600">
            Furnished temporary housing for displaced policyholders, coordinated directly with carriers and
            adjusters.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="font-display text-lg font-semibold text-charcoal-900">How it works with carriers</h2>
            <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {steps.map((s, i) => (
                <div key={s.title} className="rounded-l border border-charcoal-200 bg-white p-5 shadow-card">
                  <p className="text-xs font-semibold text-brand-orange">STEP {i + 1}</p>
                  <h3 className="mt-1 font-semibold text-charcoal-900">{s.title}</h3>
                  <p className="mt-1 text-sm text-charcoal-600">{s.body}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="font-display text-lg font-semibold text-charcoal-900">Adjuster / carrier request</h2>
            <p className="mt-1 text-sm text-charcoal-500">We respond same business day for active claims.</p>
            <div className="mt-4">
              <LeadForm type="CONTACT" sourcePage="/insurance-housing" submitLabel="Request placement" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
