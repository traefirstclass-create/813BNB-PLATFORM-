import type { ComponentType } from "react";
import { Badge } from "./Badge";

interface LinkProps {
  href: string;
  className?: string;
  children?: React.ReactNode;
}

export interface PropertyCardData {
  slug: string;
  name: string;
  neighborhood: string;
  propertyType: string;
  nightlyRate: number;
  imageUrl: string;
  imageAlt: string;
  isPlaceholderImage: boolean;
  isSampleData: boolean;
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
}

interface PropertyCardProps {
  property: PropertyCardData;
  LinkComponent?: ComponentType<any>;
  hrefBase?: string;
}

const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

export function PropertyCard({ property, LinkComponent, hrefBase = "/stay" }: PropertyCardProps) {
  const Link = LinkComponent ?? (({ href, className, children }: LinkProps) => (
    <a href={href} className={className}>
      {children}
    </a>
  ));

  return (
    <Link
      href={`${hrefBase}/${property.slug}`}
      className="group block overflow-hidden rounded-l border border-charcoal-200 bg-white shadow-card transition-shadow hover:shadow-card-lg"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-charcoal-100">
        {}
        <img
          src={property.imageUrl}
          alt={property.imageAlt}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        {property.isPlaceholderImage && (
          <span className="absolute left-2 top-2 rounded-full bg-charcoal-900/80 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">
            Sample Photo
          </span>
        )}
        {property.isSampleData && (
          <span className="absolute right-2 top-2 rounded-full bg-orange-500/90 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">
            Demo Listing
          </span>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-base font-semibold text-charcoal-900 line-clamp-1">
            {property.name}
          </h3>
        </div>
        <p className="mt-0.5 text-sm text-charcoal-500">{property.neighborhood}</p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          <Badge variant="neutral">{property.bedrooms === 0 ? "Studio" : `${property.bedrooms} BR`}</Badge>
          <Badge variant="neutral">{property.bathrooms} BA</Badge>
          <Badge variant="neutral">Sleeps {property.maxGuests}</Badge>
        </div>
        <p className="mt-3 text-sm">
          <span className="font-semibold text-charcoal-900">{currency.format(property.nightlyRate)}</span>{" "}
          <span className="text-charcoal-500">/ night</span>
        </p>
      </div>
    </Link>
  );
}
