import Link from "next/link";
export function AdminNav() {
  const items = [["/admin","Operations"],["/admin/users","Users"],["/admin/support","Support"],["/admin/notifications","Notifications"],["/admin/moderation","Moderation"],["/admin/finance","Finance"],["/admin/analytics","Analytics"]];
  return <nav className="grid gap-2 rounded-3xl border bg-white p-4">{items.map(([href,label]) => <Link className="rounded-2xl px-4 py-3 font-bold hover:bg-slate-100" key={href} href={href}>{label}</Link>)}</nav>;
}
