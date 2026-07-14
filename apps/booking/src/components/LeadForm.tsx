"use client";

import { useState, type FormEvent } from "react";
import { Button, Input, Textarea } from "@813bnb/ui";

interface LeadFormProps {
  sourcePage: string;
  submitLabel?: string;
  messagePlaceholder?: string;
}

export function LeadForm({ sourcePage, submitLabel = "Request info", messagePlaceholder }: LeadFormProps) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage(null);

    const form = new FormData(e.currentTarget);
    const payload = {
      name: String(form.get("name") ?? ""),
      email: String(form.get("email") ?? ""),
      phone: String(form.get("phone") ?? ""),
      message: String(form.get("message") ?? ""),
      sourcePage,
    };

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json();
        setErrorMessage(data.error?.formErrors?.[0] ?? data.error ?? "Something went wrong.");
        setStatus("error");
        return;
      }
      setStatus("success");
      (e.target as HTMLFormElement).reset();
    } catch {
      setErrorMessage("Network error — please try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-l border border-teal-200 bg-teal-50 p-5 text-teal-800">
        Thanks — we received your request and will follow up shortly.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 rounded-l border border-charcoal-200 bg-white p-5 shadow-card">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Input name="name" label="Full name" required />
        <Input name="phone" label="Phone" type="tel" required />
      </div>
      <Input name="email" label="Email" type="email" required />
      <Textarea name="message" label="Message" placeholder={messagePlaceholder} />
      {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}
      <Button type="submit" variant="accent" size="lg" className="w-full" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending…" : submitLabel}
      </Button>
    </form>
  );
}
