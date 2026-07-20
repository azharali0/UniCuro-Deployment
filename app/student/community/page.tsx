export default function CommunityPage() {
  return (
    <section className="rounded-[32px] border bg-white p-8 dark:bg-slate-900 dark:text-white">
      <h1 className="text-3xl font-black">Student Community</h1>
      <p className="mt-3 text-slate-600 dark:text-slate-300">Ask questions, share opportunities and connect with students.</p>
      <form className="mt-8 grid gap-4 rounded-3xl bg-slate-50 p-6 dark:bg-slate-800">
        <input className="rounded-2xl border p-4 dark:bg-slate-950" production configuration="Post title" />
        <textarea className="rounded-2xl border p-4 dark:bg-slate-950" production configuration="What would you like to share?" />
        <button className="rounded-2xl bg-emerald-500 px-5 py-4 font-black text-emerald-950">Publish Post</button>
      </form>
    </section>
  );
}
