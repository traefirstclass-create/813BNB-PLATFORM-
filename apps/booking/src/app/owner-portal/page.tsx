import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@813bnb/db";
import { Badge } from "@813bnb/ui";
import { MaintenanceRequestForm } from "@/components/MaintenanceRequestForm";

const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

export default async function OwnerPortalPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/login?callbackUrl=/owner-portal");
  if (session.user.role !== "OWNER" && session.user.role !== "ADMIN" && session.user.role !== "STAFF") {
    redirect("/portal");
  }

  const properties = await prisma.property.findMany({
    where: { ownerId: session.user.id },
    include: {
      units: {
        include: {
          bookings: { where: { status: "CONFIRMED" }, orderBy: { checkIn: "asc" } },
          ownerStatements: { orderBy: { periodStart: "desc" }, take: 3 },
          maintenanceReqs: { orderBy: { createdAt: "desc" } },
        },
      },
    },
  });

  const allUnitIds = properties.flatMap((p) => p.units.map((u) => u.id));
  const totalRevenue = properties
    .flatMap((p) => p.units)
    .flatMap((u) => u.ownerStatements)
    .reduce((sum, s) => sum + Number(s.netPayout), 0);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-display-2 font-semibold text-charcoal-900">Owner Portal</h1>
      <p className="mt-1 text-sm text-charcoal-500">Welcome back, {session.user.name ?? session.user.email}.</p>

      <div className="mt-6 rounded-l border border-charcoal-200 bg-white p-5 shadow-card">
        <p className="text-sm text-charcoal-500">Total net payout to date</p>
        <p className="text-2xl font-semibold text-charcoal-900">{currency.format(totalRevenue)}</p>
        {totalRevenue === 0 && (
          <p className="mt-1 text-xs text-charcoal-400">
            No owner statements generated yet — statements are produced monthly once bookings complete.
          </p>
        )}
      </div>

      {properties.map((property) => (
        <section key={property.id} className="mt-8">
          <h2 className="font-display text-lg font-semibold text-charcoal-900">{property.name}</h2>
          {property.units.map((unit) => (
            <div key={unit.id} className="mt-3 space-y-4">
              <div className="rounded-l border border-charcoal-200 bg-white p-4 shadow-card">
                <h3 className="text-sm font-semibold text-charcoal-800">Upcoming & recent bookings — {unit.name}</h3>
                <div className="mt-2 space-y-2">
                  {unit.bookings.length === 0 && <p className="text-sm text-charcoal-500">No bookings yet.</p>}
                  {unit.bookings.map((b) => (
                    <div key={b.id} className="flex items-center justify-between text-sm">
                      <span>
                        {b.checkIn.toISOString().slice(0, 10)} – {b.checkOut.toISOString().slice(0, 10)}
                      </span>
                      <span className="font-medium">{currency.format(Number(b.totalAmount))}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-l border border-charcoal-200 bg-white p-4 shadow-card">
                <h3 className="text-sm font-semibold text-charcoal-800">Monthly statements</h3>
                <div className="mt-2 space-y-2">
                  {unit.ownerStatements.length === 0 && (
                    <p className="text-sm text-charcoal-500">No statements generated yet.</p>
                  )}
                  {unit.ownerStatements.map((s) => (
                    <div key={s.id} className="flex items-center justify-between text-sm">
                      <span>
                        {s.periodStart.toISOString().slice(0, 10)} – {s.periodEnd.toISOString().slice(0, 10)}
                      </span>
                      <span className="font-medium">{currency.format(Number(s.netPayout))} net</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-l border border-charcoal-200 bg-white p-4 shadow-card">
                <h3 className="text-sm font-semibold text-charcoal-800">Maintenance requests</h3>
                <div className="mt-2 space-y-2">
                  {unit.maintenanceReqs.map((r) => (
                    <div key={r.id} className="flex items-center justify-between text-sm">
                      <span className="text-charcoal-700">{r.description}</span>
                      <Badge variant={r.status === "RESOLVED" ? "teal" : "neutral"}>{r.status}</Badge>
                    </div>
                  ))}
                </div>
                <div className="mt-3">
                  <MaintenanceRequestForm propertyId={property.id} unitId={unit.id} />
                </div>
              </div>
            </div>
          ))}
        </section>
      ))}

      {properties.length === 0 && (
        <p className="mt-8 text-sm text-charcoal-500">No properties are linked to your owner account yet.</p>
      )}
      {allUnitIds.length === 0 && properties.length > 0 && (
        <p className="mt-2 text-sm text-charcoal-500">No units published yet for your properties.</p>
      )}
    </div>
  );
}
