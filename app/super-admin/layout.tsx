import { requireRole } from "@/lib/session";
import { SuperAdminNav } from "@/components/nav/SuperAdminNav";

export default async function SuperAdminLayout({ children }: { children: React.ReactNode }) {
  await requireRole(["SUPER_ADMIN"]);
  return <main className="min-h-screen bg-slate-50 p-6"><div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[280px_1fr]"><SuperAdminNav /><section>{children}</section></div></main>;
}
