"use client";

import { FormEvent, useRef, useState } from "react";

type Sender = "user" | "luna";
type MessageKind = "text" | "image" | "video";

interface Message {
  id: number;
  sender: Sender;
  kind: MessageKind;
  text?: string;
  url?: string;
}

/* -------------------- Local media pools -------------------- */
const LUNA_IMAGES: string[] = [
  "/luna/images/luna.jpg",
  "/luna/images/luna1.jpg",
  "/luna/images/luna2.jpg",
  "/luna/images/luna3.jpg",
  "/luna/images/luna5.jpg",
  "/luna/images/luna6.png",
  "/luna/images/luna7.jpg",
  "/luna/images/luna8.png",
  "/luna/images/luna9.jpg",
  "/luna/images/luna10.jpg",
  "/luna/images/luna11.jpg",
  "/luna/images/luna12.jpg",
  "/luna/images/luna13.jpg",
  "/luna/images/luna14.jpg",
  "/luna/images/luna15.jpg",
  "/luna/images/luna16.jpg",
  "/luna/images/luna17.jpg",
  "/luna/images/luna18.jpg",
  "/luna/images/luna19.jpg",
  "/luna/images/luna20.jpg",
  "/luna/images/luna21.jpg",
  "/luna/images/luna22.jpg",
  "/luna/images/luna23.jpg",
  "/luna/images/luna24.jpg",
  "/luna/images/luna25.jpg",
];

const LUNA_VIDEOS: string[] = [
  "/luna/videos/video1.mp4",
  "/luna/videos/video2.mp4",
  "/luna/videos/video3.mp4",
  "/luna/videos/video4.mp4",
  "/luna/videos/video5.mp4",
  "/luna/videos/video6.mp4",
  "/luna/videos/video7.mp4",
  "/luna/videos/video8.mp4",
  "/luna/videos/video9.mp4",
  "/luna/videos/video10.mp4",
  "/luna/videos/video11.mp4",
  "/luna/videos/video12.mp4",
  "/luna/videos/video13.mp4",
  "/luna/videos/video14.mp4",
  "/luna/videos/video15.mp4",
  "/luna/videos/video16.mp4",
  "/luna/videos/video17.mp4",
  "/luna/videos/video18.mp4",
  "/luna/videos/video19.mp4",
  "/luna/videos/video20.mp4",
  "/luna/videos/video21.mp4",
];

/** Non-repeating picker: walks through the pool before repeating */
function pickNonRepeating<T>(
  arr: T[],
  usedRef: React.MutableRefObject<number[]>
): T {
  if (!arr.length) {
    throw new Error("Empty media pool");
  }

  // Reset if we've already used everything once
  if (usedRef.current.length >= arr.length) {
    usedRef.current = [];
  }

  const used = new Set(usedRef.current);
  const availableIndices: number[] = [];

  for (let i = 0; i < arr.length; i++) {
    if (!used.has(i)) availableIndices.push(i);
  }

  const idx =
    availableIndices[Math.floor(Math.random() * availableIndices.length)];

  usedRef.current.push(idx);
  return arr[idx];
}

