import { NextResponse } from "next/server";
import { prisma } from "@813bnb/db";
import { sendBookingConfirmationSms } from "@/lib/notifications";
import { sendForSignature } from "@/lib/esignature";

/**
 * Called by the checkout client immediately after Stripe confirms the
 * PaymentIntent client-side. This gives a fast UX; the Stripe webhook
 * handler (api/webhooks/stripe) is the source of truth and will also mark
 * the booking paid if this call is missed (e.g. tab closed mid-redirect).
 * Both paths are idempotent.
 */
export async function POST(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const booking = await prisma.booking.findUnique({
    where: { id },
    include: { guest: true, payments: true },
  });

  if (!booking) {
    return NextResponse.json({ error: "Booking not found." }, { status: 404 });
  }

  if (booking.status !== "CONFIRMED") {
    await prisma.$transaction([
      prisma.booking.update({ where: { id }, data: { status: "CONFIRMED" } }),
      prisma.payment.updateMany({
        where: { bookingId: id, status: "PENDING" },
        data: { status: "SUCCEEDED" },
      }),
    ]);

    if (booking.guest.phone) {
      await sendBookingConfirmationSms(booking.guest.phone, booking.confirmationCode);
    }

    const envelope = await sendForSignature(booking.id);
    await prisma.rentalAgreement.upsert({
      where: { bookingId: booking.id },
      update: { status: "SENT", envelopeId: envelope.envelopeId },
      create: { bookingId: booking.id, envelopeId: envelope.envelopeId, status: "SENT" },
    });
  }

  return NextResponse.json({ status: "CONFIRMED", confirmationCode: booking.confirmationCode });
}
