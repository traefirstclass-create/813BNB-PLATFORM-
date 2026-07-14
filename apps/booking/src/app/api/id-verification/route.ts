import { NextResponse } from "next/server";
import { z } from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@813bnb/db";

const schema = z.object({ documentUrl: z.string().url() });

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const parsed = schema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const verification = await prisma.idVerification.upsert({
    where: { userId: session.user.id },
    update: { documentUrl: parsed.data.documentUrl, status: "PENDING", submittedAt: new Date() },
    create: { userId: session.user.id, documentUrl: parsed.data.documentUrl, status: "PENDING" },
  });

  return NextResponse.json({ status: verification.status });
}