export default function LunaChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "luna",
      kind: "text",
      text:
        "Hey, I’m Luna 💕 your FOFO hostess.\n" +
        'You can just talk to me, or ask: “send me a pic” or “show me a video”.',
    },
  ]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);

  const nextId = useRef(2);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  // Track what media we’ve already shown this session
  const usedImageIndexes = useRef<number[]>([]);
  const usedVideoIndexes = useRef<number[]>([]);

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  /* -------------------- Handle send -------------------- */
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isThinking) return;

    // 1) Add user message immediately
    const userMsg: Message = {
      id: nextId.current++,
      sender: "user",
      kind: "text",
      text: trimmed,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTimeout(scrollToBottom, 50);

    const lower = trimmed.toLowerCase();
    const wantsVideo = /video|clip|movie|motion|show.*video/.test(lower);
    const wantsImage = /pic|photo|image|selfie|picture|show.*pic/.test(lower);

    // 2) If user requested media, answer from local pool (no repeats until exhausted)
    if (wantsVideo && LUNA_VIDEOS.length) {
      const url = pickNonRepeating(LUNA_VIDEOS, usedVideoIndexes);

      setMessages((prev) => [
        ...prev,
        {
          id: nextId.current++,
          sender: "luna",
          kind: "text",
          text: "Here’s a little clip just for you 🎥 Be gentle with me, ok?",
        },
        {
          id: nextId.current++,
          sender: "luna",
          kind: "video",
          url,
        },
      ]);

      setTimeout(scrollToBottom, 80);
      return;
    }

    if (wantsImage && LUNA_IMAGES.length) {
      const url = pickNonRepeating(LUNA_IMAGES, usedImageIndexes);

      setMessages((prev) => [
        ...prev,
        {
          id: nextId.current++,
          sender: "luna",
          kind: "text",
          text: "You wanted a picture? I picked one just for you 💗",
        },
        {
          id: nextId.current++,
          sender: "luna",
          kind: "image",
          url,
        },
      ]);

      setTimeout(scrollToBottom, 80);
      return;
    }

    // 3) Otherwise, talk to AI Luna via /api/luna
    try {
      setIsThinking(true);

      const res = await fetch("/api/luna", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmed,
          userId: "demo-user", // later you can make this real per-user
        }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          id: nextId.current++,
          sender: "luna",
          kind: "text",
          text:
            data.reply ??
            "I’m here, just thinking of what to say to you… stay with me 💕",
        },
      ]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          id: nextId.current++,
          sender: "luna",
          kind: "text",
          text:
            "Mmm… something glitched on my side. Try again in a second, okay? 💗",
        },
      ]);
    } finally {
      setIsThinking(false);
      setTimeout(scrollToBottom, 80);
    }
  };

  /* -------------------- UI -------------------- */
  return (
    <main className="relative min-h-screen w-screen overflow-hidden bg-pink-100">
      {/* Background same as homepage */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/hero-bg.jpg')" }}
      />
      <div className="absolute inset-0 bg-pink-200/70 backdrop-blur-sm" />

      {/* Chat card */}
      <div className="relative z-10 flex min-h-screen w-screen items-center justify-center px-4 py-6">
        <div className="flex h-[80vh] w-full max-w-3xl flex-col rounded-3xl bg-white/90 shadow-2xl backdrop-blur">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-pink-100 px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-pink-300">
                <img
                  src="/luna/images/luna1.jpg"
                  alt="Luna avatar"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="text-left">
                <div className="text-sm font-semibold text-pink-900">
                  Luna · FOFO Hostess
                </div>
                <div className="text-xs text-emerald-600">
                  ● {isThinking ? "typing…" : "online"}
                </div>
              </div>
            </div>
            <a
              href="/"
              className="text-xs font-medium text-pink-500 hover:underline"
            >
              ⟵ Back to home
            </a>
          </div>

          {/* Messages */}
          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((m) => {
              const isUser = m.sender === "user";
              return (
                <div
                  key={m.id}
                  className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm shadow ${
                      isUser
                        ? "bg-pink-500 text-white rounded-br-sm"
                        : "bg-pink-50 text-pink-900 rounded-bl-sm"
                    }`}
                  >
                    {m.kind === "text" && m.text && (
                      <p className="whitespace-pre-line">{m.text}</p>
                    )}

                    {m.kind === "image" && m.url && (
                      <img
                        src={m.url}
                        alt="Luna"
                        className="mt-1 max-h-80 w-full rounded-xl object-cover"
                      />
                    )}

                    {m.kind === "video" && m.url && (
                      <video
                        src={m.url}
                        controls
                        className="mt-1 max-h-80 w-full rounded-xl"
                      />
                    )}
                  </div>
                </div>
              );
            })}

            {/* Typing bubble */}
            {isThinking && (
              <div className="flex justify-start">
                <div className="max-w-[60%] rounded-2xl bg-pink-50 px-3 py-2 text-xs text-pink-700 shadow">
                  Luna is typing…
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 border-t border-pink-100 px-4 py-3"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Luna for a pic, a video, or just talk to her…"
              className="flex-1 rounded-full border border-pink-200 bg-white/80 px-4 py-2 text-sm outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-300"
            />
            <button
              type="submit"
              disabled={isThinking}
              className="rounded-full bg-pink-500 px-4 py-2 text-xs font-semibold text-white shadow hover:bg-pink-600 active:scale-[0.97] disabled:opacity-60"
            >
              {isThinking ? "..." : "Send"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
