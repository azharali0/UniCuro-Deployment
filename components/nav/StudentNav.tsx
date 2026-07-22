import Link from "next/link";
import { LogoutButton } from "@/components/auth/LogoutButton";
export function StudentNav() {
  const items = [["/student","Today"],["/student/discounts","Discounts"],["/student/wallet","Wallet"],["/student/academic","Academic AI"],["/student/community","Community"],["/student/marketplace","Marketplace"],["/student/merchant","Merchant"],["/student/settings","Settings"]];
  return (
    <nav className="flex lg:grid gap-2 overflow-x-auto rounded-3xl border bg-white p-4 scrollbar-hide">
      {items.map(([href,label]) => (
        <Link className="shrink-0 rounded-2xl px-4 py-3 font-bold hover:bg-emerald-50" key={href} href={href}>
          {label}
        </Link>
      ))}
      <div className="lg:mt-4 flex-shrink-0">
        <LogoutButton />
      </div>
    </nav>
  );
}
