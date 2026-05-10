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

function digitSum(n: number | string) {
  return String(Math.abs(Number(n) || 0))
    .split("")
    .reduce((acc, d) => acc + Number(d), 0);
}

function reduceNumerology(n: number) {
  let value = n;
  while (value > 9 && value !== 11 && value !== 22 && value !== 33) {
    value = digitSum(value);
  }
  return value;
}

function mapChar(ch: string) {
  const map: Record<string, number> = {
    a: 1, j: 1, s: 1,
    b: 2, k: 2, t: 2,
    c: 3, l: 3, u: 3,
    d: 4, m: 4, v: 4,
    e: 5, n: 5, w: 5,
    f: 6, o: 6, x: 6,
    g: 7, p: 7, y: 7,
    h: 8, q: 8, z: 8,
    i: 9, r: 9,
  };
  return map[ch] || 0;
}

function numberFromName(fullName: string, mode: "all" | "vowels" | "consonants") {
  const vowels = new Set(["a", "e", "i", "o", "u"]);
  const total = fullName
    .toLowerCase()
    .replace(/[^a-z]/g, "")
    .split("")
    .filter((c) => {
      if (mode === "all") return true;
      if (mode === "vowels") return vowels.has(c);
      return !vowels.has(c);
    })
    .reduce((acc, c) => acc + mapChar(c), 0);
  return reduceNumerology(total);
}

export function calculateProfile(input: ProfileInput): NumerologyProfile {
  const day = Number(input.dob.split("-")[2] || 0);
  const lifePath = reduceNumerology(digitSum(input.dob.replace(/\D/g, "")));
  return {
    ...input,
    lifePath,
    expression: numberFromName(input.fullName, "all"),
    soulUrge: numberFromName(input.fullName, "vowels"),
    personality: numberFromName(input.fullName, "consonants"),
    birthday: reduceNumerology(day),
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
  return {
    score,
    overlap,
    dynamic:
      a.lifePath === b.lifePath
        ? "You share a similar core pace and values."
        : `Your Life Path energies (${a.lifePath} and ${b.lifePath}) can complement each other when roles are clear.`,
  };
}
