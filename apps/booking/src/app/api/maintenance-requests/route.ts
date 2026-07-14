import { NextResponse } from "next/server";
import { z } from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@813bnb/db";

const schema = z.object({
  propertyId: z.string().min(1),
  unitId: z.string().min(1),
  description: z.string().min(1),
});

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const parsed = schema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const property = await prisma.property.findUnique({ where: { id: parsed.data.propertyId } });
  if (!property || (property.ownerId !== session.user.id && session.user.role === "OWNER")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const req = await prisma.maintenanceRequest.create({
    data: {
      propertyId: parsed.data.propertyId,
      unitId: parsed.data.unitId,
      requestedById: session.user.id,
      description: parsed.data.description,
    },
  });

  return NextResponse.json({ id: req.id });
}
