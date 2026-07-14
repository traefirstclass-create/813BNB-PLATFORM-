"use client";

import { useState, type FormEvent } from "react";
import { Button } from "./Button";

export interface SearchBarValues {
  destination: string;
  checkIn: string;
  checkOut: string;
  guests: number;
}

interface SearchBarProps {
  initialValues?: Partial<SearchBarValues>;
  onSearch: (values: SearchBarValues) => void;
}

export function SearchBar({ initialValues, onSearch }: SearchBarProps) {
  const [destination, setDestination] = useState(initialValues?.destination ?? "");
  const [checkIn, setCheckIn] = useState(initialValues?.checkIn ?? "");
  const [checkOut, setCheckOut] = useState(initialValues?.checkOut ?? "");
  const [guests, setGuests] = useState(initialValues?.guests ?? 1);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onSearch({ destination, checkIn, checkOut, guests });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full flex-col gap-3 rounded-l border border-charcoal-200 bg-white p-3 shadow-card-lg sm:flex-row sm:items-end sm:gap-2"
      role="search"
      aria-label="Search stays"
    >
      <div className="flex-1">
        <label htmlFor="search-destination" className="block text-xs font-semibold text-charcoal-500">
          Destination
        </label>
        <input
          id="search-destination"
          type="text"
          placeholder="Neighborhood, city, or property"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="mt-1 h-10 w-full border-0 bg-transparent p-0 text-sm text-charcoal-900 placeholder:text-charcoal-400 focus:outline-none"
        />
      </div>
      <div className="hidden h-10 w-px bg-charcoal-200 sm:block" />
      <div>
        <label htmlFor="search-checkin" className="block text-xs font-semibold text-charcoal-500">
          Check-in
        </label>
        <input
          id="search-checkin"
          type="date"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
          className="mt-1 h-10 border-0 bg-transparent p-0 text-sm text-charcoal-900 focus:outline-none"
        />
      </div>
      <div className="hidden h-10 w-px bg-charcoal-200 sm:block" />
      <div>
        <label htmlFor="search-checkout" className="block text-xs font-semibold text-charcoal-500">
          Check-out
        </label>
        <input
          id="search-checkout"
          type="date"
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
          className="mt-1 h-10 border-0 bg-transparent p-0 text-sm text-charcoal-900 focus:outline-none"
        />
      </div>
      <div className="hidden h-10 w-px bg-charcoal-200 sm:block" />
      <div>
        <label htmlFor="search-guests" className="block text-xs font-semibold text-charcoal-500">
          Guests
        </label>
        <input
          id="search-guests"
          type="number"
          min={1}
          max={16}
          value={guests}
          onChange={(e) => setGuests(Number(e.target.value))}
          className="mt-1 h-10 w-16 border-0 bg-transparent p-0 text-sm text-charcoal-900 focus:outline-none"
        />
      </div>
      <Button type="submit" variant="accent" size="lg" className="w-full sm:w-auto">
        Search
      </Button>
    </form>
  );
}
