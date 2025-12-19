// app/page.tsx
export const dynamic = "force-static";

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/hero-bg.jpg')",
        }}
      />

      {/* Pink overlay */}
      <div className="absolute inset-0 bg-pink-200/70 backdrop-blur-sm" />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        {/* Logo */}
        <img
          src="/fofo-logo.png"
          alt="FansOfOnly"
          className="mb-10 w-[320px] max-w-full drop-shadow-xl md:w-[420px]"
        />

        {/* Headline */}
        <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight text-zinc-900 md:text-5xl">
          Discover trending creators —{" "}
          <span className="text-blue-600">Free</span>
        </h1>

        {/* Subtext */}
        <p className="mt-5 max-w-xl text-base text-zinc-700 md:text-lg">
          FansOfOnly is a discovery hub.  
          We don’t host media — we guide you to public pages and official sources.
        </p>

        {/* CTAs */}
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <a
            href="/go/fapello"
            className="rounded-2xl bg-blue-600 px-8 py-4 text-sm font-semibold text-white shadow-lg hover:bg-blue-700"
          >
            Browse Trending →
          </a>

          <a
            href="#how"
            className="rounded-2xl bg-white/80 px-8 py-4 text-sm font-semibold text-zinc-900 shadow hover:bg-white"
          >
            How it works →
          </a>
        </div>

        {/* Footer note */}
        <p className="mt-8 text-xs text-zinc-600">
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
