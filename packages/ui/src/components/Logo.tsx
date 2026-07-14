import { cn } from "../lib/cn";

interface LogoProps {
  className?: string;
  /** Renders just the house-pin mark without the "BNB" wordmark. */
  markOnly?: boolean;
}

/**
 * Vector recreation of the 813BNB house-pin mark (source raster at
 * packages/ui/assets/logo.png): a map-pin silhouette in brand teal with an
 * orange roof accent, containing a teal "813" roundel, paired with the
 * "BNB" wordmark (B teal / N orange / B teal). Colors are pixel-sampled
 * from the source file. Swap for a real vector/EPS export if one becomes
 * available, for pixel-exact proportions at large sizes.
 */
export function Logo({ className, markOnly = false }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)} aria-label="813 BNB">
      <svg viewBox="0 0 48 56" width="32" height="37" aria-hidden="true">
        <path
          d="M24 2C12.4 2 3 11.4 3 23c0 15.5 21 31 21 31s21-15.5 21-31C45 11.4 35.6 2 24 2Z"
          fill="var(--brand-teal)"
        />
        <path
          d="M10 20 24 8l14 12"
          fill="none"
          stroke="var(--brand-orange)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="24" cy="24" r="12" fill="#ffffff" />
        <text
          x="24"
          y="28"
          textAnchor="middle"
          fontSize="9"
          fontWeight="700"
          fontFamily="Inter, system-ui, sans-serif"
          fill="var(--brand-teal)"
        >
          813
        </text>
      </svg>
      {!markOnly && (
        <span className="font-display text-xl font-semibold tracking-tight">
          <span style={{ color: "var(--brand-teal)" }}>B</span>
          <span style={{ color: "var(--brand-orange)" }}>N</span>
          <span style={{ color: "var(--brand-teal)" }}>B</span>
        </span>
      )}
    </span>
  );
}
