/**
 * Pythagorean (Western) numerology:
 * - Letters map to 1–9 on a repeating Latin chart (see letterValues).
 * - Life Path: reduced birth month + reduced day + reduced year, then final reduction (masters 11, 22, 33).
 * - Expression / Destiny: all letters in the name.
 * - Soul Urge: vowels A, E, I, O, U, and Y.
 * - Personality: consonants (letters not counted as vowels above, so Y is excluded here).
 * - Birthday: calendar day reduced.
 *
 * Dissonance (entertainment model): pair friction uses base digits 1–9 (masters 11/22/33 → 2/4/6),
 * triads (1-4-7 / 2-5-8 / 3-6-9), and known challenging vs supportive pairs. Not a universal standard.
 */

export type ProfileInput = {
  fullName: string;
  dob: string;
};

export type NumerologyProfile = ProfileInput & {
  lifePath: number;
  expression: number;
  soulUrge: number;
  personality: number;
  birthday: number;
};

export type DissonancePair = {
  label: string;
  a: number;
  b: number;
  friction: number;
  hint: string;
};

export type InternalDissonanceReport = {
  /** 0–100; higher = more tension between core numbers in one chart. */
  score: number;
  level: "low" | "moderate" | "high";
  pairs: DissonancePair[];
  summary: string;
};

export type CompatibilityDissonanceReport = {
  /** 0–100; higher = more friction between the two people’s charts. */
  score: number;
  level: "low" | "moderate" | "high";
  pairs: DissonancePair[];
  summary: string;
};

/** Pythagorean letter–number chart (A=1 … I=9, then repeats J–R, S–Z). */
const LETTER_VALUES: Record<string, number> = {
  a: 1,
  j: 1,
  s: 1,
  b: 2,
  k: 2,
  t: 2,
  c: 3,
  l: 3,
  u: 3,
  d: 4,
  m: 4,
  v: 4,
  e: 5,
  n: 5,
  w: 5,
  f: 6,
  o: 6,
  x: 6,
  g: 7,
  p: 7,
  y: 7,
  h: 8,
  q: 8,
  z: 8,
  i: 9,
  r: 9,
};

function digitSum(n: number | string) {
  return String(Math.abs(Number(n) || 0))
    .split("")
    .reduce((acc, d) => acc + Number(d), 0);
}

/** Final reduction to a single digit or master 11 / 22 / 33. */
function reduceNumerology(n: number) {
  let value = n;
  while (value > 9 && value !== 11 && value !== 22 && value !== 33) {
    value = digitSum(value);
  }
  return value;
}

/**
 * Reduce a date part (month, day, or full year) toward one digit, keeping 11 or 22 if they appear
 * before the final Life Path sum (common Pythagorean convention).
 */
function reduceDatePart(n: number): number {
  let value = Math.abs(Math.trunc(n));
  while (value > 9 && value !== 11 && value !== 22) {
    value = digitSum(value);
  }
  return value;
}

function mapChar(ch: string) {
  return LETTER_VALUES[ch] ?? 0;
}

/** Vowels for Soul Urge; Y is included (then omitted from Personality / consonants). */
const VOWELS_SOUL_URGE = new Set(["a", "e", "i", "o", "u", "y"]);

function numberFromName(fullName: string, mode: "all" | "vowels" | "consonants") {
  const total = fullName
    .toLowerCase()
    .replace(/[^a-z]/g, "")
    .split("")
    .filter((c) => {
      if (mode === "all") return true;
      if (mode === "vowels") return VOWELS_SOUL_URGE.has(c);
      return !VOWELS_SOUL_URGE.has(c);
    })
    .reduce((acc, c) => acc + mapChar(c), 0);
  return reduceNumerology(total);
}

/** Map masters to teaching digits for pair friction; otherwise reduce to 1–9. */
export function digitBaseForFriction(n: number): number {
  if (n === 11) return 2;
  if (n === 22) return 4;
  if (n === 33) return 6;
  if (n >= 1 && n <= 9) return n;
  let v = Math.abs(Math.trunc(n));
  while (v > 9) v = digitSum(v);
  return v;
}

