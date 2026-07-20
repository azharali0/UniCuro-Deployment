import { requireRole } from "@/lib/session";
import { listWorkspaceDocuments, listWorkspaceBoards } from "@/lib/studentWorkspaceEngine";

export default async function Page() {
  const user = await requireRole(["STUDENT", "MERCHANT"]);
  const [documents, boards] = await Promise.all([listWorkspaceDocuments(user.id), listWorkspaceBoards(user.id)]);
  return (
    <main className="min-h-screen bg-slate-50 p-6 dark:bg-slate-950">
      <section className="mx-auto max-w-7xl">
        <p className="font-black uppercase text-emerald-600">Unified Student Workspace</p>
        <h1 className="text-5xl font-black dark:text-white">Documents, notes, research and boards</h1>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <article className="rounded-3xl border bg-white p-6 dark:bg-slate-900 dark:text-white"><h2 className="text-2xl font-black">Documents</h2><p className="mt-3">{documents.length} active documents</p></article>
          <article className="rounded-3xl border bg-white p-6 dark:bg-slate-900 dark:text-white"><h2 className="text-2xl font-black">Boards</h2><p className="mt-3">{boards.length} active boards</p></article>
        </div>
      </section>
    </main>
  );
}
