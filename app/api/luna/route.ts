// app/api/luna/route.ts
import { NextRequest, NextResponse } from "next/server";
import { LUNA_SYSTEM_PROMPT } from "./systemPrompt";
import { engagementBoost } from "./engagement";
import { getMemory, updateMemory } from "./memory";

// OPTIONAL: force Node runtime (not edge)
export const runtime = "nodejs";

// ---------- Helpers ----------
function getApiKey(): string {
  const key = process.env.OPENAI_API_KEY;
  if (!key) {
    console.error("❌ OPENAI_API_KEY is missing in the environment");
    throw new Error("Missing OPENAI_API_KEY on server");
  }
  return key;
}

// ---------- POST /api/luna ----------
export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { message, userId = "anonymous" } = body as {
      message?: string;
      userId?: string;
    };

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Missing message" },
        { status: 400 }
      );
    }

    // Simple per-user memory
    const memory = getMemory(userId);

    // Quick name capture
    const nameMatch = message.match(/my name is\s+([A-Za-z0-9]+)/i);
    if (nameMatch) {
      updateMemory(userId, { name: nameMatch[1] });
    }

    // Keep convo flirty / engaged
    const boost = engagementBoost(message);
    const finalUserMessage = boost
      ? `${message}\n\n[CONTEXT FOR LUNA: ${boost}]`
      : message;

    const system = `
${LUNA_SYSTEM_PROMPT}

USER MEMORY:
${JSON.stringify(memory, null, 2)}
`.trim();

    const apiKey = getApiKey();

    // ---- Call OpenAI via fetch (no SDK) ----
    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        // Use very safe, cheap chat model here
        model: "gpt-4o-mini",
        temperature: 0.9,
        max_tokens: 350,
        messages: [
          { role: "system", content: system },
          { role: "user", content: finalUserMessage },
        ],
      }),
    });

    if (!openaiRes.ok) {
      const text = await openaiRes.text().catch(() => "");
      console.error(
        "❌ OpenAI API error",
        openaiRes.status,
        openaiRes.statusText,
        text
      );
      return NextResponse.json(
        {
          error: "Upstream OpenAI error",
          status: openaiRes.status,
        },
        { status: 500 }
      );
    }

    const data = (await openaiRes.json()) as any;
    const reply: string =
      data?.choices?.[0]?.message?.content ??
      "Hmm… I lost my words for a second 😏 say that again?";

    // Tiny “mood” flag example
    if (reply.toLowerCase().includes("proud of you")) {
      updateMemory(userId, { lastFeeling: "supported" });
    }

    return NextResponse.json({ reply });
  } catch (err: any) {
    console.error("💥 Luna API fatal error:", err?.message ?? err);

    const msg =
      err?.message === "Missing OPENAI_API_KEY on server"
        ? "Server is missing OPENAI_API_KEY. Check Vercel env vars."
        : "Luna had a little glitch on the server.";

    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
