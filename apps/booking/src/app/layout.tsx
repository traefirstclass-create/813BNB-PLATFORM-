import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader, SiteFooter } from "@813bnb/ui";
import { primaryNavLinks, crossSiteHeaderLink, footerColumns, CORPORATE_SITE_URL } from "@/lib/site-links";
import { Providers } from "./providers";
import { SiteChatWidget } from "@/components/SiteChatWidget";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "813BNB | Boutique Furnished Stays in Tampa Bay",
    template: "%s | 813BNB",
  },
  description:
    "Book boutique furnished stays across Tampa Bay — South Tampa, Downtown, Ybor City, Hyde Park, Davis Islands, Channelside, and Seminole Heights.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-page font-sans text-charcoal-900 antialiased">
        <Providers>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-s focus:bg-white focus:px-4 focus:py-2 focus:shadow-card-lg"
          >
            Skip to content
          </a>
          <SiteHeader
            LinkComponent={Link}
            navLinks={primaryNavLinks}
            primaryCta={{ label: "Book Now", href: "/stay" }}
            secondaryCta={{ label: "Get an Offer", href: `${CORPORATE_SITE_URL}/sell-your-house` }}
            crossSiteLink={crossSiteHeaderLink}
            homeHref="/"
          />
          <main id="main-content">{children}</main>
          <SiteFooter
            LinkComponent={Link}
            columns={footerColumns}
            companyName="813BNB — a Tampa Bay Lodging Corporation brand"
            crossSiteLink={{
              label: "Visit Tampa Bay Lodging Corporation",
              href: CORPORATE_SITE_URL,
              blurb:
                "Part of Tampa Bay Lodging Corporation — see our full portfolio, investor, and property management services.",
            }}
          />
          <SiteChatWidget />
        </Providers>
      </body>
    </html>
  );
}
