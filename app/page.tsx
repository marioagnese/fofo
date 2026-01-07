export const dynamic = "force-static";

export default function HomePage() {
  return (
    <main className="relative h-screen w-screen overflow-hidden bg-pink-100">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/hero-bg.jpg')" }}
      />
      <div className="absolute inset-0 bg-pink-200/60 backdrop-blur-[1px]" />

      {/* Content */}
      <div className="relative z-10 flex h-screen w-screen flex-col items-center justify-center px-6 text-center">
        <div className="flex w-full max-w-6xl flex-col items-center gap-4">

          {/* LOGO */}
          <img
            src="/fofo-logo.png"
            alt="FansOfOnly"
            className="drop-shadow-2xl"
            style={{
              width: "min(95vw, 1100px)",
              maxHeight: "42vh",
              height: "auto",
              objectFit: "contain",
            }}
          />

          {/* CTA AREA */}
          <div className="mt-2 flex flex-col items-center gap-3 sm:flex-row sm:gap-6">

            {/* Continue Button */}
            <a
              href="/continue"
              className="group relative inline-flex items-center justify-center rounded-full px-10 py-3 text-sm font-semibold text-pink-900 transition active:scale-[0.97]"
            >
              <span aria-hidden className="absolute -inset-1 rounded-full bg-pink-300/70 blur-xl opacity-70 transition duration-700 group-hover:opacity-100 animate-pulse" />
              <span className="relative rounded-full bg-pink-300 px-10 py-3 shadow-xl transition group-hover:bg-pink-400">
                Continue
              </span>
            </a>

            {/* Chat Button With Luna Image */}
            <div className="relative flex flex-col items-center">
              <img
                src="/luna/images/lunafront.jpg"
                alt="Luna"
                className="w-36 sm:w-44 rounded-2xl shadow-xl border border-white/70 -mb-2 animate-pulse"
              />

              <a
                href="/chat"
                className="inline-flex items-center justify-center rounded-full border border-pink-300 bg-white/70 px-8 py-3 text-sm font-semibold text-pink-700 shadow-sm transition hover:bg-pink-50"
              >
                Chat with Luna 💗
              </a>
            </div>

          </div>

          {/* Headline */}
          <h1
            className="mt-4 font-extrabold tracking-tight text-zinc-900"
            style={{ fontSize: "clamp(28px, 4vw, 56px)", lineHeight: 1.05 }}
          >
            Discover Trending Creators
          </h1>

          <p
            className="text-zinc-800"
            style={{ fontSize: "clamp(14px, 1.6vw, 18px)" }}
          >
            FansOfOnly is an independent discovery hub. We don’t host or store media.
          </p>

          <p className="mt-1 text-xs text-zinc-700/80">
            Choose an official link (supports creators) or public previews on external sites.
          </p>

          <p className="mt-2 text-[11px] text-zinc-800/80 max-w-3xl">
            By using this site you agree to our{" "}
            <a href="/terms" className="underline">Terms</a>{" "}and{" "}
            <a href="/privacy" className="underline">Privacy</a>. 
            Links may be affiliate links; we may earn a commission. 
            All trademarks belong to their respective owners. 18+ only.
          </p>

        </div>
      </div>
    </main>
  );
}
