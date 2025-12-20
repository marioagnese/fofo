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
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center -translate-y-16">
        {/* Logo (moved down + ~25% bigger) */}
        <img
          src="/fofo-logo.png"
          alt="FansOfOnly"
          className="mt-10 mb-10 w-[700px] max-w-[92vw] drop-shadow-2xl md:w-[950px]"
        />

        {/* Headline (no dash, no Free inline) */}
        <h1 className="max-w-4xl text-4xl font-extrabold tracking-tight text-zinc-900 md:text-6xl">
          Discover Trending Creators For Free
        </h1>

        {/* Subtext */}
        <p className="mt-6 max-w-xl text-base text-zinc-800 md:text-lg">
          FansOfOnly is a discovery hub. We don’t host media.
        </p>

        {/* Single CTA: Enter Free */}
        <div className="mt-10">
          <a
            href="/go/fapello"
            className="inline-flex items-center justify-center rounded-2xl bg-pink-600 px-12 py-4 text-sm font-semibold text-white shadow-xl hover:bg-pink-700"
          >
            Enter Free
          </a>
        </div>

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
