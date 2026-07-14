import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@813bnb/db";

export async function POST(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const booking = await prisma.booking.findUnique({ where: { id }, include: { agreement: true } });
  if (!booking || booking.guestId !== session.user.id) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const agreement = await prisma.rentalAgreement.update({
    where: { bookingId: id },
    data: { status: "SIGNED", signedAt: new Date() },
  });

  return NextResponse.json({ status: agreement.status });
}
