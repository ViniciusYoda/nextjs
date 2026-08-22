import Link from "next/link";
import { notFound } from "next/navigation";
import { Modal } from "../../../../components/modal";
import { getContactById } from "../../../../data/contacts";
import { requireSession } from "../../../../lib/auth";

export default async function ContactModal({ params }: PageProps<"/contatos/[id]">) {
  await requireSession();
  const { id } = await params;
  const contact = await getContactById(id);
  if (!contact) notFound();

  const initials = contact.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);

  return (
    <Modal>
      <div className="h-2 bg-gradient-to-r from-indigo-500 via-violet-500 to-rose-400" />
      <div className="p-7 sm:p-10">
        <div className="flex items-center gap-4 pr-12">
          <div className="grid size-16 shrink-0 place-items-center rounded-2xl bg-indigo-100 text-lg font-extrabold text-indigo-700">
            {initials}
          </div>
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-600">Visualização rápida</p>
            <h2 className="mt-1 truncate text-2xl font-extrabold tracking-tight" id="contact-modal-title">
              {contact.name}
            </h2>
          </div>
        </div>

        <dl className="mt-8 grid gap-4 rounded-2xl bg-slate-50 p-5 sm:grid-cols-2">
          <div>
            <dt className="text-xs font-bold uppercase tracking-wider text-slate-400">E-mail</dt>
            <dd className="mt-2 truncate font-semibold text-slate-700">{contact.email}</dd>
          </div>
          <div>
            <dt className="text-xs font-bold uppercase tracking-wider text-slate-400">Telefone</dt>
            <dd className="mt-2 font-semibold text-slate-700">{contact.phone}</dd>
          </div>
          <div>
            <dt className="text-xs font-bold uppercase tracking-wider text-slate-400">Categoria</dt>
            <dd className="mt-2 font-semibold text-slate-700">{contact.category}</dd>
          </div>
          <div>
            <dt className="text-xs font-bold uppercase tracking-wider text-slate-400">Identificador</dt>
            <dd className="mt-2 truncate font-mono text-sm text-slate-500">{contact.id}</dd>
          </div>
        </dl>

        <div className="mt-7 flex flex-wrap gap-3">
          <Link className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-200 hover:bg-indigo-500" href={`/contatos/${contact.id}/editar`}>
            Editar contato
          </Link>
          <a className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50" href={`/contatos/${contact.id}`}>
            Abrir página completa
          </a>
        </div>
      </div>
    </Modal>
  );
}
