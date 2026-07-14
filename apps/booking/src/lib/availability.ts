import { prisma } from "@813bnb/db";

/**
 * A unit is unavailable for a date range if it overlaps a CONFIRMED or
 * PENDING_PAYMENT booking (pending holds the dates briefly while checkout
 * completes) or a manual AvailabilityBlock. Overlap test: existing.start <
 * requested.end AND existing.end > requested.start.
 */
export async function isUnitAvailable(unitId: string, checkIn: Date, checkOut: Date) {
  const [overlappingBooking, overlappingBlock] = await Promise.all([
    prisma.booking.findFirst({
      where: {
        unitId,
        status: { in: ["CONFIRMED", "PENDING_PAYMENT"] },
        checkIn: { lt: checkOut },
        checkOut: { gt: checkIn },
      },
    }),
    prisma.availabilityBlock.findFirst({
      where: {
        unitId,
        startDate: { lt: checkOut },
        endDate: { gt: checkIn },
      },
    }),
  ]);

  return !overlappingBooking && !overlappingBlock;
}

export function nightsBetween(checkIn: Date, checkOut: Date) {
  const ms = checkOut.getTime() - checkIn.getTime();
  return Math.round(ms / (1000 * 60 * 60 * 24));
}

const TAX_RATE = 0.13; // Florida + Hillsborough County tourist/sales tax placeholder — confirm exact rate before launch.

export function priceBooking({
  nightlyRate,
  weeklyRate,
  monthlyRate,
  cleaningFee,
  checkIn,
  checkOut,
}: {
  nightlyRate: number;
  weeklyRate: number | null;
  monthlyRate: number | null;
  cleaningFee: number;
  checkIn: Date;
  checkOut: Date;
}) {
  const nights = nightsBetween(checkIn, checkOut);
  let subtotal: number;
  let rateType: "NIGHTLY" | "WEEKLY" | "MONTHLY";

  if (nights >= 28 && monthlyRate) {
    const months = nights / 30;
    subtotal = Math.round(monthlyRate * months * 100) / 100;
    rateType = "MONTHLY";
  } else if (nights >= 7 && weeklyRate) {
    const weeks = nights / 7;
    subtotal = Math.round(weeklyRate * weeks * 100) / 100;
    rateType = "WEEKLY";
  } else {
    subtotal = nightlyRate * nights;
    rateType = "NIGHTLY";
  }

  const taxes = Math.round(subtotal * TAX_RATE * 100) / 100;
  const totalAmount = Math.round((subtotal + cleaningFee + taxes) * 100) / 100;

  return { nights, rateType, subtotal, cleaningFee, taxes, totalAmount };
}
