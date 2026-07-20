import Link from "next/link";

export function ModuleCard({ title, body, href, label }: { title: string; body: string; href: string; label: string }) {
  return (
    <article className="rounded-3xl border bg-white p-6 shadow-sm dark:bg-slate-900 dark:text-white">
      <h2 className="text-2xl font-black">{title}</h2>
      <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">{body}</p>
      <Link href={href} className="mt-5 inline-flex rounded-2xl bg-emerald-500 px-5 py-3 font-black text-emerald-950">{label}</Link>
    </article>
  );
}
