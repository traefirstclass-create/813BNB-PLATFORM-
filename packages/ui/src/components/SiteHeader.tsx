"use client";

import { useState, type ComponentType } from "react";
import { Logo } from "./Logo";
import { ButtonLink } from "./Button";
import { cn } from "../lib/cn";

export interface NavLink {
  label: string;
  href: string;
}

interface LinkProps {
  href: string;
  className?: string;
  children?: React.ReactNode;
}

interface SiteHeaderProps {
  /**
   * Internal-route links use this component (e.g. next/link); defaults to a
   * plain anchor. Typed loosely since next/link's href type (string |
   * UrlObject) and propTypes shape don't structurally match a plain
   * ComponentType<LinkProps> under strict mode.
   */
  LinkComponent?: ComponentType<any>;
  navLinks: NavLink[];
  primaryCta: NavLink;
  secondaryCta?: NavLink;
  /** Persistent link to the sibling domain, shown in every header. */
  crossSiteLink: NavLink;
  homeHref: string;
}

export function SiteHeader({
  LinkComponent,
  navLinks,
  primaryCta,
  secondaryCta,
  crossSiteLink,
  homeHref,
}: SiteHeaderProps) {
  const [open, setOpen] = useState(false);
  const Link = LinkComponent ?? (({ href, className, children }: LinkProps) => (
    <a href={href} className={className}>
      {children}
    </a>
  ));

  return (
    <header className="sticky top-0 z-40 border-b border-charcoal-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href={homeHref} className="shrink-0">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-charcoal-700 hover:text-brand-teal"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href={crossSiteLink.href}
            className="text-xs font-medium text-charcoal-500 hover:text-brand-teal"
          >
            {crossSiteLink.label}
          </Link>
          {secondaryCta && (
            <ButtonLink href={secondaryCta.href} variant="secondary" size="sm">
              {secondaryCta.label}
            </ButtonLink>
          )}
          <ButtonLink href={primaryCta.href} variant="accent" size="sm">
            {primaryCta.label}
          </ButtonLink>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-s p-2 text-charcoal-700 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      <div
        id="mobile-nav"
        className={cn("border-t border-charcoal-200 lg:hidden", open ? "block" : "hidden")}
      >
        <nav className="flex flex-col gap-1 px-4 py-3" aria-label="Mobile">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-s px-2 py-2 text-sm font-medium text-charcoal-700 hover:bg-charcoal-100"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={crossSiteLink.href}
            className="rounded-s px-2 py-2 text-sm font-medium text-charcoal-500 hover:bg-charcoal-100"
          >
            {crossSiteLink.label}
          </Link>
          <div className="mt-2 flex flex-col gap-2 px-2">
            {secondaryCta && (
              <ButtonLink href={secondaryCta.href} variant="secondary" size="sm">
                {secondaryCta.label}
              </ButtonLink>
            )}
            <ButtonLink href={primaryCta.href} variant="accent" size="sm">
              {primaryCta.label}
            </ButtonLink>
          </div>
        </nav>
      </div>
    </header>
  );
}
