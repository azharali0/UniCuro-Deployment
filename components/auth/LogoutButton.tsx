"use client";
import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();
  
  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  };

  return (
    <button 
      onClick={handleLogout}
      className="mt-4 rounded-2xl px-4 py-3 font-bold text-red-600 hover:bg-red-50 text-left transition-colors"
    >
      Logout
    </button>
  );
}
