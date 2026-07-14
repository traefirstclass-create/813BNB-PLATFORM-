import Link from "next/link";
import { ButtonLink } from "@813bnb/ui";
import { BOOKING_SITE_URL } from "@/lib/site-links";

const businessLines = [
  {
    title: "Guest Stays",
    body: "Boutique furnished nightly, weekly, and monthly stays across Tampa Bay, booked directly on 813BNB.",
    href: BOOKING_SITE_URL,
    cta: "Book a stay",
    external: true,
  },
  {
    title: "Corporate Housing",
    body: "Turnkey furnished housing programs for traveling executives, healthcare, utility, and film crews.",
    href: "/corporate-housing",
    cta: "Explore corporate housing",
  },
  {
    title: "Government & Agency Housing",
    body: "Emergency and transitional furnished housing for housing authorities, insurers, and nonprofits.",
    href: "/government-housing",
    cta: "See government housing",
  },
  {
    title: "Property Management",
    body: "Full-service Airbnb and furnished-rental management: pricing, guest communication, cleaning, and maintenance.",
    href: "/property-management",
    cta: "Get a free income estimate",
  },
  {
    title: "Investment Opportunities",
    body: "Joint ventures, portfolio acquisitions, and build-to-rent opportunities across the Tampa Bay market.",
    href: "/investors",
    cta: "View investor info",
  },
];

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Tampa Bay Lodging Corporation",
  alternateName: ["Fresh Start Management Group", "Tom Well Investment Group", "Old West Lofts"],
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3001",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Tampa",
    addressRegion: "FL",
  },
};

export default function CorporateHomePage() {
  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
      <section className="border-b border-charcoal-200 bg-gradient-to-b from-teal-50 to-white px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="font-display text-display-1 font-semibold text-charcoal-900">
            More than a booking site — a full-service lodging platform
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-charcoal-600">
            Tampa Bay Lodging Corporation serves guests, agencies, corporate clients, property owners, and investors
            across the Tampa Bay area.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href="/sell-your-house" variant="accent" size="lg">
              Get an Offer
            </ButtonLink>
            <ButtonLink href={BOOKING_SITE_URL} variant="secondary" size="lg">
              Book a Stay
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {businessLines.map((line) => (
            <div key={line.title} className="flex flex-col rounded-l border border-charcoal-200 bg-white p-6 shadow-card">
              <h2 className="font-display text-lg font-semibold text-charcoal-900">{line.title}</h2>
              <p className="mt-2 flex-1 text-sm text-charcoal-600">{line.body}</p>
              {line.external ? (
                <a href={line.href} className="mt-4 text-sm font-semibold text-brand-teal hover:underline">
                  {line.cta} →
                </a>
              ) : (
                <Link href={line.href} className="mt-4 text-sm font-semibold text-brand-teal hover:underline">
                  {line.cta} →
                </Link>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
