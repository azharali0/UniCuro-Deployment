import Link from "next/link";
import { getPublishedHomepage } from "@/lib/homepageService";
import { DynamicPricingCard } from "@/components/pricing/DynamicPricingCard";

export default async function HomePage() {
  const { homepage, metrics, ready } = await getPublishedHomepage();

  if (!ready || !homepage) {
    return (
      <main className="min-h-screen bg-slate-50 p-6">
        <section className="mx-auto max-w-4xl rounded-[32px] border bg-white p-8">
          <h1 className="text-3xl font-black">Homepage content required</h1>
          <p className="mt-3 text-slate-600">Publish homepage content in the database before production launch.</p>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <p className="inline-flex rounded-full bg-emerald-100 px-4 py-2 text-sm font-black text-emerald-800">UniSphere Student Operating System</p>
          <h1 className="mt-6 text-5xl font-black tracking-tight text-slate-950 dark:text-white lg:text-7xl">{homepage.heroHeadline}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">{homepage.heroSubheadline}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link className="rounded-2xl bg-emerald-500 px-6 py-4 font-black text-emerald-950" href={homepage.primaryCtaHref}>{homepage.primaryCtaLabel}</Link>
            {homepage.secondaryCtaHref && homepage.secondaryCtaLabel && (
              <Link className="rounded-2xl border bg-white px-6 py-4 font-black" href={homepage.secondaryCtaHref}>{homepage.secondaryCtaLabel}</Link>
            )}
          </div>
        </div>
        <DynamicPricingCard />
      </section>

      <section className="mx-auto grid max-w-7xl gap-4 px-6 pb-10 md:grid-cols-3">
        {metrics.map((metric) => (
          <article key={metric.id} className="rounded-3xl border bg-white p-6 dark:bg-slate-900 dark:text-white">
            <p className="text-sm font-bold text-slate-500">{metric.label}</p>
            <p className="mt-2 text-4xl font-black">{metric.value}</p>
          </article>
        ))}
      </section>

      <section className="mx-auto grid max-w-7xl gap-4 px-6 pb-20 md:grid-cols-3">
        {homepage.sections.map((section) => (
          <article key={section.id} className="rounded-3xl border bg-white p-6 dark:bg-slate-900 dark:text-white">
            <p className="text-sm font-black uppercase text-emerald-600">{section.sectionType}</p>
            <h2 className="mt-3 text-2xl font-black">{section.title}</h2>
            <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">{section.body}</p>
            {section.ctaHref && section.ctaLabel && <Link className="mt-5 inline-flex font-black text-emerald-700" href={section.ctaHref}>{section.ctaLabel}</Link>}
          </article>
        ))}
      </section>
    </main>
  );
}
