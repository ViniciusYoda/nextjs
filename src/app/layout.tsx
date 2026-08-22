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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${manrope.variable} antialiased`}>
      <body className="min-h-screen">
        <Header />
        {children}
      </body>
    </html>
  );
}
