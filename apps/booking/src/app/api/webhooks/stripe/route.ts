import { NextResponse } from "next/server";
import { prisma } from "@813bnb/db";
import { stripe } from "@/lib/stripe";
import { env } from "@/lib/env";

/**
 * Source-of-truth webhook: Stripe calls this once a PaymentIntent actually
 * succeeds, independent of whether the browser stayed on the checkout page.
 * Requires STRIPE_WEBHOOK_SECRET to verify the signature — returns 501 in
 * stub mode since there's no live Stripe account to send events yet.
 */
export async function POST(request: Request) {
  if (!stripe || !env.stripe.webhookSecret) {
    return NextResponse.json(
      { error: "Stripe webhook not configured — running in stub mode." },
      { status: 501 },
    );
  }

  const signature = request.headers.get("stripe-signature");
  const rawBody = await request.text();

  let event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature ?? "", env.stripe.webhookSecret);
  } catch (err) {
    return NextResponse.json({ error: `Webhook signature verification failed: ${err}` }, { status: 400 });
  }

  if (event.type === "payment_intent.succeeded") {
    const intent = event.data.object as { id: string; metadata: { bookingId?: string } };
    const bookingId = intent.metadata.bookingId;
    if (bookingId) {
      await prisma.$transaction([
        prisma.booking.update({ where: { id: bookingId }, data: { status: "CONFIRMED" } }),
        prisma.payment.updateMany({
          where: { stripePaymentIntentId: intent.id, status: "PENDING" },
          data: { status: "SUCCEEDED" },
        }),
      ]);
    }
  }

  return NextResponse.json({ received: true });
}
