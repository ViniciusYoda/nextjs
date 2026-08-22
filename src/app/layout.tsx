import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { Header } from "../components/header";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: {
    default: "Agenda Next",
    template: "%s | Agenda Next",
  },
  description: "Projeto didático para aprender as principais funcionalidades do Next.js.",
};

export default function RootLayout({ children, modal }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${manrope.variable} antialiased`}>
      <body className="min-h-screen">
        <Header />
        <div className="min-h-[calc(100vh-145px)]">{children}</div>
        <footer className="border-t border-white/70 bg-white/50 px-5 py-7 backdrop-blur sm:px-8">
          <div className="mx-auto flex max-w-6xl flex-col gap-2 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-bold text-slate-700">Agenda Next</p>
            <p>Construída aula por aula com App Router, SQLite e Server Actions.</p>
          </div>
        </footer>
        {modal}
      </body>
    </html>
  );
}
