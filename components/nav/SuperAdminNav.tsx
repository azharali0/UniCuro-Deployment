import Link from "next/link";
export function SuperAdminNav() {
  const items = [["/super-admin","Governance"],["/super-admin/security","Security"],["/super-admin/compliance","Compliance"],["/super-admin/infrastructure","Infrastructure"],["/super-admin/feature-flags","Feature Flags"],["/super-admin/pricing","Pricing"],["/super-admin/launch","Launch Board"]];
  return <nav className="grid gap-2 rounded-3xl border bg-white p-4">{items.map(([href,label]) => <Link className="rounded-2xl px-4 py-3 font-bold hover:bg-purple-50" key={href} href={href}>{label}</Link>)}</nav>;
}
