import { notFound, redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@813bnb/db";

const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

interface ReceiptPageProps {
  params: Promise<{ id: string }>;
}

export default async function ReceiptPage({ params }: ReceiptPageProps) {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/login");

  const { id } = await params;
  const booking = await prisma.booking.findUnique({
    where: { id },
    include: { unit: { include: { property: true } }, payments: true },
  });

  if (!booking || (booking.guestId !== session.user.id && session.user.role === "GUEST")) notFound();

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 print:py-0">
      <h1 className="font-display text-display-2 font-semibold text-charcoal-900">Receipt</h1>
      <p className="mt-1 text-sm text-charcoal-500">Confirmation {booking.confirmationCode}</p>

      <div className="mt-6 rounded-l border border-charcoal-200 bg-white p-6 shadow-card">
        <p className="font-semibold text-charcoal-900">{booking.unit.property.name}</p>
        <p className="text-sm text-charcoal-500">
          {booking.checkIn.toISOString().slice(0, 10)} – {booking.checkOut.toISOString().slice(0, 10)}
        </p>
        <table className="mt-4 w-full text-sm">
          <tbody>
            <tr>
              <td className="py-1 text-charcoal-600">Subtotal</td>
              <td className="py-1 text-right">{currency.format(Number(booking.subtotal))}</td>
            </tr>
            <tr>
              <td className="py-1 text-charcoal-600">Cleaning fee</td>
              <td className="py-1 text-right">{currency.format(Number(booking.cleaningFee))}</td>
            </tr>
            <tr>
              <td className="py-1 text-charcoal-600">Taxes</td>
              <td className="py-1 text-right">{currency.format(Number(booking.taxes))}</td>
            </tr>
            <tr className="border-t border-charcoal-200 font-semibold text-charcoal-900">
              <td className="py-2">Total</td>
              <td className="py-2 text-right">{currency.format(Number(booking.totalAmount))}</td>
            </tr>
          </tbody>
        </table>
        {booking.payments.map((p) => (
          <p key={p.id} className="mt-2 text-xs text-charcoal-400">
            Payment: {p.method} · {p.status} · {p.createdAt.toISOString().slice(0, 10)}
          </p>
        ))}
      </div>

      <p className="mt-6 text-xs text-charcoal-400 print:hidden">Use your browser&apos;s print dialog to save as PDF.</p>
    </div>
  );
}
