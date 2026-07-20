import { requireRole } from "@/lib/session";
import { StudentNav } from "@/components/nav/StudentNav";

export default async function StudentLayout({ children }: { children: React.ReactNode }) {
  await requireRole(["STUDENT", "MERCHANT"]);
  return <main className="min-h-screen bg-slate-50 p-6"><div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[280px_1fr]"><StudentNav /><section>{children}</section></div></main>;
}
