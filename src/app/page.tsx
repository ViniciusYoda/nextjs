import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8 sm:py-24">
      <section className="overflow-hidden rounded-[2rem] bg-slate-950 px-6 py-12 text-white shadow-2xl shadow-indigo-200/50 sm:px-12 sm:py-16">
        <div className="max-w-3xl">
          <p className="mb-5 inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-indigo-200">
            Aprenda construindo
          </p>
          <h1 className="text-4xl font-extrabold leading-tight tracking-[-0.04em] sm:text-6xl">
            Next.js fica mais simples quando cada conceito vira uma tela real.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
            Uma agenda didática que evolui aula por aula: rotas, componentes,
            interatividade, dados e recursos modernos do framework.
          </p>
          <Link
            className="mt-8 inline-flex rounded-xl bg-indigo-500 px-5 py-3 font-bold text-white shadow-lg shadow-indigo-950 transition hover:-translate-y-0.5 hover:bg-indigo-400"
            href="/contatos"
          >
            Explorar contatos →
          </Link>
        </div>
      </section>

      <section className="mt-8 grid gap-5 sm:grid-cols-2">
        <Link
          className="group rounded-3xl border border-white bg-white/80 p-7 shadow-lg shadow-slate-200/50 transition hover:-translate-y-1 hover:shadow-xl"
          href="/contatos"
        >
          <span className="text-sm font-bold text-indigo-600">Aulas 2–4</span>
          <h2 className="mt-3 text-xl font-extrabold">Contatos e interatividade</h2>
          <p className="mt-2 leading-7 text-slate-600">
            Componentes, props, rotas dinâmicas, busca e filtros.
          </p>
        </Link>

        <Link
          className="group rounded-3xl border border-white bg-white/80 p-7 shadow-lg shadow-slate-200/50 transition hover:-translate-y-1 hover:shadow-xl"
          href="/dashboard"
        >
          <span className="text-sm font-bold text-rose-500">Visão geral</span>
          <h2 className="mt-3 text-xl font-extrabold">Dashboard do projeto</h2>
          <p className="mt-2 leading-7 text-slate-600">
            Veja a mesma estrutura compartilhada em outra rota.
          </p>
        </Link>
      </section>
    </main>
  );
}
