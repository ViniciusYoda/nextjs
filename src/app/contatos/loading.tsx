export default function ContactsLoading() {
  return (
    <main className="mx-auto w-full max-w-6xl animate-pulse px-5 py-14 sm:px-8 sm:py-20">
      <div className="h-4 w-48 rounded bg-indigo-100" />
      <div className="mt-5 h-12 w-80 max-w-full rounded-xl bg-slate-200" />
      <div className="mt-10 h-64 rounded-[2rem] bg-slate-900/10" />
      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <div className="h-52 rounded-3xl bg-white/80" />
        <div className="h-52 rounded-3xl bg-white/80" />
      </div>
    </main>
  );
}
