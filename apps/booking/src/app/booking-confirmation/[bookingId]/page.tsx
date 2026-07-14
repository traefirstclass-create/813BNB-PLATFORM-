import { notFound } from "next/navigation";
import { ButtonLink } from "@813bnb/ui";
import { prisma } from "@813bnb/db";

const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

interface ConfirmationPageProps {
  params: Promise<{ bookingId: string }>;
}

export default async function BookingConfirmationPage({ params }: ConfirmationPageProps) {
  const { bookingId } = await params;

  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: { unit: { include: { property: true } } },
  });

  if (!booking || booking.status !== "CONFIRMED") notFound();

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-teal-100 text-teal-700">
        ✓
      </div>
      <h1 className="mt-4 font-display text-display-2 font-semibold text-charcoal-900">Booking confirmed</h1>
      <p className="mt-2 text-charcoal-600">
        Confirmation code <span className="font-mono font-semibold">{booking.confirmationCode}</span> — a text and
        email confirmation are on the way.
      </p>

      <div className="mt-8 rounded-l border border-charcoal-200 bg-white p-6 text-left shadow-card">
        <h2 className="font-display text-lg font-semibold text-charcoal-900">{booking.unit.property.name}</h2>
        <p className="mt-1 text-sm text-charcoal-500">
          {booking.checkIn.toISOString().slice(0, 10)} – {booking.checkOut.toISOString().slice(0, 10)} ·{" "}
          {booking.guestCount} guests
        </p>
        <p className="mt-3 text-sm font-semibold text-charcoal-900">
          Total paid: {currency.format(Number(booking.totalAmount))}
        </p>
      </div>

      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <ButtonLink href="/portal" variant="primary">
          View in Client Portal
        </ButtonLink>
        <ButtonLink href="/stay" variant="secondary">
          Browse more stays
        </ButtonLink>
      </div>
    </div>
  );
}
