import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@813bnb/db";
import { notifyNewLead } from "@/lib/notifications";

const leadSchema = z.object({
  type: z.enum([
    "SELL_YOUR_HOUSE",
    "INVESTOR",
    "PROPERTY_MANAGEMENT",
    "GOVERNMENT_HOUSING",
    "CORPORATE_HOUSING",
    "CONTACT",
  ]),
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(7),
  city: z.string().optional(),
  propertyAddress: z.string().optional(),
  amountAvailableToInvest: z.number().positive().optional(),
  investmentType: z.enum(["PARTNERSHIP", "SINGLE_UNIT", "MULTI_FAMILY", "ARBITRAGE", "OTHER"]).optional(),
  message: z.string().optional(),
  sourcePage: z.string(),
});

// In-memory rate limit: same email+page combo at most once per minute.
// Sufficient for a single-instance deploy; swap for a shared store (Redis/
// Upstash) if this runs across multiple serverless instances under load.
const recentSubmissions = new Map<string, number>();

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const key = `${parsed.data.email}:${parsed.data.sourcePage}`;
  const last = recentSubmissions.get(key);
  if (last && Date.now() - last < 60_000) {
    return NextResponse.json({ error: "Please wait a moment before submitting again." }, { status: 429 });
  }
  recentSubmissions.set(key, Date.now());

  const lead = await prisma.lead.create({
    data: {
      type: parsed.data.type,
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone,
      city: parsed.data.city,
      propertyAddress: parsed.data.propertyAddress,
      amountAvailableToInvest: parsed.data.amountAvailableToInvest,
      investmentType: parsed.data.investmentType,
      message: parsed.data.message,
      sourceSite: "tampabaylodgingco.com",
      sourcePage: parsed.data.sourcePage,
    },
  });

  await notifyNewLead(
    `New ${parsed.data.type} lead from ${parsed.data.name} (${parsed.data.email}, ${parsed.data.phone}) via ${parsed.data.sourcePage}`,
  );

  // Integration point for a CRM (HubSpot, Follow Up Boss): push `lead` here
  // once an account/API key is available. Left as a no-op for now.

  return NextResponse.json({ id: lead.id });
}