function triad(d: number): 0 | 1 | 2 {
  const b = digitBaseForFriction(d);
  if (b === 1 || b === 4 || b === 7) return 0;
  if (b === 2 || b === 5 || b === 8) return 1;
  return 2;
}

/**
 * Symmetric friction between two base digits 1–9 (0 = aligned, 100 = sharp tension).
 * Uses triad harmony + distance + optional challenging/supportive pair tweaks.
 */
function basePairFriction(d1: number, d2: number): number {
  const a = digitBaseForFriction(d1);
  const b = digitBaseForFriction(d2);
  if (a === b) return 6;

  let score = triad(a) === triad(b) ? 22 : 38;
  score += Math.min(22, Math.abs(a - b) * 2);

  const lo = Math.min(a, b);
  const hi = Math.max(a, b);
  const key = `${lo}-${hi}`;

  const challenging: Record<string, number> = {
    "4-5": 24,
    "5-7": 16,
    "3-4": 12,
    "7-8": 12,
    "1-8": 14,
    "2-7": 11,
    "5-8": 10,
  };
  const supportive: Record<string, number> = {
    "3-6": -14,
    "2-4": -10,
    "6-9": -12,
    "2-8": -8,
    "3-9": -10,
  };

  score += challenging[key] ?? 0;
  score += supportive[key] ?? 0;

  return Math.max(8, Math.min(100, score));
}

function frictionLevel(score: number): "low" | "moderate" | "high" {
  if (score < 34) return "low";
  if (score < 58) return "moderate";
  return "high";
}

function pairHint(friction: number, label: string, va: number, vb: number): string {
  const core =
    friction < 30
      ? "These influences tend to support each other."
      : friction < 55
        ? "There is workable tension—name what each number needs and negotiate pace."
        : "Strong contrast—expect active balancing between these pulls.";
  return `${label}: ${va} vs ${vb}. ${core}`;
}

export function analyzeInternalDissonance(profile: NumerologyProfile): InternalDissonanceReport {
  const lp = profile.lifePath;
  const ex = profile.expression;
  const su = profile.soulUrge;
  const pe = profile.personality;

  const specs: { label: string; x: number; y: number }[] = [
    { label: "Life Path vs Soul Urge", x: lp, y: su },
    { label: "Life Path vs Expression", x: lp, y: ex },
    { label: "Soul Urge vs Personality", x: su, y: pe },
    { label: "Expression vs Personality", x: ex, y: pe },
  ];

  const pairs: DissonancePair[] = specs.map(({ label, x, y }) => {
    const friction = basePairFriction(x, y);
    return {
      label,
      a: x,
      b: y,
      friction,
      hint: pairHint(friction, label, x, y),
    };
  });

  const score = Math.round(pairs.reduce((s, p) => s + p.friction, 0) / pairs.length);
  const level = frictionLevel(score);

  const summary =
    level === "low"
      ? "Your core numbers largely move in the same direction with modest inner negotiation."
      : level === "moderate"
        ? "Mixed signals between path, inner desire, and outer style—clarity on priorities helps."
        : "Pinching contrasts between major numbers—you may feel pulled between different parts of life.";

  return { score, level, pairs, summary };
}

export function analyzeCompatibilityFriction(
  profileA: NumerologyProfile,
  profileB: NumerologyProfile,
): CompatibilityDissonanceReport {
  const aLp = profileA.lifePath;
  const bLp = profileB.lifePath;
  const aSu = profileA.soulUrge;
  const bSu = profileB.soulUrge;
  const aEx = profileA.expression;
  const bEx = profileB.expression;

  const specs: { label: string; x: number; y: number }[] = [
    { label: "Life Paths", x: aLp, y: bLp },
    { label: "A Life Path vs B Soul Urge", x: aLp, y: bSu },
    { label: "B Life Path vs A Soul Urge", x: bLp, y: aSu },
    { label: "Expressions", x: aEx, y: bEx },
  ];

  const pairs: DissonancePair[] = specs.map(({ label, x, y }) => {
    const friction = basePairFriction(x, y);
    return {
      label,
      a: x,
      b: y,
      friction,
      hint: pairHint(friction, label, x, y),
    };
  });

  const score = Math.round(pairs.reduce((s, p) => s + p.friction, 0) / pairs.length);
  const level = frictionLevel(score);

  const summary =
    level === "low"
      ? "Overall pacing and needs line up enough that friction shows up as spice more than slog."
      : level === "moderate"
        ? "Expect regular calibration—different speeds and needs are workable with clear roles."
        : "Strong chart contrast—growth comes from naming differences instead of forcing sameness.";

  return { score, level, pairs, summary };
}

