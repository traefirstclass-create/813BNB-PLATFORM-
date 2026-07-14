"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { SearchBar, FilterChips, type SearchBarValues } from "@813bnb/ui";

const categoryChips = [
  { id: "STUDIO", label: "Studios" },
  { id: "ONE_BEDROOM", label: "1BR" },
  { id: "TWO_BEDROOM", label: "2BR" },
  { id: "THREE_BEDROOM", label: "3BR" },
  { id: "HOUSE", label: "Houses" },
];

const amenityChips = [
  { id: "waterfront", label: "Waterfront" },
  { id: "petFriendly", label: "Pet Friendly" },
  { id: "downtown", label: "Downtown" },
  { id: "luxury", label: "Luxury" },
];

export function HomeSearch() {
  const router = useRouter();
  const [active, setActive] = useState<string[]>([]);

  function toggle(id: string) {
    setActive((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }

  function handleSearch(values: SearchBarValues) {
    const params = new URLSearchParams();
    if (values.destination) params.set("destination", values.destination);
    if (values.checkIn) params.set("checkIn", values.checkIn);
    if (values.checkOut) params.set("checkOut", values.checkOut);
    if (values.guests) params.set("guests", String(values.guests));
    active.forEach((id) => params.append("filter", id));
    router.push(`/stay?${params.toString()}`);
  }

  return (
    <div className="flex flex-col gap-4">
      <SearchBar onSearch={handleSearch} />
      <div className="flex flex-col gap-2">
        <FilterChips chips={categoryChips} active={active} onToggle={toggle} />
        <FilterChips chips={amenityChips} active={active} onToggle={toggle} />
      </div>
    </div>
  );
}
