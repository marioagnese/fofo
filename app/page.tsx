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

      {/* Side image placeholders */}
      <div className="pointer-events-none absolute inset-0 z-0">
        {/* Left */}
        <div className="absolute left-4 top-1/2 hidden -translate-y-1/2 md:block">
          <div className="h-[520px] w-[320px] overflow-hidden rounded-[28px] bg-white/25 ring-1 ring-white/40 shadow-2xl">
            <img
              src="/Image1.png"
              alt="Left visual"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* Right */}
        <div className="absolute right-4 top-1/2 hidden -translate-y-1/2 md:block">
          <div className="h-[520px] w-[320px] overflow-hidden rounded-[28px] bg-white/25 ring-1 ring-white/40 shadow-2xl">
            <img
              src="/image2.png"
              alt="Right visual"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Center content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        {/* BIG logo */}
        <img
          src="/fofo-logo.png"
          alt="FansOfOnly"
          className="mb-10 w-[560px] max-w-[92vw] drop-shadow-2xl md:w-[760px]"
        />

        <h1 className="max-w-4xl text-4xl font-extrabold tracking-tight text-zinc-900 md:text-6xl">
          Discover trending creators — <span className="text-blue-600">Free</span>
        </h1>

        <p className="mt-6 max-w-xl text-base text-zinc-800 md:text-lg">
          FansOfOnly is a discovery hub. We don’t host media — we guide you to public pages and official sources.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <a
            href="/go/fapello"
            className="rounded-2xl bg-blue-600 px-10 py-4 text-sm font-semibold text-white shadow-xl hover:bg-blue-700"
          >
            Browse Trending →
          </a>

          <a
            href="/how"
            className="rounded-2xl bg-white/85 px-10 py-4 text-sm font-semibold text-zinc-900 shadow-xl hover:bg-white"
          >
            How it works →
          </a>
        </div>

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
