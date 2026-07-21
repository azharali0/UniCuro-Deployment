"use client";
import { useState } from "react";
import Link from "next/link";

export function RegisterCard() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("STUDENT");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit() {
    if (!name || !email || !password) return setError("All fields are required");
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error || "Registration failed");
        setLoading(false);
        return;
      }
      window.location.href = json.redirectTo || "/onboarding";
    } catch (e) {
      setError("An unexpected error occurred");
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 p-6 flex items-center justify-center">
      <section className="w-full max-w-md rounded-[32px] border bg-white p-8 shadow-xl">
        <h1 className="text-4xl font-black">Create Account</h1>
        <p className="mt-3 text-slate-600 leading-7">Join UniCuro and access all our exclusive features.</p>
        
        <label className="mt-8 block text-sm font-black">Full Name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} className="mt-2 w-full rounded-2xl border p-4" placeholder="John Doe" />
        
        <label className="mt-4 block text-sm font-black">Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-2 w-full rounded-2xl border p-4" placeholder="you@example.com" />
        
        <label className="mt-4 block text-sm font-black">Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-2 w-full rounded-2xl border p-4" placeholder="••••••••" />

        <label className="mt-4 block text-sm font-black">Account Type</label>
        <select value={role} onChange={(e) => setRole(e.target.value)} className="mt-2 w-full rounded-2xl border p-4 bg-white">
          <option value="STUDENT">Student</option>
          <option value="ADMIN">Administrator</option>
        </select>

        {error && <p className="mt-4 rounded-2xl bg-red-50 p-3 text-red-700 font-bold">{error}</p>}
        
        <button disabled={loading} onClick={submit} className="mt-6 w-full rounded-2xl px-5 py-4 font-black bg-blue-600 text-white disabled:opacity-50">
          {loading ? "Creating..." : "Sign Up"}
        </button>

        <p className="mt-6 text-center text-sm font-medium text-slate-500">
          Already have an account? <Link href="/login/student" className="text-blue-600 hover:underline">Log in</Link>
        </p>
      </section>
    </main>
  );
}
