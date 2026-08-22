
import type { Metadata } from "next";
import { ContactsExplorer } from "../../components/contacts-explorer";
import type { Contact } from "../../data/contacts";
import { getContactsPage } from "../../data/contacts";

export const metadata: Metadata = {
  title: "Contatos",
  description: "Lista de contatos do projeto Agenda Next.",
};

type ContactsPageProps = {
  searchParams: Promise<{ q?: string | string[]; categoria?: string | string[]; page?: string | string[] }>;
};

export default async function ContatosPage({ searchParams }: ContactsPageProps) {
  const params = await searchParams;
  const query = String(Array.isArray(params.q) ? params.q[0] : (params.q ?? "")).trim();
  const rawCategory = String(Array.isArray(params.categoria) ? params.categoria[0] : (params.categoria ?? ""));
  const categories: Contact["category"][] = ["Família", "Amigos", "Trabalho"];
  const category = categories.includes(rawCategory as Contact["category"])
    ? (rawCategory as Contact["category"])
    : undefined;
  const requestedPage = Number(Array.isArray(params.page) ? params.page[0] : (params.page ?? 1));
  const result = await getContactsPage({
    query,
    category,
    page: Number.isInteger(requestedPage) ? requestedPage : 1,
  });

  return (
    <main className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-indigo-600">
            Aula 10 · searchParams e paginação
          </p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-[-0.04em] sm:text-5xl">Sua rede, organizada.</h1>
          <p className="mt-3 max-w-2xl leading-7 text-slate-600">
            Busca e filtros agora consultam o SQLite no servidor e permanecem registrados na URL.
          </p>
        </div>
        <p className="rounded-full bg-indigo-100 px-4 py-2 text-sm font-bold text-indigo-700">
          {result.total} {result.total === 1 ? "contato encontrado" : "contatos encontrados"}
        </p>
      </div>
      <ContactsExplorer
        category={category}
        contacts={result.contacts}
        page={result.page}
        query={query}
        total={result.total}
        totalPages={result.totalPages}
      />
    </main>
  );
}
