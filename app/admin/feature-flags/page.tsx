import { requireRole } from "@/lib/session";
import { listFeatureFlags } from "@/lib/featureFlagEngine";
export default async function Page(){ await requireRole(["ADMIN","SUPER_ADMIN"]); const flags=await listFeatureFlags(); return <main className="min-h-screen bg-slate-50 p-6"><section className="mx-auto max-w-6xl"><h1 className="text-5xl font-black">Feature Flags</h1><div className="mt-6 grid gap-3">{flags.map(f=><article key={f.id} className="rounded-2xl border bg-white p-4"><b>{f.name}</b><p>{f.enabled?"Enabled":"Disabled"}</p></article>)}</div></section></main>}
