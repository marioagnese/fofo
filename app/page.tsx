// app/page.tsx
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
          
          {/* LOGO — bigger, but height-capped */}
          <img
            src="/fofo-logo.png"
            alt="FansOfOnly"
            className="drop-shadow-2xl"
            style={{
              width: "min(95vw, 1100px)", // ⬅️ bigger width
              maxHeight: "42vh",          // ⬅️ safety cap (KEY)
              height: "auto",
              objectFit: "contain",
            }}
          />

          {/* CTA */}
          <a
            href="https://fapello.com/welcome/"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative mt-2 inline-flex items-center justify-center rounded-full px-10 py-3 text-sm font-semibold text-pink-900 transition active:scale-[0.97]"
          >
            {/* Glow */}
            <span
              aria-hidden
              className="absolute -inset-1 rounded-full bg-pink-300/70 blur-xl opacity-70 transition duration-700 group-hover:opacity-100 animate-pulse"
            />
            <span className="relative rounded-full bg-pink-300 px-10 py-3 shadow-xl transition group-hover:bg-pink-400">
              Enter Free
            </span>
          </a>

          {/* Headline */}
          <h1
            className="font-extrabold tracking-tight text-zinc-900"
            style={{
              fontSize: "clamp(28px, 4vw, 56px)",
              lineHeight: 1.05,
            }}
          >
            Discover Trending Creators For Free
          </h1>

          {/* Subtext */}
          <p
            className="text-zinc-800"
            style={{ fontSize: "clamp(14px, 1.6vw, 18px)" }}
          >
            FansOfOnly is a discovery hub. We don’t host media.
          </p>

          {/* Footer */}
          <p className="mt-1 text-[11px] text-zinc-800/80">
            By using this site you agree to our{" "}
            <a href="/terms" className="underline">Terms</a> and{" "}
            <a href="/privacy" className="underline">Privacy</a>.
          </p>
        </div>
      </div>
    </main>
  );
}
