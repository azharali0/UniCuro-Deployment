import { requireRole } from "@/lib/session";
import { getStudentSettings } from "@/lib/studentEnginesDb";
import { SettingsForm } from "./SettingsForm";
export default async function SettingsPage(){ const user=await requireRole(["STUDENT","MERCHANT"]); const settings=await getStudentSettings(user.id); return <main className="min-h-screen bg-slate-50 p-6 dark:bg-slate-950"><section className="mx-auto max-w-5xl"><p className="font-black uppercase text-emerald-600">Your preferences</p><h1 className="text-5xl font-black dark:text-white">Settings</h1><div className="mt-6"><SettingsForm settings={settings}/></div></section></main>; }
