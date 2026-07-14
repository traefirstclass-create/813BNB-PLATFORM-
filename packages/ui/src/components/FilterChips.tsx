"use client";

import { cn } from "../lib/cn";

export interface FilterChip {
  id: string;
  label: string;
}

interface FilterChipsProps {
  chips: FilterChip[];
  active: string[];
  onToggle: (id: string) => void;
}

export function FilterChips({ chips, active, onToggle }: FilterChipsProps) {
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Quick filters">
      {chips.map((chip) => {
        const isActive = active.includes(chip.id);
        return (
          <button
            key={chip.id}
            type="button"
            aria-pressed={isActive}
            onClick={() => onToggle(chip.id)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
              isActive
                ? "border-brand-teal bg-teal-600 text-white"
                : "border-charcoal-300 bg-white text-charcoal-700 hover:border-brand-teal hover:text-brand-teal",
            )}
          >
            {chip.label}
          </button>
        );
      })}
    </div>
  );
}
