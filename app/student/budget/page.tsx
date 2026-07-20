import { requireRole } from "@/lib/session";
import { getBudget } from "@/lib/studentSurvivalEngine";

export default async function Page() {
  const user = await requireRole(["STUDENT", "MERCHANT"]);
  const budget = await getBudget(user.id);
  return (
    <main className="min-h-screen bg-slate-50 p-6 dark:bg-slate-950">
      <section className="mx-auto max-w-5xl rounded-3xl border bg-white p-8 dark:bg-slate-900 dark:text-white">
        <h1 className="text-4xl font-black">Student Budget</h1>
        {budget ? <div className="mt-6 grid gap-4 md:grid-cols-3"><div>Income: {budget.incomeCents}</div><div>Expenses: {budget.expenseCents}</div><div>Savings target: {budget.savingsTargetCents}</div></div> : <p className="mt-4">Create your first budget through the connected budget API.</p>}
      </section>
    </main>
  );
}
