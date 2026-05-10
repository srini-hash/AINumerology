import { buildGenZNarrative, fallbackInterpretation, formatGenZNarrative } from "@/lib/genZNarrative";
import type { NumerologyProfile } from "@/lib/numerology";

export async function buildInterpretation(profile: NumerologyProfile) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return fallbackInterpretation(profile);

  const template = formatGenZNarrative(profile);
  const structured = buildGenZNarrative(profile);

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        temperature: 0.75,
        messages: [
          {
            role: "user",
            content: `You rewrite numerology readings for Gen Z: witty, warm, never cruel. Keep the SAME structure and section labels as the template.

Output format (exactly these sections in order, plain text):
1) First line = a punchy headline only (no label).
2) Blank line.
3) "Main Character Energy (Life Path [n])" then paragraph.
4) Blank line.
5) "The Work / Public Flex (Expression [n])" then paragraph.
6) Blank line.
7) "The Secret Plot Twist (Soul Urge [n])" then paragraph.
8) Blank line.
9) "The Social Battery (Personality [n] & Birthday [n])" then paragraph.

Use the numbers from the profile. Stay under ~260 words. Don't add disclaimers about AI.

Template to riff on (keep meaning, refresh wording):
${template}

Profile JSON (reference): ${JSON.stringify(profile)}

Structured keys for tone reference: ${JSON.stringify(structured)}`,
          },
        ],
      }),
    });

    if (!response.ok) throw new Error("OpenAI API request failed");
    const data = await response.json();
    return data.choices?.[0]?.message?.content?.trim() || fallbackInterpretation(profile);
  } catch {
    return fallbackInterpretation(profile);
  }
}
