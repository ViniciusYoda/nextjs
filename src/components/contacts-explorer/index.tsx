"use client";

import { useState } from "react";
import type { Contact } from "../../data/contacts";
import { ContactCard } from "../contact-card";

type ContactsExplorerProps = {
  contacts: Contact[];
};

const categories = ["Todos", "Família", "Amigos", "Trabalho"] as const;

export function ContactsExplorer({ contacts }: ContactsExplorerProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof categories)[number]>("Todos");

  const normalizedQuery = query.trim().toLocaleLowerCase("pt-BR");
  const filteredContacts = contacts.filter((contact) => {
    const matchesQuery =
      contact.name.toLocaleLowerCase("pt-BR").includes(normalizedQuery) ||
      contact.email.toLocaleLowerCase("pt-BR").includes(normalizedQuery);
    const matchesCategory = category === "Todos" || contact.category === category;

    return matchesQuery && matchesCategory;
  });

  return (
    <div className="mt-8">
      <div className="rounded-3xl border border-white bg-white/75 p-4 shadow-lg shadow-slate-200/50 backdrop-blur sm:p-5">
        <label className="block">
          <span className="sr-only">Buscar contatos</span>
          <input
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar por nome ou e-mail..."
            type="search"
            value={query}
          />
        </label>

        <div className="mt-4 flex flex-wrap gap-2" aria-label="Filtrar por categoria">
          {categories.map((item) => (
            <button
              className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                category === item
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
              key={item}
              onClick={() => setCategory(item)}
              type="button"
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-6 text-sm font-semibold text-slate-500" aria-live="polite">
        {filteredContacts.length} {filteredContacts.length === 1 ? "resultado" : "resultados"}
      </p>

      {filteredContacts.length > 0 ? (
        <section className="mt-3 grid gap-5 md:grid-cols-2" aria-label="Lista de contatos">
          {filteredContacts.map((contact) => (
            <ContactCard key={contact.id} contact={contact} />
          ))}
        </section>
      ) : (
        <div className="mt-3 rounded-3xl border border-dashed border-slate-300 bg-white/60 px-6 py-16 text-center">
          <p className="text-lg font-extrabold">Nenhum contato encontrado</p>
          <p className="mt-2 text-sm text-slate-500">Tente outro nome, e-mail ou categoria.</p>
        </div>
      )}
    </div>
  );
}
