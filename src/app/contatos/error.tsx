"use client";

export default function ContactsError({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-24 text-center">
      <p className="text-sm font-bold uppercase tracking-[0.2em] text-rose-600">Algo deu errado</p>
      <h1 className="mt-3 text-4xl font-extrabold tracking-tight">Não foi possível carregar os contatos</h1>
      <p className="mt-3 text-slate-500">O limite de erro desta rota impediu que o restante da aplicação quebrasse.</p>
      <button className="mt-8 rounded-xl bg-indigo-600 px-5 py-3 font-bold text-white" onClick={reset} type="button">
        Tentar novamente
      </button>
    </main>
  );
}
