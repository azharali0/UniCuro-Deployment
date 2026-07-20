import Link from "next/link";
import { getOnboardingState } from "@/lib/onboardingEngine";
export async function OnboardingShell({ userId, children }: { userId: string; children: React.ReactNode }) {
  const state = await getOnboardingState(userId);
  const steps = state.flow?.steps || [];
  return (
    <main className="min-h-screen bg-slate-50 p-6 dark:bg-slate-950">
      <section className="mx-auto max-w-6xl">
        <div className="rounded-[32px] border bg-white p-6 shadow-sm dark:bg-slate-900 dark:text-white">
          <p className="text-sm font-black uppercase text-emerald-600">UniSphere Onboarding</p>
          <h1 className="mt-1 text-3xl font-black">Set up your student operating system</h1>
          <div className="mt-6 h-3 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-emerald-500" style={{ width: `${state.completionPercent}%` }} /></div>
          <nav className="mt-6 grid gap-2 md:grid-cols-5">{steps.map((s) => <Link key={s.id} href={s.route} className="rounded-2xl border bg-slate-50 px-3 py-2 text-sm font-bold dark:bg-slate-800">{s.sortOrder}. {s.title}</Link>)}</nav>
        </div>
        <div className="mt-6">{children}</div>
      </section>
    </main>
  );
}
