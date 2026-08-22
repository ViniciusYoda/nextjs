import Link from "next/link";
import type { Contact } from "../../data/contacts";
import { AddContactForm } from "../add-contact-form";
import { ContactCard } from "../contact-card";

type ContactsExplorerProps = {
  contacts: Contact[];
  query: string;
  category?: Contact["category"];
  page: number;
  total: number;
  totalPages: number;
};

const categories = ["Todos", "Família", "Amigos", "Trabalho"] as const;

export function ContactsExplorer({ contacts, query, category, page, total, totalPages }: ContactsExplorerProps) {
  function createHref(nextPage: number, nextCategory = category) {
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (nextCategory) params.set("categoria", nextCategory);
    if (nextPage > 1) params.set("page", String(nextPage));
    const search = params.toString();
    return search ? `/contatos?${search}` : "/contatos";
  }

  return (
    <div className="mt-8">
      <AddContactForm />

      <div className="mt-6 rounded-3xl border border-white bg-white/75 p-4 shadow-lg shadow-slate-200/50 backdrop-blur sm:p-5">
        <form className="flex flex-col gap-3 sm:flex-row" method="get">
          {category && <input name="categoria" type="hidden" value={category} />}
          <label className="min-w-0 flex-1">
            <span className="sr-only">Buscar contatos</span>
          <input
            className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm font-medium text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
            defaultValue={query}
            name="q"
            placeholder="Buscar por nome ou e-mail..."
            type="search"
          />
          </label>
          <button className="rounded-2xl bg-slate-950 px-6 py-4 text-sm font-bold text-white transition hover:bg-indigo-600" type="submit">
            Buscar
          </button>
          {(query || category) && (
            <Link className="grid place-items-center rounded-2xl px-4 py-3 text-sm font-bold text-slate-500 hover:bg-slate-100" href="/contatos">
              Limpar
            </Link>
          )}
        </form>

        <div className="mt-4 flex flex-wrap gap-2" aria-label="Filtrar por categoria">
          {categories.map((item) => (
            <Link
              className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                (category ?? "Todos") === item
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
              href={createHref(1, item === "Todos" ? undefined : item)}
              key={item}
            >
              {item}
            </Link>
          ))}
        </div>
      </div>

      <p className="mt-6 text-sm font-semibold text-slate-500" aria-live="polite">
        {total} {total === 1 ? "resultado" : "resultados"} · página {page} de {totalPages}
      </p>

      {contacts.length > 0 ? (
        <section className="mt-3 grid gap-5 md:grid-cols-2" aria-label="Lista de contatos">
          {contacts.map((contact) => (
            <ContactCard key={contact.id} contact={contact} />
          ))}
        </section>
      ) : (
        <div className="mt-3 rounded-3xl border border-dashed border-slate-300 bg-white/60 px-6 py-16 text-center">
          <p className="text-lg font-extrabold">Nenhum contato encontrado</p>
          <p className="mt-2 text-sm text-slate-500">Tente outro nome, e-mail ou categoria.</p>
        </div>
      )}

      {totalPages > 1 && (
        <nav className="mt-8 flex items-center justify-center gap-3" aria-label="Paginação">
          <Link
            aria-disabled={page === 1}
            className={`rounded-xl px-4 py-3 text-sm font-bold ${page === 1 ? "pointer-events-none text-slate-300" : "bg-white text-indigo-600 shadow-sm"}`}
            href={createHref(page - 1)}
          >
            ← Anterior
          </Link>
          <span className="text-sm font-bold text-slate-500">{page} / {totalPages}</span>
          <Link
            aria-disabled={page === totalPages}
            className={`rounded-xl px-4 py-3 text-sm font-bold ${page === totalPages ? "pointer-events-none text-slate-300" : "bg-white text-indigo-600 shadow-sm"}`}
            href={createHref(page + 1)}
          >
            Próxima →
          </Link>
        </nav>
      )}
    </div>
  );
}
