import { NextResponse } from "next/server";
import { shareStore } from "@/lib/store";

export async function GET(_: Request, ctx: { params: Promise<{ shareId: string }> }) {
  const { shareId } = await ctx.params;
  const data = shareStore.get(shareId);
  if (!data) return NextResponse.json({ error: "Share not found." }, { status: 404 });
  return NextResponse.json(data);
}
