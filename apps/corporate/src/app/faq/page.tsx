import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about pets, weekly rates, utilities, deposits, background checks, and government contracts.",
};

const faqs = [
  { q: "Are pets allowed?", a: "Pet policies vary by property — pet-friendly units are marked on each listing. A pet fee may apply." },
  { q: "What's included in the weekly rate?", a: "Furnishings, utilities, Wi-Fi, and basic kitchenware are included in every weekly and monthly stay." },
  { q: "Are utilities included?", a: "Yes — electricity, water, and Wi-Fi are included in nightly, weekly, and monthly rates unless otherwise noted." },
  { q: "Is there a security deposit?", a: "{{SECURITY_DEPOSIT_POLICY}} — placeholder pending confirmed policy from Rasheen." },
  { q: "Do you run a background check?", a: "{{BACKGROUND_CHECK_POLICY}} — placeholder pending confirmed policy." },
  { q: "Is same-day move-in available?", a: "Often, subject to unit availability — contact us directly for same-day requests." },
  { q: "Do you work with government contracts?", a: "Yes — see our Government & Agency Housing page for programs, capability statement, and procurement contact." },
  { q: "How does insurance billing work?", a: "We invoice carriers or TPAs directly for claims-related placements — see our Insurance Housing page." },
];

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <h1 className="font-display text-display-1 font-semibold text-charcoal-900">Frequently Asked Questions</h1>
      <div className="mt-8 divide-y divide-charcoal-200 rounded-l border border-charcoal-200 bg-white shadow-card">
        {faqs.map((f) => (
          <details key={f.q} className="group p-5">
            <summary className="cursor-pointer list-none font-semibold text-charcoal-900 marker:content-none">
              <span className="flex items-center justify-between">
                {f.q}
                <span className="ml-4 text-charcoal-400 group-open:rotate-45 transition-transform">+</span>
              </span>
            </summary>
            <p className="mt-2 text-sm text-charcoal-600">{f.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
