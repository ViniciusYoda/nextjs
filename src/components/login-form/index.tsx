"use client";

import { useActionState } from "react";
import { login, type LoginState } from "../../app/login/actions";

export function LoginForm({ next = "/dashboard" }: { next?: string }) {
  const [state, formAction, pending] = useActionState(login, {} as LoginState);
  const inputClassName =
    "mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 font-medium text-slate-950 outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100";

  return (
    <form action={formAction} className="mt-8 space-y-5">
      <input name="next" type="hidden" value={next} />
      <label className="block text-sm font-bold text-slate-700">
        E-mail
        <input autoComplete="email" className={inputClassName} defaultValue="admin@agenda.local" name="email" type="email" />
      </label>
      <label className="block text-sm font-bold text-slate-700">
        Senha
        <input autoComplete="current-password" className={inputClassName} name="password" type="password" />
      </label>
      {state.error && <p className="rounded-xl bg-rose-50 p-4 text-sm font-semibold text-rose-700" role="alert">{state.error}</p>}
      <button className="w-full rounded-xl bg-indigo-600 px-5 py-3 font-bold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-500 disabled:opacity-60" disabled={pending} type="submit">
        {pending ? "Entrando..." : "Entrar"}
      </button>
    </form>
  );
}
