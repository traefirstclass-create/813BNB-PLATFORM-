import type { NavLink } from "@813bnb/ui";

// Cross-domain link to the guest-facing booking site. Points at its Vercel
// preview/production URL until custom domains are connected.
export const BOOKING_SITE_URL = process.env.NEXT_PUBLIC_BOOKING_SITE_URL ?? "http://localhost:3000";

export const primaryNavLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Stay", href: BOOKING_SITE_URL },
  { label: "Weekly Rentals", href: "/weekly-rentals" },
  { label: "Corporate Housing", href: "/corporate-housing" },
  { label: "Government Housing", href: "/government-housing" },
  { label: "Property Management", href: "/property-management" },
  { label: "Sell Your Property", href: "/sell-your-house" },
  { label: "Investors", href: "/investors" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const crossSiteHeaderLink: NavLink = {
  label: "813BNB — Book a stay",
  href: BOOKING_SITE_URL,
};

export const footerColumns = [
  {
    title: "Business lines",
    links: [
      { label: "Corporate Housing", href: "/corporate-housing" },
      { label: "Government & Agency Housing", href: "/government-housing" },
      { label: "Insurance Housing", href: "/insurance-housing" },
      { label: "Property Management", href: "/property-management" },
    ],
  },
  {
    title: "Owners & Investors",
    links: [
      { label: "Property Owners", href: "/property-owners" },
      { label: "Investors", href: "/investors" },
      { label: "Sell Your House", href: "/sell-your-house" },
      { label: "Airbnb Tips", href: "/airbnb-tips" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Reviews", href: "/reviews" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact", href: "/contact" },
      { label: "Tampa Relocation Guide", href: "/relocation-guide" },
    ],
  },
];
