import Link from "next/link";
export function EntityList({ title, items }: { title: string; items: Array<{ id: string; title: string; subtitle?: string; href?: string }> }) {
  return <section className="rounded-3xl border bg-white p-6 dark:bg-slate-900 dark:text-white"><h2 className="text-2xl font-black">{title}</h2><div className="mt-4 grid gap-3">{items.map(i => <div key={i.id} className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800"><div className="font-black">{i.title}</div>{i.subtitle && <p>{i.subtitle}</p>}{i.href && <Link href={i.href} className="font-black text-emerald-700">Open</Link>}</div>)}</div></section>
}
