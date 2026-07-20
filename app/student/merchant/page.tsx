export default function MerchantPage() {
  return (
    <section className="rounded-[32px] border bg-white p-8">
      <h1 className="text-3xl font-black">Merchant Centre</h1>
      <p className="mt-3 text-slate-600">Apply to sell student services, tutoring, books, notes or campus offers from inside the Student Dashboard.</p>
      <form className="mt-8 grid gap-4 rounded-3xl bg-emerald-50 p-6">
        <b>Apply for merchant access</b>
        <input className="rounded-2xl border p-4" placeholder="What will you sell?" />
        <textarea className="rounded-2xl border p-4" placeholder="Why should students trust your offer?" />
        <button className="rounded-2xl bg-emerald-500 px-5 py-4 font-black text-emerald-950">Submit Application</button>
      </form>
    </section>
  );
}