/** Pythagorean Life Path from ISO date YYYY-MM-DD. */
function pythagoreanLifePath(isoDob: string): number {
  const match = isoDob.trim().match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  if (!match) {
    return reduceNumerology(digitSum(isoDob.replace(/\D/g, "")));
  }
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  if (!year || !month || !day) {
    return reduceNumerology(digitSum(isoDob.replace(/\D/g, "")));
  }

  const monthReduced = reduceDatePart(month);
  const dayReduced = reduceDatePart(day);
  const yearReduced = reduceDatePart(year);
  const sum = monthReduced + dayReduced + yearReduced;
  return reduceNumerology(sum);
}

export function calculateProfile(input: ProfileInput): NumerologyProfile {
  const dayOfMonth = Number(input.dob.split("-")[2] || 0);
  return {
    ...input,
    lifePath: pythagoreanLifePath(input.dob),
    expression: numberFromName(input.fullName, "all"),
    soulUrge: numberFromName(input.fullName, "vowels"),
    personality: numberFromName(input.fullName, "consonants"),
    birthday: reduceNumerology(dayOfMonth),
  };
}

export function fallbackInterpretation(profile: NumerologyProfile) {
  const tones: Record<number, string> = {
    1: "independent starter",
    2: "harmonizer and connector",
    3: "creative communicator",
    4: "practical builder",
    5: "adaptive explorer",
    6: "supportive nurturer",
    7: "analytical seeker",
    8: "ambitious organizer",
    9: "big-picture humanitarian",
    11: "intuitive visionary",
    22: "master architect",
    33: "teacher-healer",
  };
  return [
    `Your Life Path ${profile.lifePath} points to an ${tones[profile.lifePath] || "evolving"} energy.`,
    `Expression ${profile.expression} describes how you tend to show up in public and work.`,
    `Soul Urge ${profile.soulUrge} reflects your private motivation and emotional fuel.`,
    `Personality ${profile.personality} and Birthday ${profile.birthday} add texture to your social and daily style.`,
  ].join(" ");
}

export function compareProfiles(a: NumerologyProfile, b: NumerologyProfile) {
  const aNums = [a.lifePath, a.expression, a.soulUrge, a.personality, a.birthday];
  const bNums = [b.lifePath, b.expression, b.soulUrge, b.personality, b.birthday];
  const overlap = aNums.filter((n) => bNums.includes(n)).length;
  const score = Math.min(98, 45 + overlap * 12 + (a.lifePath === b.lifePath ? 8 : 0));

  const dissonanceProfileA = analyzeInternalDissonance(a);
  const dissonanceProfileB = analyzeInternalDissonance(b);
  const dissonanceBetween = analyzeCompatibilityFriction(a, b);

  const dampen = Math.min(
    36,
    Math.round(
      dissonanceBetween.score * 0.14 +
        dissonanceProfileA.score * 0.07 +
        dissonanceProfileB.score * 0.07,
    ),
  );
  const harmonyAdjustedScore = Math.max(18, Math.min(98, score - dampen));

  return {
    score,
    harmonyAdjustedScore,
    overlap,
    dynamic:
      a.lifePath === b.lifePath
        ? "You share a similar core pace and values."
        : `Your Life Path energies (${a.lifePath} and ${b.lifePath}) can complement each other when roles are clear.`,
    dissonance: {
      profileA: dissonanceProfileA,
      profileB: dissonanceProfileB,
      between: dissonanceBetween,
    },
  };
}
