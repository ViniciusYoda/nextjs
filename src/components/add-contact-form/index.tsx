"use client";

import { useActionState } from "react";
import { createContact, type CreateContactState } from "../../app/contatos/actions";

const initialState: CreateContactState = { success: false, errors: [] };

export function AddContactForm() {
  const [state, formAction, pending] = useActionState(createContact, initialState);

  const inputClassName =
    "mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-950 caret-indigo-600 outline-none transition placeholder:font-normal placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-400/25";

  return (
    <form action={formAction} className="rounded-3xl bg-slate-950 p-6 text-white shadow-xl shadow-indigo-200/50 sm:p-8" noValidate>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-300">Server Action</p>
          <h2 className="mt-2 text-2xl font-extrabold">Novo contato</h2>
        </div>
        <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-slate-300">Persistência local</span>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <label className="text-sm font-bold text-white">
          Nome
          <input className={inputClassName} name="name" placeholder="Ex.: Marina Costa" />
        </label>
        <label className="text-sm font-bold text-white">
          E-mail
          <input className={inputClassName} name="email" placeholder="marina@exemplo.com" type="email" />
        </label>
        <label className="text-sm font-bold text-white">
          Telefone
          <input className={inputClassName} name="phone" placeholder="(11) 99999-9999" type="tel" />
        </label>
        <label className="text-sm font-bold text-white">
          Categoria
          <select className={inputClassName} defaultValue="Amigos" name="category">
            <option>Amigos</option>
            <option>Família</option>
            <option>Trabalho</option>
          </select>
        </label>
      </div>

      {state.errors.length > 0 && (
        <ul className="mt-5 rounded-xl border border-rose-400/30 bg-rose-400/10 p-4 text-sm text-rose-200" role="alert">
          {state.errors.map((error) => <li key={error}>• {error}</li>)}
        </ul>
      )}
      {state.success && <p className="mt-5 text-sm font-semibold text-emerald-300" role="status">Contato salvo no servidor.</p>}

      <button className="mt-6 w-full rounded-xl bg-indigo-500 px-5 py-3 font-bold shadow-lg shadow-indigo-950 transition hover:bg-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-300 disabled:cursor-wait disabled:opacity-60 sm:w-auto" disabled={pending} type="submit">
        {pending ? "Salvando..." : "Salvar contato"}
      </button>
    </form>
  );
}
