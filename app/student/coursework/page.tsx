import { requireRole } from "@/lib/session";
import { listCoursework } from "@/lib/courseworkStudioEngine";
import Link from "next/link";

export default async function Page() {
  const user = await requireRole(["STUDENT", "MERCHANT"]);
  const coursework = await listCoursework(user.id);
  return (
    <main className="min-h-screen bg-slate-50 p-6 dark:bg-slate-950">
      <section className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between gap-4">
          <div><p className="font-black uppercase text-emerald-600">Academic Integrity First</p><h1 className="text-4xl font-black dark:text-white">Coursework & Assignment Studio</h1></div>
          <Link href="/student/coursework/new" className="rounded-2xl bg-emerald-500 px-5 py-3 font-black">New coursework</Link>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {coursework.map((item) => (
            <article key={item.id} className="rounded-3xl border bg-white p-6 dark:bg-slate-900 dark:text-white">
              <p className="text-sm font-black text-emerald-600">{item.assignmentType}</p>
              <h2 className="mt-2 text-2xl font-black">{item.title}</h2>
              <p className="mt-3 text-slate-600 dark:text-slate-300">{item.courseName || "General coursework"}</p>
              <Link href={`/student/coursework/${item.id}`} className="mt-5 inline-flex font-black text-emerald-700">Open workspace</Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
