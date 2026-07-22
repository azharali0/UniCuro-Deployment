"use client";
import { useState } from "react";

type Role = "student" | "admin" | "super-admin";

const data = {
  student: {
    title: "Student Login",
    subtitle: "Access discounts, wallet, marketplace, merchant tools, AI study support and opportunities.",
    endpoint: "/api/auth/login/student",
    color: "bg-emerald-500 text-emerald-950",
    buttonBg: "bg-emerald-500",
  },
  admin: {
    title: "Admin Login",
    subtitle: "Access operations for users, support, moderation, notifications and finance.",
    endpoint: "/api/auth/login/admin",
    color: "bg-slate-950 text-white",
    buttonBg: "bg-slate-950 text-white",
  },
  "super-admin": {
    title: "Super Admin Login",
    subtitle: "Access governance, compliance, security, infrastructure, pricing and launch controls.",
    endpoint: "/api/auth/login/super-admin",
    color: "bg-purple-700 text-white",
    buttonBg: "bg-purple-700 text-white",
  },
};

export function LoginRoleCard({ role: initialRole = "student" }: { role?: Role }) {
  const [role, setRole] = useState<Role>(initialRole);
  const cfg = data[role];
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  async function submit() {
    setError("");
    const next = new URLSearchParams(window.location.search).get("next") || "";
    const res = await fetch(cfg.endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, otp, next }),
    });
    const json = await res.json();
    if (!res.ok) return setError(json.error || "Login failed");
    window.location.href = json.redirectTo;
  }

  return (
    <main className="min-h-screen bg-slate-50 p-6 flex items-center justify-center">
      <section className="w-full max-w-md rounded-[32px] border bg-white p-8 shadow-xl">
        
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-black">{cfg.title}</h1>
          
          {/* Role Toggle (Hide for super-admin) */}
          {role !== "super-admin" && (
            <div className="flex rounded-xl bg-slate-100 p-1 shrink-0">
              <button 
                onClick={() => setRole("student")}
                className={`rounded-lg px-4 py-1.5 text-xs font-bold transition-all ${role === "student" ? "bg-emerald-500 shadow-sm text-white" : "text-slate-500 hover:text-slate-700"}`}
              >
                Student
              </button>
              <button 
                onClick={() => setRole("admin")}
                className={`rounded-lg px-4 py-1.5 text-xs font-bold transition-all ${role === "admin" ? "bg-emerald-500 shadow-sm text-white" : "text-slate-500 hover:text-slate-700"}`}
              >
                Admin
              </button>
            </div>
          )}
        </div>

        <p className="mb-8 text-sm text-slate-600 leading-6">{cfg.subtitle}</p>
        
        <label className="mt-8 block text-sm font-black">Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} className="mt-2 w-full rounded-2xl border p-4" placeholder="you@example.com" />
        
        <label className="mt-4 block text-sm font-black">Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-2 w-full rounded-2xl border p-4" placeholder="••••••••" />

        {(role === "admin" || role === "super-admin") && (
          <>
            <label className="mt-4 block text-sm font-black">6-Digit Authenticator Code</label>
            <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} className="mt-2 w-full rounded-2xl border p-4" placeholder="123456" />
          </>
        )}

        {error && <p className="mt-4 rounded-2xl bg-red-50 p-3 text-red-700 font-bold">{error}</p>}
        <button onClick={submit} className={`mt-6 w-full rounded-2xl px-5 py-4 font-black ${cfg.buttonBg}`}>Continue</button>
        
        {role === "student" && (
          <p className="mt-6 text-center text-sm font-medium text-slate-500">
            Don't have an account? <a href="/register" className={`font-bold hover:underline text-emerald-600`}>Sign up</a>
          </p>
        )}
      </section>
    </main>
  );
}
