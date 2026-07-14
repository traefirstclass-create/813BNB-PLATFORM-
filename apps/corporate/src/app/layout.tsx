import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader, SiteFooter } from "@813bnb/ui";
import { primaryNavLinks, crossSiteHeaderLink, footerColumns, BOOKING_SITE_URL } from "@/lib/site-links";
import { SiteChatWidget } from "@/components/SiteChatWidget";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Tampa Bay Lodging Corporation | Guest Stays, Corporate & Government Housing, Property Management, Investors",
    template: "%s | Tampa Bay Lodging Corporation",
  },
  description:
    "Tampa Bay Lodging Corporation provides furnished guest stays, corporate and government housing, property management, and real estate investment opportunities across the Tampa Bay area.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-page font-sans text-charcoal-900 antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-s focus:bg-white focus:px-4 focus:py-2 focus:shadow-card-lg"
        >
          Skip to content
        </a>
        <SiteHeader
          LinkComponent={Link}
          navLinks={primaryNavLinks}
          primaryCta={{ label: "Book Now", href: BOOKING_SITE_URL }}
          secondaryCta={{ label: "Get an Offer", href: "/sell-your-house" }}
          crossSiteLink={crossSiteHeaderLink}
          homeHref="/"
        />
        <main id="main-content">{children}</main>
        <SiteFooter
          LinkComponent={Link}
          columns={footerColumns}
          companyName="Tampa Bay Lodging Corporation"
          crossSiteLink={{
            label: "Book a stay on 813BNB",
            href: BOOKING_SITE_URL,
            blurb: "Looking to book a stay instead? Our guest-facing booking platform lives at",
          }}
        />
        <SiteChatWidget />
      </body>
    </html>
  );
}
