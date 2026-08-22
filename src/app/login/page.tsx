import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { LoginForm } from "../../components/login-form";
import { getSession } from "../../lib/auth";

export const metadata: Metadata = { title: "Entrar" };

export default async function LoginPage({ searchParams }: PageProps<"/login">) {
  if (await getSession()) redirect("/dashboard");
  const { next } = await searchParams;

  return (
    <main className="mx-auto grid min-h-[calc(100vh-73px)] max-w-6xl place-items-center px-5 py-12 sm:px-8">
      <section className="w-full max-w-md rounded-[2rem] border border-white bg-white/90 p-7 shadow-2xl shadow-indigo-200/60 sm:p-10">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-indigo-600">Aula 11 · Autenticação</p>
        <h1 className="mt-3 text-4xl font-extrabold tracking-[-0.04em]">Área protegida</h1>
        <p className="mt-3 leading-7 text-slate-600">Use a conta didática para acessar contatos e dashboard.</p>
        <LoginForm next={typeof next === "string" ? next : "/dashboard"} />
        <div className="mt-6 rounded-xl bg-amber-50 p-4 text-sm text-amber-900">
          <strong>Conta da aula:</strong><br />
          admin@agenda.local<br />
          AprenderNext!2026
        </div>
      </section>
    </main>
  );
}
