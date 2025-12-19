// app/page.tsx
export const dynamic = "force-static";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-950">
      {/* Top bar */}
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-5">
        <a href="/" className="text-sm font-semibold text-zinc-900">
          fansofonly
        </a>

        <nav className="flex items-center gap-2">
          <a
            href="/how"
            className="rounded-xl px-3 py-2 text-sm text-zinc-700 hover:bg-white hover:shadow-sm"
          >
            How it works
          </a>
          <a
            href="/go/fapello"
            className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Browse Trending →
          </a>
        </nav>
      </header>

      {/* Hero (centered + big logo) */}
      <section className="mx-auto w-full max-w-6xl px-4 pb-16 pt-6">
        <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-zinc-100 md:p-12">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            {/* BIG LOGO */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/fofo-logo.png"
              alt="FansOfOnly"
              className="h-24 w-auto md:h-36 lg:h-44"
              loading="eager"
            />

            <h1 className="mt-6 text-4xl font-bold leading-tight md:text-5xl">
              Discover trending creators — <span className="text-blue-600">Free</span>
            </h1>

            <p className="mt-4 max-w-2xl text-base text-zinc-600 md:text-lg">
              FansOfOnly is a discovery hub. We don’t host media — we link you to public pages
              and official sources.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href="/go/fapello"
                className="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-7 py-3 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Browse Trending →
              </a>

              <a
                href="/how"
                className="inline-flex items-center justify-center rounded-2xl bg-zinc-100 px-7 py-3 text-sm font-semibold text-zinc-900 hover:bg-zinc-200"
              >
                How it works →
              </a>
            </div>

            <div className="mt-6 text-xs text-zinc-500">
              By using this site you agree to our{" "}
              <a className="underline hover:text-zinc-900" href="/terms">
                Terms
              </a>{" "}
              and{" "}
              <a className="underline hover:text-zinc-900" href="/privacy">
                Privacy
              </a>
              .
            </div>
          </div>
        </div>
      </section>

      {/* Footer (minimal) */}
      <footer className="mx-auto w-full max-w-6xl px-4 pb-10">
        <div className="rounded-3xl bg-white p-6 text-sm text-zinc-600 shadow-sm ring-1 ring-zinc-100">
          <div className="font-semibold text-zinc-900">FansOfOnly</div>
          <p className="mt-2">
            FansOfOnly does not host or store any media. All content is owned by its respective
            creators and platforms.
          </p>
          <div className="mt-4 flex flex-wrap gap-4 text-sm">
            <a className="hover:text-zinc-900" href="/privacy">
              Privacy
            </a>
            <a className="hover:text-zinc-900" href="/terms">
              Terms
            </a>
            <a className="hover:text-zinc-900" href="/contact">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
