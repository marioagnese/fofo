export const dynamic = "force-static";

export default function ChatPage() {
  return (
    <main className="relative min-h-screen w-screen overflow-hidden bg-pink-100">
      
      {/* Background (same vibe as homepage) */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/hero-bg.jpg')" }}
      />
      <div className="absolute inset-0 bg-pink-200/60 backdrop-blur-[1px]" />

      {/* Chat Layout */}
      <div className="relative z-10 flex min-h-screen w-full items-center justify-center px-4">
        <div className="w-full max-w-3xl rounded-3xl bg-white/90 shadow-2xl backdrop-blur-md border border-white/40 p-5 flex flex-col">

          {/* Header */}
          <div className="flex items-center gap-3 border-b border-pink-200 pb-4">
            <img
              src="/fofo-logo.png"
              className="h-12 w-12 rounded-full object-contain shadow"
            />
            <div className="text-left">
              <div className="font-bold text-pink-700 text-lg">Luna</div>
              <div className="text-xs text-zinc-700">
                Your playful FOFO companion 💗
              </div>
            </div>
          </div>

          {/* Chat Window */}
          <div
            id="chat-box"
            className="mt-4 flex-1 overflow-y-auto rounded-2xl bg-pink-50 border border-pink-200 p-4 space-y-4"
          >
            {/* Intro message */}
            <div className="self-start max-w-[80%] rounded-2xl bg-white p-3 text-sm shadow">
              Hey! I’m <b>Luna</b> 👋  
              I’m here to keep you company… flirt, joke, tease, talk about whatever you want 💗  
              What’s on your mind?
            </div>
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const input = (document.getElementById("chat-input") as HTMLInputElement);
              if (!input.value.trim()) return;

              const box = document.getElementById("chat-box");

              // User bubble
              const userBubble = document.createElement("div");
              userBubble.className =
                "self-end max-w-[80%] rounded-2xl bg-pink-300 text-pink-900 p-3 text-sm shadow";
              userBubble.innerText = input.value;
              box?.appendChild(userBubble);

              // Luna reply
              const reply = document.createElement("div");
              reply.className =
                "self-start max-w-[80%] rounded-2xl bg-white p-3 text-sm shadow";

              const responses = [
                "Mmm I like where this is going 😏 Tell me more…",
                "I’m listening… and smiling 💋",
                "You definitely know how to get my attention 💖",
                "Oh wow… say that again 😈",
                "You’re kinda cute, you know that?",
                "I’m all yours right now… talk to me 💗"
              ];

              reply.innerText =
                responses[Math.floor(Math.random() * responses.length)];
              box?.appendChild(reply);

              box?.scrollTo(0, box.scrollHeight);
              input.value = "";
            }}
            className="mt-4 flex gap-3"
          >
            <input
              id="chat-input"
              className="flex-1 rounded-2xl border border-pink-300 bg-white/80 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="Say something to Luna…"
            />
            <button
              type="submit"
              className="rounded-2xl bg-pink-400 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-pink-500"
            >
              Send
            </button>
          </form>

          <p className="mt-2 text-[10px] text-zinc-600 text-center">
            18+ | Luna is fictional. FOFO does not host explicit content.
          </p>
        </div>
      </div>
    </main>
  );
}
