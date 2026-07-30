import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "DIY vs Pro — Calculateur de rénovation",
  description: "Comparez le coût réel de faire vos travaux vous-même ou de faire appel à un artisan.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="min-h-screen bg-white text-slate-900">
        <header className="border-b border-slate-200">
          <nav className="mx-auto max-w-4xl px-4 py-4 flex items-center gap-6">
            <Link href="/" className="font-semibold">
              DIY vs Pro
            </Link>
            <Link href="/calculateur" className="text-sm text-slate-600 hover:text-slate-900">
              Calculateur
            </Link>
            <Link href="/projets" className="text-sm text-slate-600 hover:text-slate-900">
              Projets
            </Link>
            <Link href="/articles" className="text-sm text-slate-600 hover:text-slate-900">
              Articles
            </Link>
          </nav>
        </header>
        <main className="mx-auto max-w-4xl px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
