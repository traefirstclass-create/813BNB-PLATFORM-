import type { NavLink } from "@813bnb/ui";

// Cross-domain link to the corporate/investor site. Points at its Vercel
// preview/production URL until custom domains are connected.
export const CORPORATE_SITE_URL =
  process.env.NEXT_PUBLIC_CORPORATE_SITE_URL ?? "http://localhost:3001";

export const primaryNavLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Stay", href: "/stay" },
  { label: "Weekly Rentals", href: "/weekly-rentals" },
  { label: "Monthly Housing", href: "/monthly-housing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const crossSiteHeaderLink: NavLink = {
  label: "Tampa Bay Lodging Corporation",
  href: CORPORATE_SITE_URL,
};

export const footerColumns = [
  {
    title: "Stay",
    links: [
      { label: "Search stays", href: "/stay" },
      { label: "Weekly rentals", href: "/weekly-rentals" },
      { label: "Monthly housing", href: "/monthly-housing" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "Client Portal", href: "/portal" },
      { label: "Owner Portal", href: "/owner-portal" },
    ],
  },
];
