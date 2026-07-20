import { requireRole } from "@/lib/session";
import { AdminNav } from "@/components/nav/AdminNav";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireRole(["ADMIN"]);
  return <main className="min-h-screen bg-slate-50 p-6"><div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[280px_1fr]"><AdminNav /><section>{children}</section></div></main>;
}
