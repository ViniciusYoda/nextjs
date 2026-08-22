"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { addContact, deleteContact, updateContact, validateContactInput } from "../../data/contacts";
import { requireSession } from "../../lib/auth";

export type CreateContactState = {
  success: boolean;
  errors: string[];
};

export async function createContact(
  _previousState: CreateContactState,
  formData: FormData,
): Promise<CreateContactState> {
  await requireSession();
  const { contact, errors } = validateContactInput(Object.fromEntries(formData));

  if (errors.length > 0) return { success: false, errors };

  await addContact(contact);

  revalidatePath("/contatos");
  revalidatePath("/dashboard");

  return { success: true, errors: [] };
}

export async function deleteContactAction(formData: FormData) {
  await requireSession();
  const id = Number(formData.get("id"));
  if (!Number.isInteger(id)) return;

  await deleteContact(id);
  revalidatePath("/contatos");
  revalidatePath(`/contatos/${id}`);
  revalidatePath("/dashboard");
}

export async function updateContactAction(
  id: number,
  _previousState: CreateContactState,
  formData: FormData,
): Promise<CreateContactState> {
  await requireSession();
  const { contact, errors } = validateContactInput(Object.fromEntries(formData));
  if (errors.length > 0) return { success: false, errors };

  const updated = await updateContact(id, contact);
  if (!updated) return { success: false, errors: ["Contato não encontrado."] };

  revalidatePath("/contatos");
  revalidatePath(`/contatos/${id}`);
  revalidatePath("/dashboard");
  redirect(`/contatos/${id}`);
}
