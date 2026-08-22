import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EditContactForm } from "../../../../components/edit-contact-form";
import { getContactById } from "../../../../data/contacts";

export async function generateMetadata({ params }: PageProps<"/contatos/[id]/editar">): Promise<Metadata> {
  const { id } = await params;
  const contact = await getContactById(id);
  return { title: contact ? `Editar ${contact.name}` : "Contato não encontrado" };
}

export default async function EditContactPage({ params }: PageProps<"/contatos/[id]/editar">) {
  const { id } = await params;
  const contact = await getContactById(id);
  if (!contact) notFound();

  return (
    <main className="mx-auto w-full max-w-3xl px-5 py-14 sm:px-8 sm:py-20">
      <p className="text-sm font-bold uppercase tracking-[0.2em] text-indigo-600">
        Aula 9 · Atualização e redirect
      </p>
      <h1 className="mt-3 text-4xl font-extrabold tracking-[-0.04em]">Editar contato</h1>
      <p className="mt-3 text-slate-600">Altere os campos de {contact.name} e salve no SQLite.</p>
      <EditContactForm contact={contact} />
      <Link className="mt-8 inline-block font-bold text-indigo-600 hover:underline" href={`/contatos/${contact.id}`}>
        ← Cancelar e voltar
      </Link>
    </main>
  );
}
