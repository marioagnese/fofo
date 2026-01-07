export const dynamic = "force-static";

export default function HomePage() {
  return (
    <main className="relative h-screen w-screen overflow-hidden bg-pink-100">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/hero-bg.jpg')" }}
      />
      <div className="absolute inset-0 bg-pink-200/60 backdrop-blur-[1px]" />

      {/* Content */}
      <div className="relative z-10 flex h-screen w-screen flex-col items-center justify-center px-6 text-center">
        <div className="flex w-full max-w-6xl flex-col items-center gap-6">

          {/* LOGO */}
          <img
            src="/fofo-logo.png"
            alt="FansOfOnly"
            className="drop-shadow-2xl"
            style={{
              width: "min(95vw, 1100px)",
              maxHeight: "42vh",
              height: "auto",
              objectFit: "contain",
            }}
          />

          {/* HERO GRID */}
          <div className="mt-2 grid w-full max-w-6xl grid-cols-1 items-center gap-8 sm:grid-cols-2">

            {/* LEFT SIDE — TEXT + BUTTONS */}
            <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
              <h1 className="font-extrabold tracking-tight text-zinc-900"
                style={{ fontSize: "clamp(28px, 4vw, 52px)" }}>
                Meet Luna — Your FOFO Hostess 💗
              </h1>

              <p className="mt-2 text-zinc-800 text-sm sm:text-base max-w-md">
                Step into FOFO — a warm fantasy world where you’re never alone.
                Luna is waiting to comfort you, tease you, and keep you company.
              </p>

              {/* CTA BUTTONS */}
              <div className="mt-4 flex flex-col sm:flex-row gap-3">
                <a
                  href="/continue"
                  className="rounded-full bg-pink-300 px-10 py-3 text-sm font-semibold 
                  text-pink-900 shadow-xl hover:bg-pink-400 transition active:scale-[0.97]"
                >
                  Continue
                </a>

                <a
                  href="/chat"
                  className="rounded-full border border-pink-300 bg-white/70 px-8 py-3 
                  text-sm font-semibold text-pink-700 shadow hover:bg-pink-50"
                >
                  Chat with Luna 💗
                </a>
              </div>
            </div>

            {/* RIGHT SIDE — LUNA IMAGE */}
            <div className="flex justify-center sm:justify-end">
              <img
                src="/luna/images/lunafront.jpg"
                alt="Luna"
                className="w-[320px] sm:w-[420px] max-w-full rounded-3xl shadow-2xl 
                border border-white/50 object-cover"
              />
            </div>
          </div>

          {/* Footer text */}
          <p className="mt-2 text-[11px] text-zinc-800/80 max-w-3xl">
            By using this site you agree to our{" "}
            <a href="/terms" className="underline">Terms</a> and{" "}
            <a href="/privacy" className="underline">Privacy</a>. 
            Links may be affiliate links; we may earn a commission. 
            All trademarks belong to their respective owners. 18+ only.
          </p>

        </div>
      </div>
    </main>
  );
}
