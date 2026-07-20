import { Brand } from "@/components/Brand";

export function LandingPage({
  onLogin,
  onPreview,
}: {
  onLogin: () => void;
  onPreview: () => void;
}) {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-brand-bg/90 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
          <Brand />
          <div className="flex gap-2">
            <button onClick={onLogin} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 font-extrabold">
              Login
            </button>
            <button onClick={onPreview} className="rounded-2xl bg-brand-green px-4 py-3 font-extrabold text-emerald-950">
              Open Student OS
            </button>
          </div>
        </nav>
      </header>

      <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 lg:grid-cols-[1.08fr_.92fr]">
        <div>
          <span className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-black text-emerald-700">
            Priority 18 Build — Launch Readiness & Certification Engine
          </span>
          <h1 className="mt-5 max-w-3xl text-5xl font-black leading-[0.95] tracking-[-0.07em] md:text-7xl">
            Your university life in one calm command centre.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-500">
            UniSphere now includes full launch readiness, QA, compliance, deployment certification,
            investor review KPIs, risk governance and Go/No-Go launch control.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <button onClick={onLogin} className="rounded-2xl bg-brand-green px-5 py-4 font-black text-emerald-950">
              Start Free
            </button>
            <button onClick={onPreview} className="rounded-2xl border border-slate-200 bg-white px-5 py-4 font-black">
              Preview Dashboard
            </button>
          </div>
        </div>

        <div className="rounded-[34px] border border-slate-200 bg-white p-6 shadow-soft">
          <div className="mx-auto max-w-sm rounded-[42px] border-[10px] border-slate-900 bg-brand-bg p-5 shadow-2xl">
            <div className="mb-4 flex justify-between text-xs font-black">
              <span>9:42</span>
              <span>Student OS</span>
            </div>
            <div className="mb-4 h-36 rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-50 to-emerald-50">
              <svg viewBox="0 0 500 180" className="h-full w-full">
                <path d="M70 135C115 75 178 75 224 126C258 164 333 154 382 91" stroke="#111827" strokeWidth="7" strokeLinecap="round" fill="none" />
                <circle cx="112" cy="88" r="24" fill="#22C55E" />
                <rect x="250" y="54" width="104" height="68" rx="18" fill="#A78BFA" opacity=".85" />
                <path d="M382 91L430 52" stroke="#F97316" strokeWidth="7" strokeLinecap="round" />
              </svg>
            </div>
            {["76% launch readiness", "8 QA suites", "Conditional Go"].map((item) => (
              <div key={item} className="mb-3 rounded-2xl border border-slate-200 bg-white p-4 font-bold text-slate-700">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
