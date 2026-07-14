"use client";

import { useState, type FormEvent } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button, Input } from "@813bnb/ui";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/portal";
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const form = new FormData(e.currentTarget);

    const res = await signIn("credentials", {
      email: form.get("email"),
      password: form.get("password"),
      redirect: false,
    });

    setSubmitting(false);
    if (res?.error) {
      setError("Invalid email or password.");
      return;
    }
    router.push(callbackUrl);
  }

  return (
    <div className="mx-auto max-w-md px-4 py-16 sm:px-6">
      <h1 className="font-display text-display-2 font-semibold text-charcoal-900">Sign in</h1>
      <p className="mt-1 text-sm text-charcoal-500">Access your Client Portal or Owner Portal.</p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4 rounded-l border border-charcoal-200 bg-white p-5 shadow-card">
        <Input name="email" label="Email" type="email" required />
        <Input name="password" label="Password" type="password" required />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <Button type="submit" variant="primary" size="lg" className="w-full" disabled={submitting}>
          {submitting ? "Signing in…" : "Sign in"}
        </Button>
      </form>

      <p className="mt-4 text-xs text-charcoal-400">
        Demo accounts (seeded): guest@example.com / owner@813bnb.com / staff@813bnb.com — password{" "}
        <code>Demo1234!</code>
      </p>
    </div>
  );
}
