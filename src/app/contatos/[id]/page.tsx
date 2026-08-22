import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { contacts, getContactById } from "../../../data/contacts";

export function generateStaticParams() {
  return contacts.map((contact) => ({
    id: contact.id.toString(),
  }));
}

export async function generateMetadata({
  params,
}: PageProps<"/contatos/[id]">): Promise<Metadata> {
  const { id } = await params;
  const contact = getContactById(id);

  return {
    title: contact?.name ?? "Contato não encontrado",
    description: contact
      ? `Detalhes de contato de ${contact.name}.`
      : "O contato solicitado não existe.",
  };
}

export default async function ContactDetailsPage({
  params,
}: PageProps<"/contatos/[id]">) {
  const { id } = await params;
  const contact = getContactById(id);

  if (!contact) {
    notFound();
  }

  return (
    <main className="mx-auto w-full max-w-3xl px-5 py-14 sm:px-8 sm:py-20">
      <p className="text-sm font-bold uppercase tracking-[0.2em] text-indigo-600">
        Aula 3 · Rota dinâmica /contatos/{id}
      </p>

      <article className="mt-6 overflow-hidden rounded-[2rem] border border-white bg-white/85 shadow-xl shadow-slate-200/60">
        <div className="h-3 bg-gradient-to-r from-indigo-500 via-violet-500 to-rose-400" />
        <div className="p-7 sm:p-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-3xl font-extrabold tracking-[-0.04em] sm:text-4xl">{contact.name}</h1>
          <span className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-bold text-indigo-700">
            {contact.category}
          </span>
        </div>

        <dl className="mt-8 grid gap-6 sm:grid-cols-2">
          <div>
            <dt className="text-sm font-medium text-slate-500">E-mail</dt>
            <dd className="mt-1">
              <a className="font-semibold text-indigo-600 hover:underline" href={`mailto:${contact.email}`}>
                {contact.email}
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-slate-500">Telefone</dt>
            <dd className="mt-1">
              <a
                className="font-semibold text-indigo-600 hover:underline"
                href={`tel:${contact.phone.replace(/\D/g, "")}`}
              >
                {contact.phone}
              </a>
            </dd>
          </div>
        </dl>
        </div>
      </article>

      <Link className="mt-8 inline-block font-bold text-indigo-600 hover:underline" href="/contatos">
        ← Voltar para contatos
      </Link>
    </main>
  );
}
