import { NextResponse } from "next/server";
import { buildGenZNarrative } from "@/lib/genZNarrative";
import { calculateProfile, compareProfiles } from "@/lib/numerology";

export async function POST(req: Request) {
  const body = await req.json();
  const personA = body?.personA;
  const personB = body?.personB;

  if (!personA?.fullName || !personA?.dob || !personB?.fullName || !personB?.dob) {
    return NextResponse.json(
      { error: "personA and personB with fullName and dob are required." },
      { status: 400 }
    );
  }

  const profileA = calculateProfile(personA);
  const profileB = calculateProfile(personB);
  const comparison = compareProfiles(profileA, profileB);

  return NextResponse.json({
    profileA,
    profileB,
    genZA: buildGenZNarrative(profileA),
    genZB: buildGenZNarrative(profileB),
    comparison,
  });
}
