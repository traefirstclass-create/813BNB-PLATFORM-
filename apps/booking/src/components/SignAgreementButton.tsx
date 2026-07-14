"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@813bnb/ui";

export function SignAgreementButton({ bookingId, status }: { bookingId: string; status: string }) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  if (status === "SIGNED") {
    return <p className="text-sm font-semibold text-teal-700">Signed — thank you.</p>;
  }

  async function handleSign() {
    setSubmitting(true);
    await fetch(`/api/bookings/${bookingId}/agreement/sign`, { method: "POST" });
    setSubmitting(false);
    router.refresh();
  }

  return (
    <Button onClick={handleSign} disabled={submitting} variant="accent" size="lg">
      {submitting ? "Signing…" : "I agree — sign electronically"}
    </Button>
  );
}
