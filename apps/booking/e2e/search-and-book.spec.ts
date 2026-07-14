import { test, expect } from "@playwright/test";

/**
 * Requires the dev DB to be seeded (`pnpm db:seed`) so Old West Studio
 * Lofts exists and is bookable. Runs checkout in Stripe sandbox/stub mode
 * (no STRIPE_SECRET_KEY needed) via the "Simulate successful payment" path.
 */
test("search, book, and pay for a stay end to end", async ({ page }) => {
  await page.goto("/");

  await page.getByPlaceholder("Neighborhood, city, or property").fill("West Tampa");
  await page.getByRole("button", { name: "Search" }).click();

  await expect(page).toHaveURL(/\/stay\?/);
  await page.getByRole("link", { name: /Old West Studio Lofts/i }).click();

  await expect(page).toHaveURL(/\/stay\/old-west-studio-lofts/);

  await page.getByLabel("Check-in").fill("2026-09-10");
  await page.getByLabel("Check-out").fill("2026-09-14");
  await page.getByLabel("Full name").fill("Test Guest");
  await page.getByLabel("Email").fill(`e2e-${Date.now()}@example.com`);

  await page.getByRole("button", { name: "Reserve" }).click();

  await expect(page).toHaveURL(/\/checkout\//, { timeout: 15_000 });
  await expect(page.getByText("Confirm and pay")).toBeVisible();

  const simulateButton = page.getByRole("button", { name: /Simulate successful payment/i });
  if (await simulateButton.isVisible()) {
    await simulateButton.click();
  } else {
    // Real Stripe Elements is configured — this path needs a Stripe test
    // card filled into the PaymentElement iframe, which is environment
    // specific and intentionally left for manual QA / a Stripe-specific
    // test helper rather than hard-coded here.
    test.skip(true, "Live Stripe Elements checkout requires a Stripe test-card helper.");
  }

  await expect(page).toHaveURL(/\/booking-confirmation\//, { timeout: 15_000 });
  await expect(page.getByText("Booking confirmed")).toBeVisible();
});
