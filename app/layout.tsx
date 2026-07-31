import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "DIY vs Pro — Calculateur maison et auto",
  description:
    "Comparez le coût réel de faire vos travaux ou l'entretien de votre véhicule vous-même, ou de faire appel à un professionnel.",
};

const adsenseClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        {adsenseClientId && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClientId}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
      </head>
      <body className="min-h-screen bg-white text-slate-900">
        <header className="border-b border-slate-200">
          <nav className="mx-auto max-w-4xl px-4 py-4 flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link href="/" className="font-semibold">
              DIY vs Pro
            </Link>
            <Link href="/calculateur" className="text-sm text-slate-600 hover:text-slate-900">
              Calculateur
            </Link>
            <Link href="/auto" className="text-sm text-slate-600 hover:text-slate-900">
              Auto
            </Link>
            <Link href="/maison" className="text-sm text-slate-600 hover:text-slate-900">
              Maison
            </Link>
            <Link href="/jardin" className="text-sm text-slate-600 hover:text-slate-900">
              Jardin
            </Link>
            <Link href="/electromenager" className="text-sm text-slate-600 hover:text-slate-900">
              Électroménager
            </Link>
            <Link href="/velo" className="text-sm text-slate-600 hover:text-slate-900">
              Vélo
            </Link>
            <Link href="/articles" className="text-sm text-slate-600 hover:text-slate-900">
              Articles
            </Link>
          </nav>
        </header>
        <main className="mx-auto max-w-4xl px-4 py-8">{children}</main>
        <footer className="border-t border-slate-200">
          <div className="mx-auto max-w-4xl px-4 py-6 text-xs text-slate-500">
            En tant que Partenaire Amazon, nous réalisons un bénéfice sur les achats
            remplissant les conditions requises. Certains liens vers d&apos;autres
            enseignes (ManoMano notamment) peuvent également nous rémunérer, sans coût
            supplémentaire pour vous.
          </div>
        </footer>
      </body>
    </html>
  );
}
