"use client";

import Link from "next/link";
import { deleteContactAction } from "../../app/contatos/actions";
import type { Contact } from "../../data/contacts";

type ContactCardProps = {
  contact: Contact;
};

export function ContactCard({ contact }: ContactCardProps) {
  const initials = contact.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);
  const avatarColor = {
    Família: "bg-rose-100 text-rose-700",
    Amigos: "bg-amber-100 text-amber-700",
    Trabalho: "bg-indigo-100 text-indigo-700",
  }[contact.category];

  return (
    <article className="group rounded-3xl border border-white bg-white/85 p-6 shadow-lg shadow-slate-200/50 transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="flex items-start gap-4">
        <div className={`flex size-14 shrink-0 items-center justify-center rounded-2xl text-sm font-extrabold ${avatarColor}`}>
          {initials}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-lg font-extrabold tracking-tight">{contact.name}</h2>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-500">
              {contact.category}
            </span>
          </div>
          <a
            className="mt-4 block truncate text-sm font-medium text-indigo-600 hover:underline"
            href={`mailto:${contact.email}`}
          >
            {contact.email}
          </a>
          <a
            className="mt-1 block text-sm text-slate-500 hover:text-indigo-700"
            href={`tel:${contact.phone.replace(/\D/g, "")}`}
          >
            {contact.phone}
          </a>
          <div className="mt-5 flex flex-wrap gap-2">
            <Link
              className="inline-flex items-center rounded-lg bg-slate-950 px-3 py-2 text-xs font-bold text-white transition group-hover:bg-indigo-600"
              href={`/contatos/${contact.id}`}
            >
              Ver detalhes →
            </Link>
            <form
              action={deleteContactAction}
              onSubmit={(event) => {
                if (!window.confirm(`Excluir ${contact.name}?`)) event.preventDefault();
              }}
            >
              <input name="id" type="hidden" value={contact.id} />
              <button className="rounded-lg px-3 py-2 text-xs font-bold text-rose-600 transition hover:bg-rose-50" type="submit">
                Excluir
              </button>
            </form>
          </div>
        </div>
      </div>
    </article>
  );
}
