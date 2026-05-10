import { fallbackInterpretation, type NumerologyProfile } from "@/lib/numerology";

export async function buildInterpretation(profile: NumerologyProfile) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return fallbackInterpretation(profile);

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        temperature: 0.8,
        messages: [
          {
            role: "user",
            content: `Provide a concise, practical numerology interpretation in 110-140 words. Keep it non-deterministic and entertainment-oriented. Profile: ${JSON.stringify(profile)}`,
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
