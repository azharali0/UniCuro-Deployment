import Link from "next/link";
import { getOnboardingState } from "@/lib/onboardingRuntimeEngine";

export async function RuntimeOnboardingShell({
  userId,
  children,
}: {
  userId: string;
  children: React.ReactNode;
}) {
  const state = await getOnboardingState(userId);
  const steps = state.flow?.steps || [];

  return (
    <main className="min-h-screen bg-white px-6 py-8 text-slate-950">
      <section className="mx-auto max-w-6xl">
        <header className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-sm font-black uppercase tracking-wide text-emerald-700">
                UniSphere onboarding
              </p>
              <h1 className="mt-2 text-3xl font-black">
                Set up your student operating system
              </h1>
              <p className="mt-2 max-w-2xl text-slate-600">
                Your answers are stored in UniSphere and used to personalise pricing,
                language, notifications, study support, marketplace access, and your dashboard.
              </p>
            </div>
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 font-black text-emerald-800">
              {state.completionPercent}% complete
            </div>
          </div>

          <div className="mt-6 h-2 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-emerald-600"
              style={{ width: `${state.completionPercent}%` }}
            />
          </div>

          <nav className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
            {steps.map((step) => (
              <Link
                key={step.id}
                href={step.route}
                className="rounded-2xl border border-slate-200 px-3 py-3 text-sm font-bold hover:border-emerald-500"
              >
                {step.sortOrder}. {step.title}
              </Link>
            ))}
          </nav>
        </header>

        <div className="mt-6">{children}</div>
      </section>
    </main>
  );
}
