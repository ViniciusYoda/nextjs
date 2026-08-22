import { contacts } from "../../data/contacts";

export default function Dashboard() {
  const categories = new Set(contacts.map((contact) => contact.category)).size;

  return (
    <main className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
      <p className="text-sm font-bold uppercase tracking-[0.2em] text-indigo-600">
        Visão geral
      </p>
      <h1 className="mt-3 text-4xl font-extrabold tracking-[-0.04em] sm:text-5xl">Dashboard</h1>
      <p className="mt-3 text-slate-600">
        Um resumo da agenda usando dados calculados no servidor.
      </p>

      <section className="mt-10 grid gap-5 sm:grid-cols-3">
        {[
          { label: "Contatos", value: contacts.length, color: "text-indigo-600" },
          { label: "Categorias", value: categories, color: "text-rose-500" },
          { label: "Rotas dinâmicas", value: contacts.length, color: "text-amber-500" },
        ].map((metric) => (
          <article className="rounded-3xl border border-white bg-white/80 p-7 shadow-lg shadow-slate-200/50" key={metric.label}>
            <p className="text-sm font-bold text-slate-500">{metric.label}</p>
            <p className={`mt-3 text-5xl font-extrabold tracking-tight ${metric.color}`}>{metric.value}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
