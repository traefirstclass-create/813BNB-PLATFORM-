import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Tampa Relocation Guide",
  description: "Moving to Tampa? Neighborhood guides, cost of living, and what to know before you relocate to the Tampa Bay area.",
};

const neighborhoods = [
  {
    name: "South Tampa",
    body: "A peninsula of established residential neighborhoods with easy access to MacDill AFB, Hyde Park, and Bayshore Boulevard — popular with families and military relocations.",
  },
  {
    name: "Downtown Tampa",
    body: "The urban core — Riverwalk, Sparkman Wharf, and a growing residential tower scene. Best for professionals who want to walk to work.",
  },
  {
    name: "Ybor City",
    body: "Tampa's historic Latin Quarter — brick streets, nightlife, and converted lofts. A favorite for short-term creative and hospitality workers.",
  },
  {
    name: "Hyde Park",
    body: "Tree-lined, walkable, and upscale, anchored by Hyde Park Village. Close to Downtown and South Tampa.",
  },
  {
    name: "Davis Islands",
    body: "A quiet, waterfront residential island minutes from Downtown — popular for longer executive and medical stays.",
  },
  {
    name: "Channelside",
    body: "High-rise, walkable, and connected to the Riverwalk and cruise terminal — a fit for corporate travelers who want amenities on-site.",
  },
  {
    name: "Seminole Heights",
    body: "A historic bungalow district known for local restaurants and a strong sense of community — a fit for longer family stays.",
  },
];

export default function RelocationGuidePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
      <h1 className="font-display text-display-1 font-semibold text-charcoal-900">Tampa Relocation Guide</h1>
      <p className="mt-4 text-charcoal-600">
        Whether you&apos;re relocating for work, school, or a fresh start, here&apos;s what to know about moving to
        the Tampa Bay area — and how furnished housing can bridge the gap while you find (or build) something
        permanent.
      </p>

      <h2 className="mt-10 font-display text-display-3 font-semibold text-charcoal-900">Cost of living</h2>
      <p className="mt-2 text-charcoal-600">
        Median rent, home prices, and day-to-day costs vary widely by neighborhood.{" "}
        <em>{"{{COST_OF_LIVING_STATS}}"} — placeholder pending verified, sourced figures.</em>
      </p>

      <h2 className="mt-10 font-display text-display-3 font-semibold text-charcoal-900">Neighborhood guide</h2>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {neighborhoods.map((n) => (
          <div key={n.name} className="rounded-l border border-charcoal-200 bg-white p-5 shadow-card">
            <h3 className="font-display text-base font-semibold text-charcoal-900">{n.name}</h3>
            <p className="mt-1 text-sm text-charcoal-600">{n.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-l border border-teal-200 bg-teal-50 p-6">
        <h2 className="font-display text-lg font-semibold text-charcoal-900">Need a place to stay while you settle in?</h2>
        <p className="mt-1 text-sm text-charcoal-600">
          Browse furnished weekly and monthly stays across these neighborhoods on 813BNB.
        </p>
        <Link href="/weekly-rentals" className="mt-3 inline-block text-sm font-semibold text-brand-teal hover:underline">
          See weekly rental options →
        </Link>
      </div>
    </div>
  );
}
