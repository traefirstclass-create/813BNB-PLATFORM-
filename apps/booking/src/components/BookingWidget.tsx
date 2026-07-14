"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Input } from "@813bnb/ui";

interface BookingWidgetProps {
  unitId: string;
  nightlyRate: number;
  weeklyRate: number | null;
  monthlyRate: number | null;
  cleaningFee: number;
  maxGuests: number;
}

const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

function estimateNights(checkIn: string, checkOut: string) {
  if (!checkIn || !checkOut) return 0;
  const ms = new Date(checkOut).getTime() - new Date(checkIn).getTime();
  return Math.max(0, Math.round(ms / (1000 * 60 * 60 * 24)));
}

export function BookingWidget({
  unitId,
  nightlyRate,
  weeklyRate,
  monthlyRate,
  cleaningFee,
  maxGuests,
}: BookingWidgetProps) {
  const router = useRouter();
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const nights = estimateNights(checkIn, checkOut);

  const estimate = useMemo(() => {
    if (nights <= 0) return null;
    let subtotal: number;
    if (nights >= 28 && monthlyRate) subtotal = monthlyRate * (nights / 30);
    else if (nights >= 7 && weeklyRate) subtotal = weeklyRate * (nights / 7);
    else subtotal = nightlyRate * nights;
    subtotal = Math.round(subtotal * 100) / 100;
    const taxes = Math.round(subtotal * 0.13 * 100) / 100;
    const total = Math.round((subtotal + cleaningFee + taxes) * 100) / 100;
    return { subtotal, taxes, total };
  }, [nights, nightlyRate, weeklyRate, monthlyRate, cleaningFee]);

  async function handleReserve() {
    setError(null);
    if (!checkIn || !checkOut) {
      setError("Choose your check-in and check-out dates.");
      return;
    }
    if (!name || !email) {
      setError("Enter your name and email to continue.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          unitId,
          checkIn,
          checkOut,
          guestCount: guests,
          guestName: name,
          guestEmail: email,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error?.formErrors?.[0] ?? data.error ?? "Something went wrong.");
        return;
      }
      router.push(`/checkout/${data.bookingId}`);
    } catch {
      setError("Network error — please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="rounded-l border border-charcoal-200 bg-white p-5 shadow-card-lg">
      <p className="text-lg font-semibold text-charcoal-900">
        {currency.format(nightlyRate)} <span className="text-sm font-normal text-charcoal-500">/ night</span>
      </p>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <Input label="Check-in" type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} required />
        <Input label="Check-out" type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} required />
      </div>
      <div className="mt-2">
        <Input
          label="Guests"
          type="number"
          min={1}
          max={maxGuests}
          value={guests}
          onChange={(e) => setGuests(Number(e.target.value))}
          hint={`Max ${maxGuests} guests`}
        />
      </div>
      <div className="mt-2 grid grid-cols-2 gap-2">
        <Input label="Full name" value={name} onChange={(e) => setName(e.target.value)} required />
        <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>

      {estimate && (
        <div className="mt-4 space-y-1 border-t border-charcoal-200 pt-4 text-sm">
          <div className="flex justify-between text-charcoal-600">
            <span>Subtotal ({nights} nights)</span>
            <span>{currency.format(estimate.subtotal)}</span>
          </div>
          <div className="flex justify-between text-charcoal-600">
            <span>Cleaning fee</span>
            <span>{currency.format(cleaningFee)}</span>
          </div>
          <div className="flex justify-between text-charcoal-600">
            <span>Taxes (est.)</span>
            <span>{currency.format(estimate.taxes)}</span>
          </div>
          <div className="flex justify-between border-t border-charcoal-200 pt-1 font-semibold text-charcoal-900">
            <span>Total</span>
            <span>{currency.format(estimate.total)}</span>
          </div>
        </div>
      )}

      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

      <Button className="mt-4 w-full" variant="accent" size="lg" onClick={handleReserve} disabled={submitting}>
        {submitting ? "Checking availability…" : "Reserve"}
      </Button>
      <p className="mt-2 text-center text-xs text-charcoal-400">You won&apos;t be charged yet.</p>
    </div>
  );
}
