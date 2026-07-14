import type { ComponentType } from "react";
import { Logo } from "./Logo";
import type { NavLink } from "./SiteHeader";

interface LinkProps {
  href: string;
  className?: string;
  children?: React.ReactNode;
}

interface FooterColumn {
  title: string;
  links: NavLink[];
}

interface SiteFooterProps {
  LinkComponent?: ComponentType<any>;
  columns: FooterColumn[];
  crossSiteLink: NavLink & { blurb: string };
  companyName: string;
}

export function SiteFooter({ LinkComponent, columns, crossSiteLink, companyName }: SiteFooterProps) {
  const Link = LinkComponent ?? (({ href, className, children }: LinkProps) => (
    <a href={href} className={className}>
      {children}
    </a>
  ));
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-charcoal-200 bg-charcoal-900 text-charcoal-100">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Logo className="[&_span]:text-white" />
            <p className="mt-3 text-sm text-charcoal-300">
              Boutique furnished stays and lodging across the Tampa Bay area.
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold text-white">{col.title}</h3>
              <ul className="mt-3 space-y-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-charcoal-300 hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-m border border-charcoal-700 bg-charcoal-800 p-4">
          <p className="text-sm text-charcoal-200">
            {crossSiteLink.blurb}{" "}
            <Link href={crossSiteLink.href} className="font-semibold text-orange-400 hover:text-orange-300">
              {crossSiteLink.label}
            </Link>
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-charcoal-700 pt-6 text-xs text-charcoal-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {companyName}. All rights reserved.
          </p>
          <p>Tampa, FL</p>
        </div>
      </div>
    </footer>
  );
}
