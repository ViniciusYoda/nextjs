import { getAllContacts } from "../../data/contacts";
import { requireSession } from "../../lib/auth";
import { logout } from "../login/actions";

export default async function Dashboard() {
  const session = await requireSession();
  const contacts = await getAllContacts();
  const categories = new Set(contacts.map((contact) => contact.category)).size;

  return (
    <main className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
      <p className="text-sm font-bold uppercase tracking-[0.2em] text-indigo-600">
        Visão geral
      </p>
      <h1 className="mt-3 text-4xl font-extrabold tracking-[-0.04em] sm:text-5xl">Dashboard</h1>
      <p className="mt-3 text-slate-600">
        Sessão ativa para <strong>{session.email}</strong>. Dados calculados no servidor.
      </p>
      <form action={logout} className="mt-5">
        <button className="text-sm font-bold text-rose-600 hover:underline" type="submit">Encerrar sessão</button>
      </form>

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
