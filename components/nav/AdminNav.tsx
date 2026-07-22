"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoutButton } from "@/components/auth/LogoutButton";

export function AdminNav() {
  const pathname = usePathname();
  const items = [
    ["/admin", "Operations"],
    ["/admin/users", "Users"],
    ["/admin/support", "Support"],
    ["/admin/notifications", "Notifications"],
    ["/admin/moderation", "Moderation"],
    ["/admin/finance", "Finance"],
    ["/admin/analytics", "Analytics"],
  ];
  return (
    <nav className="flex lg:grid gap-2 overflow-x-auto rounded-3xl border bg-white p-4 scrollbar-hide">
      {items.map(([href, label]) => {
        const isActive = pathname === href;
        return (
          <Link
            className={`shrink-0 rounded-2xl px-4 py-3 font-bold transition-colors ${
              isActive
                ? "bg-slate-900 text-white"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
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
