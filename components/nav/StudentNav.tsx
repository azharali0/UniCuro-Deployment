"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoutButton } from "@/components/auth/LogoutButton";

export function StudentNav() {
  const pathname = usePathname();
  const items = [
    ["/student", "Today"],
    ["/student/discounts", "Discounts"],
    ["/student/wallet", "Wallet"],
    ["/student/academic", "Academic AI"],
    ["/student/community", "Community"],
    ["/student/marketplace", "Marketplace"],
    ["/student/merchant", "Merchant"],
    ["/student/settings", "Settings"],
  ];
  return (
    <nav className="flex lg:grid gap-2 overflow-x-auto rounded-3xl border bg-white p-4 scrollbar-hide">
      {items.map(([href, label]) => {
        const isActive = pathname === href;
        return (
          <Link
            className={`shrink-0 rounded-2xl px-4 py-3 font-bold transition-colors ${
              isActive
                ? "bg-emerald-500 text-white"
                : "text-slate-600 hover:bg-emerald-50 hover:text-emerald-950"
            }`}
            key={href}
            href={href}
          >
            {label}
          </Link>
        );
      })}
      <div className="lg:mt-4 flex-shrink-0">
        <LogoutButton />
      </div>
    </nav>
  );
}
