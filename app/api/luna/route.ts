// app/api/luna/route.ts
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { LUNA_SYSTEM_PROMPT } from "./systemPrompt";
import { engagementBoost } from "./engagement";
import { getMemory, updateMemory } from "./memory";

// Force Node.js runtime (not edge)
export const runtime = "nodejs";

// ---- Lazy OpenAI client (no error at build time) -----------------
let openaiClient: OpenAI | null = null;

function getOpenAI() {
  if (!openaiClient) {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      console.error("OPENAI_API_KEY is missing in the environment");
      throw new Error("Server misconfiguration: missing OpenAI API key");
    }
    openaiClient = new OpenAI({ apiKey });
  }
  return openaiClient;
}
// -------------------------------------------------------------------

export async function POST(req: NextRequest) {
  try {
    const { message, userId = "anonymous" } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Missing message" },
        { status: 400 }
      );
    }

    // Basic in-memory profile
    const memory = getMemory(userId);

    // Simple name detection
    const nameMatch = message.match(/my name is\s+([A-Za-z0-9]+)/i);
    if (nameMatch) {
      updateMemory(userId, { name: nameMatch[1] });
    }

    // Engagement boost (keeps convo flirty & alive but still SFW)
    const boost = engagementBoost(message);
    const finalUserMessage = boost
      ? `${message}\n\n[CONTEXT: ${boost}]`
      : message;

    const system = `
${LUNA_SYSTEM_PROMPT}

USER MEMORY:
${JSON.stringify(memory, null, 2)}
`;

    const openai = getOpenAI();

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        { role: "system", content: system },
        { role: "user", content: finalUserMessage },
      ],
      temperature: 0.9,
      max_tokens: 350,
    });

    const reply =
      completion.choices[0]?.message?.content ||
      "Hmm… I lost my words for a second 😏 say that again?";

    // Very simple mood tracking
    if (reply.toLowerCase().includes("proud of you")) {
      updateMemory(userId, { lastFeeling: "supported" });
    }

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("Luna API error:", err);
    return NextResponse.json(
      { error: "Luna had a little glitch. Try again in a second, babe 💕" },
      { status: 500 }
    );
  }
}
