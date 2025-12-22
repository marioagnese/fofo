export const dynamic = "force-static";

export default function ContinuePage() {
  return (
    <main className="relative min-h-screen w-screen bg-pink-100 flex items-center justify-center px-6 text-center">
      <div className="max-w-xl w-full rounded-2xl bg-white/80 backdrop-blur p-6 shadow-xl">
        
        <h1 className="text-2xl font-bold text-zinc-900 mb-2">
          Choose how you want to continue
        </h1>

        <p className="text-sm text-zinc-700 mb-6">
          FansOfOnly does not host content. You’ll be redirected to external platforms.
        </p>

        {/* OPTION A — Official */}
        <a
          href="https://onlyfans.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="mb-4 block w-full rounded-xl bg-blue-600 px-4 py-3 text-white font-semibold shadow hover:bg-blue-700 transition"
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
          className="block w-full rounded-xl bg-pink-400 px-4 py-3 text-pink-900 font-semibold shadow hover:bg-pink-500 transition"
        >
          Browse Public Previews
          <span className="block text-xs font-normal opacity-80">
            External websites
          </span>
        </a>

        <p className="mt-4 text-[11px] text-zinc-700/70">
          18+ only. FansOfOnly is an independent discovery site and is not affiliated with OnlyFans or creators.
        </p>
      </div>
    </main>
  );
}
