// app/page.tsx
export const dynamic = "force-static";

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-pink-100">
      {/* Fallback gradient behind everything */}
      <div className="absolute inset-0 bg-gradient-to-b from-pink-200 via-pink-100 to-pink-200" />

      {/* Background image (must exist in /public and be committed) */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-80"
        style={{ backgroundImage: "url('/hero-bg.png')" }}
      />

      {/* Light overlay for text readability (keep light so image still shows) */}
      <div className="absolute inset-0 bg-pink-200/25" />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        {/* Logo */}
        <img
          src="/fofo-logo.png"
          alt="FansOfOnly"
          className="mb-10 w-[420px] max-w-full drop-shadow-2xl md:w-[640px]"
        />

        {/* Headline */}
        <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight text-zinc-900 md:text-6xl">
          Discover trending creators — <span className="text-blue-600">Free</span>
        </h1>

        {/* Subtext */}
        <p className="mt-6 max-w-xl text-base text-zinc-800 md:text-lg">
          FansOfOnly is a discovery hub. We don’t host media — we guide you to public pages
          and official sources.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <a
            href="/go/fapello"
            className="rounded-2xl bg-blue-600 px-9 py-4 text-sm font-semibold text-white shadow-xl hover:bg-blue-700"
          >
            Browse Trending →
          </a>

          <a
            href="/how"
            className="rounded-2xl bg-white/85 px-9 py-4 text-sm font-semibold text-zinc-900 shadow-xl hover:bg-white"
          >
            How it works →
          </a>
        </div>

        {/* Footer note */}
        <p className="mt-10 text-xs text-zinc-700">
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
