// app/page.tsx
export const dynamic = "force-static";

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-pink-100">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/hero-bg.jpg')" }}
      />

      {/* Soft overlay for readability */}
      <div className="absolute inset-0 bg-pink-200/60 backdrop-blur-[1px]" />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center -translate-y-28">
        {/* Logo */}
        <img
          src="/fofo-logo.png"
          alt="FansOfOnly"
          className="mt-10 mb-6 w-[700px] max-w-[92vw] drop-shadow-2xl md:w-[950px]"
        />

        {/* CTA ABOVE headline — subtle glow + slow pulse */}
        <a
          href="/go/fapello"
          className="group relative mb-8 inline-flex items-center justify-center rounded-full px-14 py-4 text-sm font-semibold text-pink-900 transition active:scale-[0.98]"
        >
          {/* Glow layer */}
          <span
            aria-hidden
            className="absolute -inset-1 rounded-full bg-pink-300/60 blur-xl opacity-70 transition duration-500 group-hover:opacity-100 animate-pulse"
          />

          {/* Button surface */}
          <span className="relative rounded-full bg-pink-300 px-14 py-4 shadow-xl transition group-hover:bg-pink-400">
            Enter Free
          </span>
        </a>

        {/* Headline */}
        <h1 className="max-w-4xl text-4xl font-extrabold tracking-tight text-zinc-900 md:text-6xl">
          Discover Trending Creators For Free
        </h1>

        {/* Subtext */}
        <p className="mt-6 max-w-xl text-base text-zinc-800 md:text-lg">
          FansOfOnly is a discovery hub. We don’t host media.
        </p>

        {/* Footer note */}
        <p className="mt-10 text-xs text-zinc-800/80">
          By using this site you agree to our{" "}
          <a href="/terms" className="underline">
            Terms
          </a>{" "}
          and{" "}
          <a href="/privacy" className="underline">
            Privacy
          </a>
          .
        </p>
      </div>
    </main>
  );
}
