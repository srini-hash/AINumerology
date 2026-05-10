import type { NumerologyProfile } from "@/lib/numerology";

export type GenZNarrative = {
  headline: string;
  mainCharacterEnergy: string;
  workPublicFlex: string;
  secretPlotTwist: string;
  socialBattery: string;
};

type NK = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 11 | 22 | 33;

function digitSum(n: number): number {
  return String(Math.abs(n))
    .split("")
    .reduce((a, d) => a + Number(d), 0);
}

/** Match core numerology reduction so narrative keys align with profile numbers. */
function normalizeCoreNumber(n: number): NK {
  let v = Math.abs(Math.trunc(n));
  while (v > 9 && v !== 11 && v !== 22 && v !== 33) {
    v = digitSum(v);
  }
  if (v >= 1 && v <= 9) return v as NK;
  if (v === 11 || v === 22 || v === 33) return v;
  return 9;
}

const HEADLINE: Record<NK, string> = {
  1: "The Bold Disruptor",
  2: "The Quiet Main Character",
  3: "The Human Highlight Reel",
  4: "The Built-Different Grinder",
  5: "The Chaos Romantic",
  6: "The Heart-Centered CEO",
  7: "The Curious Hermit Icon",
  8: "The Power Move Specialist",
  9: "The Main Plot Twist With A Cause",
  11: "The Cosmic Receiver",
  22: "The Vision Builder",
  33: "The Healing Main Character",
};

const MAIN_CHARACTER: Record<NK, string> = {
  1:
    "You've got major Founder Energy. You aren't here to follow a script; you're here to write it. If a path doesn't exist, you'll just manifest one.",
  2:
    "You're giving soft power—reading the room before you speak, keeping peace without losing yourself. Low-key running emotional logistics for the whole group.",
  3:
    "You're literally built for main-character moments: jokes, stories, creative sparks flying. Silence isn't your brand—you'd rather riff than shrink.",
  4:
    "You're the person who actually follows through while everyone else is still in the group chat. Stability is your love language; chaos makes you tired, not hyped.",
  5:
    "You're main-character energy on shuffle mode—restless, curious, allergic to boredom. Routine reads like a cage; you'd rather collect plot twists.",
  6:
    "You're the caregiver archetype who actually sets boundaries (well… sometimes). Home, loyalty, and your people come first—dramatically, if needed.",
  7:
    "You're giving mysterious scholar—aloof until you're obsessed. You don't share every thought; you curate the lore drop.",
  8:
    "You're built for impact and receipts. Power isn't toxic for you—it's fuel when used with intention. You respect ambition that shows up consistently.",
  9:
    "You're the season finale energy—big feelings, big ideals, big picture. You're here to feel everything and still keep your heart open.",
  11:
    "You're tuned to vibes other people miss—intuitive hits, synchronicities, random knowing. Main character, but make it spiritual Wi-Fi.",
  22:
    "You're not here for tiny dreams. You think in systems and legacies—turning wild ideas into something the rest of us can actually walk on.",
  33:
    "You're compassion with a microphone—leading by healing, teaching by example. Soft voice, massive ripple effect.",
};

const WORK_PUBLIC_FLEX: Record<NK, string> = {
  1:
    "At work, you're the one who actually gets things moving. You show up as the 'I'll just do it myself' type because you know your vision hits different.",
  2:
    "Publicly you're collaborative glue—the one who makes teams feel human. You flex by making everyone else's wins look effortless (even when it wasn't).",
  3:
    "Your career flex is communication: pitches, presentations, creative chaos channeled into something people actually remember. You're the brand.",
  4:
    "You're the systems person everyone rolls their eyes at until the deadline hits—then suddenly you're the MVP. Process is your silent hype track.",
  5:
    "You thrive where things change fast—new tools, new cities, new angles. Your professional flex is adaptability; stagnation is your villain arc.",
  6:
    "You lead with heart even when the spreadsheet disagrees. People trust you with culture, clients, and conflict—because you actually care without being fake.",
  7:
    "You win by going deep—research, craft, mastery. Small talk at work drains you; solving something impossible refills the tank.",
  8:
    "You move like leadership is a sport—metrics, momentum, and owning outcomes. You respect money and power as tools, not personality traits.",
  9:
    "You sell vision and values together—people buy the mission because you mean it. Bonus points when your work actually helps the world.",
  11:
    "You inspire without forcing—ideas land because you trust intuition and timing. People listen even when you're not loud.",
  22:
    "You're the one sketching the blueprint everyone ends up building from. Big structures, long timelines, zero patience for small thinking.",
  33:
    "You elevate rooms by how you show up—empathy as strategy, healing as leadership. You flex by making people feel seen.",
};

