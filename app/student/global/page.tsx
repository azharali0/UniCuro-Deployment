import { listCountryProfiles } from "@/lib/globalStudentIntelligenceEngine";

export default async function Page() {
  const countries = await listCountryProfiles();
  return (
    <main className="min-h-screen bg-slate-50 p-6 dark:bg-slate-950">
      <section className="mx-auto max-w-7xl">
        <p className="font-black uppercase text-emerald-600">Global Student Intelligence</p>
        <h1 className="text-5xl font-black dark:text-white">Country-aware university support</h1>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {countries.map((c) => <article key={c.id} className="rounded-3xl border bg-white p-6 dark:bg-slate-900 dark:text-white"><h2 className="text-2xl font-black">{c.countryName}</h2><p className="mt-2">{c.currencyCode} · {c.languageCodes.join(", ")}</p></article>)}
        </div>
      </section>
    </main>
  );
}
