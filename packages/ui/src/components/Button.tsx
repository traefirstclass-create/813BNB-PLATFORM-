import { forwardRef } from "react";
import type { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";
import { cn } from "../lib/cn";

const base =
  "inline-flex items-center justify-center gap-2 rounded-m font-medium transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-teal disabled:opacity-50 disabled:pointer-events-none";

const variants = {
  primary: "bg-brand-teal text-white hover:bg-teal-700 active:bg-teal-800",
  accent: "bg-brand-orange text-white hover:bg-orange-600 active:bg-orange-700",
  secondary:
    "bg-transparent text-brand-teal border border-teal-600 hover:bg-teal-50",
  ghost: "bg-transparent text-charcoal-700 hover:bg-charcoal-100",
};

const sizes = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-6 text-base",
};

interface ButtonOwnProps {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
}

type ButtonProps = ButtonOwnProps & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => (
    <button
      ref={ref}
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    />
  ),
);
Button.displayName = "Button";

type ButtonLinkProps = ButtonOwnProps & AnchorHTMLAttributes<HTMLAnchorElement>;

export const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => (
    <a
      ref={ref}
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    />
  ),
);
ButtonLink.displayName = "ButtonLink";