const PLOT_TWIST: Record<NK, string> = {
  1:
    "Plot twist: independence isn't optional for you—it's oxygen. Asking for help isn't cringe, but doing everything solo is your default mode.",
  2:
    "But here's the tea: you need harmony so badly you sometimes shrink your truth to keep peace. Your soul wants softness—and honesty.",
  3:
    "But here's the tea: you perform joy even when you're depleted—your soul craves expression, but also real rest, not just applause.",
  4:
    "But here's the tea: control feels safe, but your soul still wants play. You secretly crave spontaneity—just with a backup plan.",
  5:
    "But here's the tea: deep down, you're a Chaos Gremlin. You crave total freedom and get bored the second things become 'routine.' Your soul literally runs on dopamine and new scenery.",
  6:
    "But here's the tea: you play caretaker so hard you forget to receive. Your soul wants reciprocity, not a one-sided rescue arc.",
  7:
    "But here's the tea: you guard your inner world like classified intel—because your soul needs solitude to think. Too much noise = instant burnout.",
  8:
    "But here's the tea: strength is your brand, but vulnerability is still part of the plot. Your soul wants success without selling your softness.",
  9:
    "But here's the tea: you feel everything at 11/10—compassion, nostalgia, rage at injustice. Your soul runs on meaning; shallow stuff physically hurts.",
  11:
    "But here's the tea: your intuition is loud, but boundaries are still a tutorial level. Your soul receives signals faster than you process them.",
  22:
    "But here's the tea: pressure to build something massive can weigh heavy—you're not a machine, you're a visionary who still needs rest arcs.",
  33:
    "But here's the tea: healing everyone else can drain your battery. Your soul wants service that doesn't erase self-care.",
};

/** How people read your outer vibe (Personality). */
const PERS_RING: Record<NK, string> = {
  1: "people clock you as driven and a little intimidating—in a hot way. You walk in like you already know the assignment.",
  2: "people read you as gentle, patient, and emotionally literate—until they cross your people, then the gloves come off (politely).",
  3: "people see charm first—witty, expressive, a little dramatic in the best sense. You light up rooms without trying that hard.",
  4: "people assume you've got your life in folders—reliable, grounded, maybe 'the responsible one' in the group chat.",
  5: "people see you as the life of the party—spontaneous, curious, a little unhinged in a fun way.",
  6: "people feel safe around you fast—you give cozy mentor / stylish mom-friend energy.",
  7: "people might think you're mysterious or standoffish—you're just filtering for depth, not drama.",
  8: "people pick up boss energy immediately—commanding presence, expensive mindset, big aura.",
  9: "people sense you're worldly and warm—effortlessly inclusive, like you've lived ten lives.",
  11: "people notice something electric about you—open channel, big eyes, intuitive timing.",
  22: "people see ambition with scaffolding—you're not daydreaming; you're drafting blueprints out loud.",
  33: "people feel healed just standing near you—comfort and conviction at the same time.",
};

/** Birthday layer — inner undertone under the social mask. */
const BDAY_RING: Record<NK, string> = {
  1: "you're quietly obsessed with doing things first—originality isn't vanity, it's identity.",
  2: "you actually need partnership and emotional mirroring more than you admit.",
  3: "you still want play, creativity, and to be heard—even on tired days.",
  4: "you crave structure and trust—small rituals keep your nervous system chill.",
  5: "you need variety and mental stimulation or you spiral into 'why am I like this' tweets.",
  6: "you're softer than you flex—home, loyalty, and chosen family hit hardest.",
  7: "you need solo time to reboot—social battery drains fast without silence.",
  8: "you care about impact and legacy way more than you let on in casual convo.",
  9: "you actually care about the world way more than you let on—you're the 'cool friend' who also has deep existential late-night thoughts.",
  11: "you're receiving intuitive downloads even when you're pretending to be casual.",
  22: "you're meant to build something bigger than a vibe—systems, platforms, institutions.",
  33: "you're here to heal through presence—your birthday layer is literally compassion coded.",
};

function pick(map: Record<NK, string>, n: number): string {
  return map[normalizeCoreNumber(n)] ?? map[9];
}

export function buildGenZNarrative(profile: NumerologyProfile): GenZNarrative {
  const lp = normalizeCoreNumber(profile.lifePath);
  const ex = normalizeCoreNumber(profile.expression);
  const su = normalizeCoreNumber(profile.soulUrge);
  const pers = normalizeCoreNumber(profile.personality);
  const bd = normalizeCoreNumber(profile.birthday);

  const persBit = pick(PERS_RING, profile.personality);
  const bdayBit = pick(BDAY_RING, profile.birthday);

  const socialBattery = `${persBit.charAt(0).toUpperCase()}${persBit.slice(1)} That Birthday ${bd} layer means ${bdayBit}`;

  return {
    headline: pick(HEADLINE, profile.lifePath),
    mainCharacterEnergy: pick(MAIN_CHARACTER, profile.lifePath),
    workPublicFlex: pick(WORK_PUBLIC_FLEX, profile.expression),
    secretPlotTwist: pick(PLOT_TWIST, profile.soulUrge),
    socialBattery,
  };
}

/** Plain-text report for API + AI fallback. */
export function formatGenZNarrative(profile: NumerologyProfile): string {
  const z = buildGenZNarrative(profile);
  return [
    `${z.headline}`,
    "",
    `Main Character Energy (Life Path ${profile.lifePath})`,
    z.mainCharacterEnergy,
    "",
    `The Work / Public Flex (Expression ${profile.expression})`,
    z.workPublicFlex,
    "",
    `The Secret Plot Twist (Soul Urge ${profile.soulUrge})`,
    z.secretPlotTwist,
    "",
    `The Social Battery (Personality ${profile.personality} & Birthday ${profile.birthday})`,
    z.socialBattery,
  ].join("\n");
}

/** Drop-in replacement for legacy fallback interpret text (used when OpenAI is off). */
export function fallbackInterpretation(profile: NumerologyProfile): string {
  return formatGenZNarrative(profile);
}
