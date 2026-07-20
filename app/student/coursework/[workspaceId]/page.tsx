import { requireRole } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { workspaceId: string } }) {
  const user = await requireRole(["STUDENT", "MERCHANT"]);
  const workspace = await prisma.courseworkWorkspace.findFirst({
    where: { id: params.workspaceId, userId: user.id },
    include: { outline: true, sources: true, milestones: { orderBy: { sortOrder: "asc" } }, feedback: true },
  });
  if (!workspace) notFound();

  return (
    <main className="min-h-screen bg-slate-50 p-6 dark:bg-slate-950">
      <section className="mx-auto max-w-6xl">
        <p className="font-black uppercase text-emerald-600">Academic Integrity Mode</p>
        <h1 className="text-5xl font-black dark:text-white">{workspace.title}</h1>
        <p className="mt-4 max-w-3xl leading-8 text-slate-600 dark:text-slate-300">{workspace.briefText}</p>

        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          <article className="rounded-3xl border bg-white p-6 dark:bg-slate-900 dark:text-white">
            <h2 className="text-2xl font-black">Structured outline</h2>
            <pre className="mt-4 whitespace-pre-wrap text-sm">{JSON.stringify(workspace.outline?.sections || [], null, 2)}</pre>
          </article>
          <article className="rounded-3xl border bg-white p-6 dark:bg-slate-900 dark:text-white">
            <h2 className="text-2xl font-black">Milestones</h2>
            <div className="mt-4 grid gap-3">
              {workspace.milestones.map((item) => <div key={item.id} className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800"><strong>{item.title}</strong><p>{item.status}</p></div>)}
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
