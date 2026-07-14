import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "About 813BNB and Tampa Bay Lodging Corporation, led by Rasheen \"Cuir\" Castell.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <h1 className="font-display text-display-1 font-semibold text-charcoal-900">About 813BNB</h1>
      <div className="mt-6 max-w-none space-y-5 text-charcoal-700">
        <p>
          813BNB is the guest-facing booking platform of Tampa Bay Lodging Corporation, a Florida corporation based
          in Tampa, FL, founded and operated by Rasheen &ldquo;Cuir&rdquo; Castell. Tampa Bay Lodging Corporation also
          operates under the trade names Fresh Start Management Group, Tom Well Investment Group, and Old West
          Lofts / Old West Studio Lofts.
        </p>
        <p>
          We manage short-term, weekly, and monthly furnished rentals across the Tampa Bay area — including South
          Tampa, Downtown, Ybor City, Hyde Park, Davis Islands, Channelside, Seminole Heights, and surrounding
          neighborhoods — with a boutique, hospitality-first approach rather than a generic listing-aggregator
          experience.
        </p>
        <p>
          Our first flagship, bookable property is{" "}
          <a href="/stay/old-west-studio-lofts" className="text-brand-teal hover:underline">
            Old West Studio Lofts
          </a>{" "}
          at 2004 N Howard Ave, Tampa, FL.
        </p>
        <h2 className="font-display text-lg font-semibold text-charcoal-900">By the numbers</h2>
        <p className="text-sm text-charcoal-500">
          Units under management: {"{{UNITS_UNDER_MANAGEMENT}}"} · Years operating: {"{{YEARS_OPERATING}}"} · Guest
          rating: {"{{AVERAGE_GUEST_RATING}}"}
          <br />
          <em>Placeholders above pending verified figures from Rasheen — see CONTENT-TODO.md.</em>
        </p>
      </div>
    </div>
  );
}
