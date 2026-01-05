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

// --- Local media pools ------------------------------------
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
];

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default function LunaChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "luna",
      kind: "text",
      text:
        "Hey, I’m Luna 💕 Your FOFO hostess.\n" +
        "Chat with me, or ask: “send me a pic” or “show me a video”.",
    },
  ]);
  const [input, setInput] = useState("");
  const nextId = useRef(2);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    // add user message
    const userMsg: Message = {
      id: nextId.current++,
      sender: "user",
      kind: "text",
      text: trimmed,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    const lower = trimmed.toLowerCase();
    const wantsVideo = /video|clip|movie|motion/.test(lower);
    const wantsImage = /pic|photo|image|selfie|picture/.test(lower);

    const replies: Message[] = [];

    if (wantsVideo && LUNA_VIDEOS.length) {
      const url = pickRandom(LUNA_VIDEOS);
      replies.push({
        id: nextId.current++,
        sender: "luna",
        kind: "text",
        text: "Here’s a little clip just for you 🎥 Be gentle with me, ok?",
      });
      replies.push({
        id: nextId.current++,
        sender: "luna",
        kind: "video",
        url,
      });
    } else if (wantsImage && LUNA_IMAGES.length) {
      const url = pickRandom(LUNA_IMAGES);
      replies.push({
        id: nextId.current++,
        sender: "luna",
        kind: "text",
        text: "You wanted a picture? I picked one just for you 💗",
      });
      replies.push({
        id: nextId.current++,
        sender: "luna",
        kind: "image",
        url,
      });
    } else {
      replies.push({
        id: nextId.current++,
        sender: "luna",
        kind: "text",
        text:
          "I love talking… Tell me about your day, or ask for a *pic* or a *video* and I’ll send something cute 😉",
      });
    }

    setMessages((prev) => [...prev, ...replies]);
    setTimeout(scrollToBottom, 80);
  };

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
                <div className="text-xs text-emerald-600">● online</div>
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
                  className={`flex ${
                    isUser ? "justify-end" : "justify-start"
                  }`}
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
              className="rounded-full bg-pink-500 px-4 py-2 text-xs font-semibold text-white shadow hover:bg-pink-600 active:scale-[0.97]"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
