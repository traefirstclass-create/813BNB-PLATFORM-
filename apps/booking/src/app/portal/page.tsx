import { redirect } from "next/navigation";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@813bnb/db";
import { Badge, ButtonLink } from "@813bnb/ui";
import { IdVerificationForm } from "@/components/IdVerificationForm";

const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

export default async function ClientPortalPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/login?callbackUrl=/portal");

  const [bookings, idVerification] = await Promise.all([
    prisma.booking.findMany({
      where: { guestId: session.user.id },
      include: { unit: { include: { property: true } }, payments: true, agreement: true },
      orderBy: { checkIn: "desc" },
    }),
    prisma.idVerification.findUnique({ where: { userId: session.user.id } }),
  ]);

  const today = new Date();
  const upcoming = bookings.filter((b) => b.checkOut >= today);
  const past = bookings.filter((b) => b.checkOut < today);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-display-2 font-semibold text-charcoal-900">Client Portal</h1>
      <p className="mt-1 text-sm text-charcoal-500">Welcome back, {session.user.name ?? session.user.email}.</p>

      <section className="mt-8">
        <h2 className="font-display text-lg font-semibold text-charcoal-900">Upcoming reservations</h2>
        <div className="mt-3 space-y-3">
          {upcoming.length === 0 && <p className="text-sm text-charcoal-500">No upcoming reservations.</p>}
          {upcoming.map((b) => (
            <div key={b.id} className="rounded-l border border-charcoal-200 bg-white p-4 shadow-card">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="font-semibold text-charcoal-900">{b.unit.property.name}</p>
                  <p className="text-sm text-charcoal-500">
                    {b.checkIn.toISOString().slice(0, 10)} – {b.checkOut.toISOString().slice(0, 10)} · {b.guestCount}{" "}
                    guests
                  </p>
                </div>
                <Badge variant={b.status === "CONFIRMED" ? "teal" : "neutral"}>{b.status}</Badge>
              </div>
              <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-sm">
                <span className="text-charcoal-600">
                  Total: <span className="font-semibold text-charcoal-900">{currency.format(Number(b.totalAmount))}</span>{" "}
                  · Confirmation <span className="font-mono">{b.confirmationCode}</span>
                </span>
                <div className="flex gap-2">
                  <ButtonLink href={`/portal/bookings/${b.id}/receipt`} variant="secondary" size="sm">
                    Receipt
                  </ButtonLink>
                  <Link href={`/portal/bookings/${b.id}/agreement`}>
                    <Badge variant="neutral">Agreement: {b.agreement?.status ?? "NOT_SENT"}</Badge>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-lg font-semibold text-charcoal-900">Past reservations</h2>
        <div className="mt-3 space-y-3">
          {past.length === 0 && <p className="text-sm text-charcoal-500">No past reservations yet.</p>}
          {past.map((b) => (
            <div key={b.id} className="rounded-l border border-charcoal-200 bg-white p-4 opacity-80 shadow-card">
              <p className="font-semibold text-charcoal-900">{b.unit.property.name}</p>
              <p className="text-sm text-charcoal-500">
                {b.checkIn.toISOString().slice(0, 10)} – {b.checkOut.toISOString().slice(0, 10)}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-lg font-semibold text-charcoal-900">ID verification</h2>
        <p className="mt-1 text-sm text-charcoal-500">
          Required once before check-in on your first reservation. Status:{" "}
          <Badge variant={idVerification?.status === "VERIFIED" ? "teal" : "neutral"}>
            {idVerification?.status ?? "NOT_SUBMITTED"}
          </Badge>
        </p>
        <div className="mt-3">
          <IdVerificationForm currentStatus={idVerification?.status ?? null} />
        </div>
      </section>
    </div>
  );
}
