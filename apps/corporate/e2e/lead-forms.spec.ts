import { test, expect } from "@playwright/test";

test("submits the Sell Your House lead form", async ({ page }) => {
  await page.goto("/sell-your-house");

  await page.getByLabel("Full name").fill("Test Seller");
  await page.getByLabel("Phone").fill("8135551234");
  await page.getByLabel("Email").fill(`e2e-seller-${Date.now()}@example.com`);
  await page.getByLabel("City").fill("Tampa");
  await page.getByLabel("Property address").fill("123 Test St, Tampa, FL");
  await page.getByLabel("Investment type").selectOption("SINGLE_UNIT");

  await page.getByRole("button", { name: "Get my offer" }).click();

  await expect(page.getByText("Thanks — we received your request")).toBeVisible();
});

test("submits the Investors lead form", async ({ page }) => {
  await page.goto("/investors");

  await page.getByLabel("Full name").fill("Test Investor");
  await page.getByLabel("Phone").fill("8135555678");
  await page.getByLabel("Email").fill(`e2e-investor-${Date.now()}@example.com`);
  await page.getByLabel("Investment type").selectOption("PARTNERSHIP");

  await page.getByRole("button", { name: "Book a call" }).click();

  await expect(page.getByText("Thanks — we received your request")).toBeVisible();
});
