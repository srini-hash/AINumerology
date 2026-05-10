import { NextResponse } from "next/server";
import { buildGenZNarrative } from "@/lib/genZNarrative";
import type { NumerologyProfile } from "@/lib/numerology";
import { shareStore } from "@/lib/store";

export async function GET(_: Request, ctx: { params: Promise<{ shareId: string }> }) {
  const { shareId } = await ctx.params;
  const data = shareStore.get(shareId);
  if (!data) return NextResponse.json({ error: "Share not found." }, { status: 404 });
  const profile = data.profile as NumerologyProfile;
  return NextResponse.json({ ...data, genZ: buildGenZNarrative(profile) });
}
