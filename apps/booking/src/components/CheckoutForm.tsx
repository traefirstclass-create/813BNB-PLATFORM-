"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button } from "@813bnb/ui";
import { env } from "@/lib/env";

const stripePromise = env.stripe.publishableKey ? loadStripe(env.stripe.publishableKey) : null;

interface CheckoutFormProps {
  bookingId: string;
  clientSecret: string;
  isStubPayment: boolean;
}

function StubPaymentPanel({ bookingId }: { bookingId: string }) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleConfirm() {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch(`/api/bookings/${bookingId}/confirm`, { method: "POST" });
      if (!res.ok) throw new Error("Failed to confirm booking.");
      router.push(`/booking-confirmation/${bookingId}`);
    } catch {
      setError("Something went wrong confirming your booking.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="rounded-l border border-dashed border-orange-400 bg-orange-50 p-5">
      <p className="text-sm font-semibold text-orange-800">Sandbox payment mode</p>
      <p className="mt-1 text-sm text-orange-700">
        No live Stripe key is configured yet, so this simulates a successful card payment instead of charging a
        real card. Add <code>STRIPE_SECRET_KEY</code> and{" "}
        <code>NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY</code> to switch to real Stripe Elements checkout.
      </p>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      <Button className="mt-4" variant="accent" onClick={handleConfirm} disabled={submitting}>
        {submitting ? "Confirming…" : "Simulate successful payment"}
      </Button>
    </div>
  );
}

function StripeElementsForm({ bookingId }: { bookingId: string }) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!stripe || !elements) return;
    setSubmitting(true);
    setError(null);

    const { error: stripeError, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (stripeError) {
      setError(stripeError.message ?? "Payment failed.");
      setSubmitting(false);
      return;
    }

    if (paymentIntent?.status === "succeeded") {
      await fetch(`/api/bookings/${bookingId}/confirm`, { method: "POST" });
      router.push(`/booking-confirmation/${bookingId}`);
    } else {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-l border border-charcoal-200 bg-white p-5 shadow-card">
      <PaymentElement />
      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
      <Button type="submit" variant="accent" size="lg" className="mt-4 w-full" disabled={!stripe || submitting}>
        {submitting ? "Processing…" : "Pay and confirm booking"}
      </Button>
    </form>
  );
}

function ZellePanel({ bookingId }: { bookingId: string }) {
  const [instructions, setInstructions] = useState<string | null>(null);

  async function handleRequestInstructions() {
    const res = await fetch(`/api/bookings/${bookingId}/pay-by-zelle`, { method: "POST" });
    const data = await res.json();
    setInstructions(data.instructions);
  }

  return (
    <div className="rounded-l border border-dashed border-charcoal-300 bg-surface-2 p-5">
      <p className="text-sm font-semibold text-charcoal-800">Pay by Zelle</p>
      <p className="mt-1 text-sm text-charcoal-600">
        Zelle payments are manual — send the transfer using the instructions below, then our team confirms receipt
        and marks your reservation confirmed. This isn&apos;t instant like card payment.
      </p>
      {instructions ? (
        <p className="mt-3 rounded-s bg-white p-3 font-mono text-xs text-charcoal-800">{instructions}</p>
      ) : (
        <Button className="mt-3" variant="secondary" onClick={handleRequestInstructions}>
          Get Zelle instructions
        </Button>
      )}
    </div>
  );
}

export function CheckoutForm({ bookingId, clientSecret, isStubPayment }: CheckoutFormProps) {
  const [tab, setTab] = useState<"card" | "zelle">("card");

  return (
    <div>
      <div className="mb-4 flex gap-2">
        <button
          type="button"
          onClick={() => setTab("card")}
          className={`rounded-full px-3 py-1.5 text-xs font-semibold ${tab === "card" ? "bg-brand-teal text-white" : "bg-surface-2 text-charcoal-600"}`}
        >
          Card / Apple Pay / Google Pay
        </button>
        <button
          type="button"
          onClick={() => setTab("zelle")}
          className={`rounded-full px-3 py-1.5 text-xs font-semibold ${tab === "zelle" ? "bg-brand-teal text-white" : "bg-surface-2 text-charcoal-600"}`}
        >
          Zelle
        </button>
      </div>

      {tab === "zelle" ? (
        <ZellePanel bookingId={bookingId} />
      ) : isStubPayment || !stripePromise ? (
        <StubPaymentPanel bookingId={bookingId} />
      ) : (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <StripeElementsForm bookingId={bookingId} />
        </Elements>
      )}
    </div>
  );
}
