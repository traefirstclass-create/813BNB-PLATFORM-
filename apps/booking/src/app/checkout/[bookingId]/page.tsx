import { notFound } from "next/navigation";
import { prisma } from "@813bnb/db";
import { stripe } from "@/lib/stripe";
import { CheckoutForm } from "@/components/CheckoutForm";

const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

interface CheckoutPageProps {
  params: Promise<{ bookingId: string }>;
}

export default async function CheckoutPage({ params }: CheckoutPageProps) {
  const { bookingId } = await params;

  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: { unit: { include: { property: true } }, payments: true },
  });

  if (!booking) notFound();
  if (booking.status === "CONFIRMED") notFound(); // already paid — nothing to check out

  const payment = booking.payments[0];
  if (!payment?.stripePaymentIntentId) notFound();

  const isStubPayment = payment.stripePaymentIntentId.startsWith("stub_pi_");
  const clientSecret = isStubPayment
    ? `stub_secret_${booking.id}`
    : ((await stripe!.paymentIntents.retrieve(payment.stripePaymentIntentId)).client_secret ?? "");

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-display-2 font-semibold text-charcoal-900">Confirm and pay</h1>

      <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="rounded-l border border-charcoal-200 bg-white p-5 shadow-card">
          <h2 className="font-display text-lg font-semibold text-charcoal-900">{booking.unit.property.name}</h2>
          <p className="mt-1 text-sm text-charcoal-500">
            {booking.checkIn.toISOString().slice(0, 10)} – {booking.checkOut.toISOString().slice(0, 10)} ·{" "}
            {booking.guestCount} guests
          </p>
          <div className="mt-4 space-y-1 border-t border-charcoal-200 pt-4 text-sm">
            <div className="flex justify-between text-charcoal-600">
              <span>Subtotal</span>
              <span>{currency.format(Number(booking.subtotal))}</span>
            </div>
            <div className="flex justify-between text-charcoal-600">
              <span>Cleaning fee</span>
              <span>{currency.format(Number(booking.cleaningFee))}</span>
            </div>
            <div className="flex justify-between text-charcoal-600">
              <span>Taxes</span>
              <span>{currency.format(Number(booking.taxes))}</span>
            </div>
            <div className="flex justify-between border-t border-charcoal-200 pt-1 font-semibold text-charcoal-900">
              <span>Total</span>
              <span>{currency.format(Number(booking.totalAmount))}</span>
            </div>
          </div>
        </div>

        <CheckoutForm bookingId={booking.id} clientSecret={clientSecret} isStubPayment={isStubPayment} />
      </div>
    </div>
  );
}
