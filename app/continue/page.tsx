export const dynamic = "force-static";

export default function ContinuePage() {
  return (
    <main className="relative min-h-screen w-screen overflow-hidden bg-pink-100">
      {/* Background image (same as homepage) */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/hero-bg.jpg')" }}
      />

      {/* Soft overlay */}
      <div className="absolute inset-0 bg-pink-200/60 backdrop-blur-[1px]" />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen w-screen items-center justify-center px-6 text-center">
        <div className="w-full max-w-xl rounded-2xl bg-white/80 backdrop-blur p-6 shadow-xl">
          <h1 className="mb-2 text-2xl font-bold text-zinc-900">
            Choose how you want to continue
          </h1>

          <p className="mb-6 text-sm text-zinc-700">
            FansOfOnly does not host content. You’ll be redirected to external platforms.
          </p>

          {/* OPTION A — Official */}
          <a
            href="https://onlyfans.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="mb-4 block w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white shadow transition hover:bg-blue-700"
          >
            Visit Official Creator Pages
            <span className="block text-xs font-normal opacity-80">
              Subscription may be required
            </span>
          </a>

          {/* OPTION B — Public previews */}
          <a
            href="https://fapello.com/welcome/"
            target="_blank"
            rel="noopener noreferrer"
            className="mb-4 block w-full rounded-xl bg-pink-400 px-4 py-3 font-semibold text-pink-900 shadow transition hover:bg-pink-500"
          >
            Browse Public Previews
            <span className="block text-xs font-normal opacity-80">
              External websites
            </span>
          </a>

          {/* OPTION C — Webcam chat (affiliate) */}
          <a
            href="https://t.amyfc.link/398988/779/0?bo=2779,2778,2777,2776,2775&po=6533&aff_sub5=SF_006OG000004lmDN"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full rounded-xl bg-emerald-500 px-4 py-3 font-semibold text-white shadow transition hover:bg-emerald-600"
          >
            Live Webcam Chat
            <span className="block text-xs font-normal opacity-90">
              18+ • External platform • May require signup/payment
            </span>
          </a>

          <p className="mt-4 text-[11px] text-zinc-700/70">
            18+ only. FansOfOnly is an independent discovery site and is not affiliated
            with OnlyFans or individual creators. Some outbound links may be affiliate links.
          </p>
        </div>
      </div>
    </main>
  );
}
