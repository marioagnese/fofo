"use client";

import { FormEvent, useState } from "react";

type Message = {
  id: number;
  from: "user" | "luna";
  text: string;
};

export const dynamic = "force-static";

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      from: "luna",
      text: "Hey, I’m Luna 💗 Your FOFO companion. Ask me about creators, vibes, or just say hi.",
    },
  ]);

  const [input, setInput] = useState("");
  const [isReplying, setIsReplying] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMessage: Message = {
      id: Date.now(),
      from: "user",
      text: trimmed,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsReplying(true);

    // Fake “AI” reply for now (local only)
    setTimeout(() => {
      const lunaReply: Message = {
        id: Date.now() + 1,
        from: "luna",
        text: generateLunaReply(trimmed),
      };
      setMessages((prev) => [...prev, lunaReply]);
      setIsReplying(false);
    }, 900);
  };

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-pink-100">
      {/* Background (same vibe as homepage) */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/hero-bg.jpg')" }}
      />
      <div className="absolute inset-0 bg-pink-200/60 backdrop-blur-[2px]" />

      {/* Content */}
      <div className="relative z-10 flex h-screen w-screen items-center justify-center px-4 sm:px-6">
        <div className="flex h-[80vh] w-full max-w-3xl flex-col rounded-3xl bg-white/85 backdrop-blur shadow-2xl">
          {/* Header */}
          <header className="flex items-center justify-between border-b border-pink-100 px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-gradient-to-br from-pink-400 to-fuchsia-500 shadow-md" />
              <div className="text-left">
                <div className="text-sm font-semibold text-zinc-900">
                  Luna • FOFO Hostess
                </div>
                <div className="text-xs text-pink-500">
                  {isReplying ? "Typing…" : "Online • here to keep you company 💕"}
                </div>
              </div>
            </div>
            <span className="rounded-full bg-pink-100 px-3 py-1 text-[11px] font-semibold text-pink-700">
              Beta chat
            </span>
          </header>

          {/* Messages */}
          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4 text-left sm:px-5">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${
                  m.from === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-snug shadow-sm ${
                    m.from === "user"
                      ? "rounded-br-sm bg-pink-500 text-white"
                      : "rounded-bl-sm bg-pink-50 text-zinc-900"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}

            {isReplying && (
              <div className="flex justify-start">
                <div className="flex items-center gap-1 rounded-2xl bg-pink-50 px-3 py-2 text-xs text-pink-600">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-pink-400" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-pink-400 delay-150" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-pink-400 delay-300" />
                  <span className="ml-1">Luna is typing…</span>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 border-t border-pink-100 bg-white/90 px-4 py-3 sm:px-5"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Tell Luna how you’re feeling or what you want to explore…"
              className="flex-1 rounded-full border border-pink-100 bg-pink-50/60 px-4 py-2 text-sm text-zinc-900 outline-none ring-pink-300 placeholder:text-zinc-400 focus:border-pink-300 focus:ring-2"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="rounded-full bg-pink-500 px-5 py-2 text-xs font-semibold text-white shadow-md transition hover:bg-pink-600 disabled:cursor-not-allowed disabled:bg-pink-300"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

function generateLunaReply(userText: string): string {
  const lowered = userText.toLowerCase();

  if (lowered.includes("lonely") || lowered.includes("alone")) {
    return "I’m here now, so you’re not alone anymore 💕 Tell me what kind of company you’re in the mood for tonight.";
  }

  if (lowered.includes("creator") || lowered.includes("of")) {
    return "You like exploring creators, huh? 😏 Tell me a type or vibe you like and I’ll react like your personal FOFO hostess.";
  }

  if (lowered.includes("hi") || lowered.includes("hello") || lowered.includes("hey")) {
    return "Hey you 😌 I’m Luna. I’m here to flirt a little, listen a lot, and keep you in a good mood. What’s your name?";
  }

  if (lowered.includes("stress") || lowered.includes("tired")) {
    return "Long day? Come sit with me for a bit. Breathe in, breathe out, and tell me what’s been on your mind. I’m all yours for a while. 💗";
  }

  return "Mmm, interesting… 😏 Tell me more. I want to get a better feel for what you like so I can keep you smiling.";
}
