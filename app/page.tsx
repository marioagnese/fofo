// app/page.tsx
export const dynamic = "force-static";

type Creator = {
  name: string;
  category: string;
  heat: number; // 1-5
  fapelloPath: string; // relative path on fapello
  officialUrl?: string; // optional affiliate/official link
};

const trending: Creator[] = [
  { name: "CreatorOne", category: "Model", heat: 5, fapelloPath: "/creator/creatorone" },
  { name: "CreatorTwo", category: "Fitness", heat: 4, fapelloPath: "/creator/creatortwo" },
  { name: "CreatorThree", category: "Gamer", heat: 4, fapelloPath: "/creator/creatorthree" },
  { name: "CreatorFour", category: "Cosplay", heat: 3, fapelloPath: "/creator/creatorfour" },
  { name: "CreatorFive", category: "Lifestyle", heat: 3, fapelloPath: "/creator/creatorfive" },
  { name: "CreatorSix", category: "Alt", heat: 2, fapelloPath: "/creator/creatorsix" },
];

function Heat({ n }: { n: number }) {
  return (
    <span aria-label={`Heat ${n} of 5`} className="tracking-tight">
      {"🔥".repeat(Math.max(1, Math.min(5, n)))}
    </span>
  );
}

/**
 * A robust logo renderer:
 * - Tries /fofo-logo.png first (correct)
 * - If your file accidentally ended up as fofo-logo.png.png, it falls back automatically
 * - If both fail, it shows a small "FO" pill so the header never looks broken
 */
