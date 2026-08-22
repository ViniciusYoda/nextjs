import { revalidatePath } from "next/cache";
import { deleteContact, getContactById, updateContact, validateContactInput } from "../../../../data/contacts";
import { getSession } from "../../../../lib/auth";

export async function GET(_request: Request, { params }: RouteContext<"/api/contacts/[id]">) {
  const { id } = await params;
  const contact = await getContactById(id);

  if (!contact) {
    return Response.json({ error: "Contato não encontrado." }, { status: 404 });
  }

  return Response.json({ contact });
}

export async function DELETE(_request: Request, { params }: RouteContext<"/api/contacts/[id]">) {
  if (!(await getSession())) return Response.json({ error: "Não autorizado." }, { status: 401 });
  const { id } = await params;
  const numericId = Number(id);

  if (!Number.isInteger(numericId)) {
    return Response.json({ error: "ID inválido." }, { status: 400 });
  }

  const deleted = await deleteContact(numericId);
  if (!deleted) {
    return Response.json({ error: "Contato não encontrado." }, { status: 404 });
  }

  revalidatePath("/contatos");
  revalidatePath(`/contatos/${id}`);
  revalidatePath("/dashboard");

  return new Response(null, { status: 204 });
}

export async function PATCH(request: Request, { params }: RouteContext<"/api/contacts/[id]">) {
  if (!(await getSession())) return Response.json({ error: "Não autorizado." }, { status: 401 });
  const { id } = await params;
  const numericId = Number(id);
  if (!Number.isInteger(numericId)) {
    return Response.json({ error: "ID inválido." }, { status: 400 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ errors: ["Envie um corpo JSON válido."] }, { status: 400 });
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return Response.json({ errors: ["O corpo da requisição deve ser um objeto."] }, { status: 400 });
  }

  const { contact, errors } = validateContactInput(body as Record<string, unknown>);
  if (errors.length > 0) return Response.json({ errors }, { status: 422 });

  const updated = await updateContact(numericId, contact);
  if (!updated) return Response.json({ error: "Contato não encontrado." }, { status: 404 });

  revalidatePath("/contatos");
  revalidatePath(`/contatos/${id}`);
  revalidatePath("/dashboard");

  return Response.json({ contact: await getContactById(id) });
}
