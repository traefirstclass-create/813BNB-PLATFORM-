import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@813bnb/db";

/**
 * Staff-only: manually confirm a Zelle payment arrived, since Zelle has no
 * webhook or API to verify it automatically.
 */
export async function POST(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session?.user || (session.user.role !== "STAFF" && session.user.role !== "ADMIN")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;
  const payment = await prisma.payment.update({
    where: { id },
    data: { status: "SUCCEEDED", reconciledByStaffId: session.user.id },
  });

  await prisma.booking.update({ where: { id: payment.bookingId }, data: { status: "CONFIRMED" } });

  return NextResponse.json({ status: "SUCCEEDED" });
}
