// app/page.tsx
export const dynamic = "force-static";

import Image from "next/image";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-100 text-zinc-900">
      {/* Top nav */}
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
        <div className="text-sm font-semibold tracking-tight">
          fansofonly
        </div>

        <nav className="flex items-center gap-4">
          <a
            href="#how"
            className="text-sm text-zinc-600 hover:text-zinc-900"
          >
            How it works
          </a>
          <a
            href="/go/fapello"
            className="rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Browse Trending →
          </a>
        </nav>
      </header>

      {/* HERO */}
      <section className="mx-auto flex w-full max-w-6xl flex-col items-center px-6 pt-12 pb-24 text-center">
        {/* BIG LOGO */}
        <div className="relative mb-10 w-full max-w-2xl">
          <Image
            src="/fofo-logo.png"
            alt="FansOfOnly"
            width={900}
            height={450}
            priority
            className="mx-auto h-auto w-full"
          />
        </div>

        {/* Headline */}
        <h1 className="max-w-3xl text-4xl font-bold leading-tight md:text-5xl">
          Discover trending creators —{" "}
          <span className="text-blue-600">Free</span>
        </h1>

        <p className="mt-4 max-w-xl text-base text-zinc-600 md:text-lg">
          FansOfOnly is a discovery hub. We don’t host media — we link you to
          public pages and official sources.
        </p>

        {/* CTA */}
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
          <a
            href="/go/fapello"
            className="rounded-full bg-blue-600 px-8 py-3 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Browse Trending →
          </a>

          <a
            href="#how"
            className="rounded-full bg-white px-8 py-3 text-sm font-semibold text-zinc-900 shadow-sm ring-1 ring-zinc-200 hover:bg-zinc-50"
          >
            How it works →
          </a>
        </div>

        <p className="mt-6 text-xs text-zinc-500">
          By using this site you agree to our{" "}
          <a href="/terms" className="underline">Terms</a> and{" "}
          <a href="/privacy" className="underline">Privacy</a>.
        </p>
      </section>

      {/* HOW IT WORKS */}
      <section
        id="how"
        className="mx-auto w-full max-w-5xl px-6 pb-20"
      >
        <div className="rounded-3xl bg-white p-10 text-center shadow-sm ring-1 ring-zinc-100">
          <h2 className="text-2xl font-bold">How FansOfOnly works</h2>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div>
              <div className="text-lg font-semibold">1. Discover</div>
              <p className="mt-2 text-sm text-zinc-600">
                See which creators fans are talking about right now.
              </p>
            </div>

            <div>
              <div className="text-lg font-semibold">2. Explore</div>
              <p className="mt-2 text-sm text-zinc-600">
                We link to public platforms and official pages only.
              </p>
            </div>

            <div>
              <div className="text-lg font-semibold">3. Support</div>
              <p className="mt-2 text-sm text-zinc-600">
                Visit creators directly and support them where it matters.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="mx-auto w-full max-w-6xl px-6 pb-10 text-center text-sm text-zinc-500">
        <div className="font-semibold text-zinc-900">FansOfOnly</div>
        <p className="mt-2">
          We do not host or store content. All media belongs to its respective
          owners.
        </p>
      </footer>
    </main>
  );
}