function BrandLogo() {
  // cache-bust per build by appending a constant query param (safe for static)
  const primary = "/fofo-logo.png?v=1";
  const fallback = "/fofo-logo.png.png?v=1"; // handles the accidental double extension

  return (
    <div className="flex items-center gap-3">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={primary}
        alt="FansOfOnly"
        className="h-10 w-auto"
        loading="eager"
        onError={(e) => {
          const img = e.currentTarget;
          // If primary fails, try fallback once.
          if (!img.dataset.fallbackTried) {
            img.dataset.fallbackTried = "1";
            img.src = fallback;
            return;
          }
          // If fallback also fails, hide image and show text badge.
          img.style.display = "none";
          const badge = img.parentElement?.querySelector<HTMLDivElement>("[data-fo-badge]");
          if (badge) badge.style.display = "grid";
        }}
      />

      <div
        data-fo-badge
        style={{ display: "none" }}
        className="h-10 w-10 rounded-2xl bg-zinc-900 text-white grid place-items-center font-semibold"
        aria-label="FO"
      >
        FO
      </div>

      <div className="leading-tight">
        <div className="text-lg font-semibold">fansofonly</div>
        <div className="text-xs text-zinc-500">Discovery • External links</div>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-950">
      {/* Top bar */}
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-5">
        <BrandLogo />

        <nav className="flex items-center gap-2">
          <a
            href="#trending"
            className="rounded-xl px-3 py-2 text-sm text-zinc-700 hover:bg-white hover:shadow-sm"
          >
            Trending
          </a>
          <a
            href="#how"
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

      {/* Hero */}
      <section className="mx-auto w-full max-w-6xl px-4 pb-10 pt-6">
        <div className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-zinc-100 md:p-10">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div className="space-y-5">
              <h1 className="text-4xl font-bold leading-tight md:text-5xl">
                Discover Trending Creators — <span className="text-blue-600">Free</span>
              </h1>
              <p className="text-base text-zinc-600 md:text-lg">
                Explore what fans are talking about. Browse trending creators and public previews in one place.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href="/go/fapello"
                  className="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  Browse Trending →
                </a>
                <a
                  href="#search"
                  className="inline-flex items-center justify-center rounded-2xl bg-zinc-100 px-6 py-3 text-sm font-semibold text-zinc-900 hover:bg-zinc-200"
                >
                  Search Creators
                </a>
              </div>

              <p className="text-xs text-zinc-500">
                FansOfOnly is a discovery platform. All content is hosted externally.
              </p>
            </div>

            <div className="rounded-3xl bg-zinc-50 p-6 ring-1 ring-zinc-100">
              <div className="space-y-3">
                <div className="text-sm font-semibold text-zinc-900">Quick categories</div>
                <div className="flex flex-wrap gap-2">
                  {["Model", "Fitness", "Gamer", "Cosplay", "Lifestyle", "Alt"].map((t) => (
                    <a
                      key={t}
                      href="/go/fapello"
                      className="rounded-2xl bg-white px-3 py-2 text-sm text-zinc-700 shadow-sm ring-1 ring-zinc-100 hover:bg-zinc-50"
                      aria-label={`Browse ${t}`}
                    >
                      {t}
                    </a>
                  ))}
                </div>
                <div className="pt-3 text-xs text-zinc-500">
                  Tip: Start with Trending, then jump to Official pages to support creators.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trending */}
      <section id="trending" className="mx-auto w-full max-w-6xl px-4 pb-10">
        <div className="mb-4 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold">🔥 Trending Right Now</h2>
            <p className="text-sm text-zinc-600">Metadata only. Click to view externally.</p>
          </div>
          <a
            href="/go/fapello"
            className="hidden rounded-xl bg-white px-4 py-2 text-sm font-semibold text-zinc-900 shadow-sm ring-1 ring-zinc-100 hover:bg-zinc-50 sm:inline-flex"
          >
            View all →
          </a>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {trending.map((c) => (
            <div key={c.name} className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-zinc-100">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-lg font-semibold">{c.name}</div>
                  <div className="text-sm text-zinc-600">Category: {c.category}</div>
                </div>
                <div className="text-sm">
                  <Heat n={c.heat} />
                </div>
              </div>

              <div className="mt-5 flex gap-2">
                <a
                  href={`/go/fapello?path=${encodeURIComponent(c.fapelloPath)}`}
                  className="flex-1 rounded-2xl bg-blue-600 px-4 py-2 text-center text-sm font-semibold text-white hover:bg-blue-700"
                >
                  View Profile →
                </a>
                <a
                  href={c.officialUrl ? c.officialUrl : "/go/official"}
                  className="flex-1 rounded-2xl bg-zinc-100 px-4 py-2 text-center text-sm font-semibold text-zinc-900 hover:bg-zinc-200"
                  rel="nofollow noopener"
                >
                  Official Page →
                </a>
              </div>

              <div className="mt-3 text-xs text-zinc-500">External link. Content hosted elsewhere.</div>
            </div>
          ))}
        </div>
      </section>

      {/* Search (placeholder) */}
      <section id="search" className="mx-auto w-full max-w-6xl px-4 pb-10">
        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-zinc-100 md:p-8">
          <h2 className="text-2xl font-bold">Search Creators</h2>
          <p className="mt-1 text-sm text-zinc-600">MVP placeholder — wire this to your future index/DB when ready.</p>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <input
              className="w-full rounded-2xl bg-zinc-50 px-4 py-3 text-sm outline-none ring-1 ring-zinc-200 focus:ring-2 focus:ring-blue-600"
              placeholder="Search by name, tag, category…"
            />
            <a
              href="/go/fapello"
              className="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Search →
            </a>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="mx-auto w-full max-w-6xl px-4 pb-10">
        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-zinc-100 md:p-8">
          <h2 className="text-2xl font-bold">How FansOfOnly Works</h2>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              { title: "1️⃣ Discover", body: "Browse trending creators by category and popularity." },
              { title: "2️⃣ Explore", body: "We link you to public, free platforms where fans already gather." },
              { title: "3️⃣ Support Creators", body: "Visit official pages directly to support creators you enjoy." },
            ].map((x) => (
              <div key={x.title} className="rounded-3xl bg-zinc-50 p-5 ring-1 ring-zinc-100">
                <div className="font-semibold">{x.title}</div>
                <div className="mt-1 text-sm text-zinc-600">{x.body}</div>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-3xl bg-blue-50 p-5 ring-1 ring-blue-100">
            <div className="font-semibold text-zinc-900">Want alerts when creators post?</div>
            <div className="mt-1 text-sm text-zinc-700">Coming soon.</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mx-auto w-full max-w-6xl px-4 pb-10">
        <div className="rounded-3xl bg-white p-6 text-sm text-zinc-600 shadow-sm ring-1 ring-zinc-100">
          <div className="font-semibold text-zinc-900">FansOfOnly</div>
          <p className="mt-2">
            FansOfOnly does not host or store any media. All content is owned by its respective creators and platforms.
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
