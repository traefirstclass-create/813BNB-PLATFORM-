import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@813bnb/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { isUnitAvailable, priceBooking } from "@/lib/availability";
import { createBookingPaymentIntent } from "@/lib/stripe";

const bookingSchema = z.object({
  unitId: z.string().min(1),
  checkIn: z.string().date(),
  checkOut: z.string().date(),
  guestCount: z.number().int().min(1),
  guestEmail: z.string().email(),
  guestName: z.string().min(1),
  specialRequests: z.string().optional(),
});

function generateConfirmationCode() {
  return `813BNB-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
}

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = bookingSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { unitId, guestCount, guestEmail, guestName, specialRequests } = parsed.data;
  const checkIn = new Date(parsed.data.checkIn);
  const checkOut = new Date(parsed.data.checkOut);

  if (checkOut <= checkIn) {
    return NextResponse.json({ error: "Check-out must be after check-in." }, { status: 400 });
  }

  const unit = await prisma.unit.findUnique({ where: { id: unitId }, include: { property: true } });
  if (!unit || !unit.isPublished || !unit.property.isPublished) {
    return NextResponse.json({ error: "Unit not found." }, { status: 404 });
  }
  if (guestCount > unit.maxGuests) {
    return NextResponse.json({ error: `This unit sleeps a maximum of ${unit.maxGuests} guests.` }, { status: 400 });
  }

  const available = await isUnitAvailable(unitId, checkIn, checkOut);
  if (!available) {
    return NextResponse.json({ error: "Those dates are no longer available." }, { status: 409 });
  }

  const session = await getServerSession(authOptions);

  // Server always recomputes price from the unit's stored rates — never
  // trusts a client-submitted amount.
  const priced = priceBooking({
    nightlyRate: Number(unit.nightlyRate),
    weeklyRate: unit.weeklyRate ? Number(unit.weeklyRate) : null,
    monthlyRate: unit.monthlyRate ? Number(unit.monthlyRate) : null,
    cleaningFee: Number(unit.cleaningFee),
    checkIn,
    checkOut,
  });

  let guestUser = session?.user
    ? await prisma.user.findUnique({ where: { id: session.user.id } })
    : await prisma.user.findUnique({ where: { email: guestEmail } });

  if (!guestUser) {
    guestUser = await prisma.user.create({
      data: { email: guestEmail, name: guestName, role: "GUEST" },
    });
  }

  const confirmationCode = generateConfirmationCode();

  const booking = await prisma.booking.create({
    data: {
      confirmationCode,
      unitId,
      guestId: guestUser.id,
      checkIn,
      checkOut,
      guestCount,
      rateType: priced.rateType,
      subtotal: priced.subtotal,
      cleaningFee: priced.cleaningFee,
      taxes: priced.taxes,
      totalAmount: priced.totalAmount,
      status: "PENDING_PAYMENT",
      specialRequests,
    },
  });

  const intent = await createBookingPaymentIntent({
    amountCents: Math.round(priced.totalAmount * 100),
    bookingId: booking.id,
    confirmationCode,
  });

  await prisma.payment.create({
    data: {
      bookingId: booking.id,
      method: "CARD",
      status: "PENDING",
      amount: priced.totalAmount,
      stripePaymentIntentId: intent.id,
    },
  });

  return NextResponse.json({
    bookingId: booking.id,
    confirmationCode,
    clientSecret: intent.clientSecret,
    isStubPayment: intent.isStub,
    totalAmount: priced.totalAmount,
  });
}
