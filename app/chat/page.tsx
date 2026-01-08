"use client";

import React, { FormEvent, useEffect, useMemo, useRef, useState } from "react";

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
/**
 * IMPORTANT:
 * - These must match exactly what exists under /public
 * - If you add new files (luna33.jpg, video26.mp4, etc) add them here.
 * - (Later we can generate this automatically with a manifest.)
 */
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

  // add your newer ones (from your screenshot)
  "/luna/images/luna33.jpg",
  "/luna/images/luna34.png",
  "/luna/images/luna35.jpg",
  "/luna/images/luna36.jpg",
  "/luna/images/luna37.jpg",
  "/luna/images/luna38.jpg",
  "/luna/images/lunafront.jpg",
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

  // add your newer ones
  "/luna/videos/video22.mp4",
  "/luna/videos/video23.mp4",
  "/luna/videos/video24.mp4",
  "/luna/videos/video25.mp4",
  "/luna/videos/video26.mp4",
  "/luna/videos/video27.mp4",
  "/luna/videos/video28.mp4",
  "/luna/videos/video29.mp4",
  "/luna/videos/video30.mp4",
  "/luna/videos/video31.mp4",
  "/luna/videos/video32.mp4",
];

/* -------------------- Persistent non-repeat helpers -------------------- */
function lsKey(userId: string, kind: "images" | "videos") {
  return `fofo:luna:seen:${kind}:${userId}`;
}

function readSeen(userId: string, kind: "images" | "videos"): number[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(lsKey(userId, kind));
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((n) => Number.isInteger(n)) : [];
  } catch {
    return [];
  }
}

function writeSeen(userId: string, kind: "images" | "videos", arr: number[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(lsKey(userId, kind), JSON.stringify(arr));
  } catch {
    // ignore
  }
}

/**
 * Pick an item that:
 * 1) has NOT been seen by this user (persisted)
 * 2) has NOT been used in the current session
 * 3) has NOT been used already in this chat transcript
 *
 * When exhausted, it resets “seen” and continues (but still avoids immediate repeats in-chat).
 */
function pickNonRepeatingUrl(
  pool: string[],
  usedSessionRef: React.MutableRefObject<number[]>,
  seenPersistedRef: React.MutableRefObject<number[]>,
  alreadyInChat: Set<string>
): { url: string; idx: number } {
  if (!pool.length) throw new Error("Empty media pool");

  // helper to list candidate indices based on a disallowed set
  const candidatesFrom = (disallowedIdx: Set<number>) => {
    const out: number[] = [];
    for (let i = 0; i < pool.length; i++) {
      if (!disallowedIdx.has(i) && !alreadyInChat.has(pool[i])) out.push(i);
    }
    return out;
  };

  // 1) try: not seen + not used this session
  const disallowed = new Set<number>([...seenPersistedRef.current, ...usedSessionRef.current]);
  let candidates = candidatesFrom(disallowed);

  // 2) if none: allow seen reset (but still avoid session repeats)
  if (!candidates.length) {
    seenPersistedRef.current = [];
    candidates = candidatesFrom(new Set<number>(usedSessionRef.current));
  }

  // 3) if still none (chat already contains everything): allow anything except last-used-in-session if possible
  if (!candidates.length) {
    const dis2 = new Set<number>(usedSessionRef.current.slice(-1));
    candidates = candidatesFrom(dis2);
  }

  // 4) last resort: any index
  const idx = candidates.length
    ? candidates[Math.floor(Math.random() * candidates.length)]
    : Math.floor(Math.random() * pool.length);

  usedSessionRef.current.push(idx);
  seenPersistedRef.current.push(idx);

  return { url: pool[idx], idx };
}

