import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { buildInterpretation } from "@/lib/ai";
import { analyzeInternalDissonance, calculateProfile } from "@/lib/numerology";
import { shareStore } from "@/lib/store";

export async function POST(req: Request) {
  const body = await req.json();
  const fullName = body?.fullName?.trim();
  const dob = body?.dob?.trim();

  if (!fullName || !dob) {
    return NextResponse.json({ error: "fullName and dob are required." }, { status: 400 });
  }

  const profile = calculateProfile({ fullName, dob });
  const internalDissonance = analyzeInternalDissonance(profile);
  const interpretation = await buildInterpretation(profile);
  const shareId = randomUUID().replace(/-/g, "").slice(0, 12);
  shareStore.set(shareId, { profile, interpretation, createdAt: new Date().toISOString() });

  return NextResponse.json({ profile, internalDissonance, interpretation, shareId });
}
