"use client";

import { useActionState } from "react";
import { updateContactAction, type CreateContactState } from "../../app/contatos/actions";
import type { Contact } from "../../data/contacts";

const initialState: CreateContactState = { success: false, errors: [] };

export function EditContactForm({ contact }: { contact: Contact }) {
  const updateContactWithId = updateContactAction.bind(null, contact.id);
  const [state, formAction, pending] = useActionState(updateContactWithId, initialState);
  const inputClassName =
    "mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-950 caret-indigo-600 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100";

  return (
    <form action={formAction} className="mt-8 rounded-[2rem] border border-white bg-white/85 p-6 shadow-xl shadow-slate-200/60 sm:p-8" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-sm font-bold text-slate-700">
          Nome
          <input className={inputClassName} defaultValue={contact.name} name="name" />
        </label>
        <label className="text-sm font-bold text-slate-700">
          E-mail
          <input className={inputClassName} defaultValue={contact.email} name="email" type="email" />
        </label>
        <label className="text-sm font-bold text-slate-700">
          Telefone
          <input className={inputClassName} defaultValue={contact.phone} name="phone" type="tel" />
        </label>
        <label className="text-sm font-bold text-slate-700">
          Categoria
          <select className={inputClassName} defaultValue={contact.category} name="category">
            <option>Amigos</option>
            <option>Família</option>
            <option>Trabalho</option>
          </select>
        </label>
      </div>

      {state.errors.length > 0 && (
        <ul className="mt-5 rounded-xl bg-rose-50 p-4 text-sm font-medium text-rose-700" role="alert">
          {state.errors.map((error) => <li key={error}>• {error}</li>)}
        </ul>
      )}

      <button className="mt-6 rounded-xl bg-indigo-600 px-5 py-3 font-bold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-500 disabled:cursor-wait disabled:opacity-60" disabled={pending} type="submit">
        {pending ? "Salvando alterações..." : "Salvar alterações"}
      </button>
    </form>
  );
}