export default function LunaChatPage() {
  // NOTE: replace later with your real auth userId.
  const userId = "demo-user";

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

  // Track what media we’ve already shown THIS TAB SESSION
  const usedImageIndexesSession = useRef<number[]>([]);
  const usedVideoIndexesSession = useRef<number[]>([]);

  // Track what media the USER has seen (persisted)
  const seenImageIndexesPersisted = useRef<number[]>([]);
  const seenVideoIndexesPersisted = useRef<number[]>([]);

  useEffect(() => {
    // load persisted indices once
    seenImageIndexesPersisted.current = readSeen(userId, "images");
    seenVideoIndexesPersisted.current = readSeen(userId, "videos");
  }, [userId]);

  const alreadyInChat = useMemo(() => {
    const s = new Set<string>();
    for (const m of messages) if (m.url) s.add(m.url);
    return s;
  }, [messages]);

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const addLunaText = (text: string) => {
    setMessages((prev) => [
      ...prev,
      { id: nextId.current++, sender: "luna", kind: "text", text },
    ]);
  };

  const addLunaMedia = (kind: "image" | "video", url: string) => {
    setMessages((prev) => [
      ...prev,
      { id: nextId.current++, sender: "luna", kind, url },
    ]);
  };

  const sendMedia = (kind: "image" | "video") => {
    if (kind === "video" && LUNA_VIDEOS.length) {
      const picked = pickNonRepeatingUrl(
        LUNA_VIDEOS,
        usedVideoIndexesSession,
        seenVideoIndexesPersisted,
        alreadyInChat
      );
      writeSeen(userId, "videos", seenVideoIndexesPersisted.current);

      addLunaText("Here’s a little clip just for you 🎥 Be gentle with me, ok?");
      addLunaMedia("video", picked.url);
      setTimeout(scrollToBottom, 80);
      return;
    }

    if (kind === "image" && LUNA_IMAGES.length) {
      const picked = pickNonRepeatingUrl(
        LUNA_IMAGES,
        usedImageIndexesSession,
        seenImageIndexesPersisted,
        alreadyInChat
      );
      writeSeen(userId, "images", seenImageIndexesPersisted.current);

      addLunaText("You wanted a picture? I picked one just for you 💗");
      addLunaMedia("image", picked.url);
      setTimeout(scrollToBottom, 80);
      return;
    }

    addLunaText("Mmm… I don’t have any new ones loaded right now. Try again soon? 💗");
  };

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
    const wantsSurprise = /surprise|random|anything|your choice|dealer/.test(lower);

    // 2) Media routing (non-repeating, persistent)
    if (wantsVideo) return sendMedia("video");
    if (wantsImage) return sendMedia("image");
    if (wantsSurprise) {
      // bias to images but sometimes video
      return Math.random() < 0.75 ? sendMedia("image") : sendMedia("video");
    }

    // 3) Otherwise, talk to AI Luna via /api/luna
    try {
      setIsThinking(true);

      const res = await fetch("/api/luna", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmed,
          userId,
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
          text: "Mmm… something glitched on my side. Try again in a second, okay? 💗",
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
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/hero-bg.jpg')" }}
      />
      <div className="absolute inset-0 bg-pink-200/70 backdrop-blur-sm" />

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
            <a href="/" className="text-xs font-medium text-pink-500 hover:underline">
              ⟵ Back to home
            </a>
          </div>

          {/* Quick actions */}
          <div className="border-b border-pink-100 px-4 py-3">
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => sendMedia("image")}
                className="rounded-full border border-pink-200 bg-white/80 px-3 py-1 text-xs font-semibold text-pink-700 hover:bg-pink-50"
              >
                Send a pic 📸
              </button>
              <button
                type="button"
                onClick={() => sendMedia("video")}
                className="rounded-full border border-pink-200 bg-white/80 px-3 py-1 text-xs font-semibold text-pink-700 hover:bg-pink-50"
              >
                Send a video 🎥
              </button>
              <button
                type="button"
                onClick={() => (Math.random() < 0.75 ? sendMedia("image") : sendMedia("video"))}
                className="rounded-full border border-pink-200 bg-white/80 px-3 py-1 text-xs font-semibold text-pink-700 hover:bg-pink-50"
              >
                Surprise me 🎲
              </button>
              <button
                type="button"
                onClick={() => setInput("What is FOFO? Explain it in a fun way.")}
                className="rounded-full border border-pink-200 bg-white/80 px-3 py-1 text-xs font-semibold text-pink-700 hover:bg-pink-50"
              >
                What’s FOFO? ✨
              </button>
            </div>
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
                        loading="lazy"
                      />
                    )}

                    {m.kind === "video" && m.url && (
                      <video
                        src={m.url}
                        controls
                        className="mt-1 max-h-80 w-full rounded-xl"
                        preload="metadata"
                      />
                    )}
                  </div>
                </div>
              );
            })}

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
