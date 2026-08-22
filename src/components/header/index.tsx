import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/60 bg-white/75 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <Link className="flex items-center gap-3 font-extrabold tracking-tight text-slate-950" href="/">
          <span className="grid size-10 place-items-center rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-200">
            AN
          </span>
          <span className="hidden sm:inline">Agenda Next</span>
        </Link>

        <nav aria-label="Navegação principal">
          <ul className="flex items-center gap-1 rounded-full border border-slate-200/80 bg-white/80 p-1 text-sm font-semibold text-slate-600 shadow-sm">
            <li>
              <Link className="block rounded-full px-3 py-2 transition hover:bg-indigo-50 hover:text-indigo-700 sm:px-4" href="/">
                Início
              </Link>
            </li>
            <li>
              <Link className="block rounded-full px-3 py-2 transition hover:bg-indigo-50 hover:text-indigo-700 sm:px-4" href="/contatos">
                Contatos
              </Link>
            </li>
            <li>
              <Link className="block rounded-full px-3 py-2 transition hover:bg-indigo-50 hover:text-indigo-700 sm:px-4" href="/dashboard">
                Dashboard
              </Link>
            </li>
            <li>
              <Link className="block rounded-full bg-indigo-600 px-3 py-2 text-white transition hover:bg-indigo-500 sm:px-4" href="/login">
                Entrar
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
