export type Contact = {
  id: number;
  name: string;
  email: string;
  phone: string;
  category: "Família" | "Amigos" | "Trabalho";
};

export const contacts: Contact[] = [
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

export function getContactById(id: string) {
  return contacts.find((contact) => contact.id === Number(id));
}
