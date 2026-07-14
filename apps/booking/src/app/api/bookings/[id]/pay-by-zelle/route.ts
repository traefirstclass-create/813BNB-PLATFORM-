import { NextResponse } from "next/server";
import { prisma } from "@813bnb/db";

/**
 * Zelle has no public merchant API — this is a manual instruction +
 * admin-reconciliation flow, NOT an automated payment integration. The
 * booking stays PENDING_PAYMENT until staff confirms the Zelle transfer
 * arrived and reconciles it via /api/admin/payments/[id]/reconcile-zelle.
 */
export async function POST(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const booking = await prisma.booking.findUnique({ where: { id } });
  if (!booking) return NextResponse.json({ error: "Booking not found." }, { status: 404 });

  const zelleHandle = process.env.NEXT_PUBLIC_ZELLE_HANDLE ?? "{{ZELLE_HANDLE}}";
  const note = `Guest to send $${Number(booking.totalAmount).toFixed(2)} via Zelle to ${zelleHandle}, memo: ${booking.confirmationCode}`;

  await prisma.payment.updateMany({
    where: { bookingId: id, status: "PENDING" },
    data: { method: "ZELLE_MANUAL", zelleReferenceNote: note },
  });

  return NextResponse.json({ instructions: note });
}
