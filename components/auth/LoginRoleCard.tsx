"use client";
import { useState } from "react";

type Role = "student" | "admin" | "super-admin";

const data = {
  student: {
    title: "Student Login",
    subtitle: "Access discounts, wallet, marketplace, merchant tools, AI study support and opportunities.",
    endpoint: "/api/auth/login/student",
    color: "bg-emerald-500 text-emerald-950",
  },
  admin: {
    title: "Admin Login",
    subtitle: "Access operations for users, support, moderation, notifications and finance.",
    endpoint: "/api/auth/login/admin",
    color: "bg-slate-950 text-white",
  },
  "super-admin": {
    title: "Super Admin Login",
    subtitle: "Access governance, compliance, security, infrastructure, pricing and launch controls.",
    endpoint: "/api/auth/login/super-admin",
    color: "bg-purple-700 text-white",
  },
};

export function LoginRoleCard({ role }: { role: Role }) {
  const cfg = data[role];
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  async function submit() {
    setError("");
    const next = new URLSearchParams(window.location.search).get("next") || "";
    const res = await fetch(cfg.endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp, next }),
    });
    const json = await res.json();
    if (!res.ok) return setError(json.error || "Login failed");
    window.location.href = json.redirectTo;
  }

  return (
    <main className="min-h-screen bg-slate-50 p-6 flex items-center justify-center">
      <section className="w-full max-w-md rounded-[32px] border bg-white p-8 shadow-xl">
        <div className={`mb-6 inline-flex rounded-full px-4 py-2 text-sm font-black ${cfg.color}`}>{role}</div>
        <h1 className="text-4xl font-black">{cfg.title}</h1>
        <p className="mt-3 text-slate-600 leading-7">{cfg.subtitle}</p>
        <label className="mt-8 block text-sm font-black">Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} className="mt-2 w-full rounded-2xl border p-4" placeholder="you@example.com" />
        <label className="mt-4 block text-sm font-black">{role === "student" ? "OTP code if required" : "MFA code"}</label>
        <input value={otp} onChange={(e) => setOtp(e.target.value)} className="mt-2 w-full rounded-2xl border p-4" placeholder="123456" />
        {error && <p className="mt-4 rounded-2xl bg-red-50 p-3 text-red-700 font-bold">{error}</p>}
        <button onClick={submit} className={`mt-6 w-full rounded-2xl px-5 py-4 font-black ${cfg.color}`}>Continue</button>
      </section>
    </main>
  );
}
