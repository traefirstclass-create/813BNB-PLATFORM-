import { test, expect } from "@playwright/test";

/** Requires seeded demo accounts (`pnpm db:seed`) — password Demo1234! for all. */

test("guest can log into the Client Portal and view a booking", async ({ page }) => {
  await page.goto("/login");
  await page.getByLabel("Email").fill("guest@example.com");
  await page.getByLabel("Password").fill("Demo1234!");
  await page.getByRole("button", { name: "Sign in" }).click();

  await expect(page).toHaveURL(/\/portal/);
  await expect(page.getByText("Client Portal")).toBeVisible();
  await expect(page.getByText("Old West Studio Lofts")).toBeVisible();
});

test("owner can log into the Owner Portal and view revenue", async ({ page }) => {
  await page.goto("/login?callbackUrl=/owner-portal");
  await page.getByLabel("Email").fill("owner@813bnb.com");
  await page.getByLabel("Password").fill("Demo1234!");
  await page.getByRole("button", { name: "Sign in" }).click();

  await expect(page).toHaveURL(/\/owner-portal/);
  await expect(page.getByText("Owner Portal")).toBeVisible();
  await expect(page.getByText("Total net payout to date")).toBeVisible();
});
