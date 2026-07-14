import { describe, expect, it } from "vitest";
import { nightsBetween, priceBooking } from "./availability";

describe("nightsBetween", () => {
  it("computes whole nights between two dates", () => {
    expect(nightsBetween(new Date("2026-09-10"), new Date("2026-09-14"))).toBe(4);
  });
});

describe("priceBooking", () => {
  const baseUnit = {
    nightlyRate: 100,
    weeklyRate: 600,
    monthlyRate: 2400,
    cleaningFee: 50,
  };

  it("uses the nightly rate for short stays", () => {
    const result = priceBooking({
      ...baseUnit,
      checkIn: new Date("2026-09-10"),
      checkOut: new Date("2026-09-13"), // 3 nights
    });
    expect(result.rateType).toBe("NIGHTLY");
    expect(result.nights).toBe(3);
    expect(result.subtotal).toBe(300);
    expect(result.cleaningFee).toBe(50);
    expect(result.taxes).toBeCloseTo(300 * 0.13, 2);
    expect(result.totalAmount).toBeCloseTo(300 + 50 + 300 * 0.13, 2);
  });

  it("uses the weekly rate once a stay reaches 7 nights", () => {
    const result = priceBooking({
      ...baseUnit,
      checkIn: new Date("2026-09-10"),
      checkOut: new Date("2026-09-17"), // 7 nights
    });
    expect(result.rateType).toBe("WEEKLY");
    expect(result.subtotal).toBe(600);
  });

  it("uses the monthly rate once a stay reaches 28 nights", () => {
    const result = priceBooking({
      ...baseUnit,
      checkIn: new Date("2026-09-01"),
      checkOut: new Date("2026-09-29"), // 28 nights
    });
    expect(result.rateType).toBe("MONTHLY");
    expect(result.subtotal).toBeCloseTo(2400 * (28 / 30), 2);
  });

  it("falls back to nightly pricing when no weekly/monthly rate is set", () => {
    const result = priceBooking({
      nightlyRate: 100,
      weeklyRate: null,
      monthlyRate: null,
      cleaningFee: 50,
      checkIn: new Date("2026-09-10"),
      checkOut: new Date("2026-09-20"), // 10 nights, but no weekly rate available
    });
    expect(result.rateType).toBe("NIGHTLY");
    expect(result.subtotal).toBe(1000);
  });
});
