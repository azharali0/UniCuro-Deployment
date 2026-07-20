import { requireRole } from "@/lib/session";
import { prisma } from "@/lib/prisma";
export default async function Page(){ await requireRole(["ADMIN","SUPER_ADMIN"]); const logs=await prisma.apiRequestAudit.findMany({orderBy:{createdAt:"desc"},take:200}); return <main className="min-h-screen bg-slate-50 p-6"><section className="mx-auto max-w-7xl"><h1 className="text-5xl font-black">API Audit Logs</h1><div className="mt-6 grid gap-2">{logs.map(l=><article key={l.id} className="rounded-2xl border bg-white p-4"><b>{l.method} {l.endpoint}</b><p>{l.status}</p></article>)}</div></section></main>}
