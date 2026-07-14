import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Airbnb Tips for Tampa Hosts",
  description: "Considering short-term rental in Tampa Bay? Tips on regulations, pricing, and whether self-managing or professional management makes sense.",
};

const tips = [
  {
    title: "Know your local rules first",
    body: "Short-term rental regulations vary by city and county across Tampa Bay — confirm registration, licensing, and any HOA restrictions before listing.",
  },
  {
    title: "Price dynamically, not statically",
    body: "Rates that don't move with seasonality and local events leave money on the table during high demand and sit empty during slow weeks.",
  },
  {
    title: "Photos are the single biggest lever",
    body: "Professional photography consistently outperforms phone photos on booking conversion — it's usually the highest-ROI investment a new host can make.",
  },
  {
    title: "Guest communication speed matters",
    body: "Fast responses to inquiries and questions during a stay materially affect ratings and repeat bookings.",
  },
  {
    title: "Turnover logistics are the hard part",
    body: "Cleaning, restocking, and maintenance between every guest is where self-managed hosts burn the most time.",
  },
];

export default function AirbnbTipsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <h1 className="font-display text-display-1 font-semibold text-charcoal-900">Airbnb Tips for Tampa Hosts</h1>
      <p className="mt-4 text-charcoal-600">
        Thinking about listing your Tampa Bay property on Airbnb or Vrbo? A few things we&apos;ve learned managing
        furnished rentals across the area.
      </p>

      <div className="mt-8 space-y-5">
        {tips.map((tip) => (
          <div key={tip.title} className="rounded-l border border-charcoal-200 bg-white p-5 shadow-card">
            <h2 className="font-display text-base font-semibold text-charcoal-900">{tip.title}</h2>
            <p className="mt-1 text-sm text-charcoal-600">{tip.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-l border border-teal-200 bg-teal-50 p-6">
        <h2 className="font-display text-lg font-semibold text-charcoal-900">Would rather not manage it yourself?</h2>
        <p className="mt-1 text-sm text-charcoal-600">
          Our property management team handles pricing, guest communication, cleaning, and maintenance end to end.
        </p>
        <Link href="/property-management" className="mt-3 inline-block text-sm font-semibold text-brand-teal hover:underline">
          See property management services →
        </Link>
      </div>
    </div>
  );
}
