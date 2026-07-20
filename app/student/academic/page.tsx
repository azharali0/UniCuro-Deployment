import { PremiumGate } from "@/components/PremiumGate";

export default function AcademicPage() {
  return (
    <PremiumGate>
      <section className="rounded-[32px] border bg-white p-8 dark:bg-slate-900 dark:text-white">
        <h1 className="text-3xl font-black">AI Academic Assistant</h1>
        <p className="mt-3 text-slate-600 dark:text-slate-300">Ask study questions, create revision plans and generate flashcards with quota protection.</p>
        <textarea className="mt-6 min-h-40 w-full rounded-2xl border p-4 dark:bg-slate-950" production configuration="Ask a study question..." />
        <button className="mt-4 rounded-2xl bg-emerald-500 px-5 py-4 font-black text-emerald-950">Ask Assistant</button>
      </section>
    </PremiumGate>
  );
}
