
import type { Metadata } from "next";
import { ContactsExplorer } from "../../components/contacts-explorer";
import { contacts } from "../../data/contacts";

export const metadata: Metadata = {
  title: "Contatos",
  description: "Lista de contatos do projeto Agenda Next.",
};

export default function ContatosPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-indigo-600">
            Aula 4 · Client Components
          </p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-[-0.04em] sm:text-5xl">Sua rede, organizada.</h1>
          <p className="mt-3 max-w-2xl leading-7 text-slate-600">
            Busque instantaneamente e filtre por categoria. Tudo acontece no navegador com estado React.
          </p>
        </div>
        <p className="rounded-full bg-indigo-100 px-4 py-2 text-sm font-bold text-indigo-700">
          {contacts.length} contatos cadastrados
        </p>
      </div>
      <ContactsExplorer contacts={contacts} />
    </main>
  );
}
