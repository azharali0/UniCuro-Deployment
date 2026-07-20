import Link from "next/link";
export function StudentNav() {
  const items = [["/student","Today"],["/student/discounts","Discounts"],["/student/wallet","Wallet"],["/student/academic","Academic AI"],["/student/community","Community"],["/student/marketplace","Marketplace"],["/student/merchant","Merchant"],["/student/settings","Settings"]];
  return <nav className="grid gap-2 rounded-3xl border bg-white p-4">{items.map(([href,label]) => <Link className="rounded-2xl px-4 py-3 font-bold hover:bg-emerald-50" key={href} href={href}>{label}</Link>)}</nav>;
}
