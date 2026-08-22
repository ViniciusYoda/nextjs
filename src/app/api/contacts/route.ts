import { revalidatePath } from "next/cache";
import type { Contact } from "../../../data/contacts";
import { addContact, getContactsPage, validateContactInput } from "../../../data/contacts";
import { getSession } from "../../../lib/auth";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.trim() ?? "";
  const rawCategory = searchParams.get("categoria") ?? "";
  const categories: Contact["category"][] = ["Família", "Amigos", "Trabalho"];
  const category = categories.includes(rawCategory as Contact["category"])
    ? (rawCategory as Contact["category"])
    : undefined;
  const requestedPage = Number(searchParams.get("page") ?? 1);
  const result = await getContactsPage({
    query,
    category,
    page: Number.isInteger(requestedPage) ? requestedPage : 1,
  });

  return Response.json(result);
}

export async function POST(request: Request) {
  if (!(await getSession())) return Response.json({ error: "Não autorizado." }, { status: 401 });
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return Response.json({ errors: ["Envie um corpo JSON válido."] }, { status: 400 });
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return Response.json({ errors: ["O corpo da requisição deve ser um objeto."] }, { status: 400 });
  }

  const { contact: input, errors } = validateContactInput(body as Record<string, unknown>);
  if (errors.length > 0) {
    return Response.json({ errors }, { status: 422 });
  }

  const contact = await addContact(input);
  revalidatePath("/contatos");
  revalidatePath("/dashboard");

  return Response.json({ contact }, { status: 201 });
}
