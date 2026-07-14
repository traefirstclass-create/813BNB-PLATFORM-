import type { Metadata } from "next";
import { LeadForm } from "@/components/LeadForm";

export const metadata: Metadata = {
  title: "Sell Your House",
  description: "Sell your Tampa Bay property — cash offers, creative financing, lease purchase, seller financing, or investment partnerships.",
};

const options = [
  { title: "Cash Offers", body: "A straightforward cash offer, close on your timeline, no repairs or showings." },
  { title: "Creative Financing", body: "Structured deals that can work better than a traditional sale depending on your situation." },
  { title: "Lease Purchase", body: "Stay in place or exit now while we lease-purchase your property over time." },
  { title: "Seller Financing", body: "Carry the note yourself and receive payments over time, often with tax advantages." },
  { title: "Investment Partnerships", body: "Contribute your property into a joint venture instead of a straight sale." },
];

export default function SellYourHousePage() {
  return (
    <div>
      <section className="border-b border-charcoal-200 bg-teal-50 px-4 py-14 sm:px-6">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="font-display text-display-1 font-semibold text-charcoal-900">Sell Your House</h1>
          <p className="mx-auto mt-4 max-w-2xl text-charcoal-600">
            Multiple ways to sell — pick what fits your timeline and goals. No obligation to accept any offer.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {options.map((o) => (
            <div key={o.title} className="rounded-l border border-charcoal-200 bg-white p-5 shadow-card">
              <h3 className="font-display text-base font-semibold text-charcoal-900">{o.title}</h3>
              <p className="mt-1 text-sm text-charcoal-600">{o.body}</p>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-10 max-w-xl" id="get-an-offer">
          <h2 className="font-display text-display-3 font-semibold text-charcoal-900 text-center">Get an offer</h2>
          <p className="mt-2 text-center text-sm text-charcoal-500">
            Tell us about your property — we&apos;ll follow up with next steps.
          </p>
          <div className="mt-6">
            <LeadForm
              type="SELL_YOUR_HOUSE"
              sourcePage="/sell-your-house"
              submitLabel="Get my offer"
              showPropertyAddress
              showInvestmentFields
              messagePlaceholder="Anything else we should know about the property?"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
