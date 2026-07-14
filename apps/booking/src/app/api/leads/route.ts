import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@813bnb/db";

const leadSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(7),
  message: z.string().optional(),
  sourcePage: z.string(),
});

// Simple rate limit: same email can submit at most once per minute per page.
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
      type: "CONTACT",
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone,
      message: parsed.data.message,
      sourceSite: "813bnb.com",
      sourcePage: parsed.data.sourcePage,
    },
  });

  return NextResponse.json({ id: lead.id });
}
