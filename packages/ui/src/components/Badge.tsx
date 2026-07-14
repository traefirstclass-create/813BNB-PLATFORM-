import type { HTMLAttributes } from "react";
import { cn } from "../lib/cn";

const variants = {
  teal: "bg-teal-100 text-teal-800",
  orange: "bg-orange-100 text-orange-800",
  neutral: "bg-charcoal-100 text-charcoal-700",
};

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: keyof typeof variants;
}

export function Badge({ className, variant = "neutral", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
