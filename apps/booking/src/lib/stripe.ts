import Stripe from "stripe";
import { env } from "./env";

export const stripe = env.stripe.isConfigured
  ? new Stripe(env.stripe.secretKey, { apiVersion: "2025-02-24.acacia" })
  : null;

interface CreatePaymentIntentArgs {
  amountCents: number;
  bookingId: string;
  confirmationCode: string;
}

/**
 * Wraps Stripe PaymentIntent creation. Card, Apple Pay, and Google Pay are
 * all handled by Stripe's automatic_payment_methods + Elements/Checkout on
 * the client — this app never touches raw card numbers. Cash App Pay rides
 * along as a Stripe payment method once enabled on the account. Falls back
 * to a stub intent when STRIPE_SECRET_KEY isn't set, so the checkout UI is
 * still exercisable in local/sandbox dev without live keys.
 */
export async function createBookingPaymentIntent({
  amountCents,
  bookingId,
  confirmationCode,
}: CreatePaymentIntentArgs) {
  if (!stripe) {
    return {
      clientSecret: `stub_secret_${bookingId}`,
      id: `stub_pi_${bookingId}`,
      isStub: true as const,
    };
  }

  const intent = await stripe.paymentIntents.create({
    amount: amountCents,
    currency: "usd",
    automatic_payment_methods: { enabled: true },
    metadata: { bookingId, confirmationCode },
  });

  return { clientSecret: intent.client_secret!, id: intent.id, isStub: false as const };
}
