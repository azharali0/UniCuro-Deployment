import { requireRole } from "@/lib/session";
import { prisma } from "@/lib/prisma";
export default async function Page(){ await requireRole(["ADMIN","SUPER_ADMIN"]); const h=await prisma.homepageContent.findFirst({include:{sections:true}}); return <main className="min-h-screen bg-slate-50 p-6"><section className="mx-auto max-w-6xl"><h1 className="text-5xl font-black">Homepage Content CMS</h1><pre className="mt-6 overflow-auto rounded-3xl border bg-white p-6">{JSON.stringify(h,null,2)}</pre></section></main>}
