import "server-only";

import { existsSync, mkdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";

export type Contact = {
  id: number;
  name: string;
  email: string;
  phone: string;
  category: "Família" | "Amigos" | "Trabalho";
};

export type ContactInput = Omit<Contact, "id">;

const initialContacts: Contact[] = [
  {
    id: 1,
    name: "Ana Souza",
    email: "ana@exemplo.com",
    phone: "(11) 99999-1111",
    category: "Trabalho",
  },
  {
    id: 2,
    name: "Bruno Lima",
    email: "bruno@exemplo.com",
    phone: "(21) 98888-2222",
    category: "Amigos",
  },
  {
    id: 3,
    name: "Carla Oliveira",
    email: "carla@exemplo.com",
    phone: "(31) 97777-3333",
    category: "Família",
  },
];

const dataDirectory = path.join(process.cwd(), "data");
const databaseFile = path.join(dataDirectory, "agenda.db");
const legacyContactsFile = path.join(process.cwd(), "src", "data", "custom-contacts.json");

mkdirSync(dataDirectory, { recursive: true });

const database = new DatabaseSync(databaseFile);
database.exec(`
  CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('Família', 'Amigos', 'Trabalho')),
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  )
`);

const rowCount = database.prepare("SELECT COUNT(*) AS total FROM contacts").get() as { total: number };

if (rowCount.total === 0) {
  let legacyContacts: Contact[] = [];
  if (existsSync(legacyContactsFile)) {
    try {
      legacyContacts = JSON.parse(readFileSync(legacyContactsFile, "utf8")) as Contact[];
    } catch {
      legacyContacts = [];
    }
  }

  const insert = database.prepare(`
    INSERT INTO contacts (id, name, email, phone, category)
    VALUES (?, ?, ?, ?, ?)
  `);

  for (const contact of [...legacyContacts, ...initialContacts]) {
    insert.run(contact.id, contact.name, contact.email, contact.phone, contact.category);
  }
}

export async function getAllContacts() {
  const rows = database
    .prepare("SELECT id, name, email, phone, category FROM contacts ORDER BY id DESC")
    .all() as unknown as Contact[];

  return rows.map((contact) => ({
    id: contact.id,
    name: contact.name,
    email: contact.email,
    phone: contact.phone,
    category: contact.category,
  }));
}

type ContactsPageOptions = {
  query?: string;
  category?: Contact["category"];
  page?: number;
  pageSize?: number;
};

export async function getContactsPage({
  query = "",
  category,
  page = 1,
  pageSize = 4,
}: ContactsPageOptions = {}) {
  const conditions: string[] = [];
  const parameters: string[] = [];

  if (query) {
    conditions.push("(name LIKE ? OR email LIKE ?)");
    parameters.push(`%${query}%`, `%${query}%`);
  }
  if (category) {
    conditions.push("category = ?");
    parameters.push(category);
  }

  const where = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";
  const countRow = database
    .prepare(`SELECT COUNT(*) AS total FROM contacts ${where}`)
    .get(...parameters) as { total: number };
  const totalPages = Math.max(1, Math.ceil(countRow.total / pageSize));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const offset = (currentPage - 1) * pageSize;
  const rows = database
    .prepare(`
      SELECT id, name, email, phone, category
      FROM contacts
      ${where}
      ORDER BY name COLLATE NOCASE
      LIMIT ? OFFSET ?
    `)
    .all(...parameters, pageSize, offset) as unknown as Contact[];

  return {
    contacts: rows.map((contact) => ({
      id: contact.id,
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      category: contact.category,
    })),
    page: currentPage,
    total: countRow.total,
    totalPages,
  };
}

export async function getContactById(id: string) {
  const contact = database
    .prepare("SELECT id, name, email, phone, category FROM contacts WHERE id = ?")
    .get(Number(id)) as unknown as Contact | undefined;

  return contact
    ? {
        id: contact.id,
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        category: contact.category,
      }
    : undefined;
}

export function validateContactInput(input: Record<string, unknown>) {
  const contact: ContactInput = {
    name: String(input.name ?? "").trim(),
    email: String(input.email ?? "").trim(),
    phone: String(input.phone ?? "").trim(),
    category: String(input.category ?? "") as Contact["category"],
  };
  const errors: string[] = [];

  if (contact.name.length < 3) errors.push("Informe um nome com pelo menos 3 caracteres.");
  if (!/^\S+@\S+\.\S+$/.test(contact.email)) errors.push("Informe um e-mail válido.");
  if (contact.phone.replace(/\D/g, "").length < 10) errors.push("Informe um telefone com DDD.");
  if (!["Família", "Amigos", "Trabalho"].includes(contact.category)) {
    errors.push("Escolha uma categoria válida.");
  }

  return { contact, errors };
}

export async function addContact(input: ContactInput) {
  const contact: Contact = { id: Date.now(), ...input };
  database
    .prepare("INSERT INTO contacts (id, name, email, phone, category) VALUES (?, ?, ?, ?, ?)")
    .run(contact.id, contact.name, contact.email, contact.phone, contact.category);
  return contact;
}

export async function deleteContact(id: number) {
  const result = database.prepare("DELETE FROM contacts WHERE id = ?").run(id);
  return result.changes > 0;
}

export async function updateContact(id: number, input: ContactInput) {
  const result = database
    .prepare(`
      UPDATE contacts
      SET name = ?, email = ?, phone = ?, category = ?
      WHERE id = ?
    `)
    .run(input.name, input.email, input.phone, input.category, id);

  return result.changes > 0;
}
