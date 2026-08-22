import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-24 text-center">
      <p className="text-sm font-bold uppercase tracking-[0.2em] text-indigo-600">
        Erro 404
      </p>
      <p className="mt-4 text-8xl font-extrabold tracking-tighter text-slate-200">404</p>
      <h1 className="mt-2 text-4xl font-extrabold tracking-tight">Página não encontrada</h1>
      <p className="mt-3 text-slate-500">O endereço pode ter mudado ou nunca ter existido.</p>
      <Link className="mt-8 inline-block rounded-xl bg-indigo-600 px-5 py-3 font-bold text-white shadow-lg shadow-indigo-200" href="/">
        Voltar ao início
      </Link>
    </main>
  );
}
