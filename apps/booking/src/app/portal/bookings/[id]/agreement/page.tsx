import { notFound, redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@813bnb/db";
import { SignAgreementButton } from "@/components/SignAgreementButton";

interface AgreementPageProps {
  params: Promise<{ id: string }>;
}

export default async function AgreementPage({ params }: AgreementPageProps) {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/login");

  const { id } = await params;
  const booking = await prisma.booking.findUnique({
    where: { id },
    include: { unit: { include: { property: true } }, agreement: true, guest: true },
  });

  if (!booking || booking.guestId !== session.user.id) notFound();

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-display-2 font-semibold text-charcoal-900">Rental Agreement</h1>
      <p className="mt-1 text-sm text-charcoal-500">Confirmation {booking.confirmationCode}</p>

      <div className="mt-6 rounded-l border border-charcoal-200 bg-white p-6 shadow-card">
        <h2 className="font-display text-lg font-semibold text-charcoal-900">Short-Term Rental Agreement</h2>
        <div className="mt-3 space-y-2 text-sm text-charcoal-700">
          <p>
            This agreement is between Tampa Bay Lodging Corporation (&ldquo;Host&rdquo;) and {booking.guest.name}{" "}
            (&ldquo;Guest&rdquo;) for the property {booking.unit.property.name} located at{" "}
            {booking.unit.property.addressLine1}, {booking.unit.property.city}, {booking.unit.property.state}.
          </p>
          <p>
            Stay dates: {booking.checkIn.toISOString().slice(0, 10)} to {booking.checkOut.toISOString().slice(0, 10)}.
            Guest count: {booking.guestCount}.
          </p>
          <p className="text-charcoal-500">
            {"{{FULL_RENTAL_AGREEMENT_LEGAL_TEXT}}"} — placeholder pending final legal terms and conditions from
            Rasheen / legal counsel before launch.
          </p>
        </div>

        <div className="mt-6 border-t border-charcoal-200 pt-4">
          <SignAgreementButton bookingId={booking.id} status={booking.agreement?.status ?? "NOT_SENT"} />
        </div>
      </div>
    </div>
  );
}
